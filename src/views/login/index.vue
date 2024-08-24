<template>
  <div class="login-container flex-center">
    <div class="login-box">
      <div class="login-left">
        <img src="@/assets/images/login_left.png" alt="login" class="login-left-img" />
      </div>
      <div class="login-form">
        <div class="login-logo">
          <img src="@/assets/images/logo.svg" alt="" class="login-icon" />
          <h3 class="logo-text">Vue-Admin</h3>
        </div>
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginForm from './components/LoginForm.vue';
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
