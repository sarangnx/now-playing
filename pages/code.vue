<template>
    <div class="container">
        <top-bar />
        <readme>
            <template #top-left>
                <span>Code.md</span>
            </template>
            <template #top-right>
                <edit />
            </template>
            <template #content>
                <p>Here You Go..</p>
                <p style="line-height: 2;">
                    Your now-playing code is <span class="inline-code">{{ uid }}</span>
                </p>
                <h3>How to setup <img src="@/assets/wrench.png" class="emoji" /></h3>
                <div class="code-block">
                    <p class="comment">&lt;!-- how to embed in your Github Readme --&gt;</p>
                    <p>![now playing]({{ hostname }}/api/generate?uid={{ uid }})</p>
                    <p class="comment">&lt;!-- or --&gt;</p>
                    <p>&lt;img src="{{ hostname }}/api/generate?uid={{ uid }}" /&gt;</p>
                </div>
            </template>
        </readme>
    </div>
</template>

<script>
// https://gist.github.com/jonikarppinen/47dc8c1d7ab7e911f4c9
import TopBar from '@/components/TopBar';
import Readme from '@/components/Readme';
import Edit from '@/assets/edit.svg';

export default {
    data: () => ({
        uid: null
    }),
    components: {
        TopBar,
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
