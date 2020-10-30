import { Configs } from "../configs";
const Sequelize = require('sequelize');

// const EnvConfig = Configs.MainDb.define('config', {
//   id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
//   configEnv: { type: Sequelize.STRING(4), allowNull: false },
//   configName: { type: Sequelize.STRING(45), allowNull: true },
//   configValue: { type: Sequelize.STRING(1000), allowNull: false },
//   createdOn: { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW },
//   updatedOn: { type: Sequelize.DATE, allowNull: true}
// }, { timestamps: true });

const EnvConfig = { timestamps: true }


// // defaultValue: Sequelize.NOW
export default EnvConfig;