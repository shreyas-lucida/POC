"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configs = void 0;
const Sequelize = require('sequelize');
class ConfigSetup {
    constructor() {
        // this.initDbConfig();
        // console.log('DbConfig: ', this.dbConfig);
    }
    get sessionSecret() { return 'The#_$ALG&ELECT&GAS!_Session_Secret'; }
    get secretKey() { return '0ED7E333D003949930A538DF72A83E5380B736B872B9D2AB2D0420EFCA6B3B24'; }
    initDbConfig() {
        let dbPwd = { db_password: '' };
        if (process.env.environment != 'dev')
            dbPwd = JSON.parse(process.env.db_password);
        let connectionString = `mysql://${process.env.db_user}:${dbPwd.db_password}@${process.env.db_connection}/${process.env.environment}db01`;
        if (process.env.environment === 'dev') {
            connectionString = 'mysql://dbuser:password@server_ip/db_name';
        }
        else if (process.env.environment === 'qa') {
            connectionString = 'mysql://dbuser:password@server_ip/db_name';
        }
        console.log('Connection string:', connectionString);
        this.dbConfig = {
            dialect: 'mysql',
            connectionString: connectionString,
            logging: (process.env.environment === 'dev')
        };
        this.MainDb = new Sequelize(this.dbConfig.connectionString, {
            dialect: this.dbConfig.dialect,
            operatorsAliases: false,
            multipleStatements: true,
            pool: {
                max: 100,
                min: 0,
                acquire: 30000,
                idle: 3000
            },
            logging: this.dbConfig.logging // disable sql logging for production
        });
    }
}
exports.Configs = new ConfigSetup();
//# sourceMappingURL=index.js.map