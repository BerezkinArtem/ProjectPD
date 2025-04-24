export declare class CreateTeamDto {
    name: string;
    description?: string;
}
export declare class JoinTeamDto {
    inviteCode?: string;
}
export declare class TeamResponseDto {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    members: TeamMemberDto[];
}
export declare class TeamMemberDto {
    userId: number;
    username: string;
    role: string;
}
