/**
 * User model conslidates user related data
 */
class User {
    /**
     * Builds user model
     *
     * @param {Object} user
     * @param {String} user.username}
     * @param {String} user.fullName ,
     * @param {String} user.imageUrl 
     * @param {Number} user.followers 
     * @param {Number} user.following 
     */
    constructor(user) {
        this.username = user.username;
        this.fullName = user.fullName;
        this.imageUrl = user.imageUrl;
        this.followers = user.followers;
        this.following = user.following;
    }
}

module.exports = User;
