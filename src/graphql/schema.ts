import { merge } from 'lodash';
import { gql, makeExecutableSchema, IResolvers } from 'apollo-server-koa';

import * as post from './post';
import { DateScalar } from './scalars';

const typeDef = gql`
  scalar Date

  type Query {
    _version: String
  }
`;

const resolvers: IResolvers = {
  Query: {
    _version: () => '0.1'
  }
};

const schema = makeExecutableSchema({
  typeDefs: [typeDef, post.typeDefs],
  resolvers: merge(resolvers, post.resolvers)
});

export default schema;
