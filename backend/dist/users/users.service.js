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
let UsersService = class UsersService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findOne(username) {
        return this.userRepository.findOneBy({ email: username });
    }
    async findOneById(id) {
        return this.userRepository.findOneBy({ id });
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
    async setStatus(id, status) {
        const user = await this.userRepository.findOneBy({ id: id });
        if (user) {
            user.status = status;
            await this.userRepository.save(user);
        }
    }
    async findAll() {
        return (await this.userRepository.find()).map((u) => u.getSecuredDto());
    }
    async update(id, updatedUserData) {
        const user = await this.findOneById(id);
        if (user) {
            user.email = updatedUserData.name;
            user.firstname = updatedUserData.firstname;
            user.lastname = updatedUserData.lastname;
            user.roles = updatedUserData.roles;
            user.status = updatedUserData.status;
            return await this.userRepository.save(user);
        }
        return;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map