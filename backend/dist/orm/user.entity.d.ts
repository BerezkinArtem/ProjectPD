import { Role, UserAccountStatus, SecuredUser } from 'src/common/types';
export declare class User {
    id: number;
    name: string;
    passwordHash: string;
    firstname: string;
    lastname: string;
    roles: Role[];
    status: UserAccountStatus;
    createdAt: Date;
    UpdatedAt: Date;
    version: number;
    getSecuredDto(): SecuredUser;
}
