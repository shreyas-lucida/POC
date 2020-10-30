"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var REST_CONSTANTS;
(function (REST_CONSTANTS) {
    // response codes
    REST_CONSTANTS[REST_CONSTANTS["CREATED"] = 201] = "CREATED";
    REST_CONSTANTS[REST_CONSTANTS["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    REST_CONSTANTS[REST_CONSTANTS["INVALID_DATA"] = 422] = "INVALID_DATA";
    REST_CONSTANTS[REST_CONSTANTS["SUCCESS"] = 200] = "SUCCESS";
    //response messages
    REST_CONSTANTS["DB_SUCCESS"] = "Db connection established.";
    REST_CONSTANTS["DB_CONNECTION_FAILURE"] = "Unable to connect to the database: ";
    REST_CONSTANTS["USER_CREATED"] = "User created successfully";
    REST_CONSTANTS["USER_FAILURE"] = "Unable to create/ Update user";
    REST_CONSTANTS["USER_EXIST"] = "Email already exists";
    REST_CONSTANTS["USER_RETRIEVE_FAILURE"] = "Unable to retrieve the user details";
    REST_CONSTANTS["ENQUIRIE_RETRIEVE_FAILURE"] = "Unable to retrieve / doesn't Enquirie does not exist";
    // common message
    REST_CONSTANTS["TRY_AGAIN"] = "Please try again after few minutes";
    REST_CONSTANTS["INVALID_DATA_MESSAGE"] = "Invalid data";
})(REST_CONSTANTS || (REST_CONSTANTS = {}));
exports.default = REST_CONSTANTS;
//# sourceMappingURL=rest-constants.js.map