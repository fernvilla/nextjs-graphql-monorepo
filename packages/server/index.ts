import express from 'express';
import nextApp from '@sports-blitz/client';
import apolloServer from './graphql';

const { PORT } = process.env;

async function main() {
  const app = express();

  await bootstrapApolloServer(app);
  await bootstrapClientApp(app);

  app.listen(PORT, () => {
    console.log(`Server ready on port ${PORT}`);
  });
}

// TODO: update 'any' type
async function bootstrapClientApp(expressApp: any) {
  await nextApp.prepare();
  expressApp.get('*', nextApp.getRequestHandler());
}

async function bootstrapApolloServer(expressApp: any) {
  apolloServer.applyMiddleware({ app: expressApp });
}

main();
