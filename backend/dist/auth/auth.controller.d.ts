import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { SignUpRequestDto } from 'src/common/types';
export declare class AuthController {
    private authService;
    private usersService;
    private readonly logger;
    constructor(authService: AuthService, usersService: UsersService);
    login(req: any): Promise<import("src/common/types").LoginResponseDto>;
    signup(payload: SignUpRequestDto): Promise<{
        success: boolean;
    }>;
}
