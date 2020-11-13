import axios from 'axios';
import querystring from 'querystring';

/**
 * Get new access token from refresh token
 *
 * @param {String} refreshToken - Refresh Token
 */
export async function getAccessToken(refreshToken) {
    const basic = `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`;

    // get access token
    const response = await axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            Authorization: `Basic ${Buffer.from(basic).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        })
    });

    return response.data.access_token;
}

/**
 * Get details of track now playing
 *
 * @param {String} accessToken - Access Token
 */
export async function getNowPlaying(accessToken) {
    const response = await axios({
        method: 'get',
        url: 'https://api.spotify.com/v1/me/player',
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    // when music player is off no content is returned,
    // when ad is playing item is null & currently_playing_type = 'ad'
    if (response.status === 204 || !response.data.item || response.data.currently_playing_type === 'ad') {
        return null;
    }

    return response.data.item;
}

/**
 * Get details of recently played song
 *
 * @param {String} accessToken - Access Token
 */
export async function getRecentlyPlayed(accessToken) {
    const response = await axios({
        method: 'get',
        url: 'https://api.spotify.com/v1/me/player/recently-played',
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        params: { limit: 1 }
    });

    if (!response.data.items[0] || !response.data.items[0].track) {
        return null;
    }

    return response.data.items[0].track;
}
