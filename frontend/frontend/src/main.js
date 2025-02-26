import './assets/main.css'
import "primeicons/primeicons.css";
import { createApp, provide, h } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import VueApolloComponents from '@vue/apollo-components'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createHead } from '@unhead/vue'
import PrimeVue from 'primevue/config';
import FileUpload from 'primevue/fileupload';
import { ColorPicker } from 'primevue';
import Card from 'primevue/card';
import Tooltip from 'primevue/tooltip';
import ProgressBar from 'primevue/progressbar';
import Message from 'primevue/message';
import Badge from 'primevue/badge';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import Noir from './presets/Noir.js';
import 'flowbite';
const head = createHead()
// const primeVue = PrimeVue()
const app = createApp(
  {
    setup() {
      provide(DefaultApolloClient)
  },
    render: () => h(App),
  }
);

app.use(createPinia()).use(head).use(PrimeVue, {
  theme: {
    preset: Noir,
    options: {
        prefix: 'p',
        darkModeSelector: '.p-dark',
        cssLayer: false,
    }
}
})
   .component('FileUpload', FileUpload)
   .component('ProgressBar', ProgressBar)
   .component('Message', Message)
   .component('Badge', Badge)
   .component('Button', Button)
   .component('Toast', Toast)
   .component('ColorPicker', ColorPicker)
   .directive('tooltip', Tooltip)
   .component('Card', Card)
   .use(router).use(VueApolloComponents).mount("#app");
