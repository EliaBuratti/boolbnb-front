<script>
export default {
    name: 'Jumbo',
    data() {
        return {
            location: '',
            beds: null
        }
    }
}
</script>

<template>
    <div class="jumbo p-5 d-flex justify-content-center">

        <!-- Card -->
        <div class="search-card p-4">
            <h3 class="text-center fw-bold mb-3">Search your next <strong class="primary">holiday</strong></h3>

            <!-- Form -->
            <form method="get">
                <div class="d-md-flex gap-3 align-items-end">
                    <div class="mb-3 mb-md-0">
                        <label for="location" class="form-label fw-semibold">Location</label>
                        <input type="text" class="form-control" name="location" id="location" placeholder="Where?"
                            v-model="location" required />
                    </div>
                    <div class="mb-3 mb-md-0">
                        <label for="beds" class="form-label fw-semibold">Beds</label>
                        <input type="number" class="form-control" name="beds" id="beds" v-model="beds"
                            placeholder="How many?" />
                    </div>
                    <div>
                        <router-link class="btn primary btn-send"
                            :to="{ path: '/search', query: { beds: (this.beds == null ? 1 : this.beds), location: (this.location == '' ? 'Roma' : this.location) } }">Search</router-link>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>