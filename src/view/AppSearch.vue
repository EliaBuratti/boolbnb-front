<template>
    <div class="d-flex">
        <div class="sidebar col-md-3 bg-light p-3">
            <div class="position-fixed h-100">
                <h3>Filters</h3>
                <form action="#" method="get">
                    <div class="mb-3">
                        <label for="rooms" class="form-label">Rooms</label>
                        <input type="number" class="form-control" name="rooms" id="rooms" placeholder="Rooms number" />
                    </div>

                    <div class="mb-3">
                        <label for="beds" class="form-label">Beds</label>
                        <input type="number" class="form-control" name="beds" id="beds" placeholder="Beds number" />
                    </div>

                    <div class="mb-3">
                        <label for="range" class="form-label">Range</label>
                        <input type="number" class="form-control" name="range" id="range" placeholder="Range" />
                    </div>

                    <!-- Da implementare chiamata axios per recuperare servizi? -->
                    <div class="form-check mb-3">
                        <div>Services</div>
                        <input class="form-check-input" type="checkbox" value="" id="services" />
                        <label class="form-check-label" for="services"> Default checkbox </label>
                    </div>


                    <button type="submit" class="btn btn-primary">
                        Submit
                    </button>


                </form>
            </div>
        </div>
        <div class="col-md-9 my-3">
            <div class="container">
                <h1>Search results</h1>
                <div class="row g-4">
                    <!-- Da cambiare con i risultati -->
                    <div class="col-4" v-for="apartment in apartments">
                        <ApartmentCard :apartment="apartment"></ApartmentCard>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import ApartmentCard from '../components/ApartmentCard.vue';
import { state } from '../store';
import axios from 'axios';


export default {
    name: 'AppSearch',
    data() {
        return {
            state,
            apartments: [],
            location: this.$route.query.location,
            guests: this.$route.query.guests
        };
    },
    methods: {
        searchApartment() {
            //console.log(this.location, this.guests);
            axios({
                method: 'get',
                url: 'http://127.0.0.1:8000/api/apartments',
                params: {
                    beds: this.guests,
                    city: this.location
                }
            })
                .then(response => {
                    // console.log(response);
                    this.apartments = [];

                    this.apartments = response.data.result;
                    //const allApartments = response.data.result.data;

                    console.log(this.apartments);

                })
                .catch(error => {
                    console.log(error);
                })
        }
    },
    mounted() {
        console.log(this.$route.query.guests),
            this.searchApartment()
    },
    components: { ApartmentCard }
}
</script>

<style lang="scss" scoped></style>