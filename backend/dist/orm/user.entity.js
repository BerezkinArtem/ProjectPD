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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const team_entity_1 = require("./team.entity");
const types_1 = require("../common/types");
const idea_entity_1 = require("./idea.entity");
const portfolio_entity_1 = require("./portfolio.entity");
const comment_entity_1 = require("./comment.entity");
const project_entity_1 = require("./project.entity");
let User = class User {
    getSecuredDto() {
        return {
            id: this.id,
            avatar_id: this.avatar_id,
            email: this.email,
            firstname: this.firstname,
            lastname: this.lastname,
            group: this.group,
            telephone: this.telephone,
            roles: this.roles,
            status: this.status,
            competence: this.competence,
            createdAt: this.createdAt,
            team_leader: this.team_leader.getTeamDto(),
            team_owner: this.team_owner.map(team_owner => team_owner.getTeamDto()),
            portfolio: this.portfolio.map(portfolio => portfolio.getPortfolioDto()),
            idea_initiator: this.idea_initiator.map(idea_initiator => idea_initiator.getIdeaDto()),
            project_initiator: this.project_initiator.map(project_initiator => project_initiator.getProjectDto()),
            comment: this.comment.map(comment => comment.getCommentDto()),
            team: this.team.getTeamDto(),
        };
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], User.prototype, "avatar_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "passwordHash", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], User.prototype, "firstname", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], User.prototype, "lastname", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], User.prototype, "group", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], User.prototype, "telephone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: [types_1.Role.user], array: true }),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: types_1.UserAccountStatus.pending }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', array: true, default: '{}' }),
    __metadata("design:type", Array)
], User.prototype, "competence", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => team_entity_1.Team, (team) => team.user_leader),
    __metadata("design:type", team_entity_1.Team)
], User.prototype, "team_leader", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => team_entity_1.Team, (team) => team.user_owner),
    __metadata("design:type", Array)
], User.prototype, "team_owner", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => portfolio_entity_1.Portfolio, (portfolio) => portfolio.user),
    __metadata("design:type", Array)
], User.prototype, "portfolio", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => idea_entity_1.Idea, (idea) => idea.initiator),
    __metadata("design:type", Array)
], User.prototype, "idea_initiator", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => project_entity_1.Project, (project) => project.initiator),
    __metadata("design:type", Array)
], User.prototype, "project_initiator", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comments, (comment) => comment.users),
    __metadata("design:type", Array)
], User.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => team_entity_1.Team, (team) => team.user, { onDelete: 'SET NULL' }),
    __metadata("design:type", team_entity_1.Team)
], User.prototype, "team", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
//# sourceMappingURL=user.entity.js.map