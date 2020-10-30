enum REST_CONSTANTS {
    // response codes
    CREATED = 201,
    INTERNAL_SERVER_ERROR = 500,
    INVALID_DATA = 422,
    SUCCESS = 200,

    //response messages
    DB_SUCCESS = `Db connection established.`,
    DB_CONNECTION_FAILURE = `Unable to connect to the database: `,

    USER_CREATED = `User created successfully`,
    USER_FAILURE = `Unable to create/ Update user`,
    USER_EXIST = `Email already exists`,
    USER_RETRIEVE_FAILURE = `Unable to retrieve the user details`,

    ENQUIRIE_RETRIEVE_FAILURE = `Unable to retrieve / doesn't Enquirie does not exist`,

    // common message
    TRY_AGAIN = `Please try again after few minutes`,
    INVALID_DATA_MESSAGE = `Invalid data`
}

export default REST_CONSTANTS;
