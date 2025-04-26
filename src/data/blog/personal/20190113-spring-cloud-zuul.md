---
author: tanc
pubDatetime: 2019-01-13T20:00:00+08:00
modDatetime: 2019-01-13T20:25:46.734+08:00
title: Spring Cloud 之 Zuul 网关
slug: personal/20190113-spring-cloud-zuul
featured: false
draft: false
tags:
  - Java
  - Spring Cloud
  - Zuul
description:
  Spring Cloud 源码系列之 Zuul 网关源码分析。
---

最近会有一些定制化 Zuul 网关的需求，所以看了一下 Zuul 的源码，写这篇文章记录一下。

## Table of contents

## Zuul 简介

Zuul 是 Netflix 开源的一个 API Gateway，作为一个边缘服务，提供动态路由、监控、安全等相关功能的支持。

本文结合 Spring Cloud 相关组件来使用 Zuul，重点分析在微服务架构下 Zuul 相关功能的实现，这里默认各位已经知晓 Zuul 的使用，本文重点放在原理讲解和源码分析上。

本文使用的 Spring Cloud 版本为 Edgware.SR5，Spring Boot 版本为 1.5.13.RELEASE，zuul 的引用使用了 spring-cloud-starter-zuul 包，版本为 1.4.4.RELEASE，对应的 zuul-core 版本为 1.3.0。

内容主要分成了两个部分，一个部分是 Zuul 的正常执行流程，比如 Filter 的执行过程，路由的执行过程，这部分其实很容易理解，所以基本点到为止；

第二部分是 Zuul 的启动过程，包括 Filter 的加载以及路由信息的加载等，会重点说明。

每个部分的内容都尽量的独立，可以分开看，源码较多，省略了无关的代码，只关注主要功能的实现。

## 一次请求到达 ZuulServlet 的过程

这个部分主要属于 Spring MVC 的内容，简单的说明下。

请求到达服务器后，会被 DispatcherServlet 处理，然后根据 request 找到对应的 HandlerMapping，Zuul 提供了 ZuulHandlerMapping，至于请求为何可以匹配到这个 HandlerMapping 后面会说明，这里先不细讲。

HandlerMapping 返回的 HandlerExecutionChain 中 handler 的实际对象是 ZuulController。

接着获取 HandlerAdapter，这里拿到的会是 SimpleControllerHandlerAdapter，然后使用这个 HandlerAdapter 执行 ZuulController，代码如下

```java
// SimpleControllerHandlerAdapter 的 handle 方法
@Override
public ModelAndView handle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    // 这里传入的 handler 为 ZuulController
    return ((Controller) handler).handleRequest(request, response);
}
```

接下来就是 ZuulController 的执行过程，可以看到是直接调用的父类的 handleRequestInternal 方法，如下所示：

```java
public class ZuulController extends ServletWrappingController {

    public ZuulController() {
        // 这里表明持有的 Servlet 是 ZuulServlet
        setServletClass(ZuulServlet.class);
        setServletName("zuul");
        setSupportedMethods((String[]) null);
    }

    @Override
    public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
        try {
            // 这里调用 ServletWrappingController 类的 handleRequestInternal 方法
            return super.handleRequestInternal(request, response);
        }
        finally {
            RequestContext.getCurrentContext().unset();
        }
    }
}
```

ServletWrappingController 中 handleRequestInternal 方法的实现就是调用内部持有的 Servlet 的 service 方法，这里 ZuulController 持有的 Servlet 则是 ZuulServlet，从上面代码中的构造函数中可以看到这一点。

```java
// ServletWrappingController 中的 handleRequestInternal
@Override
protected ModelAndView handleRequestInternal(HttpServletRequest request, HttpServletResponse response) throws Exception {
    // 这里实际调用的就会是 ZuulServlet 的 service 方法
    this.servletInstance.service(request, response);
    return null;
}
```

最终请求就被 ZuulServlet 处理了，接下来就进入到 Zuul 的内部运行部分。

## ZuulFilter 的执行过程

直接来看 ZuulServlet 的 service 方法实现

