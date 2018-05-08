/**
 * API Configuration
 */
module.exports = {
    /**
     * API ports
     */
    api: {
        port: process.env.API_PORT || 8080,
        kueUiPort: process.env.KUE_UI_PORT || 3000
    },

    /**
     * Kue redis connection config
     */
    kue: {
        redis: {
            port: process.env.REDIS_PORT || 6379,
            host: process.env.REDIS_HOST || 'redis',
        }
    },

    /**
     * Puppeteer browser launch config
     */
    puppeteer: process.env.NODE_ENV === 'production' ? {
        executablePath: 'google-chrome-unstable'
    } : {}
}
