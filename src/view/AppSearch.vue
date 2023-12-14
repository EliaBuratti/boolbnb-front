<template>
    <div class="d-flex">
        <div class="sidebar col-md-3 bg-light p-3">
            <div class=" h-100">
                <h3>Filters</h3>
                <form action="#" method="get">
                    <div class="mb-3">
                        <label for="rooms" class="form-label">Rooms</label>
                        <input type="number" class="form-control" name="rooms" id="rooms" v-model="rooms"
                            :placeholder="(this.rooms !== null ? this.rooms : 'Rooms number')" />
                    </div>

                    <div class="mb-3">
                        <label for="beds" class="form-label">Beds</label>
                        <input type="number" class="form-control" name="beds" id="beds" placeholder="Beds number"
                            :placeholder="this.beds" v-model="beds" />
                    </div>

                    <div class="mb-3">
                        <label for="location" class="form-label">Location</label>
                        <input type="text" class="form-control" name="location" id="location" :placeholder="this.location"
                            v-model="location" />
                    </div>


                    <div class="mb-3">
                        <label for="range" class="form-label">Range in km</label>
                        <input type="number" class="form-control" name="range" id="range" :placeholder="this.range"
                            v-model="range" />
                    </div>

                    <div class="form-check mb-3">
                        <div v-for="(service, i) in state.services"> <!-- :key="item.id" -->
                            <input class="form-check-input" type="checkbox" :value="service.slug" :id="service.slug"
                                v-model="queryServices" />
                            <label class="form-check-label" :for="service.slug"> {{ service.name }} </label>
                        </div>
                    </div>


                    <!-- Da implementare chiamata axios per recuperare servizi? -->
                    <!-- <div class="form-check mb-3">
                        <div>Services</div>
                        <input class="form-check-input" type="checkbox" value="" id="services" />
                        <label class="form-check-label" for="services"> Default checkbox </label>
                    </div> -->


                    <button type="submit" class="btn btn-primary" @click.prevent="searchApartment()">
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
                    <div class="col-4" v-for=" apartment  in  apartments ">
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
            queryServices: [],
            location: this.$route.query.location,
            beds: this.$route.query.beds,
            rooms: 1,
            range: 20
        };
    },
    methods: {

        searchApartment() {
            this.$router.replace({
                query: ''
            });
            console.log(this.queryServices);

            axios({
                method: 'get',
                url: 'http://127.0.0.1:8000/api/apartments/search',
                params: {
                    beds: this.beds,
                    location: this.location,
                    rooms: this.rooms,
                    range: this.range,
                    services: this.queryServices
                },
                paramsSerializer: {
                    indexes: true,
                }
            })
                .then(response => {
                    axios.interceptors.request.use(request => {
                        console.log('Starting Request', JSON.stringify(request, null, 2))
                        return request
                    })

                    this.apartments = [];

                    //console.log(this.apartments);

                    this.apartments = response.data.result;
                    //const allApartments = response.data.result.data;

                    //console.log(this.apartments);

                })
                .catch(error => {
                    console.log(error);
                })
        }
    },
    mounted() {
        this.searchApartment()
    },
    components: { ApartmentCard }
}
</script>

<style lang="scss" scoped></style>