import { Team } from './team';
import { TwitterAccount } from './twitterAccount';

export interface League {
  id?: number;
  name: string;
  shortName: string;
  url: string;
  slug: string;
  teams: Team[];
  twitterAccounts?: TwitterAccount[];
}
