<template>
  <div class="card content-box">
    <span class="text">【ProTable】 详情页</span>
    <span class="text">params:{{ route.params }}</span>
    <span class="text">query:{{ route.query }}</span>
  </div>
</template>

<script setup lang="ts" name="useProTableDetail">
import { useRoute } from 'vue-router';
const route = useRoute();
</script>
