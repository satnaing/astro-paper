import { SITE } from "@config";

const ogImage = (text: string) => {
  return (
    <div
      style={{
        background: "#141e30",
        backgroundImage: "linear-gradient(to top, #141e30, #243b55)", // navy seal
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          // border: "4px solid #000",
          background: "transparent",
          borderRadius: "4px",
          display: "flex",
          justifyContent: "center",
          width: "80%",
          height: "85%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            margin: "20px",
            background: "transparent",
            width: "100%",
            height: "95%",
          }}
        >
          <p
            style={{
              fontSize: 80,
              fontWeight: "bold",
              color: "#fefbfb",
              maxHeight: "84%",
              overflow: "hidden",
            }}
          >
            {text}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              marginBottom: "14px",
              fontSize: 32,
              color: "#fefbfb",
            }}
          >
            <span>
              by{" "}
              <span
                style={{
                  color: "transparent",
                }}
              >
                "
              </span>
              <span style={{ overflow: "hidden", fontWeight: "bold" }}>
                {SITE.author}
              </span>
            </span>

            <div
              style={{
                overflow: "hidden",
                fontWeight: "bold",
              }}
            >
              {SITE.title}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{ background: "#243b55", height: "15%", width: "100%" }}
      ></div>
    </div>
  );
};

export default ogImage;
