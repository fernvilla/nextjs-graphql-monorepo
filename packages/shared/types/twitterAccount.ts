import { League } from './league';
import { Team } from './team';

export interface TwitterAccount {
  id?: number;
  accountName: string;
  team?: Team;
  league?: League;
}
