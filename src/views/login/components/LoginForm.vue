<template>
  <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
    <el-form-item prop="username">
      <el-input v-model="loginForm.username" placeholder="用户名：admin / user">
        <template #prefix>
          <el-icon class="el-input__icon">
            <user />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="loginForm.password"
        type="password"
        placeholder="密码：123456"
        show-password
        autocomplete="new-password"
      >
        <template #prefix>
          <el-icon class="el-input__icon">
            <lock />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
  </el-form>
  <div class="login-btn">
    <el-button
      :icon="UserFilled"
      size="large"
      type="primary"
      :loading="loading"
      @click="login(loginFormRef)"
    >
      登录
    </el-button>
  </div>
</template>

<script setup lang="ts" name="LoginForm">
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { ElNotification, type ElForm } from 'element-plus';
import { UserFilled } from '@element-plus/icons-vue';

import { Login } from '@/api/interface';
import { HOME_URL } from '@/config';
import { useRouter } from 'vue-router';
import { getTimeState } from '@/utils';
import { initDynamicRouter } from '@/routers/modules/dynamicRouter';
import { useUserStore } from '@/stores/modules/user';

type FormInstance = InstanceType<typeof ElForm>;
const loginFormRef = ref<FormInstance>();
const loginRules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});

const router = useRouter();
const userStore = useUserStore();

const loading = ref(false);
const loginForm = reactive<Login.ReqLoginForm>({
  username: 'admin',
  password: '123456',
});

const login = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (!valid) return;
    loading.value = true;
    try {
      /**
       * 1 登录接口 api
       * 2 设置token
       */
      userStore.setToken('dixlwiojxo2ozxncionzhuxp');

      // await initDynamicRouter();

      router.push(HOME_URL);
      ElNotification({
        title: getTimeState(),
        message: '欢迎登录 Vue-Admin',
        type: 'success',
        duration: 3000,
      });
    } finally {
      loading.value = false;
    }
  });
};

onMounted(() => {
  // 监听 enter 事件（调用登录）
  document.onkeydown = (e: KeyboardEvent) => {
    if (e.code === 'Enter' || e.code === 'enter' || e.code === 'NumpadEnter') {
      if (loading.value) return;
      login(loginFormRef.value);
    }
  };
});

onBeforeUnmount(() => {
  document.onkeydown = null;
});
</script>

<style scoped lang="scss">
@import '../index';
</style>
