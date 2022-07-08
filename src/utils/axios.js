import axios from 'axios';

export const instanceAuth = axios.create({
    baseURL: process.env.REACT_APP_BACK_END_AUTH,
    timeout: 1000, 
});

export const instance = axios.create({
    baseURL: process.env.BACK_END_OTHER,
    timeout: 5000,
    headers: { Authorization: `Bearer ${localStorage.kahut_app_accessToken}` }
});

export function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};