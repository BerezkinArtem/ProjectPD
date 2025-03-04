import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto, SecuredUser, SignUpRequestDto } from 'src/common/types';
import { UsersService } from 'src/users/users.service';
export type NewUser = {
    username: string;
    password: string;
};
export declare class AuthService {
    private usersService;
    private jwtService;
    private readonly logger;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(username: string, pass: string): Promise<SecuredUser | null>;
    login(user: SecuredUser): Promise<LoginResponseDto>;
    signup(payload: SignUpRequestDto): Promise<{
        success: boolean;
    }>;
}
