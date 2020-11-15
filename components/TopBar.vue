<template>
    <div class="top-bar">
        <a @click="$router.push('/')" class="logo">/NOW_PLAYING.md</a>
    </div>
</template>

<style lang="scss">
.top-bar {
    padding-top: 1.5rem;
    padding-bottom: 1rem;
    display: grid;
    grid-template-columns: 1fr 10fr 1fr;
    .logo {
        grid-column: 2;
        font-size: 0.9rem;
        cursor: pointer;
    }
}
</style>
