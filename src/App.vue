<script setup lang="ts">
import { ElConfigProvider } from 'element-plus';
import { computed, onMounted, reactive } from 'vue';
import { useGlobalStore } from './stores/modules/global';
import { useI18n } from 'vue-i18n';
import { useTheme } from '@/hooks/useTheme';
import { getBrowserLang } from '@/utils';
import { LanguageType } from './stores/interface';
import en from 'element-plus/es/locale/lang/en';
import zhCn from 'element-plus/es/locale/lang/zh-cn';

const { initTheme } = useTheme();
initTheme();

const globalStore = useGlobalStore();

const assemblySize = computed(() => {
  return globalStore.assemblySize;
});

const buttonConfig = reactive({ autoInsertSpace: false });

const i18n = useI18n();
onMounted(() => {
  const language = globalStore.language ?? getBrowserLang();
  i18n.locale.value = language;
  globalStore.setGlobalState('language', language as LanguageType);
});

const locale = computed(() => {
  if (globalStore.language == 'zh') return zhCn;
  if (globalStore.language == 'en') return en;
  return getBrowserLang() == 'zh' ? zhCn : en;
});
</script>

<template>
  <el-config-provider :locale="locale" :size="assemblySize" :button="buttonConfig">
    <router-view></router-view>
  </el-config-provider>
</template>
