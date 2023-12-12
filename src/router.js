import { createWebHashHistory, createRouter } from "vue-router";

import AppHome from './view/AppHome.vue';
import AppSearch from './view/AppSearch.vue';

const routes = [
    { path: '/', name: 'Home', component: AppHome },
    { path: '/search', name: 'Search', component: AppSearch },
    //{ path: '/Projects/:slug', name: 'Single-Project', component: SingleProject },
    //{ path: '/:pathMatch(.*)*', name: 'NotFound', component: App404 },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});


export { router };