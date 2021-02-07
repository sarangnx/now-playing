import escape from 'lodash.escape';
import { logo } from './logo';

export class CardTheme {
    constructor(options = {}) {
        this.resolution = this.resolutions[options.quality] ?? this.resolutions.med;
        this.theme = this.themes[options.theme] ?? this.themes.light;
    }

    // image resolutions available in spotify
    resolutions = {
        low: 64,
        med: 300,
        high: 640
    }

    themes = {
        dark: {
            background: '#06090f',
            border: '#30363d',
            title: '#ffffff',
            artists: '#dedada'
        },
        light: {
            background: '#ffffff',
            border: '#bfbfbf',
            title: '#000000',
            artists: '#5b5b5b'
        },
    }

    // svg card container
    get container() {
        const dimensions = `x="0" y="0" width="300" height="100" rx="5" ry="5"`;
        return `<rect ${dimensions} fill="${this.theme.background}" stroke="${this.theme.border}"/>`;
    }

    // Track name
    track(name) {
        return `<text x="100" y="30" class="title" fill="${this.theme.title}">${escape(name)}</text>`;
    }

    // artists names
    artists(names) {
        return `<text x="100" y="45" class="artist" fill="${this.theme.artists}">${escape(names)}</text>`;
    }

    // spotify logo
    get spotify() {
        return `
        <defs>
            ${logo}
        </defs>
        <use href="#spotify" height="20" width="20" x="270" y="70" preserveAspectRatio="xMidYMid slice"/>
        `;
    }
}
