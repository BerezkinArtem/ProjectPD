import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from 'src/common/types';
import { User } from 'src/orm/user.entity';
export declare class UsersController {
    private usersService;
    private readonly logger;
    constructor(usersService: UsersService);
    findAll(): Promise<User[]>;
    create(body: CreateUserDto): Promise<User>;
    findOne(id: number): Promise<User>;
    update(id: number, payload: UpdateUserDto): Promise<User>;
}
