"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamsController = void 0;
const common_1 = require("@nestjs/common");
const teams_service_1 = require("./teams.service");
const teams_dto_1 = require("../teams/teams.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const types_1 = require("../common/types");
const swagger_1 = require("@nestjs/swagger");
let TeamsController = class TeamsController {
    teamsService;
    constructor(teamsService) {
        this.teamsService = teamsService;
    }
    async createTeam(createTeamDto, req) {
        const team = await this.teamsService.createTeam(createTeamDto, req.user);
        return this.mapToResponseDto(team);
    }
    async joinTeam(joinTeamDto, req) {
        const team = await this.teamsService.joinTeam(joinTeamDto.inviteCode, req.user);
        return this.mapToResponseDto(team);
    }
    async getUserTeams(req) {
        const teams = await this.teamsService.getUserTeams(req.user.id);
        return teams.map(team => this.mapToResponseDto(team));
    }
    async getTeamDetails(teamId, req) {
        const team = await this.teamsService.getTeamDetails(teamId, req.user.id);
        return this.mapToResponseDto(team);
    }
    async removeMember(teamId, userId, req) {
        await this.teamsService.removeMember(teamId, userId, req.user.id);
    }
    mapToResponseDto(team) {
        return {
            id: team.id,
            name: team.name,
            description: team.description,
            createdAt: team.createdAt,
            members: team.members?.map(member => ({
                userId: member.user.id,
                username: member.user.username,
                role: member.role,
            })) || [],
        };
    }
};
exports.TeamsController = TeamsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new team' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Team created successfully', type: teams_dto_1.TeamResponseDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [teams_dto_1.CreateTeamDto, typeof (_a = typeof types_1.RequestWithUser !== "undefined" && types_1.RequestWithUser) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "createTeam", null);
__decorate([
    (0, common_1.Post)('join'),
    (0, swagger_1.ApiOperation)({ summary: 'Join a team using invite code' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Successfully joined the team', type: teams_dto_1.TeamResponseDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [teams_dto_1.JoinTeamDto, typeof (_b = typeof types_1.RequestWithUser !== "undefined" && types_1.RequestWithUser) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "joinTeam", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all teams for current user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of teams', type: [teams_dto_1.TeamResponseDto] }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof types_1.RequestWithUser !== "undefined" && types_1.RequestWithUser) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "getUserTeams", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get team details' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Team details', type: teams_dto_1.TeamResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_d = typeof types_1.RequestWithUser !== "undefined" && types_1.RequestWithUser) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "getTeamDetails", null);
__decorate([
    (0, common_1.Delete)(':id/members/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove member from team' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Member removed successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, typeof (_e = typeof types_1.RequestWithUser !== "undefined" && types_1.RequestWithUser) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "removeMember", null);
exports.TeamsController = TeamsController = __decorate([
    (0, swagger_1.ApiTags)('teams'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('teams'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [teams_service_1.TeamsService])
], TeamsController);
//# sourceMappingURL=teams.controller.js.map