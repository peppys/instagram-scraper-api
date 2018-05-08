const userController = require('../controller/user');

/**
 * Sets up user related routes
 *
 * @param {Object} app 
 * @returns {Object}
 */
module.exports = (app) => {
    app.get('/user_profile', userController.getProfile);
    app.get('/user_profile_continue', userController.getProfileAsync);

    return app;
}
