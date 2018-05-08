/**
 * Constants are defined here
 */
module.exports = {
    /**
     * Error messages
     */
    errors: {
        PROFILE_DOESNT_EXIST: 'Instagram for given username doesn\'t exist',
        INTERNAL_SERVER_ERROR: 'Something went wrong while trying to process your request',
        NO_USERNAME: 'Query parameter user_name is required'
    },

    /**
     * HTTP status codes
     */
    http: {
        STATUS_OK: 200,
        STATUS_BAD_REQUEST: 400,
        STATUS_INTERNAL_SERVER_ERROR: 500
    },

    /**
     * Queues
     */
    queues: {
        INSTAGRAM_PROFILE_SCRAPE: 'instagram_profile_scrape'
    }
}
