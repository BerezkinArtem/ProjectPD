import { Repository } from 'typeorm';
import { User } from 'src/orm/user.entity';
import { Role, UpdateUserDto, UserAccountStatus } from 'src/common/types';
import { Team } from 'src/orm/team.entity';
import { Portfolio } from 'src/orm/portfolio.entity';
import { Project } from 'src/orm/project.entity';
import { Idea } from 'src/orm/idea.entity';
import { Comments } from 'src/orm/comment.entity';
export declare class UsersService {
    private readonly userRepository;
    private readonly teamRepository;
    private readonly portfolioRepository;
    private readonly projectRepository;
    private readonly ideaRepository;
    private readonly commentsRepository;
    constructor(userRepository: Repository<User>, teamRepository: Repository<Team>, portfolioRepository: Repository<Portfolio>, projectRepository: Repository<Project>, ideaRepository: Repository<Idea>, commentsRepository: Repository<Comments>);
    findOne(username: string): Promise<User | null>;
    findOneById(id: number): Promise<User | any>;
    create(username: string, password: string, firstname: string, lastname: string, roles?: Role[], status?: UserAccountStatus): Promise<User>;
    findAll(): Promise<User[]>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
}
