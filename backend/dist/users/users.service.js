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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../orm/user.entity");
const bcrypt = require("bcrypt");
const types_1 = require("../common/types");
const team_entity_1 = require("../orm/team.entity");
const portfolio_entity_1 = require("../orm/portfolio.entity");
const project_entity_1 = require("../orm/project.entity");
const idea_entity_1 = require("../orm/idea.entity");
const comment_entity_1 = require("../orm/comment.entity");
let UsersService = class UsersService {
    constructor(userRepository, teamRepository, portfolioRepository, projectRepository, ideaRepository, commentsRepository) {
        this.userRepository = userRepository;
        this.teamRepository = teamRepository;
        this.portfolioRepository = portfolioRepository;
        this.projectRepository = projectRepository;
        this.ideaRepository = ideaRepository;
        this.commentsRepository = commentsRepository;
    }
    async findOne(username) {
        return this.userRepository.findOne({
            where: { email: username },
            relations: ['team_leader', 'team_owner', 'portfolio', 'idea_initiator', 'project_initiator', 'comment', 'team'],
        });
    }
    async findOneById(id) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['team_leader', 'team_owner', 'portfolio', 'idea_initiator', 'project_initiator', 'comment', 'team', 'idea_initiator.project'],
        });
        return user;
    }
    async create(username, password, firstname, lastname, roles = [types_1.Role.user], status = types_1.UserAccountStatus.pending) {
        const user = new user_entity_1.User();
        user.email = username;
        user.firstname = firstname;
        user.lastname = lastname;
        user.passwordHash = await bcrypt.hash(password, 5);
        user.roles = roles;
        user.status = status;
        const createdUser = await this.userRepository.save(user);
        return createdUser;
    }
    async findAll() {
        return this.userRepository.find({ relations: ['team_leader', 'team_owner', 'portfolio', 'idea_initiator', 'project_initiator', 'comment', 'team'] });
    }
    async update(id, updateUserDto) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        }
        Object.assign(user, updateUserDto);
        if (updateUserDto.team_owner) {
            const teamOwners = await this.teamRepository.find({ where: { id: (0, typeorm_2.In)(updateUserDto.team_owner) } });
            user.team_owner = teamOwners;
        }
        if (updateUserDto.portfolio) {
            const portfolios = await this.portfolioRepository.find({ where: { id: (0, typeorm_2.In)(updateUserDto.portfolio) } });
            user.portfolio = portfolios;
        }
        if (updateUserDto.idea_initiator) {
            const ideaInitiators = await this.ideaRepository.find({ where: { id: (0, typeorm_2.In)(updateUserDto.idea_initiator) } });
            user.idea_initiator = ideaInitiators;
        }
        if (updateUserDto.project_initiator) {
            const projectInitiators = await this.projectRepository.find({ where: { id: (0, typeorm_2.In)(updateUserDto.project_initiator) } });
            user.project_initiator = projectInitiators;
        }
        if (updateUserDto.comment) {
            const commentsInitiators = await this.commentsRepository.find({ where: { id: (0, typeorm_2.In)(updateUserDto.comment) } });
            user.comment = commentsInitiators;
        }
        return this.userRepository.save(user);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(team_entity_1.Team)),
    __param(2, (0, typeorm_1.InjectRepository)(portfolio_entity_1.Portfolio)),
    __param(3, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __param(4, (0, typeorm_1.InjectRepository)(idea_entity_1.Idea)),
    __param(5, (0, typeorm_1.InjectRepository)(comment_entity_1.Comments)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map