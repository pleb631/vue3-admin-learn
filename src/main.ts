import { createApp } from 'vue'

import App from './App.vue'
import "./styles/index.scss";
import router from "./router/index";

import "element-plus/dist/index.css";
import ElementPlus from "element-plus";
import pinia from "./store";
import "virtual:svg-icons-register";

import gloablComponent from "./components/index";
import "./permisstion";


const app = createApp(App)
app.use(ElementPlus);
app.use(router);
app.use(pinia);


app.use(gloablComponent);



app.mount('#app')