```java
@Override
public void service(javax.servlet.ServletRequest servletRequest, javax.servlet.ServletResponse servletResponse) throws ServletException, IOException {
    try {
        // 这里先忽略，主要是为请求创建了一个 RequestContext
        init((HttpServletRequest) servletRequest, (HttpServletResponse) servletResponse);
        RequestContext context = RequestContext.getCurrentContext();
        context.setZuulEngineRan();

        try {
            // 1. 执行 pre 类型的 filter
            preRoute();
        } catch (ZuulException e) {
            // 错误处理
            error(e);
            postRoute();
            return;
        }
        try {
            // 2. 执行 route 类型的 filter
            route();
        } catch (ZuulException e) {
            // 错误处理
            error(e);
            postRoute();
            return;
        }
        try {
            // 3. 执行 post 类型的 filter
            postRoute();
        } catch (ZuulException e) {
            // 错误处理
            error(e);
            return;
        }
    } catch (Throwable e) {
        error(new ZuulException(e, 500, "UNHANDLED_EXCEPTION_" + e.getClass().getName()));
    } finally {
        RequestContext.getCurrentContext().unset();
    }
}
```

代码中的关键步骤都进行了注释说明，这里实现的逻辑对应的就是官网提供的请求生命周期图，简单明了。

ZuulFilter 的类型默认有四种 pre、route、post、error，实现一个定制化的 Zuul Filter 需要继承 ZuulFilter 类，并实现四个方法即可，如下所示：

```java
import com.netflix.zuul.ZuulFilter;
import org.springframework.cloud.netflix.zuul.filters.support.FilterConstants;
import org.springframework.stereotype.Component;

@Component
public class CustomFilter extends ZuulFilter {

    @Override
    public String filterType() {
        return FilterConstants.PRE_TYPE;
    }

    @Override
    public int filterOrder() {
        return 0;
    }

    @Override
    public boolean shouldFilter() {
        return false;
    }

    @Override
    public Object run() {
        return null;
    }
}
```

这四个方法分别代表了 Zuul Filter 的特性：

### 类型

即 filterType 方法的返回值，Zuul 中默认的 Filter 的类型有 pre，route，post，error 四种类型；

### 执行顺序

filterOrder 方法返回 int 类型的 order 值。在 Zuul 中，各个类型的 Filter 对应一个列表，列表中按照 order 从小到大的顺序进行排序，这也是执行时的顺序；

### 执行条件

只有当 shouldFilter 方法返回为 true 时，Filter 的 run 方法才会被执行；

### 动作

即 Filter 执行具体做的事情，具体实现在 run 方法中。

下面通过分析 preRoute 方法，来说明 Zuul Filter 的执行过程，涉及的代码执行如下所示：

```java
// 1. ZuulServlet.java
void preRoute() throws ZuulException {
    zuulRunner.preRoute();
}

// 2. ZuulRunner.java
public void preRoute() throws ZuulException {
    FilterProcessor.getInstance().preRoute();
}

// ... 

// 3. FilterProcessor.java
public Object runFilters(String sType) throws Throwable {
    if (RequestContext.getCurrentContext().debugRouting()) {
        Debug.addRoutingDebug("Invoking {" + sType + "} type filters");
    }
    boolean bResult = false;
    // 拿到某类型的 Filter 的列表，并遍历执行
    List<ZuulFilter> list = FilterLoader.getInstance().getFiltersByType(sType);
    if (list != null) {
        for (int i = 0; i < list.size(); i++) {
            ZuulFilter zuulFilter = list.get(i);
            // 执行 Filter
            Object result = processZuulFilter(zuulFilter);
            if (result != null && result instanceof Boolean) {
                bResult |= ((Boolean) result);
            }
        }
    }
    return bResult;
}

// 4. ZuuFilter.java
public ZuulFilterResult runFilter() {
    ZuulFilterResult zr = new ZuulFilterResult();
    if (!isFilterDisabled()) {
        // 5. 判断是否执行
        if (shouldFilter()) {
            Tracer t = TracerFactory.instance().startMicroTracer("ZUUL::" + this.getClass().getSimpleName());
            try {
                // 6. run 方法执行的地方
                Object res = run();
                zr = new ZuulFilterResult(res, ExecutionStatus.SUCCESS);
            } catch (Throwable e) {
                t.setName("ZUUL::" + this.getClass().getSimpleName() + " failed");
                zr = new ZuulFilterResult(ExecutionStatus.FAILED);
                zr.setException(e);
            } finally {
                t.stopAndLog();
            }
        } else {
            zr = new ZuulFilterResult(ExecutionStatus.SKIPPED);
        }
    }
    return zr;
}
```

