module.exports = {
  client: {
    service: {
      name: 'DEMOCRACY API',
      url: 'https://internal.api.democracy-app.de',
      skipSSLValidation: true,
    },
    includes: ['./src/**/*.graphql'],
  },
};
