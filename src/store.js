import { reactive } from 'vue';
import axios from 'axios'


export const state = reactive({

    fetchData() {
        axios.get('http://127.0.0.1:8000/api/apartments')
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }
})