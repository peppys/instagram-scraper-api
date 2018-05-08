const queueConstants = require('../src/constants').queues;
const instagramScraperService = require('../src/service/instagramScraper');

/**
 * Worker takes jobs from the queue and scrapes instagram profile data
 *
 * @param {Object} queue Kue object
 * @param {Object} opts Options speciying timeout and worker sleep time
 * @param {Number} opts.timeout Milliseconds
 * @param {Number} opts.sleep Milleseconds
 */
module.exports = (queue, opts) => {
    queue.process(queueConstants.INSTAGRAM_PROFILE_SCRAPE, (job, ctx, done) => {
        const data = job.data;

        console.log('Worker for queue %s is processing job %s.', queueConstants.INSTAGRAM_PROFILE_SCRAPE, JSON.stringify(data));

        if (!data.username) {
            done(new Error('Username required'))
            return;
        }

        // Scrape profile
        instagramScraperService.getProfile(data.username)
            .then((response) => {
                done(null, response);
                console.log(JSON.stringify({
                    data: response
                }));
            }, (error) => {
                done(error);
            });

        if (opts.timeout && opts.sleep) {
            // Go to sleep after processing job successfully
            ctx.pause(opts.timeout, function (err) {
                console.log('Worker for queue %s is going to sleep for %i minutes.', queueConstants.INSTAGRAM_PROFILE_SCRAPE, opts.sleep / 1000 / 60);
                setTimeout(() => {
                    console.log('Worker for queue %s has woke up!', queueConstants.INSTAGRAM_PROFILE_SCRAPE);
                    ctx.resume();
                }, opts.sleep);
            });
        }
    });
}
