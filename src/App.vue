<script>
import { state } from './store';
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
    <router-view>

    </router-view>
</template>
