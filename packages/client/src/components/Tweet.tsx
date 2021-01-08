import React from 'react';
import { Box, Flex, Link, Image, Text, HStack } from '@chakra-ui/react';
import { Tweet as TweetInterface } from '@sports-blitz/shared/types/tweet';
import { formatDistanceToNow } from 'date-fns';
import { FaRegComment, FaRetweet, FaRegHeart, FaTwitter } from 'react-icons/fa';
import Card from './Card';
import LazyLoad from 'react-lazyload';

interface Props {
  tweet: TweetInterface;
  displayTeamLink?: boolean;
}

const Tweet = ({ tweet }: Props) => {
  const formattedDate = formatDistanceToNow(new Date(tweet.publishedDate), {
    addSuffix: true,
    includeSeconds: true
  });

  return (
    <LazyLoad once height={200} offset={100}>
      <Card p={0} pb={5} pos="relative" minH="200px">
        <Box p={4}>
          <Flex justifyContent="space-between" alignItems="flex-start">
            <Link
              href={`https://www.twitter.com/${tweet.twitterAccount?.accountName}`}
              isExternal
              _hover={{ textDecoration: 'none' }}
            >
              <Flex align="center">
                <Box>
                  <Image
                    rounded="full"
                    src={tweet.profileImageUrl}
                    title={tweet.twitterAccount?.accountName}
                    alt={tweet.twitterAccount?.accountName}
                    ignoreFallback
                    objectFit="cover"
                    width="35px"
                  />
                </Box>

                <Box pl={3} lineHeight="1.3em">
                  <Text fontWeight="bold">{tweet.displayName}</Text>
                  <Text>@{tweet.twitterAccount?.accountName}</Text>
                </Box>
              </Flex>
            </Link>

            <Box color="#00acee" fontSize="2xl">
              <FaTwitter />
            </Box>
          </Flex>

          <Link
            href={`https://www.twitter.com/${tweet.twitterAccount?.accountName}/status/${tweet.tweetId}`}
            isExternal
            _hover={{ textDecoration: 'none' }}
          >
            <Box my={4} fontSize="initial" lineHeight="1.3em" _hover={{ opacity: 0.8, transition: 'all 0.5s ease' }}>
              {tweet.tweetText}
            </Box>
          </Link>

          <Flex pos="absolute" bottom={4} left={4} right={4} justify="space-between">
            <HStack color="gray.500" fontSize="lg">
              <Link
                href={`https://twitter.com/intent/tweet?in_reply_to=${tweet.tweetId}`}
                title="reply"
                isExternal
                pr={2}
              >
                <FaRegComment />
              </Link>

              <Link
                href={`https://twitter.com/intent/retweet?tweet_id=${tweet.tweetId}`}
                title="retweet"
                isExternal
                pr={2}
                fontSize="20px"
              >
                <FaRetweet />
              </Link>

              <Link href={`https://twitter.com/intent/like?tweet_id=${tweet.tweetId}`} title="like" isExternal pr={2}>
                <FaRegHeart />
              </Link>
            </HStack>

            <Box color="gray.500" fontSize="xs">
              {formattedDate}
            </Box>
          </Flex>
        </Box>
      </Card>
    </LazyLoad>
  );
};

export default Tweet;
