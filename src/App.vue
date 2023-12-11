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
    mounted() {
        state.fetchData()
    },
}
</script>

<template>
    <AppHeader></AppHeader>
    <AppFooter></AppFooter>
</template>