关键的地方都有注释说明，Filter 之间通过 RequestContext 共享数据，该类是一个 ConcurrentHashMap，存放在 ThreadLocal 中。

上面分析的是 pre 类型的 Filter 处理的流程，其他类型的处理流程也是相同的，就不再赘述。

## Zuul 的路由功能

当我们使用 @EnableZuulProxy 注解时，SpringBoot 会加载 ZuulProxyAutoConfiguration 配置类，这个配置类会注入 DiscoveryClientRouteLocator、PreDecorationFilter、RibbonRoutingFilter 等类，使用这些类配合 EurekaClient 就能够让 Zuul 做基于服务注册中心的动态路由。

整个路由的过程，是通过各个类型的 Filter 共同实现的，首先是 PreDecorationFilter，这是一个 pre 类型的 Filter，实现如下：

```java
@Override
public boolean shouldFilter() {
    RequestContext ctx = RequestContext.getCurrentContext();
    return !ctx.containsKey(FORWARD_TO_KEY) // a filter has already forwarded
            && !ctx.containsKey(SERVICE_ID_KEY); // a filter has already determined serviceId
}

@Override
public Object run() {
    RequestContext ctx = RequestContext.getCurrentContext();
    final String requestURI = this.urlPathHelper.getPathWithinApplication(ctx.getRequest());
    // 寻找路由
    Route route = this.routeLocator.getMatchingRoute(requestURI);
    // 获取请求的目的地
    String location = route.getLocation();
    // 设置 serviceId
    ctx.set(SERVICE_ID_KEY, location);
    return null;
}
```

简单的来说，当 RequestContext 没有设置 serviceId 时，请求就会被这个 Filter 处理。

在 run 方法中，首先拿到本次请求的 uri，然后通过 uri 获取一个 Route 对象，然后获取 location 值，设置 serviceId 到 RequestContext 中，这就是这个 pre 类型的 Filter 主要的功能，其他部分的功能先忽略不管。

然后进入到 route 类型的 Filter 的执行过程，RibbonRoutingFilter 的实现如下所示：

```java
@Override
public Object run() {
    RequestContext context = RequestContext.getCurrentContext();
    this.helper.addIgnoredHeaders();
    try {
        // 构建 Ribbon 命令
        RibbonCommandContext commandContext = buildCommandContext(context);
        // 实际发送请求的地方
        ClientHttpResponse response = forward(commandContext);
        setResponse(response);
        return response;
    }
    catch (ZuulException ex) {
        throw new ZuulRuntimeException(ex);
    }
    catch (Exception ex) {
        throw new ZuulRuntimeException(ex);
    }
}
```

这里通过 RequestContext 构建一个 RibbonCommandContext，这里主要是获取 serviceId 的值，也就是请求最终的去处，最后使用 HTTP 客户端将请求发送出去，这里涉及的 Ribbon 和 Hystrix 相关功能就不细说了。

## ZuulFilter 的加载过程

前面的小节主要讲了 Filter 和路由相关功能的执行过程，但是这些 Filter 以及路由配置是如何加载进来，以及运行时的存放形式是怎么样的，下面就这些疑问分别进行分析。

首先来看 Filter 的加载过程，这里通过反推的形式来梳理整个加载流程。

在之前的流程中，获取某类的 Filter 的代码如下：

```java
List<ZuulFilter> list = FilterLoader.getInstance().getFiltersByType(sType);
```

可以看到是通过 FilterLoader 获取的，它内部的实现如下：

```java
public class FilterLoader {
    // 单例
    final static FilterLoader INSTANCE = new FilterLoader();

    // 用于缓存各个类型的 Filter 列表
    private final ConcurrentHashMap<String, List<ZuulFilter>> hashFiltersByType = new ConcurrentHashMap<String, List<ZuulFilter>>();

    // Filter 注册表，用于存放所有的 Filter
    private FilterRegistry filterRegistry = FilterRegistry.instance();
}
```

