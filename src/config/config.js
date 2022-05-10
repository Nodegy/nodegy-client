module.exports = {
    SITE_DISABLED: true,
    NODEGY_CONTACT_EMAIL: 'nodegytrading@gmail.com',
    NODEGY_DISCORD_INVITE: 'https://discord.gg/yTSmNm9puF',
    ALLOW_SIGNUPS: false,
    REQUEST_RETRIES: 2,
    LOG_ERRORS_TO_DB: false,
    SECONDS_CYCLE: 10,
    VUE_APP_REQUEST_LIMIT_PER_CYCLE: 5,
    API_URL: process.env.NODE_ENV === 'production' ? 'prod url' : 'http://localhost:8080/',
    // API_URL: 'http://localhost:8080/'
};

