import { SITE } from "@/config";

export const languages = {
  en: 'English',
  fr: 'Français',
};

// Use 'lang' in config.ts file
export const defaultLang = SITE.lang;

export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.back' : 'Go back',
    'nav.top' : 'Back To Top',
    'nav.prev' : 'Prev',
    'nav.next' : 'Next',
    'nav.toggle' : 'Toggles light & dark',
    'nav.prevPost' : 'Previous Post',
    'nav.nextPost' : 'Next Post',

    'months.january' : 'January',
    'months.february' : 'February',
    'months.march' : 'March',
    'months.april' : 'April',
    'months.may' : 'May',
    'months.june' : 'June',
    'months.july' : 'July',
    'months.august' : 'August',
    'months.september' : 'September',
    'months.october' : 'October',
    'months.november' : 'November',
    'months.december' : "Decembrer",

    'footer.rights' : 'All rights reserved',
    
    'posts.title' : 'Posts',
    'post.updated' : 'Updated:',
    'post.share' : 'Share this post on:',
    'posts.subtitle' : 'All the articles I\'ve posted.',

    'archives.title' : 'Archives',
    'archives.subtitle' : 'All the articles I\'ve archived.',

    'search.title' : 'Search',
    'search.subtitle' : 'Search any article ...',

    'tags.title' : 'tags',
    'tags.desc' : 'All the tags used in posts.',

    'about.title': 'About',
    
    'error.back' : 'Go back home',
    'error.notFound' : 'Page not found',

    'home.social' : 'Social Links:',
    'home.featured' : 'Featured',
    'home.recent' : 'Recent Posts',
    'home.all' : 'All posts',
    'home.rss' : 'RSS feed',    
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.back' : 'retour',
    'nav.top' : 'Remonter',
    'nav.prev' : 'Précédent',
    'nav.next' : 'Suivant',
    'nav.toggle' : 'Thème clair / Thème sombre',
    'nav.prevPost' : 'Article Précédent',
    'nav.nextPost' : 'Article Suivant',

    'months.january' : 'Janvier',
    'months.february' : 'Février',
    'months.march' : 'Mars',
    'months.april' : 'Avril',
    'months.may' : 'Mai',
    'months.june' : 'Juin',
    'months.july' : 'Juillet',
    'months.august' : 'Août',
    'months.september' : 'Septembre',
    'months.october' : 'Octobre',
    'months.november' : 'Novembre',
    'months.december' : "Décembre",

    'footer.rights' : 'tous droits réservés',
    
    'posts.title' : 'Articles',
    'post.updated' : 'Modifié le:',
    'post.share' : 'Partager sur:',
    'posts.subtitle' : 'Tous les articles postés',

    'archives.title' : 'Archives',
    'archives.subtitle' : 'Tous les articles archivés.',

    'search.title' : 'Rechercher',
    'search.subtitle' : 'Rechercher un article...',

    'tags.title' : 'tags',
    'tags.desc' : 'Tous les tags utilisés.',

    'about.title' : 'À propos',

    'error.back' : 'Retourner à l\'accueil',
    'error.notFound' : 'Page non trouvée',

    'home.social' : 'Réseaux sociaux:',
    'home.featured' : 'A la une',
    'home.recent' : 'Articles récents',
    'home.all' : 'Tous les articles',
    'home.rss' : 'Flux RSS'
  },
} as const;