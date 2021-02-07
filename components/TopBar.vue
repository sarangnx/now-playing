<template>
    <div class="top-bar">
        <a @click="$router.push('/')" class="logo">/NOW_PLAYING.md</a>
        <a v-if="hasCode" @click="$router.push('/code')" class="code">Get your code</a>
    </div>
</template>

<script>
export default {
    props: {
        hasCode: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style lang="scss">
.top-bar {
    padding-top: 1.5rem;
    padding-bottom: 1rem;
    display: grid;
    grid-template-columns: 1fr 5fr 5fr 1fr;
    a {
        cursor: pointer;
        font-size: 0.9rem;
        &.logo {
            grid-column: 2;
            justify-self: start;
        }
        &.code {
            grid-column: 3;
            justify-self: end;
        }
    }
}
</style>
