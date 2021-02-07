import axios from 'axios';

/**
 * Render now playing svg card
 *
 * @param {Object} track - Song details
 */
export async function renderCard(track, theme) {
    const image = track.album.images.find(im => im.height === theme.resolution);

    // download image and convert it to dataURI
    const imageDownload = await axios({
        method: 'get',
        url: image.url,
        responseType: 'arraybuffer'
    });

    const type = imageDownload.headers['content-type'];
    const imageBase64 = Buffer.from(imageDownload.data).toString('base64');
    const dataURI = `data:${type};base64,${imageBase64}`;

    // concat artist names
    const artists = track.artists.reduce((str, artist) => {
        if (!str) return artist.name;
        return `${str}, ${artist.name}`;
    }, '');

    return `
        <svg viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg" height="150" class="svg"  xmlns:xlink="http://www.w3.org/1999/xlink">
            ${theme.container}
            <g clip-path="url(#padding)">
                <image xlink:href="${dataURI}" height="80" width="80" x="10" y="10" preserveAspectRatio="xMidYMid slice"/>
                ${theme.track(track.name)}
                ${theme.artists(artists)}
                ${theme.play}
                ${theme.spotify}
            </g>

            <defs>
                <clipPath id="padding">
                    <rect x="10" y="10" width="280" height="80" />
                </clipPath>
            </defs>

            <style>
                .svg {
                    font-family: Ubuntu;
                }
                .title {
                    font-size: 13px;
                }
                .artist {
                    font-size: 10px;
                }
                .play {
                    font-size: 8px;
                    fill: #5b5b5b;
                }
            </style>
        </svg>`;
}
