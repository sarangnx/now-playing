<template>
    <footer class="footer">
        <div class="footer-content">
            <span>Made with <img src="@/assets/heart.png" class="emoji" /></span>
            <span><a href="https://github.com/sarangnx/now-playing">source</a></span>
        </div>
    </footer>
</template>

<style lang="scss">
.footer {
    text-align: center;
    position: absolute;
    bottom: 0px;
    height: 3rem;

    width: 100%;
    .footer-content {
        height: 100%;
        padding: 0rem 3rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        a {
            text-decoration: none;
        }
    }
}
</style>
