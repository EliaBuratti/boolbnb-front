import { createWebHashHistory, createRouter } from "vue-router";

import AppHome from './view/AppHome.vue';
import AppSearch from './view/AppSearch.vue';
import SingleApartment from './view/SingleApartment.vue'

const routes = [
    { path: '/', name: 'Home', component: AppHome },
    { path: '/search', name: 'Search', component: AppSearch },
    { path: '/apartemnts/:slug', name: 'apartment', component: SingleApartment },
    //{ path: '/:pathMatch(.*)*', name: 'NotFound', component: App404 },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});


export { router };