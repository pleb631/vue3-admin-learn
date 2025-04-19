import { createApp } from 'vue'

import App from './App.vue'
import "./styles/index.scss";
import router from "./router/index";

import "element-plus/dist/index.css";
import ElementPlus from "element-plus";
import { createPinia } from "pinia";
import "virtual:svg-icons-register";

import gloablComponent from "./components/index";



const app = createApp(App)
app.use(ElementPlus);
app.use(router);
app.use(createPinia());


app.use(gloablComponent);



app.mount('#app')
