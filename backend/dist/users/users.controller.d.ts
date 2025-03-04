import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from 'src/common/types';
export declare class UsersController {
    private usersService;
    private readonly logger;
    constructor(usersService: UsersService);
    findAll(): Promise<import("src/common/types").SecuredUser[]>;
    setUserStatus(id: any, body: any): Promise<void>;
    create(body: CreateUserDto): Promise<import("src/common/types").SecuredUser>;
    getUser(id: number): Promise<import("src/common/types").SecuredUser | undefined>;
    update(id: number, payload: UpdateUserDto): Promise<import("../orm/user.entity").User | undefined>;
}
