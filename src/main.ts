import { createApp } from 'vue';
import App from './App.vue';

import '@/styles/reset.scss';
import '@/styles/common.scss';
import '@/assets/iconfont/iconfont.scss';
import '@/assets/fonts/font.scss';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import '@/styles/element-dark.scss';
import '@/styles/element.scss';

import 'virtual:svg-icons-register';

import ElementPlus from 'element-plus';
import * as Icons from '@element-plus/icons-vue';

import I18n from '@/languages/index';

import errorHandler from '@/utils/errorHandler';
import router from './routers';
import pinia from './stores';

const app = createApp(App);

app.config.errorHandler = errorHandler;
// 注册Icons component
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons]);
});

app.use(ElementPlus).use(router).use(I18n).use(pinia).mount('#app');
