import { Repository } from 'typeorm';
import { Team } from '../orm/team.entity';
import { TeamMember } from '../orm/team-member.entity';
import { User } from '../orm/user.entity';
import { CreateTeamDto } from '../teams/teams.dto';
export declare class TeamsService {
    private teamRepository;
    private teamMemberRepository;
    constructor(teamRepository: Repository<Team>, teamMemberRepository: Repository<TeamMember>);
    createTeam(createTeamDto: CreateTeamDto, owner: User): Promise<Team>;
    addTeamMember(teamId: number, userId: number, role: string): Promise<TeamMember>;
    joinTeam(inviteCode: string, user: User): Promise<Team>;
    getUserTeams(userId: number): Promise<Team[]>;
    getTeamDetails(teamId: number, userId: number): Promise<Team>;
    removeMember(teamId: number, userId: number, requesterId: number): Promise<void>;
}
