import cors from "cors";
import express from "express";
import { authMiddleware, handleLogin } from "./auth.js";
import connectDB from "./db/db.connect.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware as apolloMidleware } from "@apollo/server/express4";
import { resolvers } from "./resolver.js";
import { readFile } from "node:fs/promises";
import { getUser } from "./db/dao/users.js";

const PORT = 9000;

const app = express();
app.use(cors(), express.json(), authMiddleware);

app.post("/login", handleLogin);

const typeDefs = await readFile("./schema.graphql", "utf-8");

async function getContext({ req }) {
  try {
    if (req.auth) {
      const user = await getUser(req.auth.sub);
      return user;
    } else {
      return {};
    }
  } catch (error) {
    return {};
  }
}

const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();
app.use("/graphql", apolloMidleware(apolloServer, { context: getContext }));

connectDB();

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL running on http://localhost:${PORT}/graphql`);
});
