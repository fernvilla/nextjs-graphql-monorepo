import { TwitterAccount } from './twitterAccount';

export interface Tweet {
  id?: number;
  tweetText: string;
  tweetId: string;
  publishedDate: Date;
  displayName: string;
  profileImageUrl?: string;
  profileBannerImageUrl?: string;
  mediaUrl?: string;
  twitterAccount?: TwitterAccount;
  twitterAccountId?: number;
}
