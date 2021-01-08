import { Grid } from '@chakra-ui/react';
import { Tweet as TweetInterface } from '@sports-blitz/shared/types/tweet';
import Loader from './Loader';
import Tweet from './Tweet';

interface Props {
  tweets: TweetInterface[];
  isLoading: boolean;
}

const TweetFeed = ({ tweets = [], isLoading }: Props) => {
  return (
    <Grid templateColumns="repeat(auto-fit, minmax(275px, 1fr))" columnGap={6} rowGap={6} p={8}>
      {isLoading ? (
        <Loader />
      ) : (
        tweets.map(tweet => {
          return <Tweet tweet={tweet} key={tweet.id} />;
        })
      )}
    </Grid>
  );
};

export default TweetFeed;
