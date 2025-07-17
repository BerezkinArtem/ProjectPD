"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const config_1 = require("@nestjs/config");
const dotenv_1 = require("dotenv");
const user_entity_1 = require("./user.entity");
const team_entity_1 = require("./team.entity");
const idea_entity_1 = require("./idea.entity");
const portfolio_entity_1 = require("./portfolio.entity");
const project_entity_1 = require("./project.entity");
const comment_entity_1 = require("./comment.entity");
const exchange_entity_1 = require("./exchange.entity");
const agile_entity_1 = require("./agile.entity");
(0, dotenv_1.config)();
const configService = new config_1.ConfigService();
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    entities: [user_entity_1.User, team_entity_1.Team, comment_entity_1.Comments, idea_entity_1.Idea, portfolio_entity_1.Portfolio, project_entity_1.Project, exchange_entity_1.Exchange, agile_entity_1.Agile],
    migrations: ['dist/orm/migrations/*.js'],
});
//# sourceMappingURL=typeOrm.config.js.map