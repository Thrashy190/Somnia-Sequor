export const languages = {
  es: 'Español',
  en: 'English',
  pt: 'Português',
  fr: 'Français',
  de: 'Deutsch',
  ja: '日本語',
  ko: '한국어',
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
  ja: 'ja_JP',
  ko: 'ko_KR',
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
  'form.sex': 'Género',
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
    'form.sex': 'Gender',
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
    'form.sex': 'Gênero',
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
    'form.sex': 'Genre',
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
  ja: {
    'meta.title': '奇妙な夢を見ましたか？ — Somnia Sequor',
    'meta.description':
      '私たちは、近ごろ増えている奇妙で説明のつかない夢について調査しています。あなたの夢を Somnia Sequor に匿名で共有してください。',

    'nav.home': 'ホーム',
    'nav.language': '言語',
    'theme.toggle': 'テーマを切り替える',
    'theme.light': 'ライト',
    'theme.dark': 'ダーク',

    'hero.line1': '奇妙な',
    'hero.line2': '夢を',
    'hero.line3': '見ましたか？',
    'hero.intro':
      '私たちは、近ごろ増えている奇妙で説明のつかない夢について調査しています。風変わりな夢、不安になる夢、恐ろしい夢を見たことがある方、あるいは夢の中で普段とは違う出来事を体験した方は、ぜひ共有してご協力ください。',
    'hero.cta': 'あなたの夢を共有する',
    'hero.imageAlt': 'ルネサンス様式で描かれた、落下する翼のある人物の版画',

    'form.heading': '匿名で共有してください',
    'form.optional': '任意',
    'form.alias': 'ニックネーム',
    'form.aliasPlaceholder': 'お名前をお聞かせください',
    'form.sex': '性別',
    'form.country': '国',
    'form.age': '年齢',
    'form.dream': '夢',
    'form.dreamPlaceholder': '覚えていることをできるだけ詳しく教えてください…',
    'form.submit': '夢を送信',
    'form.sending': '送信中…',
    'form.errorRequired': 'この項目は必須です。',
    'form.errorAge': '0〜150の年齢を入力してください。',
    'form.errorSubmit': '問題が発生しました。もう一度お試しください。',
    'form.thanksTitle': 'ありがとうございます。',
    'form.thanksBody': 'あなたの夢を受け取りました。大切に保管します。',
    'form.another': '別の夢を共有する',

    'footer.disclaimer':
      '私たちは人間の体験にかけがえのない価値があると考えています。そのため、お寄せいただいた夢やその他の情報を、いかなる人工知能にも学習させることはありません。',
    'footer.email': 'メール',
  },
  ko: {
    'meta.title': '이상한 꿈을 꾸셨나요? — Somnia Sequor',
    'meta.description':
      '저희는 최근 늘어나고 있는 이상하고 설명할 수 없는 꿈을 조사하고 있습니다. 당신의 꿈을 Somnia Sequor에 익명으로 공유해 주세요.',

    'nav.home': '홈',
    'nav.language': '언어',
    'theme.toggle': '테마 전환',
    'theme.light': '라이트',
    'theme.dark': '다크',

    'hero.line1': '이상한',
    'hero.line2': '꿈을',
    'hero.line3': '꾸셨나요?',
    'hero.intro':
      '저희는 최근 늘어나고 있는 이상하고 설명할 수 없는 꿈을 조사하고 있습니다. 기이하거나 불안하거나 무서운 꿈을 꾸셨거나, 꿈속에서 평소와 다른 일을 겪으셨다면 공유해 주셔서 저희를 도와주세요.',
    'hero.cta': '당신의 꿈을 공유하세요',
    'hero.imageAlt': '르네상스 양식으로 새긴, 추락하는 날개 달린 인물의 판화',

    'form.heading': '익명으로 공유하세요',
    'form.optional': '선택',
    'form.alias': '닉네임',
    'form.aliasPlaceholder': '어떻게 불러드릴까요?',
    'form.sex': '성별',
    'form.country': '국가',
    'form.age': '나이',
    'form.dream': '꿈',
    'form.dreamPlaceholder': '기억나는 만큼 최대한 자세히 꿈 이야기를 들려주세요…',
    'form.submit': '꿈 보내기',
    'form.sending': '보내는 중…',
    'form.errorRequired': '필수 입력 항목입니다.',
    'form.errorAge': '0에서 150 사이의 나이를 입력해 주세요.',
    'form.errorSubmit': '문제가 발생했습니다. 다시 시도해 주세요.',
    'form.thanksTitle': '감사합니다.',
    'form.thanksBody': '꿈이 잘 접수되었습니다. 소중하게 간직하겠습니다.',
    'form.another': '다른 꿈 공유하기',

    'footer.disclaimer':
      '저희는 인간의 경험이 매우 소중하다고 믿습니다. 따라서 공유해 주신 꿈이나 그 밖의 어떤 정보도 어떠한 종류의 인공지능에도 학습시키지 않을 것입니다.',
    'footer.email': '이메일',
  },
} as const satisfies Record<Lang, Record<UiKey, string>>;
