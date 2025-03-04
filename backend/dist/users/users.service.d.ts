import { Repository } from 'typeorm';
import { User } from 'src/orm/user.entity';
import { Role, UpdateUserDto, UserAccountStatus } from 'src/common/types';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findOne(username: string): Promise<User | null>;
    findOneById(id: number): Promise<User | null>;
    create(username: string, password: string, firstname: string, lastname: string, roles?: Role[], status?: UserAccountStatus): Promise<User>;
    setStatus(id: number, status: UserAccountStatus): Promise<void>;
    findAll(): Promise<import("src/common/types").SecuredUser[]>;
    update(id: number, updatedUserData: UpdateUserDto): Promise<User | undefined>;
}
