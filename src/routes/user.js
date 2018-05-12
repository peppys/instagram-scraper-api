const userController = require('../controller/user');

/**
 * Sets up user related routes
 *
 * @param {Object} app 
 * @returns {Object}
 */
module.exports = (app) => {
    app.get('/user-profile/:username', userController.getProfile);
    app.get('/user-profile/queue/:username', userController.getProfileAsync);

    return app;
}
