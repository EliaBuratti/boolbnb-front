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
        setTimeout(() => {
            console.log(this.coordinates);
            this.fetchMap();
        }, 1000);
    }
}
</script>

<template>
    <div class="container">
        <h1>{{ apartment.title }}</h1>
        <div class="row mb-3">
            <div class="col-8">
                <img :src="'http://127.0.0.1:8000/storage/' + apartment.thumbnail" class="rounded-5">
            </div>
            <div class="col-4">Other images</div>
        </div>

        <p>{{ apartment.description }}</p>

        <div class="mb-3">
            <h3>Services</h3>
            Services
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
#map{
    width: 50%;
    height: 300px;
}
</style>