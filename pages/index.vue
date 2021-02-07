<template>
    <div class="wrapper">
        <div class="container">
            <top-bar :hasCode="hasCode" />
            <header-section />
            <readme>
                <template #top-left>
                    <octocat />
                    <span>me/README.md</span>
                </template>
                <template #top-right>
                    <span>Send feedback</span>
                    <edit />
                </template>
                <template #content>
                    <p style="display: inline-flex">Hey There,<img src="@/assets/wave.png" class="emoji" /></p>
                    <p>
                        Dynamically generate svg cards with your current playing track from spotify and add it to your
                        GitHub README.
                    </p>
                    <p>Here's what I'm listening to right now.</p>
                    <div class="image">
                        <generated @click="openSpotify" />
                    </div>
                    <p>Click <a href="/api/auth">here</a> to get started.</p>
                </template>
            </readme>
        </div>
        <footer-section />
    </div>
</template>

<script>
import TopBar from '@/components/TopBar';
import HeaderSection from '@/components/HeaderSection';
import FooterSection from '@/components/FooterSection';
import Readme from '@/components/Readme';
import Octocat from '@/assets/octocat.svg';
import Edit from '@/assets/edit.svg';
import Generated from '@/assets/generated.svg';

export default {
    components: {
        TopBar,
        HeaderSection,
        FooterSection,
        Readme,
        Octocat,
        Edit,
        Generated
    },
    data: () => ({
        hasCode: false
    }),
    methods: {
        openSpotify() {
            window.open('https://open.spotify.com/track/0ytvsZOerGzUWfHXVT2Sgy', '_blank');
        }
    },
    mounted() {
        if (typeof localStorage !== 'undefined') {
            const uid = localStorage.getItem('uid');
            this.hasCode = uid ? true : false;
        }
    }
};
</script>
