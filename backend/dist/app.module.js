"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const user_entity_1 = require("./orm/user.entity");
const team_entity_1 = require("./orm/team.entity");
const idea_entity_1 = require("./orm/idea.entity");
const portfolio_entity_1 = require("./orm/portfolio.entity");
const project_entity_1 = require("./orm/project.entity");
const comment_entity_1 = require("./orm/comment.entity");
const project_module_1 = require("./project/project.module");
const team_module_1 = require("./team/team.module");
const portfolio_module_1 = require("./portfolio/portfolio.module");
const idea_module_1 = require("./idea/idea.module");
const comment_module_1 = require("./comment/comment.module");
const exchange_entity_1 = require("./orm/exchange.entity");
const exchange_module_1 = require("./exchange/exchange.module");
const agile_entity_1 = require("./orm/agile.entity");
const agile_module_1 = require("./agile/agile.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            agile_module_1.AgileModule,
            exchange_module_1.ExchangeModule,
            comment_module_1.CommentModule,
            idea_module_1.IdeaModule,
            portfolio_module_1.PortfolioModule,
            team_module_1.TeamModule,
            project_module_1.ProjectModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USER'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_DATABASE'),
                    cache: true,
                    entities: [user_entity_1.User, team_entity_1.Team, comment_entity_1.Comments, idea_entity_1.Idea, portfolio_entity_1.Portfolio, project_entity_1.Project, exchange_entity_1.Exchange, agile_entity_1.Agile],
                    maxQueryExecutionTime: 5000,
                    extra: {
                        max: 50,
                        connectionTimeoutMillis: 1000,
                        idleTimeoutMillis: 30000,
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, team_entity_1.Team, comment_entity_1.Comments, idea_entity_1.Idea, portfolio_entity_1.Portfolio, project_entity_1.Project, exchange_entity_1.Exchange, agile_entity_1.Agile]),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map