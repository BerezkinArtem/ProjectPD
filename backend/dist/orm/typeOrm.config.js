"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const config_1 = require("@nestjs/config");
const dotenv_1 = require("dotenv");
const user_entity_1 = require("./user.entity");
const task_entity_1 = require("./task.entity");
(0, dotenv_1.config)();
const configService = new config_1.ConfigService();
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    entities: [user_entity_1.User, task_entity_1.Task],
    migrations: ['dist/src/orm/migrations/*.js'],
});
//# sourceMappingURL=typeOrm.config.js.map