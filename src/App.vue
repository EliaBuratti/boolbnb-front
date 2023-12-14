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

<style lang="scss" scoped>
#window {
    width: 100%;
    height: 100vh;
    overflow: hidden;
}

#main{
    overflow-y: scroll;
    height: calc(100% - 110px);
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #ffde59;

}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #ffc259; 
}
</style>
