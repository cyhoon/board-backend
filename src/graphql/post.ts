import { gql, IResolvers } from 'apollo-server-koa';
import { postService } from '../service';

const typeDefs = gql`
  type User {
    id: String
    name: String
    joinDate: Date
  }

  type Post {
    id: String
    title: String
    content: String
    writeDate: Date
    updateDate: Date
    writer: User
    commentCount: Int
  }

  extend type Query {
    posts(offset: Int, limit: Int): [Post]
  }
`;

type IPosts = {
  offset: number;
  limit: number;
};

const resolvers: IResolvers = {
  Query: {
    posts: async (_: any, params: IPosts) => {
      const { offset, limit } = params;

      return postService.getPosts(offset, limit);
    }
  }
};

export { typeDefs, resolvers };
