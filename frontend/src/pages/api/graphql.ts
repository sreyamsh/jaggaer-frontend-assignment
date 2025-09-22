import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from '../../lib/graphql/schema';
import { resolvers } from '../../lib/graphql/resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler(server, {
  context: async (req, res) => ({ req, res }),
});
