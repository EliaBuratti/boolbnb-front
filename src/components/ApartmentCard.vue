<template>
    <div class="my_card">
        <img class="image" :src="this.baseURL + '/' + apartment.thumbnail" alt="">
        <div class="my_card_content">
            <span class="my_card_title">
                <h3>{{ apartment.title }}</h3>
            </span>
            <span class="my_card_subtitle">
                <h5>{{ apartment.city }}</h5>
            </span>
            <!--                 <p class="my_card_description">{{ apartment.description }}</p>
 -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'ApartmentCard',
    data() {
        return {
            baseURL: 'http://127.0.0.1:8000/storage',

        }
    },
    props: {
        'apartment': Object
    },
}
</script>

<style lang="scss">
.my_card {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    color: #2e2d31;
    background: #131313;
    overflow: hidden;
    border-radius: 20px;

    .image {
        height: 100%;
        aspect-ratio: 1;
    }
}

.temporary_text {
    font-weight: bold;
    font-size: 24px;
    padding: 6px 12px;
    color: #f8f8f8;
}

.my_card_title {
    font-weight: bold;
}

.my_card_content {
    position: absolute;
    left: 0;
    bottom: 0;
    /* edit the width to fit my_card */
    width: 100%;
    padding: 20px;
    padding-right: 2rem;
    background: #f2f2f2;
    border-top-left-radius: 20px;
    /* edit here to change the height of the content box */
    transform: translateY(100%);
    transition: transform .25s;
}

.my_card_content::before {
    content: '';
    position: absolute;
    top: -47px;
    right: -45px;
    width: 100px;
    height: 100px;
    transform: rotate(-175deg);
    border-radius: 50%;
    box-shadow: inset 48px 48px #f2f2f2;
}

.my_card_title {
    color: #131313;
    line-height: 15px;
}

.my_card_subtitle {
    display: block;
    font-size: 12px;
    margin-bottom: 10px;
}

.my_card_description {
    font-size: 14px;
    opacity: 0;
    transition: opacity .5s;
}

.my_card:hover .my_card_content {
    transform: translateY(0);
}

.my_card:hover .my_card_description {
    opacity: 1;
    transition-delay: .25s;
}
</style>