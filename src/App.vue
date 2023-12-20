<script>
import { state } from './store';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
export default {
    name: 'App',
    data() {
        return {
            state
        }
    },
    components: {
        AppHeader,
        AppFooter
    },
    mounted() {
        state.fetchServices()
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