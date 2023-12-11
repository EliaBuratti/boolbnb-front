<template>
    <div>
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
import { state } from '../store';

export default {
    name: 'AppHome',
    data() {
        return {
            state
        };
    },
    components: { ApartmentCard }
}
</script>

<style lang="scss" scoped></style>