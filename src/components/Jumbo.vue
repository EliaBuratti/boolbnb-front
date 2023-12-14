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
            <h3 class="text-center fw-bold mb-4">Search your next <strong class="primary">holiday</strong></h3>

            <form method="get">
                <div class="d-md-flex gap-3 align-items-end">
                    <div>
                        <label for="location" class="form-label fw-semibold">Location</label>
                        <input type="text" class="form-control" name="location" id="location" placeholder="Where?"
                            v-model="location" required />
                    </div>
                    <div class="mb-3 mb-md-0">
                        <label for="beds" class="form-label">Beds</label>
                        <input type="number" class="form-control" name="beds" id="beds" v-model="beds"
                            placeholder="How many?" />
                    </div>
                    <div>
                        <router-link class="btn primary fw-semibold btn-send"
                            :to="{ path: '/search', query: { beds: (this.beds == null ? 1 : this.beds), location: (this.location == null ? 'Roma' : this.location) } }">Search</router-link>
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

.btn-send {
    border: 2px solid #ffde59;

    &:hover {
        background-color: #ffde59;
    }
}
</style>