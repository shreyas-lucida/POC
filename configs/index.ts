const Sequelize = require('sequelize');
class ConfigSetup {
    MainDb: any;
    domainUrl: any;
    stripeConfig:any;
    mailConfig:any;

    dbConfig: { dialect: string, connectionString: string; logging: boolean; };
    constructor() {
        // this.initDbConfig();
        // console.log('DbConfig: ', this.dbConfig);
    }
    public get sessionSecret(): string { return 'The#_$ALG&ELECT&GAS!_Session_Secret'; }
    public get secretKey(): string { return '0ED7E333D003949930A538DF72A83E5380B736B872B9D2AB2D0420EFCA6B3B24'; }
    
    public initDbConfig() {
        let dbPwd = { db_password: '' };
        if (process.env.environment != 'dev')
            dbPwd = JSON.parse(process.env.db_password);

        let connectionString = `mysql://${process.env.db_user}:${dbPwd.db_password}@${process.env.db_connection}/${process.env.environment}db01`;

        if (process.env.environment === 'dev') {
            connectionString = 'mysql://dbuser:password@server_ip/db_name';
        } else if (process.env.environment === 'qa') {
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
export const Configs = new ConfigSetup();