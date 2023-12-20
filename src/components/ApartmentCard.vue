<script>
export default {
    name: 'ApartmentCard',
    data() {
        return {
            baseURL: 'http://127.0.0.1:8000/storage',
        }
    },
    props: {
        'apartment': Object,
        'sponsored': Object
    }
}
</script>

<template>
    <router-link :to="{ name: 'apartment', params: { slug: apartment.slug } }">
        <div class="my_card shadow" :class="sponsored.includes(apartment.id) ? 'sponsored' : ''">
            <img class="image" :src="this.baseURL + '/' + apartment.thumbnail" alt="">
            <div class="my_card_content">
                <h6 class="fw-semibold text-dark">{{ apartment.title }}</h6>
            </div>
            <div class="sponsored_badge">
                Sponsored
            </div>
        </div>
    </router-link>
</template>
