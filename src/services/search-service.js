import axios from "axios";
import qs from "qs";

const API_BASE = "https://api.spotify.com/v1";
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;


export const getAccessToken = async () => {
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
        // console.log(response);
        return response.data.access_token;
    } catch (error) {
        console.log(error);
    }
}

export const fullTextSearch = async ({ search, accessToken, offsetNum }) => {
    const headers = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        params: {
            q: `${search}`,
            type: "album",
            limit: 15,
            offset: `${offsetNum}`
        }
    }

    try {
        const response = await axios.get(
            `${API_BASE}/search`,
            headers
        );
        console.log(response.data.albums.items);
        return response;
    } catch (error) {
        if (error.response.status === 400) {
            console.log(400);
            return 400;
        }
    }
}

export const miniTextSearch = async ({ searchterm, accessToken }) => {
    console.log(searchterm);
    const headers = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        params: {
            q: `${searchterm}`,
            type: "album",
            limit: 10
        }
    }

    try {
        const response = await axios.get(
            `${API_BASE}/search`,
            headers
        );
        return response;
    } catch (error) {
        if (error.response.status === 400) {
            console.log(400);
            return 400;
        }
    }
}

export const getAlbum = async ({ id, accessToken }) => {
    const headers = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        }
    }

    try {
        // console.log(id);
        const response = await axios.get(
            `${API_BASE}/albums/${id}`,
            headers
        );
        return response;
    } catch (error) {
        if (error.response.status === 400) {
            console.log(400);
            return 400;
        }
        if (error.response.status === 401) {
            accessToken = await getAccessToken();
            localStorage.setItem("token", accessToken);
            return getAlbum({ id, accessToken })
        }
    }
}

export const getArtistAlbums = async ({ id, accessToken }) => {
    const headers = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    }

    try {
        const response = await axios.get(`${API_BASE}/artists/${id}/albums`, headers);
        console.log(response);
        return response;
    }
    catch (error) {
        if (error.response.status === 401) {
            accessToken = await getAccessToken();
            return getArtistAlbums({ id, accessToken });
        }
    }
}

export const getNewReleases = async ({ limit, accessToken }) => {
    const headers = {
        headers: {
            'Content': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        params: {
            limit
        }
    }

    try {
        const response = await axios.get(`${API_BASE}/browse/new-releases`, headers);
        console.log(response);
        return response;
    }
    catch (error) {
        if (error.response.status === 401) {
            accessToken = await getAccessToken();
            return getNewReleases({ limit, accessToken });
        }
    }
}