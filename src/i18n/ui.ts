export const languages = {
  es: 'Español',
  en: 'English',
  pt: 'Português',
  fr: 'Français',
  de: 'Deutsch',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'es';

export const locales = Object.keys(languages) as Lang[];

/** Código para `og:locale` (formato idioma_TERRITORIO). */
export const ogLocales: Record<Lang, string> = {
  es: 'es_ES',
  en: 'en_US',
  pt: 'pt_BR',
  fr: 'fr_FR',
  de: 'de_DE',
};

export const siteName = 'Somnia Sequor';
export const contactEmail = 'somniasequor@gmail.com';

const es = {
  'meta.title': '¿Has tenido sueños extraños? — Somnia Sequor',
  'meta.description':
    'Investigamos un reciente aumento de sueños extraños e inexplicables. Comparte tu sueño de forma anónima con Somnia Sequor.',

  'nav.home': 'Inicio',
  'nav.language': 'Idioma',
  'theme.toggle': 'Cambiar tema',
  'theme.light': 'Claro',
  'theme.dark': 'Oscuro',

  'hero.line1': '¿Has tenido',
  'hero.line2': 'sueños',
  'hero.line3': 'extraños?',
  'hero.intro':
    'Estamos investigando un reciente aumento de sueños extraños e inexplicables, si has tenido algún tipo de sueño peculiar, angustiante, terrorífico, o has experimentado alguna actividad inusual en tus sueños, puedes ayudarnos compartiéndolo.',
  'hero.cta': 'Comparte tu sueño',
  'hero.imageAlt': 'Grabado de una figura alada que cae, al estilo renacentista',

  'form.heading': 'Compártelos anónimamente',
  'form.optional': 'opcional',
  'form.alias': 'Alias',
  'form.aliasPlaceholder': '¿Cómo te llamamos?',
  'form.sex': 'Sexo',
  'form.country': 'País',
  'form.age': 'Edad',
  'form.dream': 'Sueño',
  'form.dreamPlaceholder': 'Cuéntanos tu sueño con todo el detalle que recuerdes…',
  'form.submit': 'Enviar sueño',
  'form.sending': 'Enviando…',
  'form.errorRequired': 'Este campo es necesario.',
  'form.errorAge': 'Escribe una edad entre 0 y 150.',
  'form.errorSubmit': 'Algo salió mal. Inténtalo de nuevo.',
  'form.thanksTitle': 'Gracias.',
  'form.thanksBody': 'Tu sueño ha sido recibido. Lo guardaremos con cuidado.',
  'form.another': 'Compartir otro sueño',

  'footer.disclaimer':
    'Creemos en lo invaluable que es la experiencia humana por lo que ningún tipo de inteligencia artificial será alimentada con los sueños o cualquier tipo de información que nos sea proporcionada.',
  'footer.email': 'Correo',
} as const;

export type UiKey = keyof typeof es;

export const ui = {
  es,
  en: {
    'meta.title': 'Have you had strange dreams? — Somnia Sequor',
    'meta.description':
      'We are investigating a recent rise in strange, unexplainable dreams. Share your dream anonymously with Somnia Sequor.',

    'nav.home': 'Home',
    'nav.language': 'Language',
    'theme.toggle': 'Toggle theme',
    'theme.light': 'Light',
    'theme.dark': 'Dark',

    'hero.line1': 'Have you had',
    'hero.line2': 'strange',
    'hero.line3': 'dreams?',
    'hero.intro':
      'We are investigating a recent rise in strange and unexplainable dreams. If you have had any kind of peculiar, distressing or terrifying dream, or have experienced any unusual activity in your dreams, you can help us by sharing it.',
    'hero.cta': 'Share your dream',
    'hero.imageAlt': 'Renaissance-style engraving of a winged figure falling',

    'form.heading': 'Share them anonymously',
    'form.optional': 'optional',
    'form.alias': 'Alias',
    'form.aliasPlaceholder': 'What do we call you?',
    'form.sex': 'Sex',
    'form.country': 'Country',
    'form.age': 'Age',
    'form.dream': 'Dream',
    'form.dreamPlaceholder': 'Tell us your dream in as much detail as you remember…',
    'form.submit': 'Send dream',
    'form.sending': 'Sending…',
    'form.errorRequired': 'This field is required.',
    'form.errorAge': 'Enter an age between 0 and 150.',
    'form.errorSubmit': 'Something went wrong. Please try again.',
    'form.thanksTitle': 'Thank you.',
    'form.thanksBody': 'Your dream has been received. We will keep it with care.',
    'form.another': 'Share another dream',

    'footer.disclaimer':
      'We believe in the invaluable nature of human experience; therefore, no artificial intelligence of any kind will be fed with the dreams or any other information shared with us.',
    'footer.email': 'Email',
  },
  pt: {
    'meta.title': 'Você já teve sonhos estranhos? — Somnia Sequor',
    'meta.description':
      'Investigamos um aumento recente de sonhos estranhos e inexplicáveis. Compartilhe seu sonho anonimamente com a Somnia Sequor.',

    'nav.home': 'Início',
    'nav.language': 'Idioma',
    'theme.toggle': 'Alternar tema',
    'theme.light': 'Claro',
    'theme.dark': 'Escuro',

    'hero.line1': 'Você já teve',
    'hero.line2': 'sonhos',
    'hero.line3': 'estranhos?',
    'hero.intro':
      'Estamos investigando um aumento recente de sonhos estranhos e inexplicáveis. Se você teve algum tipo de sonho peculiar, angustiante, aterrorizante, ou vivenciou alguma atividade incomum em seus sonhos, pode nos ajudar compartilhando-o.',
    'hero.cta': 'Compartilhe seu sonho',
    'hero.imageAlt': 'Gravura de uma figura alada caindo, em estilo renascentista',

    'form.heading': 'Compartilhe-os anonimamente',
    'form.optional': 'opcional',
    'form.alias': 'Apelido',
    'form.aliasPlaceholder': 'Como te chamamos?',
    'form.sex': 'Sexo',
    'form.country': 'País',
    'form.age': 'Idade',
    'form.dream': 'Sonho',
    'form.dreamPlaceholder': 'Conte-nos seu sonho com todos os detalhes de que se lembrar…',
    'form.submit': 'Enviar sonho',
    'form.sending': 'Enviando…',
    'form.errorRequired': 'Este campo é obrigatório.',
    'form.errorAge': 'Informe uma idade entre 0 e 150.',
    'form.errorSubmit': 'Algo deu errado. Tente novamente.',
    'form.thanksTitle': 'Obrigado.',
    'form.thanksBody': 'Seu sonho foi recebido. Vamos guardá-lo com cuidado.',
    'form.another': 'Compartilhar outro sonho',

    'footer.disclaimer':
      'Acreditamos no valor inestimável da experiência humana, por isso nenhum tipo de inteligência artificial será alimentado com os sonhos ou qualquer outra informação que nos seja fornecida.',
    'footer.email': 'E-mail',
  },
  fr: {
    'meta.title': 'Avez-vous fait des rêves étranges ? — Somnia Sequor',
    'meta.description':
      'Nous enquêtons sur une récente recrudescence de rêves étranges et inexplicables. Partagez votre rêve anonymement avec Somnia Sequor.',

    'nav.home': 'Accueil',
    'nav.language': 'Langue',
    'theme.toggle': 'Changer de thème',
    'theme.light': 'Clair',
    'theme.dark': 'Sombre',

    'hero.line1': 'Avez-vous fait',
    'hero.line2': 'des rêves',
    'hero.line3': 'étranges ?',
    'hero.intro':
      'Nous enquêtons sur une récente recrudescence de rêves étranges et inexplicables. Si vous avez fait un rêve singulier, angoissant ou terrifiant, ou si vous avez vécu une activité inhabituelle dans vos rêves, vous pouvez nous aider en le partageant.',
    'hero.cta': 'Partagez votre rêve',
    'hero.imageAlt': 'Gravure de style Renaissance d’une figure ailée en chute',

    'form.heading': 'Partagez-les anonymement',
    'form.optional': 'facultatif',
    'form.alias': 'Pseudonyme',
    'form.aliasPlaceholder': 'Votre nom d’emprunt',
    'form.sex': 'Sexe',
    'form.country': 'Pays',
    'form.age': 'Âge',
    'form.dream': 'Rêve',
    'form.dreamPlaceholder': 'Racontez-nous votre rêve avec autant de détails que possible…',
    'form.submit': 'Envoyer le rêve',
    'form.sending': 'Envoi…',
    'form.errorRequired': 'Ce champ est requis.',
    'form.errorAge': 'Indiquez un âge entre 0 et 150.',
    'form.errorSubmit': 'Une erreur est survenue. Veuillez réessayer.',
    'form.thanksTitle': 'Merci.',
    'form.thanksBody': 'Votre rêve a bien été reçu. Nous le garderons précieusement.',
    'form.another': 'Partager un autre rêve',

    'footer.disclaimer':
      'Nous croyons à la valeur inestimable de l’expérience humaine ; c’est pourquoi aucune intelligence artificielle, de quelque nature que ce soit, ne sera alimentée par les rêves ni par toute autre information qui nous sera confiée.',
    'footer.email': 'Courriel',
  },
  de: {
    'meta.title': 'Hattest du seltsame Träume? — Somnia Sequor',
    'meta.description':
      'Wir untersuchen eine jüngste Zunahme seltsamer, unerklärlicher Träume. Teile deinen Traum anonym mit Somnia Sequor.',

    'nav.home': 'Startseite',
    'nav.language': 'Sprache',
    'theme.toggle': 'Design wechseln',
    'theme.light': 'Hell',
    'theme.dark': 'Dunkel',

    'hero.line1': 'Hattest du',
    'hero.line2': 'seltsame',
    'hero.line3': 'Träume?',
    'hero.intro':
      'Wir untersuchen eine jüngste Zunahme seltsamer und unerklärlicher Träume. Wenn du einen eigenartigen, beklemmenden oder furchterregenden Traum hattest oder ungewöhnliche Aktivitäten in deinen Träumen erlebt hast, kannst du uns helfen, indem du ihn mit uns teilst.',
    'hero.cta': 'Teile deinen Traum',
    'hero.imageAlt': 'Kupferstich einer stürzenden geflügelten Gestalt im Stil der Renaissance',

    'form.heading': 'Teile sie anonym',
    'form.optional': 'optional',
    'form.alias': 'Pseudonym',
    'form.aliasPlaceholder': 'Wie nennen wir dich?',
    'form.sex': 'Geschlecht',
    'form.country': 'Land',
    'form.age': 'Alter',
    'form.dream': 'Traum',
    'form.dreamPlaceholder': 'Erzähl uns deinen Traum so detailliert, wie du dich erinnerst…',
    'form.submit': 'Traum senden',
    'form.sending': 'Wird gesendet…',
    'form.errorRequired': 'Dieses Feld ist erforderlich.',
    'form.errorAge': 'Gib ein Alter zwischen 0 und 150 an.',
    'form.errorSubmit': 'Etwas ist schiefgelaufen. Bitte versuche es erneut.',
    'form.thanksTitle': 'Danke.',
    'form.thanksBody': 'Dein Traum ist bei uns angekommen. Wir bewahren ihn sorgsam auf.',
    'form.another': 'Einen weiteren Traum teilen',

    'footer.disclaimer':
      'Wir glauben an den unschätzbaren Wert menschlicher Erfahrung. Deshalb wird keine künstliche Intelligenz jeglicher Art mit den Träumen oder sonstigen Informationen, die uns anvertraut werden, gespeist.',
    'footer.email': 'E-Mail',
  },
} as const satisfies Record<Lang, Record<UiKey, string>>;
