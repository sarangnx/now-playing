<template>
    <div class="container">
        <top-bar />
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
                <p style="display: inline-flex">Hey There,<img src="@/assets/wave.png" class="wave" /></p>
            </template>
        </readme>
    </div>
</template>

<script>
import TopBar from '@/components/TopBar';
import HeaderSection from '@/components/HeaderSection';
import Readme from '@/components/Readme';
import Octocat from '@/assets/octocat.svg';
import Edit from '@/assets/edit.svg';

export default {
    components: {
        TopBar,
        HeaderSection,
        Readme,
        Octocat,
        Edit
    }
};
</script>

<style lang="scss">
.wave {
    height: 14px;
}
</style>
