import { Team } from './team.entity';
import { Role, UserAccountStatus, SecuredUser, Competence } from 'src/common/types';
import { Idea } from './idea.entity';
import { Portfolio } from './portfolio.entity';
import { Comments } from './comment.entity';
import { Project } from './project.entity';
export declare class User {
    id: number;
    avatar_id: string;
    email: string;
    passwordHash: string;
    firstname: string;
    lastname: string;
    group: string;
    telephone: string;
    roles: Role[];
    status: UserAccountStatus;
    competence: Competence[];
    createdAt: Date;
    team_leader: Team;
    team_owner: Team[];
    portfolio: Portfolio[];
    idea_initiator: Idea[];
    project_initiator: Project[];
    comment: Comments[];
    team: Team;
    getSecuredDto(): SecuredUser;
}
