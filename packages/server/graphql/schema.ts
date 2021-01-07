import { makeExecutableSchema } from '@graphql-tools/schema';
import { Context } from './context';

const typeDefs = `
  type League {
    id: ID!
    name: String
    shortName: String
    slug: String
    teams: [Team]
  }

  type Team {
    id: ID!
    name: String
    shortName: String
    slug: String,
    twitterAccounts: [TwitterAccount]
  }

  type TwitterAccount {
    id: ID!      
    accountName: String  
    team: Team       
    league: League     
  }

  type Tweet {
    id: ID!
    publishedDate: String
    tweetText: String
    tweetId: String
    displayName: String
    profileImageUrl: String
    profileBannerImageUrl: String
    mediaUrl: String
    twitterAccount: TwitterAccount
  }

  type Query {
    leagues: [League],
    teams: [Team],
    twitterAccounts: [TwitterAccount],
    tweets: [Tweet],
  }
`;

const resolvers = {
  Query: {
    leagues: (parent: any, args: any, ctx: Context) => {
      return ctx.prisma.league.findMany({
        include: { teams: true },
        orderBy: { name: 'asc' }
      });
    },
    teams: (parent: any, args: any, ctx: Context) => {
      return ctx.prisma.team.findMany({
        include: { twitterAccounts: true },
        orderBy: { name: 'asc' }
      });
    },
    twitterAccounts: (parent: any, args: any, ctx: Context) => {
      return ctx.prisma.twitterAccount.findMany({
        include: { team: true, league: true }
      });
    },
    tweets: (parent: any, args: any, ctx: Context) => {
      return ctx.prisma.tweet.findMany({
        include: { twitterAccount: true }
      });
    }
  }
};

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs
});
