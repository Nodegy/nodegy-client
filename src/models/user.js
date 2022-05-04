export default class User {
    constructor(username, email, password, timezone, key) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.timezone = timezone;
        this.key = key;
    }
}