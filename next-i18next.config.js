/** @type {import('next-i18next').UserConfig} */
module.exports = {
    i18n: {
      defaultLocale: 'en',
      locales: ['en', 'de', 'fr', 'es', 'it', 'pl', 'pt', 'ru', 'zh'],
    },
    fallbackLng: {
        default: ['en'],
      },
    localePath: resolve('./public/locales'),
  }