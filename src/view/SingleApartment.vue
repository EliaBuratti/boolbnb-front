<script>
import axios from 'axios';
export default {
    name: 'SingleApartment',
    data() {
        return {
            loading: true,
            apartment: {},
            lat: '',
            lng: '',
            coordinates: [],
        }
    },
    methods: {
        fetchSingleApartment() {
            axios
                .get('http://127.0.0.1:8000/api/apartments/' + this.$route.params.slug)
                .then(response => {
                    this.apartment = response.data.result;
                    this.lat = this.apartment.latitude;
                    this.lng = this.apartment.longitude;
                    this.coordinates.push(this.lng, this.lat);
                    this.fetchMap();
                    this.loading = false;

                })
                .catch(error => {
                    console.error(error);
                })
        },

        fetchMap() {
            const map = tt.map({
                key: 'udRMY8mFZ7o4kiJOvK0ShT9DEn82wGyT',
                container: 'map',
                center: this.coordinates,
                zoom: 10
            })
            map.on('load', () => {
                new tt.Marker({color: '#ffde59'}).setLngLat(this.coordinates).addTo(map)
            })
        }

    },
    mounted() {
        this.fetchSingleApartment();
    }
}
</script>

<template>
    <div v-if="loading" class="vh-100 d-flex justify-content-center align-items-center">
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

    <div v-show="!loading">
        <div class="container">
            <h1 class="mt-3">{{ apartment.title }}</h1>

            <div class="row mb-4">
                <div class="col-md-8 col-12">
                    <img :src="'http://127.0.0.1:8000/storage/' + apartment.thumbnail" class="w-100 rounded-5">
                </div>
                <div class="col-md-4 col-12 mt-md-0 mt-3">
                    <div class="row row-cols-md-2 row-cols-4 g-3">
                        <div v-for="image in apartment.images">
                            <div class="img-container">

                                <img :src="'http://127.0.0.1:8000/storage/' + image.img" class="rounded-3">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mb-4">
                <h4 class="mb-3">Basic informations</h4>
                <div class="row row-cols-lg-4 row-cols-md-2 row-cols-sm-2 row-cols-1 g-md-0 g-3">
                    <div class="col d-flex justify-content-center">
                        <div class="fs-5 p-3 rounded-4 shadow-sm">
                            <i class="fa-solid fa-square primary"></i>
                            <span class="fw-medium ms-3 me-2">Rooms:</span>
                            <span>{{ apartment.rooms }}</span>
                        </div>
                    </div>
                    <div class="col d-flex justify-content-center">
                        <div class="fs-5 p-3 rounded-4 shadow-sm">
                            <i class="fa-solid fa-bed primary"></i>
                            <span class="fw-medium ms-3 me-2">Beds:</span>
                            <span>{{ apartment.beds }}</span>
                        </div>
                    </div>
                    <div class="col d-flex justify-content-center">
                        <div class="fs-5 p-3 rounded-4 shadow-sm">
                            <i class="fa-solid fa-bath primary"></i>
                            <span class="fw-medium ms-3 me-2">Bathrooms:</span>
                            <span>{{ apartment.bathrooms }}</span>
                        </div>
                    </div>
                    <div class="col d-flex justify-content-center">
                        <div class="fs-5 p-3 rounded-4 shadow-sm">
                            <i class="fa-solid fa-ruler-combined primary"></i>
                            <span class="fw-medium ms-3 me-2">Surface:</span>
                            <span>{{ apartment.m_square }} m<sup>2</sup></span>
                        </div>
                    </div>

                </div>
            </div>

            <div class="mb-4">
                <h4 class="mb-3">Description</h4>
                <p class="mb-4">{{ apartment.description }}</p>
            </div>


            <div class="mb-4">
                <h4 class="mb-3">Services</h4>
                <div class="d-flex gap-2 flex-wrap">
                    <div class="badge bg_primary text-dark" v-for="service in apartment.services">
                        {{ service.name }}
                    </div>
                </div>
            </div>

            <div class="row row-cols-1 row-cols-lg-2 align-items-center mb-4 g-5">
                <div class="col">
                    <div>
                        <h4>Position</h4>
                        <div id="map" class="rounded-5"></div>
                    </div>
                </div>
                <div class="col">
                    <div class="rounded-5 py-4 px-5 shadow bg-dark text-white">
                        <h3 class="text-center primary fw-semibold">Contact me</h3>
                        <form action="" method="post">

                            <div class="mb-3">
                                <label for="mail" class="form-label fw-medium">Mail</label>
                                <input type="email" class="form-control" name="mail" id="mail" placeholder="Type your mail"
                                    required />
                            </div>
                            <div class="mb-3">
                                <label for="messagge" class="form-label fw-medium">Message</label>
                                <textarea class="form-control" name="messagge" id="messagge" rows="3"
                                    placeholder="Type your messagge" required></textarea>
                            </div>

                            <div class="d-flex mt-3 justify-content-center">
                                <div>
                                    <button type="submit" class="btn primary fw-semibold btn-send">
                                        Send
                                    </button>
                                </div>
                            </div>

                        </form>

                    </div>

                </div>
            </div>




            <div class="mt-3">
                <h3>In evidenza</h3>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.img-container {
    width: 100%;
    aspect-ratio: 1;
}

img {
    object-fit: cover;
    width: 100%;
    height: 100%;
}

#map {
    height: 400px;
    width: 100%;
}

.btn-send {
    border: 2px solid #ffde59;

    &:hover {
        background-color: #ffde59;
    }
}
</style>