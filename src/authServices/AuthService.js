import decode from 'jwt-decode';
export default class AuthService {
    constructor(domain) {
        this.domain = domain || 'http://localhost:4000'
        this.fetch = this.fetch.bind(this)
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)
    }

    login(username, password) {
        // Get a token
        return this.fetch(`${process.env.REACT_APP_URL}/users/login`, {
            method: 'POST',
            body: JSON.stringify({
                username,
                password 
            })
        }).then(res => { 
            this.setToken(res);
            return Promise.resolve(res);
        })
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken()
        // console.log(!!token && !this.isTokenExpired(token));
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(response) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', response.token);
        sessionStorage.setItem('token', response.token);
        localStorage.setItem('key', response.key);
        localStorage.setItem('request', response.requestId);
        localStorage.setItem('type', response.type);
        localStorage.setItem('access_tab',1);
        localStorage.setItem('name', response.name);
        
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        sessionStorage.removeItem('token');
        localStorage.removeItem('key');
        localStorage.removeItem('type');
        localStorage.removeItem('request');

    }

    getProfile() {
        return decode(this.getToken());
    }


    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}