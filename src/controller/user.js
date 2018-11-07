const constants = require('../constants');
const queueService = require('../service/queue');
const instagramScraperService = require('../service/instagramScraper');

/**
 * Handles user related routes
 */
module.exports = {
    /**
     * Handles user profile request
     * 
     * @param {Object} req
     * @param {Object} res
     */
    getProfile: async (req, res) => {
        const username = req.params.username;

        if (!username) {
            res.status(constants.http.STATUS_BAD_REQUEST)
                .json({
                    error: constants.errors.NO_USERNAME
                });
            return;
        }

        try {
            const response = await instagramScraperService.getProfile(username)

            res.status(constants.http.STATUS_OK)
                .json({
                    data: response
                });
        } catch (err) {
            let status, errorMessage;

            if (error.message === constants.errors.PROFILE_DOESNT_EXIST) {
                status = constants.http.STATUS_BAD_REQUEST;
                errorMessage = error.message;
            } else {
                console.error(error);
                status = constants.http.STATUS_INTERNAL_SERVER_ERROR;
                errorMessage = 'Internal Server Error';
            }

            res.status(status)
                .json({
                    error: errorMessage
                });
        }
    },

    /**
     * Handles user profile async request
     * 
     * @param {Object} req
     * @param {Object} res
     */
    getProfileAsync: async (req, res) => {
        const username = req.params.username;

        if (!username) {
            res.status(constants.http.STATUS_BAD_REQUEST)
                .json({
                    error: constants.errors.NO_USERNAME
                });
            return;
        }

        try {
            const jobs = await Promise.all(
                Array(10)
                    .fill(username)
                    .map(queueService.queueInstagramProfileScrape)
            )

            // Let caller know scrapes were sucessfully queued
            res.status(constants.http.STATUS_OK)
                .json({
                    jobs,
                });
        } catch (err) {
            console.error(err);
            res.status(constants.http.STATUS_INTERNAL_SERVER_ERROR)
                .json({
                    response: constants.errors.INTERNAL_SERVER_ERROR
                });
            return;
        }
    }
}
