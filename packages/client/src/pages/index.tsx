import { Box } from '@chakra-ui/react';
import TweetFeed from '../components/TweetFeed';
import { MAX_CONTAINER_WIDTH } from '../constants';
import { Tweet } from '@sports-blitz/shared/types/tweet';
import { gql, useQuery } from '@apollo/client';
// import { addApolloState, initializeApollo } from '../lib/apolloClient';

const TweetsQuery = gql`
  query TweetsQuery {
    tweets {
      id
      tweetId
      tweetText
      publishedDate
      displayName
      profileImageUrl
      profileBannerImageUrl
      twitterAccount {
        accountName
      }
    }
  }
`;

const Home = () => {
  const { loading, data = {} } = useQuery(TweetsQuery);
  const { tweets = [] }: { tweets: Tweet[] } = data;

  return (
    <Box maxW={MAX_CONTAINER_WIDTH} margin="auto">
      <TweetFeed tweets={tweets} isLoading={loading} />
    </Box>
  );
};

// export async function getStaticProps() {
//   const apolloClient = initializeApollo();

//   await apolloClient.query({
//     query: TweetsQuery
//   });

//   return addApolloState(apolloClient, {
//     props: {},
//     revalidate: 1
//   });
// }

export default Home;
