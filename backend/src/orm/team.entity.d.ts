import { TeamMember } from './team-member.entity';
export declare class Team {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    inviteCode: string;
    members: TeamMember[];
}
