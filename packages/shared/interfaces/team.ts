import { TwitterAccount } from './twitterAccount';

export interface Team {
  id?: number;
  name: string;
  shortName: string;
  url: string;
  slug: string;
  twitterAccounts?: TwitterAccount[];
}
