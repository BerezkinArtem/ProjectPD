import { TeamsService } from './teams.service';
import { CreateTeamDto, JoinTeamDto, TeamResponseDto } from '../teams/teams.dto';
import { RequestWithUser } from '../common/types';
export declare class TeamsController {
    private readonly teamsService;
    constructor(teamsService: TeamsService);
    createTeam(createTeamDto: CreateTeamDto, req: RequestWithUser): Promise<TeamResponseDto>;
    joinTeam(joinTeamDto: JoinTeamDto, req: RequestWithUser): Promise<TeamResponseDto>;
    getUserTeams(req: RequestWithUser): Promise<TeamResponseDto[]>;
    getTeamDetails(teamId: number, req: RequestWithUser): Promise<TeamResponseDto>;
    removeMember(teamId: number, userId: number, req: RequestWithUser): Promise<void>;
    private mapToResponseDto;
}
