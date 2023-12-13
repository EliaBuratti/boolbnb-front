<template>
    <Jumbo></Jumbo>
    <div class="my-3">
        <div class="container">
            <div class="row g-4">
                <div class="col-4" v-for="apartment in state.apartments">
                    <ApartmentCard :apartment="apartment"></ApartmentCard>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ApartmentCard from '../components/ApartmentCard.vue';
import Jumbo from '../components/Jumbo.vue';
import { state } from '../store.js';

export default {
    name: 'AppHome',
    data() {
        return {
            state
        };
    },
    components: {
        ApartmentCard,
        Jumbo
    },
    mounted() {
        state.fetchData()
    }
}
</script>

<style lang="scss" scoped></style>