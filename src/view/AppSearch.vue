<script>
import ApartmentCard from '../components/ApartmentCard.vue';
import { state } from '../store';
import axios from 'axios';

export default {
    name: 'AppSearch',
    data() {
        return {
            state,
            loading: true,
            validInput: true,
            results: null,
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
            sponsored: [],
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

                    // IF invalid input
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
                        this.sponsored = response.data.sponsored;
                        this.coordinatesCenter = response.data.coordinates;

                        //IF results == 0 > set the box viewer of the map with coordinates of the location searched
                        if (this.apartments.length == 0) {
                            this.lngMin = this.coordinatesCenter[0];
                            this.lngMax = this.coordinatesCenter[0];

                            this.latMin = this.coordinatesCenter[1];
                            this.latMax = this.coordinatesCenter[1];
                        } else {
                            // Set the box viewer of the map with the max/min value of lng/lat
                            // Push all longitudes of apartments
                            this.apartments.forEach(apartment => {
                                lngAll.push(apartment.longitude);
                            });
                            // Push also the longitude of the location searched
                            lngAll.push(this.coordinatesCenter[0]);

                            // Find the max and min longitude value
                            this.lngMin = Math.min.apply(Math, lngAll);
                            this.lngMax = Math.max.apply(Math, lngAll);

                            // Push all latitudes of apartments
                            this.apartments.forEach(apartment => {
                                latAll.push(apartment.latitude);
                            });
                            // Push also the latitude of the location searched
                            latAll.push(this.coordinatesCenter[1])

                            // Find the max and min latitude value
                            this.latMin = Math.min.apply(Math, latAll);
                            this.latMax = Math.max.apply(Math, latAll);
                        }

                        // Number of results
                        this.results = this.apartments.length;

                        this.fetchMap();
                    }

                    this.loading = false;

                })
                .catch(error => {
                    console.log(error);
                })
        },

        hoverMarker(apartment) {
            let markerEl = document.getElementById(apartment);
            console.log(markerEl);
            let svgEl = markerEl.firstElementChild;
            markerEl.style.height = '52px';
            markerEl.style.transition = '0.5s';
            svgEl.style.transform = 'scale(1.5)';
            svgEl.style.transition = '0.5s';
            svgEl.style.fill = '#ffde59';
        },

        hoverRemove(apartment) {
            let markerEl = document.getElementById(apartment);
            let svgEl = markerEl.firstElementChild;
            svgEl.style.transform = 'scale(1)';
            svgEl.style.fill = 'black';
            markerEl.style.height = '36px';
            markerEl.style.transition = 'none';
        },

        fetchMap() {

            document.getElementById('map').innerHTML = ' ';

            // Set the 4 corners of the map viewbox
            let sw = new tt.LngLat(this.lngMin, this.latMax);
            let ne = new tt.LngLat(this.lngMax, this.latMin);
            let llb = new tt.LngLatBounds(sw, ne);

            const map = tt.map({
                key: 'udRMY8mFZ7o4kiJOvK0ShT9DEn82wGyT',
                container: 'map',
                center: this.coordinatesCenter,
                zoom: 9
            })

            // Apply the viewbox
            map.fitBounds(llb, {
                padding: { top: 30, bottom: 10, left: 20, right: 20 },
                maxZoom: 9
            });

            // Add markers
            map.on('load', () => {
                this.apartments.forEach(apartment => {
                    const apartmentCoordinates = [apartment.longitude, apartment.latitude];
                    const marker = new tt.Marker().setLngLat(apartmentCoordinates).addTo(map);
                    marker._element.classList.add('marker');
                    marker._element.id = `apartment-${apartment.id}`;
                    console.log(marker._element);
                });

                // Add marker of the location searched
                new tt.Marker({ color: '#0073ff', scale: 0.75 }).setLngLat(this.coordinatesCenter).addTo(map);
            })
        },

        // To collapse the sidebar
        sidebarClick() {
            this.collapse = !this.collapse;
        }

    },
    mounted() {
        this.searchApartment();
        state.fetchServices();
    },
    components: { ApartmentCard }
}
</script>

<template>
    <div class="d-flex position-relative">

        <!-- Loader -->
        <div class="loader-container w-100 h-100" v-if="loading">
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

        <!-- Sidebar Container -->
        <div class="position-absolute sidebar-container col-lg-3 col-md-4 col-sm-6 col-8 h-100">

            <!-- Sidebar collapse -->
            <div class="sidebar-collapse bg-dark primary p-3 d-flex justify-content-center align-items-center ms-1"
                v-on:click="sidebarClick()" :class="collapse == false ? 'collapse-btn' : ''">
                <i class="fa-solid fa-filter"></i>
            </div>

            <!-- Sidebar open -->
            <div class=" bg-light sidebar p-3 shadow" v-show="collapse == false">
                <h5>Filters</h5>

                <!-- Form -->
                <form action="#" method="get">

                    <!-- Rooms + beds -->
                    <div class="row row-cols-1 row-cols-lg-2 mb-3">
                        <div class="col">
                            <label for="rooms" class="form-label">Rooms</label>
                            <input type="number" min="1" max="25" class="form-control" name="rooms" id="rooms"
                                v-model="rooms" :placeholder="(this.rooms !== null ? this.rooms : 'Rooms number')" />
                        </div>

                        <div class="col">
                            <label for="beds" class="form-label">Beds</label>
                            <input type="number" min="1" max="25" class="form-control" name="beds" id="beds"
                                placeholder="Beds number" :placeholder="this.beds" v-model="beds" />

                        </div>
                    </div>

                    <!-- Location + range -->
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

                    <!-- Services -->
                    <div class="mb-2">Services</div>
                    <div class="form-check mb-3">

                        <div v-for="service in state.services">
                            <input class="form-check-input" type="checkbox" :value="service.slug" :id="service.slug"
                                v-model="queryServices" />
                            <label class="form-check-label" :for="service.slug"> {{ service.name }} </label>
                        </div>
                    </div>

                    <!-- Send btn -->
                    <button type="submit" class="btn primary btn-send" @click.prevent="searchApartment()"
                        :disabled="location.trim() === ''" v-on:click="sidebarClick()">
                        Search
                    </button>
                    <div class="text-danger" v-if="location.trim() === ''">
                        Choose location
                    </div>

                </form>
            </div>

        </div>

        <!-- Results container -->
        <div class="col-6 results position-relative">

            <div class="p-3">
                <h5>Search results</h5>

                <!-- Number results -->
                <h6 v-show="loading == false">{{ results }} results</h6>

                <!-- Show invalid input -->
                <div v-show="validInput == false">Invalid Input</div>

                <!-- Results -->
                <div v-show="validInput == true" class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3">
                    <div class="col" v-for="  apartment   in   apartments  "
                        @mouseenter="hoverMarker(`apartment-${apartment.id}`)"
                        @mouseleave="hoverRemove(`apartment-${apartment.id}`)">
                        <ApartmentCard :apartment="apartment" :sponsored="this.sponsored"></ApartmentCard>
                    </div>
                </div>
            </div>
        </div>

        <!-- Map -->
        <div class="col-6">
            <div id="map" class="w-100 h-100"></div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.loader-container{
    position: absolute;
}
</style>