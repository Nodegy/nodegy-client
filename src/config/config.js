import { API_URL, DEPLOY_ENV, WH_URL, WS_URL } from './deploy-config';

export default {
    SITE_DISABLED: false,
    NODEGY_CONTACT_EMAIL: 'nodegytrading@gmail.com',
    NODEGY_DISCORD_INVITE: 'https://discord.gg/yTSmNm9puF',
    REQUIRE_SIGNUP_KEY: true,
    REQUEST_RETRIES: 2,
    LOG_ERRORS_TO_DB: true,
    SECONDS_CYCLE: 10,
    REQUEST_LIMIT_PER_CYCLE: 5,
    API_URL: API_URL,
    WH_URL: WH_URL,
    WS_URL: WS_URL,
    DEPLOY_ENV: DEPLOY_ENV,
};