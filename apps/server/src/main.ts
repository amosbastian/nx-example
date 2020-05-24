import "reflect-metadata";
import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema, Resolver, Query } from "type-graphql";
import { createConnection } from "typeorm";

@Resolver()
class HelloWorldResolver {
  @Query(() => String)
  async hello() {
    return "Hello, World";
  }
}

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [HelloWorldResolver],
  });

  const apolloServer = new ApolloServer({ schema });

  const app = express();

  apolloServer.applyMiddleware({ app });

  const port = process.env.port || 3333;

  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/graphql`);
  });
  server.on("error", console.error);
};

main();
