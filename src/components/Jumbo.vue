<script>
import { state } from "../store";
export default {
    name: 'Jumbo',
    data() {
        return {
            state,
            location: '',
            beds: null
        }
    },
    methods: {

    },

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
                            v-model="location" required/>
                    </div>
                    <div>
                        <label for="beds" class="form-label">Beds</label>
                        <input type="number" class="form-control" name="beds" id="beds" v-model="beds"
                            placeholder="Beds" />
                    </div>
                    <div>
                        <!-- <button type="submit" class="btn btn-primary" @click.prevent="searchApartment()">Search</button> -->
                        <!-- <button type="submit" class="btn btn-primary" @click.prevent="advanceSearch()">Search</button> -->
                        <!--                         <router-link to='/search' query: { beds: this.beds, city: this.city } })></router-link>
 -->
                        <router-link class="btn btn-primary"
                            :to="{ path: '/search', query: { beds: (this.beds == null ? 1 : this.beds), location: (this.location == '' ? 'Roma' : this.location) } }">Search</router-link>


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