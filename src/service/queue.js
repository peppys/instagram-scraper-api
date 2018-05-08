const config = require('../config');
const queue = require('kue').createQueue(config.kue);
const queueConstants = require('../constants').queues;

/**
 * Handles queuing services
 */
module.exports = {
    /**
     * Queues job to scrape instagram profile for given username
     *
     * @param {String} username
     * @returns {Object} job
     */
    queueInstagramProfileScrape: async (username) => {
        return await queue.create(queueConstants.INSTAGRAM_PROFILE_SCRAPE, {
            title: 'Scrape instagram profile: ' + username,
            username: username
        })
            .save()
    }
}
