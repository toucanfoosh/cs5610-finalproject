import axios from "axios";
import qs from "qs";

const API_BASE = "https://api.spotify.com/v1";
const CLIENT_ID = "cbcaeb3f4438485a97f64311aef9b3a4";
const CLIENT_SECRET = "d983e07f8ac4403598cc5ed6c42cf35e";
const combined = "Y2JjYWViM2Y0NDM4NDg1YTk3ZjY0MzExYWVmOWIzYTQ6ZDk4M2UwN2Y4YWM0NDAzNTk4Y2M1ZWQ2YzQyY2YzNWU=";
const auth_token = `${CLIENT_ID}:${CLIENT_SECRET}`;

export const getAccessToken = async () => {
    const token_url = 'https://accounts.spotify.com/api/token'
    const headers = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
            username: CLIENT_ID,
            password: CLIENT_SECRET,
        },
    };
    const data = {
        grant_type: 'client_credentials',
    };

    try {
        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            qs.stringify(data),
            headers
        );
        console.log(response.data.access_token);
        return response.data.access_token;
    } catch (error) {
        console.log(error);
    }
}

// export const fullTextSearch = async (query) => {
//     const response = await axios.get()
// }