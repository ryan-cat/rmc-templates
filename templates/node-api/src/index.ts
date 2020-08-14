import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import { createConnection, useContainer } from 'typeorm';
import Container from 'typedi';
import firebase from 'firebase-admin';
import { formatError, databaseConfig, firebaseConfig } from 'rmc-backend-tools';
import { authentication } from './utils/middleware';

useContainer(Container);

const start = async () => {
  await createConnection(databaseConfig());

  firebase.initializeApp({
    credential: firebase.credential.cert(firebaseConfig())
  });

  const schema = await buildSchema({
    resolvers: [__dirname + '/**/*Resolvers.{ts,js}'],
    container: Container,
    validate: false,
    globalMiddlewares: [authentication]
  });
  const server = new ApolloServer({
    context: (ctx) => {
      return {
        ...ctx
      };
    },
    schema,
    formatError
  });

  const options = {
    tracing: true,
    port: process.env.PORT || 4000
  };

  server.listen(options, () => console.log(`Server is running on http://localhost:${options.port}/graphql`));
};

start().catch((err) => console.log(err));
