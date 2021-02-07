import { v4 as uuid } from 'uuid';
import querystring from 'querystring';

export default function (req, res) {
    const uid = uuid();
    /**
     * user-read-playback-state - to get current playing track details
     * user-read-recently-played - to get recently played tracks
     */
    const scopes = 'user-read-playback-state user-read-recently-played';

    res.setHeader('Set-Cookie', [`uid=${uid}; Max-Age=3600; HttpOnly`]);

    res.redirect(
        'https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: process.env.SPOTIFY_CLIENT_ID,
            scope: scopes,
            redirect_uri: process.env.REDIRECT_URI,
            state: uid
        })
    );
}
