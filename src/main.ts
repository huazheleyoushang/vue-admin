import { createApp } from 'vue';
import App from './App.vue';

// reset style sheet
import '@/styles/reset.scss';
// CSS common style sheet
import '@/styles/common.scss';
// iconfont css
import '@/assets/iconfont/iconfont.scss';
// font css
import '@/assets/fonts/font.scss';
// element css
import 'element-plus/dist/index.css';
// element dark css
import 'element-plus/theme-chalk/dark/css-vars.css';
// custom element dark css
import '@/styles/element-dark.scss';
// custom element css
import '@/styles/element.scss';
// svg icons
import 'virtual:svg-icons-register';

import ElementPlus from 'element-plus';
import * as Icons from '@element-plus/icons-vue';

import errorHandler from '@/utils/errorHandler';
import router from './routers';
import pinia from './stores';

const app = createApp(App);

app.config.errorHandler = errorHandler;
// 注册Icons component
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons]);
});

app.use(ElementPlus).use(router).use(pinia).mount('#app');
