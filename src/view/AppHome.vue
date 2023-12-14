<template>
    <div v-if="state.loading" class="vh-100 d-flex justify-content-center align-items-center">
        <div>
            <section class="loader">
                <div>
                    <div>
                        <span class="one h6"></span>
                        <span class="two h3"></span>
                    </div>
                </div>

                <div>
                    <div>
                        <span class="one h1"></span>
                    </div>
                </div>

                <div>
                    <div>
                        <span class="two h2"></span>
                    </div>
                </div>
                <div>
                    <div>
                        <span class="one h4"></span>
                    </div>
                </div>
            </section>
        </div>
    </div>
    <div v-else>
        <Jumbo></Jumbo>

        <div class="my-4 mx-3">
            <div class="container">
                <div class="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 g-4">
                    <div class="col" v-for="apartment in state.apartments">
                        <ApartmentCard :apartment="apartment"></ApartmentCard>
                    </div>
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
            state,
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

<style lang="scss" scoped>
</style>