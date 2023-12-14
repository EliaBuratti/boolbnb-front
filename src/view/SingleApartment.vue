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
            imagesCarousel: [],
            carouselPoint: 0,
            apartmentID: null,
            contactName: null,
            contactMail: null,
            mailSubject: null,
            mailBody: null
        }
    },
    methods: {
        fetchSingleApartment() {
            axios
                .get('http://127.0.0.1:8000/api/apartments/' + this.$route.params.slug)
                .then(response => {
                    this.imagesCarousel.push(response.data.result.thumbnail);
                    response.data.result.images.forEach(image => {
                        this.imagesCarousel.push(image.img);
                    });
                    //console.log(this.imagesCarousel);
                    this.apartment = response.data.result;
                    this.lat = this.apartment.latitude;
                    this.lng = this.apartment.longitude;
                    this.coordinates.push(this.lng, this.lat);
                    this.fetchMap();
                    this.loading = false;
                    this.apartmentID = apartment.id;
                    this.mailSubject = `information about ${apartment.title}`

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
                new tt.Marker({ color: '#ffde59' }).setLngLat(this.coordinates).addTo(map)
            })
        },
        carouselNext() {
            //console.log(this.imagesCarousel);
            if (this.carouselPoint < (this.imagesCarousel.length - 1)) {
                //console.log(this.imagesCarousel.length - 1);
                //console.log(this.carouselPoint);
                this.carouselPoint++;
                //console.log(this.carouselPoint);
            } else {
                this.carouselPoint = 0;
                //console.log(this.carouselPoint);
            }
        },
        carouselPrev() {
            if (this.carouselPoint > 0) {
                this.carouselPoint--;
            } else {
                this.carouselPoint = (this.imagesCarousel.length - 1)
            }
        },
        carouselShow() {
            const carousel = document.getElementById('carousel');
            carousel.style.display = "block"
        },
        carouselClose() {
            const carousel = document.getElementById('carousel');
            carousel.style.display = "none"
        },
        sendMessages() {
            axios({
                method: 'post',
                url: '',
                params: {
                    apartment_id: this.apartmentID,
                    name: this.contactName,
                    mail: this.contactMail,
                    subject: this.mailSubject,
                    body: this.mailBody
                },
            })
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                })
        }

    },
    mounted() {
        this.fetchSingleApartment();
    }
}
</script>

<template>
    <main>
        <div id="carousel">

            <div class="carousel-content h-100 w-100 d-flex justify-content-center align-items-center">
                <div class="close" @click="carouselClose()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor"
                        class="bi bi-x-square-fill" viewBox="0 0 16 16">
                        <path
                            d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
                    </svg>
                </div>
                <div class="container h-75">
                    <div class="row justify-content-center">
                        <div class="col-1 d-flex justify-content-center align-items-center">
                            <div class="prev" @click="carouselPrev()">
                                <svg xmlns="http://www.w3.org/1000/svg" width="35" height="35" fill="#ffde59"
                                    class="bi bi-arrow-left-square-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1" />
                                </svg>
                            </div>
                        </div>
                        <div class="col-10">
                            <img class="carousel_img img-fluid"
                                :src="'http://127.0.0.1:8000/storage/' + this.imagesCarousel[carouselPoint]" alt="">


                        </div>
                        <div class="col-1 d-flex justify-content-center align-items-center">
                            <div class="next" @click="carouselNext()">
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#ffde59"
                                    class="bi bi-arrow-right-square-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

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
                        <img @click="carouselShow()" :src="'http://127.0.0.1:8000/storage/' + apartment.thumbnail"
                            class="w-100 rounded-5">
                    </div>
                    <div class="col-md-4 col-12 mt-md-0 mt-3">
                        <div class="row row-cols-md-2 row-cols-4 g-3">
                            <div v-for="image in apartment.images">
                                <div class="img-container">

                                    <img @click="carouselShow()" :src="'http://127.0.0.1:8000/storage/' + image.img"
                                        class="rounded-3">
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
                                    <label for="name" class="form-label">Name</label>
                                    <input type="text" class="form-control" name="name" id="name" placeholder="name"
                                        v-model="this.contactName" />
                                </div>
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email</label>
                                    <input type="email" class="form-control" name="email" id="email"
                                        placeholder="insert your mail" v-model="contactMail" />

                                </div>


                                <div class="mb-3">
                                    <label for="messagge" class="form-label fw-medium">Message</label>
                                    <textarea class="form-control" name="messagge" id="messagge" rows="3"
                                        placeholder="Type your messagge" required v-model="this.mailBody"></textarea>
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
    </main>
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

#carousel {
    display: none;

    & .close {
        position: absolute;
        top: 4rem;
        right: 4rem;
    }

    & .carousel-content {
        background: #0000006b;
        z-index: 2;
        position: fixed;

        & .carousel_img {
            max-height: 80%;
            object-fit: contain;
        }
    }
}
</style>