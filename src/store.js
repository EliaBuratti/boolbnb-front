import { reactive } from 'vue';
import axios from 'axios'


export const state = reactive({

    apartments: [],
    services: [],
    loading: true,
    sponsered: [],

    fetchData() {
        axios.get('http://127.0.0.1:8000/api/apartments-home')
            .then(response => {
                //console.log(response);
                this.apartments = response.data.result;
                this.sponsored = response.data.sponsored;
                this.loading = false;
                console.log(this.apartments);
            })
            .catch(error => {
                console.log(error);
            })
    },
    fetchServices() {
        axios.get('http://127.0.0.1:8000/api/services')
            .then(response => {
                //console.log(response.data.result.data);
                this.services = response.data.result.data;
            })
            .catch(error => {
                console.log(error);
            })
    }
})