接下来看看 FilterRegistry 的实现

```java
public class FilterRegistry {

    private static final FilterRegistry INSTANCE = new FilterRegistry();

    public static final FilterRegistry instance() {
        return INSTANCE;
    }

    private final ConcurrentHashMap<String, ZuulFilter> filters = new ConcurrentHashMap<String, ZuulFilter>();

    private FilterRegistry() {
    }
}
```

可以看到，这个类也是使用了单例模式，内部使用了一个 ConcurrentHashMap 保存所有的 Filter，这里就是 ZuulFilter 运行时存放的位置。

那这些 Filter 是何时被放到这个 ConcurrentHashMap 中的呢？这里通过查找 put 方法何时被调用，找到了 ZuulFilterInitializer 类，它的实现如下：

```java
 1public class ZuulFilterInitializer {
 2
 3    private final Map<String, ZuulFilter> filters;
 4    private final FilterRegistry filterRegistry;
 5
 6    public ZuulFilterInitializer(Map<String, ZuulFilter> filters, /* 忽略其他 */) {
 7        this.filters = filters;
 8        // ...
 9    }
10
11    @PostConstruct
12    public void contextInitialized() {
13        TracerFactory.initialize(tracerFactory);
14        CounterFactory.initialize(counterFactory);
15        // 将 Filter 放入到 FilterRegistry 中
16        for (Map.Entry<String, ZuulFilter> entry : this.filters.entrySet()) {
17            filterRegistry.put(entry.getKey(), entry.getValue());
18        }
19    }
20}
可以看到在该类的构造函数中，传入了所有的 ZuulFilter，并且在 contextInitialized 方法执行时将 ZuulFilter 放入到 FilterRegistry 中。

接着来看 ZuulFilterInitializer 是在哪里被创建的，可以在 ZuulServerAutoConfiguration 中找到，如下所示：

```java
public class ZuulServerAutoConfiguration {
    // ... 忽略其他

    @Configuration
    protected static class ZuulFilterConfiguration {

        // 自动注入所有的 ZuulFilter
        @Autowired
        private Map<String, ZuulFilter> filters;

        @Bean
        public ZuulFilterInitializer zuulFilterInitializer(
                CounterFactory counterFactory, TracerFactory tracerFactory) {
            FilterLoader filterLoader = FilterLoader.getInstance();
            FilterRegistry filterRegistry = FilterRegistry.instance();
            return new ZuulFilterInitializer(this.filters, counterFactory, tracerFactory, filterLoader, filterRegistry);
        }
    }
}
```

可以看到，所有的 ZuulFilter 是自动注入的，这里会得到所有被 Spring 管理的 ZuulFilter，然后在创建 ZuulFilterInitializer 类的时候，被传递给了构造函数。

这样，ZuulFilter 的加载过程就完整了。

## ZuulServlet 的加载过程

同样在 ZuulServerAutoConfiguration 中，可以看到 ZuulController 和 ZuulHandlerMapping 的注入过程。

```java
public class ZuulServerAutoConfiguration {
    @Bean
    public ZuulController zuulController() {
        return new ZuulController();
    }

    @Bean
    public ZuulHandlerMapping zuulHandlerMapping(RouteLocator routes) {
        ZuulHandlerMapping mapping = new ZuulHandlerMapping(routes, zuulController());
        mapping.setErrorController(this.errorController);
        return mapping;
    }
}
```

上面是注入过程，加载过程则是在 DispatcherServlet 中完成，当 DispatcherServlet 的 init 方法被调用时，最终会执行到 onRefresh 方法，这里负责了相关的初始化工作，实现如下：

```java
@Override
protected void onRefresh(ApplicationContext context) {
    initStrategies(context);
}
protected void initStrategies(ApplicationContext context) {
    // ... 忽略

    // 初始化 HandlerMapping
    initHandlerMappings(context);
    // ... 忽略
}

