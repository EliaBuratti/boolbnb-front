<script>
import axios from 'axios';
export default {
    name: 'Jumbo',
    data() {
        return {
            apartments: [],
            location: '',
            guests: null
        }
    },
    methods: {
        searchApartment() {
            console.log(this.location, this.guests);
            axios.get('http://127.0.0.1:8000/api/apartments')
                .then(response => {
                    //console.log(response.data.result.data);
                    this.apartments = [];
                    console.log(this.apartments);

                    //this.apartments = response.data.result.data;

                    (response.data.result.data).forEach(apartment => {

                        if (apartment.beds >= this.guests) {
                            this.apartments.push(apartment);
                        }

                    });
                    //console.log(this.apartments);



                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
}
</script>

<template>
    <div class="jumbo py-5 d-flex justify-content-center">
        <div class="search-card p-5">
            <h3 class="text-center">Where do you want to go?</h3>
            <form action="" method="get">
                <div class="d-flex gap-3 align-items-end">
                    <div>
                        <label for="location" class="form-label">Location</label>
                        <input type="text" class="form-control" name="location" id="location" placeholder="Location"
                            v-model="location" />
                    </div>
                    <div>
                        <label for="guests" class="form-label">Guests</label>
                        <input type="number" class="form-control" name="guests" id="guests" placeholder="Guests"
                            v-model="guests" />
                    </div>
                    <div>
                        <button type="submit" class="btn btn-primary" @click.prevent="searchApartment()">Search</button>
                    </div>
                </div>

            </form>



        </div>
    </div>
</template>

<style lang="scss" scoped>
.jumbo {
    background-image: url(../assets/img/Low.jpg);
    background-position: center;
    background-size: cover;
}

.search-card {
    background: rgba(255, 255, 255, 0.24);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
}
</style>