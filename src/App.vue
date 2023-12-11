<script>
import { state } from './store';
import AppHeader from './components/AppHeader.vue';
export default {
    name: 'App',
    components: {
        AppHeader
    },
    mounted() {
        state.fetchData()
    }
}
</script>

<template>
    <AppHeader></AppHeader>
    <router-view>

    </router-view>
</template>
