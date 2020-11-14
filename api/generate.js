import { renderCard } from '../js/card';
import { getRefreshToken } from '../js/dynamodb';
import { getAccessToken, getNowPlaying, getRecentlyPlayed } from '../js/spotify';

export default async function(req, res) {
    try {
        // get refresh token from db
        const refreshToken = await getRefreshToken(req.query.uid);
        if (!refreshToken) throw new Error('Invalid User');

        const accessToken = await getAccessToken(refreshToken);

        const track = (await getNowPlaying(accessToken)) || (await getRecentlyPlayed(accessToken));

        // set svg as content-type header
        res.setHeader('Content-Type', 'image/svg+xml');
        res.send(await renderCard(track));
    } catch (err) {
        res.end();
    }
}
