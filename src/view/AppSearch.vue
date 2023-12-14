<script>
import ApartmentCard from '../components/ApartmentCard.vue';
import { state } from '../store';
import axios from 'axios';

export default {
    name: 'AppSearch',
    data() {
        return {
            loading: true,
            validInput: true,
            results: null,
            state,
            apartments: [],
            queryServices: [],
            location: this.$route.query.location,
            beds: this.$route.query.beds,
            rooms: 1,
            range: 20,
            coordinatesCenter: [],
            lngMin: '',
            lngMax: '',
            latMin: '',
            latMax: '',
        };
    },
    methods: {
        searchApartment() {
            this.loading = true;
            this.$router.replace({
                query: ''
            });

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

                    if (response.data.result == 'Nothing address found') {
                        this.validInput = false;
                        this.results = 0;
                    } else {
                        this.validInput = true;

                        this.apartments = [];
                        this.coordinatesCenter = [];
                        let lngAll = [];
                        let latAll = [];
                        //console.log(this.apartments);

                        this.apartments = response.data.result;
                        //const allApartments = response.data.result.data;

                        //console.log(this.apartments);
                        this.coordinatesCenter = response.data.coordinates;
                        //console.log(this.coordinatesCenter);

                        if (this.apartments.length == 0) {
                            this.lngMin = this.coordinatesCenter[0];
                            this.lngMax = this.coordinatesCenter[0];

                            this.latMin = this.coordinatesCenter[1];
                            this.latMax = this.coordinatesCenter[1];
                        } else {
                            this.apartments.forEach(apartment => {
                                lngAll.push(apartment.longitude);
                            });
                            lngAll.push(this.coordinatesCenter[0]);
                            this.lngMin = Math.min.apply(Math, lngAll);
                            this.lngMax = Math.max.apply(Math, lngAll);

                            this.apartments.forEach(apartment => {
                                latAll.push(apartment.latitude);
                            });
                            latAll.push(this.coordinatesCenter[1])
                            this.latMin = Math.min.apply(Math, latAll);
                            this.latMax = Math.max.apply(Math, latAll);
                        }

                        this.results = this.apartments.length;

                        //console.log(this.coordinatesCenter);
                        this.fetchMap();

                    }

                    this.loading = false;

                })
                .catch(error => {
                    console.log(error);
                })
        },

        fetchMap() {
            let sw = new tt.LngLat(this.lngMin, this.latMax);
            let ne = new tt.LngLat(this.lngMax, this.latMin);
            let llb = new tt.LngLatBounds(sw, ne);
            //console.log(llb);

            const map = tt.map({
                key: 'udRMY8mFZ7o4kiJOvK0ShT9DEn82wGyT',
                container: 'map',
                center: this.coordinatesCenter,
                zoom: 9
            })

            map.fitBounds(llb, {
                padding: { top: 30, bottom: 10, left: 20, right: 20 },
                maxZoom: 9
            });

            map.on('load', () => {
                this.apartments.forEach(apartment => {
                    const apartmentCoordinates = [apartment.longitude, apartment.latitude];
                    new tt.Marker().setLngLat(apartmentCoordinates).addTo(map);
                });
                new tt.Marker({ color: '#ffde59', scale: 0.75 }).setLngLat(this.coordinatesCenter).addTo(map);
            })
            //console.log(this.loading);
        }
    },
    mounted() {
        console.log(this.loading);
        this.searchApartment()
    },
    components: { ApartmentCard }
}
</script>

<template>
    <div class="d-flex">

        <!-- Sidebar -->
        <div class="col-3 bg-light sidebar p-3">

            <h5>Filters</h5>
            <form action="#" method="get">
                <div class="row row-cols-1 row-cols-lg-2 mb-3">
                    <div class="col">
                        <label for="rooms" class="form-label">Rooms</label>
                        <input type="number" class="form-control" name="rooms" id="rooms" v-model="rooms"
                            :placeholder="(this.rooms !== null ? this.rooms : 'Rooms number')" />
                    </div>

                    <div class="col">
                        <label for="beds" class="form-label">Beds</label>
                        <input type="number" class="form-control" name="beds" id="beds" placeholder="Beds number"
                            :placeholder="this.beds" v-model="beds" />
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-12 col-xl-7">
                        <label for="location" class="form-label">Location</label>
                        <input type="text" class="form-control" name="location" id="location" :placeholder="this.location"
                            v-model="location" />
                    </div>


                    <div class="col-12 col-xl-5">
                        <label for="range" class="form-label">Range (km)</label>
                        <input type="number" class="form-control" name="range" id="range" :placeholder="this.range"
                            v-model="range" />
                    </div>
                </div>



                <div class="mb-2">Services</div>
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


                <button type="submit" class="btn primary fw-semibold btn-send" @click.prevent="searchApartment()">
                    Search
                </button>


            </form>
        </div>

        <!-- Results -->
        <div class="col-6 results position-relative">
            <div class="p-3">
                <h5>Search results</h5>
                <h6 v-show="loading == false">{{ results }} results</h6>
                <div v-show="validInput == true" class="row row-cols-1 row-cols-lg-2 row-cols-xl-3 g-3">
                    <div class="col" v-for=" apartment  in  apartments ">
                        <ApartmentCard :apartment="apartment"></ApartmentCard>
                    </div>
                </div>
                <div v-show="validInput == false">Invalid Input</div>
            </div>

            <div v-show="loading == true" class="loader text-white rounded-5 p-5">
                LOADING
            </div>
        </div>

        <!-- Map -->
        <div class="sidebar col-3">

            <div id="map" class="w-100 h-100"></div>

        </div>

    </div>
</template>


<style lang="scss" scoped>
.loading {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.sidebar,
.results {
    position: relative;
    top: 0;
    left: 0;
    height: calc(100vh - 110px);
    overflow: auto;
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

.btn-send {
    border: 2px solid #ffde59;

    &:hover {
        background-color: #ffde59;
    }
}

.loader{
    top: 100px;
    left: 50%;
    transform: translate(0, -50%);
    background-color: #ffde59;
}
</style>