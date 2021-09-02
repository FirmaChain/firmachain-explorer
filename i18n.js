module.exports = {
  // locales: ['en', 'zht'],
  locales: ['en'],
  defaultLocale: 'en',
  pages: {
    '*': ['common'],
    '/': ['home', 'blocks', 'transactions', 'message_labels'],
    'rgx:^/blocks': ['blocks', 'transactions'],
    'rgx:^/transactions': ['transactions', 'message_labels', 'message_contents'],
    'rgx:^/proposals': ['proposals'],
    'rgx:^/validators': ['validators', 'transactions', 'accounts', 'message_labels'],
    'rgx:^/accounts': ['accounts', 'transactions', 'message_labels'],
    'rgx:^/params': ['params'],
  },
  loadLocaleFrom: (lang, ns) => import(`./public/locales/${lang}/${ns}.json`).then((m) => m.default),
};
