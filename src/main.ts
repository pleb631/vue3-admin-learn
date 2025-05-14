import { createApp } from "vue";

import App from "./App.vue";
import "element-plus/dist/index.css";
import ElementPlus from "element-plus";
import pinia from "./store";
import "virtual:svg-icons-register";
import "./styles/index.scss";
import "element-plus/theme-chalk/dark/css-vars.css";
import router from "./router/index";
import gloablComponent from "./components/index";
import "./permisstion";

const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.use(pinia);

app.use(gloablComponent);

app.mount("#app");