private void initHandlerMappings(ApplicationContext context) {
    this.handlerMappings = null;
    if (this.detectAllHandlerMappings) {
        // 这里获取所有的 HandlerMapping 的实例，包括了 ZuulHandlerMapping
        Map<String, HandlerMapping> matchingBeans =
                BeanFactoryUtils.beansOfTypeIncludingAncestors(context, HandlerMapping.class, true, false);
        if (!matchingBeans.isEmpty()) {
            // 保存到 DispatcherServlet 的 handlerMappings 中
            this.handlerMappings = new ArrayList<HandlerMapping>(matchingBeans.values());
            AnnotationAwareOrderComparator.sort(this.handlerMappings);
        }
    }
    // ... 忽略
}
```

可以看到 DispatcherServlet 会将所有的 HandlerMapping 保存到 handlerMappings 中，每次有请求过来的时候就会去 handlerMappings 中匹配对应的 HandlerMapping。

这样 ZuulServlet 运行时的加载过程就分析完了，与第三部分的内容结合起来看就是一个完整的启动和运行过程。

## 路由信息的加载过程

剩下的就是路由的加载和初始化过程了。

路由信息需要在两个地方起作用，一个是 ZuulHandlerMapping 中，也就是请求如何匹配到 ZuulHandlerMapping，以及在 PreDecorationFilter 中获取 Route 对象。

后者已经在第五部分中进行了说明，这里要解决的问题是请求如何匹配到 ZuulHandlerMapping？

首先再来看看 ZuulHandlerMapping 的配置部分：

```java
public class ZuulServerAutoConfiguration {
    // 注入 ZuulHandlerMapping 的地方，需要注入一个 RouteLocator 对象
    @Bean
    public ZuulHandlerMapping zuulHandlerMapping(RouteLocator routes) {
        ZuulHandlerMapping mapping = new ZuulHandlerMapping(routes, zuulController());
        mapping.setErrorController(this.errorController);
        return mapping;
    }
    /**
     * 这里注入 CompositeRouteLocator，并且使用 @Primary 注解，
     * 所以上面方法中注入的 RouteLocator 对象，始终为 CompositeRouteLocator
     * 同时接收所有其他的 RouteLocator 对象，内部使用一个集合保存
     */ 
    @Bean
    @Primary
    public CompositeRouteLocator primaryRouteLocator(Collection<RouteLocator> routeLocators) {
        // 同时，这里将所有其他的 RouteLocator 注入到了 CompositeRouteLocator 中
        return new CompositeRouteLocator(routeLocators);
    }
}
```

查看上面的配置以及注释说明，可以知道 ZuulHandlerMapping 中持有一个 RouteLocator 的实现类 CompositeRouteLocator，而 CompositeRouteLocator 类中包含了其他所有的 RouteLocator 的实现类，相当于 Zuul 默认使用 CompositeRouteLocator 来管理其他所有的 RouteLocator。

再来看 ZuulHandlerMapping 内部实现：

```java
public class ZuulHandlerMapping extends AbstractUrlHandlerMapping {
    // ... 忽略了其他部分

    // 该类实际为 CompositeRouteLocator
    private final RouteLocator routeLocator;
    private final ZuulController zuul;

    // 这里默认为 true
    private volatile boolean dirty = true;

    public ZuulHandlerMapping(RouteLocator routeLocator, ZuulController zuul) {
        this.routeLocator = routeLocator;
        this.zuul = zuul;
        setOrder(-200);
    }

    @Override
    protected Object lookupHandler(String urlPath, HttpServletRequest request) throws Exception {
        // ...
        if (this.dirty) {
            synchronized (this) {
                if (this.dirty) {
                    // 第一次执行时会先注册 hander
                    registerHandlers();
                    this.dirty = false;
                }
            }
        }
        return super.lookupHandler(urlPath, request);
    }

