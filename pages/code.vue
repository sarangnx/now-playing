<template>
    <div class="wrapper">
        <div class="container">
            <top-bar />
            <readme>
                <template #top-left>
                    <span>Code.md</span>
                </template>
                <template #top-right>
                    <edit />
                </template>
                <template v-if="uid" #content>
                    <p>Here You Go..</p>
                    <p style="line-height: 2">
                        Your now-playing code is <span class="inline-code">{{ uid }}</span>
                    </p>
                    <h3>How to setup <img src="@/assets/wrench.png" class="emoji" /></h3>
                    <div class="code-block">
                        <p class="comment">&lt;!-- how to embed in your Github Readme --&gt;</p>
                        <p>![now playing]({{ hostname }}/api/generate?uid={{ uid }})</p>
                        <p class="comment">&lt;!-- or --&gt;</p>
                        <p>&lt;img src="{{ hostname }}/api/generate?uid={{ uid }}" /&gt;</p>
                        <br />
                        <p class="comment">&lt;!-- But the best way to ensure interactivity is --&gt;</p>
                        <p>&lt;object data="{{ hostname }}/api/generate?uid={{ uid }}" &gt;</p>
                        <p>&nbsp;&nbsp;&lt;img src="{{ hostname }}/api/generate?uid={{ uid }}" /&gt;</p>
                        <p>&lt;/object&gt;</p>
                    </div>
                    <h3>Result <img src="@/assets/tada.png" class="emoji" /></h3>
                    <div class="image">
                        <object type="image/svg+xml" :data="`/api/generate?uid=${uid}`">
                            <img :src="`/api/generate?uid=${uid}`" />
                        </object>
                    </div>
                </template>
                <template v-else #content>
                    <p>You need to authorize spotify first..</p>
                    <a href="/api/auth">Login with Spotify</a>
                </template>
            </readme>
        </div>
        <footer-section />
    </div>
</template>

<script>
// https://gist.github.com/jonikarppinen/47dc8c1d7ab7e911f4c9
import TopBar from '@/components/TopBar';
import Readme from '@/components/Readme';
import Edit from '@/assets/edit.svg';
import FooterSection from '@/components/FooterSection';

export default {
    data: () => ({
        uid: null
    }),
    components: {
        TopBar,
        FooterSection,
        Readme,
        Edit
    },
    computed: {
        hostname() {
            return window.location.origin;
        }
    },
    mounted() {
        this.uid = this.$route.query && this.$route.query.uid ? this.$route.query.uid : null;
    }
};
</script>

<style scoped>
.image {
    margin-top: 20px;
}
</style>
