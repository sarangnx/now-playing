<template>
    <div class="readme">
        <div class="readme-top">
            <div class="readme-top-left">
                <slot name="top-left"></slot>
            </div>
            <div class="readme-top-right">
                <slot name="top-right"></slot>
            </div>
        </div>
        <div class="readme-content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<style lang="scss">
.readme {
    max-width: 800px;
    padding: 1rem;
    margin: 3rem auto;
    border: 1px solid #bfbfbf;
    border-radius: 10px;
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

.inline-code {
    background: #f6f8fa;
    padding: 5px;
}

.code-block {
    background: #f6f8fa;
    padding: 15px;
    word-break: break-all;
    font-size: 0.8rem;
}

.comment {
    color: #6a737d;
}

.emoji {
    height: 14px;
}

.readme-content {
    font-size: 14px;
    padding: 5px;
    margin-top: 1rem;
}

@media (max-width: 800px) {
    .readme {
        margin-left: 1rem;
        margin-right: 1rem;
    }
}
</style>
