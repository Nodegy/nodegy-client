const API_URL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:8080/';
const DEPLOY_ENV = 'development';

export { API_URL, DEPLOY_ENV };