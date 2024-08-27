<script setup lang="ts">
import { ElConfigProvider } from 'element-plus';
import { computed, reactive } from 'vue';
import { useGlobalStore } from './stores/modules/global';

const globalStore = useGlobalStore();

const assemblySize = computed(() => {
  return globalStore.assemblySize;
});
const buttonConfig = reactive({ autoInsertSpace: false });
</script>

<template>
  <el-config-provider :size="assemblySize" :button="buttonConfig">
    <router-view></router-view>
  </el-config-provider>
</template>
