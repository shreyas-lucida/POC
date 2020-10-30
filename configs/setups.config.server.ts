import { EnvConfig } from '../models';
import { Configs } from "../configs";
import { REST_CONSTANTS } from '../utils/constants';
const _ = require('underscore');

class ConfigurationSetup {
    static INIT_STATUS = false;
    INITIALIZED = true;
    static CONFIG_RECORDS = `[]`;

    public init(fn: any) {
        if (ConfigurationSetup.INIT_STATUS === true) return;

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

    initConfigsByEvnironment = () => {
        this.retrieveConfigs((configs: any) => {
            this.domainUrlConfig(configs);
        });

        console.log('Configurations: ', Configs);
    }

    retrieveConfigs(callback: any) {
        // EnvConfig.findAll({ configEvn: process.env.environment }).then(
        //     configs => {
        //         callback(configs);
        //     }, err => {
        //         console.log('APP INITIALIZATION ERROR: ', err.message);
        //         this.INITIALIZED = false;
        //     }
        // );
    }

    domainUrlConfig = (configs: any): void => {
        let config = _.find(configs, C => C.configName === 'DOMAIAN_INFO');
        if (config) {

            config = JSON.parse(config.configValue);
            console.log("Domain URL Intialized",config)
        }
        Configs.domainUrl = (config.domainUrl);
        
    }

}

const ConfigInitialize = new ConfigurationSetup();
export default ConfigInitialize;