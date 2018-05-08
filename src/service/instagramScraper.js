const config = require('../config');
const constants = require('../constants');
const stringUtils = require('../utils/string');
const puppeteer = require('puppeteer');
const User = require('../model/User');

const INSTAGRAM_BASE_URL = 'https://www.instagram.com/';

/**
 * Handles instagram scraping
 */
module.exports = {
    /**
     * Gets instagram profile data for given username
     *
     * @param {String} username
     * @return {User}
     */
    getProfile: async (username) => {
        const browser = await puppeteer.launch(config.puppeteer);
        const page = await browser.newPage();

        await page.goto(INSTAGRAM_BASE_URL + username + '/');

        const instagramUserData = await page.evaluate(() => {
            const profileData = window._sharedData.entry_data.ProfilePage;

            return profileData ? profileData[0].graphql.user : undefined;
        });

        if (!instagramUserData) {
            throw new Error(constants.errors.PROFILE_DOESNT_EXIST);
        }

        await browser.close();

        return new User({
            username: instagramUserData.username,
            fullName: instagramUserData.full_name,
            imageUrl: instagramUserData.profile_pic_url_hd,
            followers: stringUtils.toInt(instagramUserData.edge_followed_by.count),
            following: stringUtils.toInt(instagramUserData.edge_follow.count)
        });
    }
}