    private void registerHandlers() {
        // 遍历 CompositeRouteLocator 中所有的 RouteLocator 对象
        // 并返回每个 RouteLocator 里所有的 Route 对象
        Collection<Route> routes = this.routeLocator.getRoutes();
        if (routes.isEmpty()) {
            this.logger.warn("No routes found from RouteLocator");
        } else {
            // 遍历 Route 对象，并注册到 handlerMap 中
            // registerHandler 方法的实现在 AbstractUrlHandlerMapping 类中
            for (Route route : routes) {
                registerHandler(route.getFullPath(), this.zuul);
            }
        }
    }
}
```

注意注释信息的说明，ZuulHandlerMapping 在初始化时，会将所有 RouteLocator 返回的 Route 中的 path 信息添加到 handlerMap 中，这就是为什么访问配置过的路由信息时，请求可以被 ZuulHandlerMapping 处理，从而进入 Zuul 的处理流程。

而访问没有配置过的路径时，根本就不会进入 Zuul 的处理流程，而是被其他 HandlerMapping 处理。

最后剩下的问题就是，配置的路由信息在运行时是如何被加载进来的呢？

目前可以添加的配置信息的地方有三个，一个是配置文件直接配置，二是获取服务注册中心，生成路由信息，三是自定义实现并注入 RouteLocator 类的子类。

第一中方式是通过配置文件配置，相当于直接赋值了 ZuulProperties 类，在 ZuulServerAutoConfiguration 中会注入 SimpleRouteLocator 类，这个类的构造函数就传入了 ZuulProperties 对象，内部会将配置文件中的路由信息添加到 handlerMap 中。

```java
// ZuulServerAutoConfiguration 类
@Bean
@ConditionalOnMissingBean(SimpleRouteLocator.class)
public SimpleRouteLocator simpleRouteLocator() {
    // 传入了配置文件中配置的路由信息
    return new SimpleRouteLocator(this.server.getServletPrefix(),
            this.zuulProperties);
}
```

第二种方式则是通过 DiscoveryClientRouteLocator 类实现，它继承 RouteLocator，所以被管理在 CompositeRouteLocator 对象中，所以当 ZuulHandlerMapping 在执行 registerHandlers 方法时，最终会执行到 DiscoveryClientRouteLocator 的 locateRoutes 方法，该方法实现如下：

```java
@Override
protected LinkedHashMap<String, ZuulRoute> locateRoutes() {
    LinkedHashMap<String, ZuulRoute> routesMap = new LinkedHashMap<String, ZuulRoute>();
    routesMap.putAll(super.locateRoutes());
    if (this.discovery != null) {
        Map<String, ZuulRoute> staticServices = new LinkedHashMap<String, ZuulRoute>();
        for (ZuulRoute route : routesMap.values()) {
            String serviceId = route.getServiceId();
            if (serviceId == null) {
                serviceId = route.getId();
            }
            if (serviceId != null) {
                staticServices.put(serviceId, route);
            }
        }
        // 通过 EurekaClient 获取服务注册中心的所有服务
        List<String> services = this.discovery.getServices();
        for (String serviceId : services) {
            // 将服务名直接拼接成 /serviceName/**
            // 这里也是一个扩展点，可以修改拼接的规则
            String key = "/" + mapRouteToService(serviceId) + "/**";
            routesMap.put(key, new ZuulRoute(key, serviceId));
        }
    }
    // 返回所有的路由信息，被 ZuulHandlerMapping 添加到 handlerMap 中
    LinkedHashMap<String, ZuulRoute> values = new LinkedHashMap<>();
    for (Entry<String, ZuulRoute> entry : routesMap.entrySet()) {
        String path = entry.getKey();
        values.put(path, entry.getValue());
    }
    return values;
}
```

主要的逻辑就是将服务注册中心的所有服务拉取过来，然后生成 ZuulRoute 对象，完成路由的注册，这里还涉及动态刷新的功能，使用的方式是 Spring 的事件机制，这里不展开说了。

第三种方法就很简单，自定义实现的 RouteLocator 同样会被 CompositeRouteLocator 管理中，在 ZuulHandlerMapping 初始化路由的时候被添加到 handlerMap 中。

## 小结

本文分成几个部分，分别讲了请求如何进到 Zuul 的处理流程、Filter 的执行流程、以及配合服务注册中心的动态路由过程，最后还讲解了 Zuul 启动时相关组件的加载过程。

当然，Zuul 的内容还远不止这些，以后有机会再进行讲解，本文有误的地方欢迎指出来。
