import Twitter from 'twitter-lite';
import { PrismaClient } from '@prisma/client';
import { differenceInDays } from 'date-fns';
import { decode } from 'html-entities';
import { TwitterAccount } from '@sports-blitz/shared/types/twitterAccount';
import { Tweet } from '@sports-blitz/shared/types/tweet';
import { sendErrorEmail } from '@sports-blitz/shared/utils/emails';

const prisma = new PrismaClient();

(async () => {
  try {
    const user = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY || '',
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET || ''
    });

    const response = await user.getBearerToken();

    const app = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY || '',
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET || '',
      bearer_token: response.access_token
    });

    const accounts = await prisma.twitterAccount.findMany();

    const fetchAndMapTweets = async (twitterAccount: TwitterAccount) => {
      try {
        const data = await app.get('statuses/user_timeline', {
          screen_name: twitterAccount.accountName,
          include_rts: true,
          exclude_replies: true,
          count: 15
        });

        const createTweet = async (tweet: any) => {
          const publishedDate = new Date(tweet.created_at) || new Date();

          if (differenceInDays(publishedDate, new Date()) < -1) return;

          const newTweet: Tweet = {
            tweetText: decode(tweet.text),
            tweetId: tweet.id_str,
            publishedDate,
            displayName: tweet.user.name,
            profileImageUrl: tweet.user.profile_image_url_https,
            profileBannerImageUrl: tweet.user.profile_banner_url,
            mediaUrl: tweet.extended_entities ? tweet.extended_entities.media[0].media_url_https : null
          };

          const exists = await prisma.tweet.findFirst({ where: { tweetId: newTweet.tweetId } });

          if (!exists) {
            try {
              await prisma.tweet.create({
                data: {
                  ...newTweet,
                  twitterAccount: {
                    connect: {
                      id: twitterAccount.id
                    }
                  }
                }
              });

              console.log('tweet created', newTweet.tweetText);
            } catch (err) {
              console.log('create tweet err', err);
              return err;
            }
          }
        };

        await Promise.all(data.map(createTweet));
      } catch (err) {
        return err;
      }
    };

    await Promise.all(accounts.map(account => fetchAndMapTweets(account)));
  } catch (err) {
    console.error('main fetch tweets error(s)', err);
    sendErrorEmail('Fetch Tweets error', JSON.stringify({ err }));
  } finally {
    await prisma.$disconnect();
  }
})();
