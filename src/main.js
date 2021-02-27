import {createApp} from 'vue';
import MasterComponent from './MasterComponent.vue';

import router from './router';

import mixins from './mixin';

import swal from 'sweetalert';

import Toaster from '@meforma/vue-toaster';


const app = createApp(MasterComponent, {
    // root instance definition
});

app.use(Toaster, {
    position: "top",
    duration: 4000,
    clickClose: true,
});



app.use(router);
app.mixin(mixins);
app.mount("#app");



