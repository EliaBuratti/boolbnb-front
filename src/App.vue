<script>
import { state } from './store';
export default {
    name: 'App',
    mounted() {
        state.fetchData()
    }
}
</script>

<template>
    <router-view>

    </router-view>
</template>
