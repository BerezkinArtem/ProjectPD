import { Team } from './team.entity';
import { User } from '../orm/user.entity';
export declare class TeamMember {
    id: number;
    team: Team;
    teamId: number;
    user: User;
    userId: number;
    role: string;
}
