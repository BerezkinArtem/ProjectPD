"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../orm/user.entity");
const users_controller_1 = require("./users.controller");
const roles_guard_1 = require("../auth/roles.guard");
const team_entity_1 = require("../orm/team.entity");
const project_entity_1 = require("../orm/project.entity");
const portfolio_entity_1 = require("../orm/portfolio.entity");
const comment_entity_1 = require("../orm/comment.entity");
const idea_entity_1 = require("../orm/idea.entity");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, team_entity_1.Team, project_entity_1.Project, portfolio_entity_1.Portfolio, comment_entity_1.Comments, idea_entity_1.Idea])],
        providers: [users_service_1.UsersService, roles_guard_1.RolesGuard],
        exports: [users_service_1.UsersService],
        controllers: [users_controller_1.UsersController],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map