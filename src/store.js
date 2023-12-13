import { reactive } from 'vue';
import axios from 'axios'


export const state = reactive({

    apartments: [],
    loading: true,

    fetchData() {
        axios.get('http://127.0.0.1:8000/api/apartments-home')
            .then(response => {
                console.log(response);
                this.apartments = response.data.result;
                //console.log(this.apartments);
                this.loading = false;
            })
            .catch(error => {
                console.log(error);
            })
    }
})