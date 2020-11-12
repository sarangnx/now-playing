<template>
    <div class="container">
        <top-bar />
        <header-section />
        <readme />
    </div>
</template>

<script>
import TopBar from '@/components/TopBar';
import HeaderSection from '@/components/HeaderSection';
import Readme from '@/components/Readme';

export default {
    components: {
        TopBar,
        HeaderSection,
        Readme
    }
};
</script>
