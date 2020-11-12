<template>
    <div class="readme">
        <div class="readme-top">
            <div class="readme-top-left">
                <octocat />
                <span>me/README.md</span>
            </div>
            <div class="readme-top-right">
                <span>Send feedback</span>
                <edit />
            </div>
        </div>
        <div class="readme-content">
            <p style="display: inline-flex">Hey There,<img src="@/assets/wave.png" class="wave" /></p>
        </div>
    </div>
</template>

<script>
import Octocat from '@/assets/octocat.svg';
import Edit from '@/assets/edit.svg';

export default {
    components: {
        Octocat,
        Edit
    }
};
</script>

<style lang="scss">
.readme {
    max-width: 800px;
    padding: 1rem;
    margin: auto;
    border: 1px solid #bfbfbf;
    border-radius: 10px;
    margin-top: 3rem;
}

.readme-top {
    display: grid;
    grid-template-columns: 1fr 1fr;
    .readme-top-left,
    .readme-top-right {
        display: grid;
        align-items: end;
        grid-template-columns: auto 1fr;
        column-gap: 0.5rem;
        font-size: 0.7rem;
        color: #515151;
        svg {
            height: 1rem;
        }
    }
    .readme-top-right {
        justify-items: end;
        grid-template-columns: 1fr auto;
    }
}

.readme-content {
    font-size: 14px;
    padding: 5px;
    margin-top: 1rem;
}

.wave {
    height: 14px;
}

@media (max-width: 800px) {
    .readme {
        margin-left: 1rem;
        margin-right: 1rem;
    }
}
</style>
