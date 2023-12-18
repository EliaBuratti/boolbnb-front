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
            collapse: true,
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
        },
        sidebarClick() {
            this.collapse = !this.collapse;
        }

    },
    mounted() {
        //console.log(this.loading);
        this.searchApartment()
    },
    components: { ApartmentCard }
}
</script>

<template>
    <div class="d-flex position-relative">

        <div class="loader-container text-white w-100 h-100" v-if="loading">
            <div class="loading d-flex justify-content-center align-items-center h-100">
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

        <div class="position-absolute sidebar-container col-lg-3 col-md-4 col-sm-6 col-8 h-100">

            <!-- Sidebar collapse -->
            <div class="sidebar-collapse bg-dark primary p-3 d-flex justify-content-center align-items-center ms-1"
                v-on:click="sidebarClick()" :class="collapse == false ? 'collapse-btn' : ''">
                <i class="fa-solid fa-filter"></i>
            </div>

            <!-- Sidebar -->
            <div class=" bg-light sidebar p-3 shadow" v-show="collapse == false">
                <h5>Filters</h5>

                <form action="#" method="get">
                    <div class="row row-cols-1 row-cols-lg-2 mb-3">
                        <div class="col">
                            <label for="rooms" class="form-label">Rooms</label>
                            <input type="number" min="1" max="25" class="form-control" name="rooms" id="rooms"
                                v-model="rooms" :placeholder="(this.rooms !== null ? this.rooms : 'Rooms number')" />
                        </div>

                        <div class="col">
                            <label for="beds" min="1" max="25" class="form-label">Beds</label>
                            <input type="number" class="form-control" name="beds" id="beds" placeholder="Beds number"
                                :placeholder="this.beds" v-model="beds" />
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-12 col-xl-7">
                            <label for="location" class="form-label">Location</label>
                            <input type="text" class="form-control" name="location" id="location"
                                :placeholder="this.location" v-model="location" />
                        </div>


                        <div class="col-12 col-xl-5">
                            <label for="range" class="form-label">Range (km)</label>
                            <input type="number" min="1" max="2000" class="form-control" name="range" id="range"
                                :placeholder="this.range" v-model="range" />
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


                    <button type="submit" class="btn primary fw-semibold btn-send" @click.prevent="searchApartment()"
                        :disabled="location.trim() === ''" v-on:click="sidebarClick()">
                        Search
                    </button>
                    <div class="text-danger" v-if="location.trim() === ''">
                        Choose location
                    </div>


                </form>
            </div>

        </div>

        <!-- Results -->
        <div class="col-6 results position-relative">
            <div class="p-3">
                <h5>Search results</h5>
                <h6 v-show="loading == false">{{ results }} results</h6>
                <div v-show="validInput == true" class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3">
                    <div class="col" v-for="  apartment   in   apartments  ">
                        <ApartmentCard :apartment="apartment"></ApartmentCard>
                    </div>
                </div>
                <div v-show="validInput == false">Invalid Input</div>
            </div>

        </div>

        <!-- Map -->
        <div class="col-6">

            <div id="map" class="w-100 h-100"></div>

        </div>

    </div>
</template>


<style lang="scss" scoped>
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

.loader-container {
    position: absolute;
    background-color: #000000bd;
    z-index: 100;
}

.sidebar {
    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
}

.sidebar-collapse {
    position: absolute;
    top: 50%;
    left: 0;
    z-index: 3;
    width: 2rem;
    height: 3rem;
    border-radius: 0.75rem;
    opacity: 66%;
    transition: 0.25s;
    transform: translate(0, -50%);

    &:hover {
        opacity: 100%;
    }
}

.collapse-btn {
    left: unset;
    right: 0;
    transform: translate(31%, -50%);
    opacity: 100%;
}

.sidebar-container {
    top: 0;
    left: 0;
}
</style>