<script>
import { state } from './store';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
export default {
    name: 'App',
    components: {
        AppHeader,
        AppFooter
    },
    mounted() {
        state.fetchData()
    }
}
</script>

<template>
    <AppHeader></AppHeader>
    <AppFooter></AppFooter>
</template>
