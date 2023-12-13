<script>
import axios from 'axios';
export default {
    name: 'SingleApartment',
    data() {
        return {
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
                new tt.Marker().setLngLat(this.coordinates).addTo(map)
            })
        }

    },
    mounted() {
        this.fetchSingleApartment();
    }
}
</script>

<template>
    <div class="container">
        <h1>{{ apartment.title }}</h1>
        <div class="row mb-3">
            <div class="col-8">
                <img :src="'http://127.0.0.1:8000/storage/' + apartment.thumbnail" class="w-100 rounded-5">
            </div>
            <div class="col-4">
                <div class="row">
                    <div v-for="image in apartment.images" class="col-6">
                        <img :src="'http://127.0.0.1:8000/storage/' + image.img" class="w-100 rounded-3">
                    </div>
                </div>
            </div>
        </div>

        <p>{{ apartment.description }}</p>

        <div class="mb-3">
            <h3>Basic information</h3>
            <div class="row row-cols-md-4">
                <div class="col">
                    <h6>Number of rooms</h6>
                    {{ apartment.rooms }}
                </div>
                <div class="col">
                    <h6>Number of beds</h6>
                    {{ apartment.beds }}
                </div>
                <div class="col">
                    <h6>Number of bathrooms</h6>
                    {{ apartment.bathrooms }}
                </div>
                <div class="col">
                    <h6>Surface in square meters</h6>
                    {{ apartment.m_square }}
                </div>

            </div>
        </div>

        <div class="mb-3">
            <h3>Services</h3>
            <div class="d-flex gap-2">
                <div class="badge bg-primary" v-for="service in apartment.services">
                    {{ service.name }}
                </div>
            </div>
        </div>

        <div class="mb-5">
            <h3>Position</h3>
            <div id="map"></div>
        </div>

        <div class="px-5">
            <div class="border rounded-5 py-4 px-5 shadow">
                <h3 class="text-center">Send a message</h3>
                <form action="" method="post">
                    <div class="row">
                        <div class="col-4">
                            <label for="mail" class="form-label">Mail</label>
                            <input type="email" class="form-control" name="mail" id="mail" placeholder="Type your mail"
                                required />
                        </div>
                        <div class="col-8">
                            <label for="messagge" class="form-label">Message</label>
                            <textarea class="form-control" name="messagge" id="messagge" rows="3"
                                placeholder="Type your messagge" required></textarea>
                        </div>
                    </div>

                    <div class="d-flex mt-3 justify-content-center">
                        <div>
                            <button type="submit" class="btn btn-primary">
                                Send
                            </button>
                        </div>
                    </div>

                </form>

            </div>
        </div>

        <div class="mt-3">
            <h3>In evidenza</h3>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#map {
    width: 50%;
    height: 300px;
}
</style>