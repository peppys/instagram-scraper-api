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
    getProfile: (req, res) => {
        const username = req.params.username;

        if (!username) {
            res.status(constants.http.STATUS_BAD_REQUEST)
                .json({
                    error: constants.errors.NO_USERNAME
                });
            return;
        }

        instagramScraperService.getProfile(username)
            .then((response) => {
                res.status(constants.http.STATUS_OK)
                    .json({
                        data: response
                    });
            }).catch(error => {
                var status, errorMessage;

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
            });
    },

    /**
     * Handles user profile async request
     * 
     * @param {Object} req
     * @param {Object} res
     */
    getProfileAsync: (req, res) => {
        const username = req.params.username;

        if (!username) {
            res.status(constants.http.STATUS_BAD_REQUEST)
                .json({
                    error: constants.errors.NO_USERNAME
                });
            return;
        }

        Promise.all(
            Array(10)
                .fill(username)
                .map(queueService.queueInstagramProfileScrape)
        ).then(jobs => {
            // Let caller know scrapes were sucessfully queued
            res.status(constants.http.STATUS_OK)
                .json({
                    jobs: jobs
                });
        }).catch(err => {
            console.error(err);
            res.status(constants.http.STATUS_INTERNAL_SERVER_ERROR)
                .json({
                    response: constants.errors.INTERNAL_SERVER_ERROR
                });
            return;
        });
    }
}
