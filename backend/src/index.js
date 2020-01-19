const createServer = require('./app');

const port = 4000;
const app = createServer();
app.listen({ port }, () => {
  global.console.log(`GraphQL ready at http://localhost:${port}/graphql in ${app.settings.env} mode`);
});
