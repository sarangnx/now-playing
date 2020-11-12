<template>
    <div class="header">
        <div class="text">
            <span>Showcase Your Taste in Music</span>
            <span>on Your Github README.md</span>
        </div>
        <div class="cta">
            <button @click="login">CONNECT SPOTIFY</button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        login() {
            window.location = '/api/auth';
        }
    }
};
</script>

<style lang="scss">
.header {
    display: grid;
    justify-content: center;
    row-gap: 1.5rem;
    margin-top: 4rem;
    .text {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-weight: bold;
        line-height: 2;
    }

    .cta > button {
        background: #1db954;
        border: 0px;
        outline: none;
        color: white;
        padding: 0.8rem 4rem;
        border-radius: 30px;
        font-weight: bold;
        font-size: 0.8rem;
        letter-spacing: 4px;
        transition: 0.5s;
        &:hover {
            cursor: pointer;
            box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
        }
        &:active {
            box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.5);
        }
    }
}
</style>
