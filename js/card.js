/**
 * Render now playing svg card
 *
 * @param {Object} track - Song details
 */
export function renderCard(track) {
    const image = track.album.images.find(im => im.height === 300);

    // concat artist names
    const artists = track.artists.reduce((str, artist) => {
        if (!str) return artist.name;
        return `${str}, ${artist.name}`;
    }, '');

    return `
        <svg viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg" height="100" width="300" class="svg">
            <g clip-path="url(#padding)">
                <image href="${image.url}" height="80" width="80" x="10" y="10" preserveAspectRatio="xMidYMid slice"/>
                <text x="100" y="20" class="title">${track.name}</text>
                <text x="100" y="30" class="artist">${artists}</text>
            </g>

            <defs>
                <clipPath id="padding">
                    <rect x="10" y="10" width="280" height="80" />
                </clipPath>
            </defs>

            <style>
                .svg {
                    border: 1px solid #bfbfbf;
                    border-radius: 5px;
                    font-family: Ubuntu;
                }
                .title {
                    font-size: 10px;
                }
                .artist {
                    font-size: 8px;
                }
            </style>
        </svg>`;
}
