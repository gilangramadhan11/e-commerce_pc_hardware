import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'boxicons/css/boxicons.min.css'
import router from './router'
import VueApexCharts from 'vue3-apexcharts'

const app = createApp(App)

app.use(router)

// Register ApexCharts secara global
app.component('apexchart', VueApexCharts)

app.mount('#app')