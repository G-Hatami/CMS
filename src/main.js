// Plugins
import {registerPlugins} from '@/plugins'

// Components

import App from "./App.vue"

// Composables
import {createApp} from 'vue'
import router from "@/router";
import i18n from "./i18n";


const app = createApp(App)

app.use(router)
app.use(i18n)

registerPlugins(app)
app.mount('#app')
