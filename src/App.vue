<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
export default {
    name: 'App',
    components: {
        AppHeader,
        AppFooter
    }
}
</script>

<template>
    <div id="window">
        <AppHeader></AppHeader>
        <router-view id="main"></router-view>
        <AppFooter></AppFooter>
    </div>
</template>