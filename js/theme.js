import escape from 'lodash.escape';
import { logo } from './logo';

export class CardTheme {
    constructor(options = {}) {
        this.resolution = this.resolutions[options.quality] || this.resolutions.med;
        this.theme = this.themes[options.theme] || this.themes.light;
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
            artists: '#dedada',
            play: '#ffffff'
        },
        light: {
            background: '#ffffff',
            border: '#bfbfbf',
            title: '#000000',
            artists: '#5b5b5b',
            play: '#000000'
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
        return `<defs>${logo}</defs>
        <use href="#spotify" height="20" width="20" x="270" y="70" preserveAspectRatio="xMidYMid slice"/>
        `;
    }

    // play button
    get play() {
        return `<svg width="1em" height="1em" fill="${this.theme.play}" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" x="100" y="75">
            <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
        </svg>`;
    }
}
