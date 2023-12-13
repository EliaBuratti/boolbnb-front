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

}
</script>

<template>
    <AppHeader></AppHeader>
    <div class="pb-5 mb-4 pt-2 mt-1">

        <router-view></router-view>
    </div>
    <!-- <AppFooter></AppFooter> -->
</template>
