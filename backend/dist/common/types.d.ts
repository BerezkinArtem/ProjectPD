export declare enum Role {
    admin = "admin",
    user = "user",
    customer = "customer",
    expert = "expert",
    directorate = "directorate"
}
export declare enum UserAccountStatus {
    active = "active",
    pending = "pending",
    inactive = "inactive"
}
export declare enum UserCommandStatus {
    inTeam = "In the team",
    expelled = "Expelled",
    team_deleted = "Team deleted"
}
export declare enum StatusProject {
    draft = "Draft",
    searchTeam = "Search for team",
    selectionTeam = "Team selection",
    teamFound = "Team found"
}
export declare enum StatusIdea {
    draft = "Draft",
    new = "New",
    approved = "Approved",
    endorsed = "Endorsed",
    published = "Published",
    implemented = "Implemented",
    fordeletion = "Fordeletion"
}
export declare enum StatusTeam {
    searchProject = "\u041F\u043E\u0438\u0441\u043A \u043F\u0440\u043E\u0435\u043A\u0442\u0430",
    inProgress = "\u0412 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0435 \u0440\u0430\u0431\u043E\u0442\u044B",
    joinProject = "\u041F\u043E\u0434\u0430\u043D\u0430 \u043D\u0430 \u043F\u0440\u043E\u0435\u043A\u0442",
    delete = "\u041D\u0430 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0438"
}
export declare enum PrivacyTeam {
    open = "Open",
    close = "Close"
}
export declare enum TypeAgile {
    backlog = "Backlog",
    sprintBacklog = "Sprint backlog",
    inProgress = "In progress",
    completed = "Completed"
}
export declare const Competencies: {
    readonly LANGUAGES: readonly ["No", "PHP", "Blueprint", "GOLANG", "Rust", "Dart", "R", "Java", "JavaScript", "HTML", "CSS", "C++", "TypeScript", "Python", "Swift", "Kotlin", "C#", "Ruby", "Julia"];
    readonly FRAMEWORKS: readonly ["React", "Vue", "Angular", "Spring Boot", "Flutter", "Django", "Flask", "Ruby on Rails", ".NET", "TensorFlow", "PyTorch", "Keras", "Pandas", "NumPy", "Node.js", "Express", "Next.js", "NestJS", "React Native", "Xamarin"];
    readonly DATABASES: readonly ["PostgreSQL", "MySQL", "MongoDB", "SQLite", "Redis", "Firebase", "Elasticsearch", "SQL Server", "Oracle", "Cassandra"];
    readonly DEVOPS: readonly ["Docker", "Kubernetes", "Git", "CI/CD", "Jenkins", "Ansible", "Terraform", "Prometheus", "Grafana", "AWS", "Azure", "GCP", "Nginx", "Apache"];
    readonly TESTING: readonly ["Jest", "Mocha", "Cypress", "Selenium", "JUnit", "PyTest", "Cucumber", "Postman"];
    readonly DESIGN: readonly ["Figma", "Sketch", "Adobe XD", "Photoshop", "Illustrator", "UI/UX Design", "Prototyping"];
    readonly MOBILE: readonly ["Flutter", "React Native", "Swift", "Kotlin", "Ionic"];
};
export type Competence = typeof Competencies[keyof typeof Competencies][number];
export type CompetenceGroup = keyof typeof Competencies;
export type CompetenceByGroup<T extends CompetenceGroup> = typeof Competencies[T][number];
export declare enum TaskStatus {
    new = "new",
    inProgress = "inProgress",
    done = "done"
}
export interface LoginResponseDto {
    access_token: string;
    username: string;
    firstname: string;
    lastname: string;
    roles: Role[];
    userId: number;
}
export interface SignUpRequestDto {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
}
export interface SignupResponseDto {
    success: boolean;
}
export interface CreateUserDto {
    name: string;
    firstname: string;
    lastname: string;
    password: string;
    roles: Role[];
    status: UserAccountStatus;
}
export interface UpdateUserDto {
    id?: number;
    avatar_id?: string;
    email?: string;
    firstname?: string;
    lastname?: string;
    group?: string;
    telephone?: string;
    roles?: Role[];
    status?: UserAccountStatus;
    competence?: Competence[];
    team_leader?: number;
    team_owner?: number[];
    portfolio?: number[];
    idea_initiator?: number[];
    project_initiator?: number[];
    comment?: number[];
    team?: number | null;
}
export interface CreateProjectDto {
    name: string;
    problem: string;
    solution: string;
    result: string;
    resource: string;
    stack: Competence[];
    status: StatusProject;
    startProject: Date;
    stopProject: Date;
    maxUsers: string;
    customer: string;
    initiator: number;
}
export interface UpdateProjectDto {
    name?: string;
    problem?: string;
    solution?: string;
    result?: string;
    resource?: string;
    stack?: Competence[];
    status?: StatusProject;
    startProject?: Date;
    stopProject?: Date;
    maxUsers?: string;
    customer?: string;
    exchange?: string;
    initiator?: number;
}
export interface CreateAgileDto {
    name: string;
    type: TypeAgile;
    project: number;
}
export interface UpdateAgileDto {
    name?: string;
    type?: TypeAgile;
    project?: number;
}
export interface CreateExchangeDto {
    name: string;
    startExchange: Date;
    stopExchange: Date;
}
export interface UpdateExchangeDto {
    name?: string;
    startExchange?: Date;
    stopExchange?: Date;
    projects?: number[];
}
export interface CreateIdeaDto {
    name: string;
    problem: string;
    solution: string;
    result: string;
    resource: string;
    stack: Competence[];
    status: StatusIdea;
    comment: number[];
    initiator: number;
}
export interface UpdateIdeaDto {
    name?: string;
    problem?: string;
    solution?: string;
    result?: string;
    resource?: string;
    stack?: Competence[];
    status?: StatusIdea;
    approved?: number[];
    comment?: number[];
    initiator?: number;
}
export interface CreateCommentDto {
    comment: string;
    users: number;
    idea: number;
}
export interface UpdateCommentDto {
    comment?: string;
    users?: number;
    idea?: number;
}
export interface CreateMessageDto {
    message: string;
    users: number;
    agile: number;
}
export interface UpdateMessageDto {
    message?: string;
    users?: number;
    agile?: number;
}
export interface CreateTeamDto {
    name: string;
    description: string;
    privacy: PrivacyTeam;
    status: StatusTeam;
    user_leader: number | undefined;
    user: number[];
    project: number | null;
    user_owner: number;
}
export interface UpdateTeamDto {
    name?: string;
    description?: string;
    privacy?: PrivacyTeam;
    status?: StatusTeam;
    user_leader?: number | null;
    user?: number[];
    project?: number | null;
    user_owner?: number;
}
export interface CreatePortfolioDto {
    status: UserCommandStatus;
    entryDate?: Date;
    exclusionDate?: Date | null;
    team: number;
    user: number;
}
export interface UpdatePortfolioDto {
    status: UserCommandStatus;
    entryDate?: Date;
    exclusionDate?: Date;
    team?: number | null;
    user?: number;
}
export type SecuredUser = {
    id: number;
    avatar_id: string;
    email: string;
    firstname: string;
    lastname: string;
    group: string;
    telephone: string;
    roles: Role[];
    status: UserAccountStatus;
    competence: Competence[];
    createdAt: Date;
    team_leader: TeamDto | null;
    team_owner: TeamDto[];
    portfolio: PortfolioDto[];
    idea_initiator: IdeaDto[];
    project_initiator: ProjectDto[];
    comment: CommentDto[];
    team: TeamDto | null;
};
export type TaskDto = {
    id: number;
    title: string;
    status: TaskStatus;
    createdAt: Date;
    author: SecuredUser;
    assignee?: any;
};
export type ProjectDto = {
    id: number;
    name: string;
    problem: string;
    solution: string;
    result: string;
    resource: string;
    stack: Competence[];
    status: StatusProject;
    startProject: Date;
    stopProject: Date;
    maxUsers: string;
    exchange: ExchangeDto;
    teams: TeamDto[];
    agile: AgileDto[];
    customer: string;
    initiator: SecuredUser;
};
export type AgileDto = {
    id: number;
    name: string;
    type: TypeAgile;
    createdAt: Date;
    project: ProjectDto;
};
export type ExchangeDto = {
    id: number;
    name: string;
    startExchange: Date;
    stopExchange: Date;
    projects: ProjectDto[];
};
export type IdeaDto = {
    id: number;
    name: string;
    problem: string;
    solution: string;
    result: string;
    resource: string;
    stack: Competence[];
    status: StatusIdea;
    createdAt: Date;
    approved: number[];
    comment: CommentDto[];
    initiator: SecuredUser;
};
export type CommentDto = {
    id: number;
    createdAt: Date;
    comment: string;
    users: SecuredUser;
    idea: IdeaDto;
};
export type MessageDto = {
    id: number;
    createdAt: Date;
    message: string;
    users: SecuredUser;
    agile: AgileDto;
};
export type TeamDto = {
    id: number;
    name: string;
    description: string;
    privacy: PrivacyTeam;
    status: StatusTeam;
    user_leader: SecuredUser;
    user: SecuredUser[];
    portfolio: PortfolioDto[];
    project?: ProjectDto | null;
    user_owner: SecuredUser;
};
export type PortfolioDto = {
    id: number;
    entryDate: Date;
    exclusionDate: Date | null;
    status: UserCommandStatus;
    team: TeamDto;
    user: SecuredUser;
};
export type CreateUpdateTaskDto = Omit<TaskDto, 'id' | 'createdAt' | 'author'>;
