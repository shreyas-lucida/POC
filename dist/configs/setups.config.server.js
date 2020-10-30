"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configs_1 = require("../configs");
const _ = require('underscore');
class ConfigurationSetup {
    constructor() {
        this.INITIALIZED = true;
        this.initConfigsByEvnironment = () => {
            this.retrieveConfigs((configs) => {
                this.domainUrlConfig(configs);
            });
            console.log('Configurations: ', configs_1.Configs);
        };
        this.domainUrlConfig = (configs) => {
            let config = _.find(configs, C => C.configName === 'DOMAIAN_INFO');
            if (config) {
                config = JSON.parse(config.configValue);
                console.log("Domain URL Intialized", config);
            }
            configs_1.Configs.domainUrl = (config.domainUrl);
        };
    }
    init(fn) {
        if (ConfigurationSetup.INIT_STATUS === true)
            return;
        // Configs.MainDb.authenticate()
        //     .then(() => {
        //         console.log(REST_CONSTANTS.DB_SUCCESS);
        //          // initialize environment
        //          this.initConfigsByEvnironment();
        //     })
        //     .catch(err => {
        //         console.error(REST_CONSTANTS.DB_CONNECTION_FAILURE, err);
        //     });
    }
    retrieveConfigs(callback) {
        // EnvConfig.findAll({ configEvn: process.env.environment }).then(
        //     configs => {
        //         callback(configs);
        //     }, err => {
        //         console.log('APP INITIALIZATION ERROR: ', err.message);
        //         this.INITIALIZED = false;
        //     }
        // );
    }
}
ConfigurationSetup.INIT_STATUS = false;
ConfigurationSetup.CONFIG_RECORDS = `[]`;
const ConfigInitialize = new ConfigurationSetup();
exports.default = ConfigInitialize;
//# sourceMappingURL=setups.config.server.js.map