<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      :columns="columns"
      :init-param="initParam"
      :data="data"
      @drag-sort="sortTable"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeader="scope">
        <el-button v-auth="'add'" type="primary" :icon="CirclePlus" @click="openDrawer('新增')"
          >新增用户</el-button
        >
        <el-button v-auth="'batchAdd'" type="primary" :icon="Upload" plain @click="batchAdd"
          >批量添加用户</el-button
        >
        <el-button v-auth="'export'" type="primary" :icon="Download" plain @click="downloadFile"
          >导出用户数据</el-button
        >
        <el-button type="primary" plain @click="toDetail">To 子集详情页面</el-button>
        <el-button
          type="danger"
          :icon="Delete"
          plain
          :disabled="!scope.isSelected"
          @click="batchDelete(scope.selectedListIds)"
        >
          批量删除用户
        </el-button>
      </template>
      <!-- Expand -->
      <template #expand="scope">
        {{ scope.row }}
      </template>
      <!-- usernameHeader -->
      <template #usernameHeader="scope">
        <el-button type="primary" @click="ElMessage.success('我是通过作用域插槽渲染的表头')">
          {{ scope.column.label }}
        </el-button>
      </template>
      <!-- createTime -->
      <template #createTime="scope">
        <el-button type="primary" link @click="ElMessage.success('我是通过作用域插槽渲染的内容')">
          {{ scope.row.createTime }}
        </el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)"
          >查看</el-button
        >
        <el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)"
          >编辑</el-button
        >
        <el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)"
          >删除</el-button
        >
      </template>
    </ProTable>
    <UserDrawer ref="drawerRef" />
  </div>
</template>

<script setup lang="tsx" name="useProTable">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { User } from '@/api/interface';
import { useAuthButtons } from '@/hooks/useAuthButtons';
import { ElMessage, ElMessageBox } from 'element-plus';
import UserDrawer from '@/views/proTable/components/UserDrawer.vue';
import ProTable from '@/components/ProTable/index.vue';
import { ProTableInstance, ColumnProps, HeaderRenderScope } from '@/components/ProTable/interface';
import {
  CirclePlus,
  Delete,
  EditPen,
  Download,
  Upload,
  View,
  Refresh,
} from '@element-plus/icons-vue';
const router = useRouter();

// 跳转详情页
const toDetail = () => {
  router.push(`/proTable/useProTable/detail/${Math.random().toFixed(3)}?params=detail-page`);
};

// ProTable 实例
const proTable = ref<ProTableInstance>();

// 如果表格需要初始化请求参数，直接定义传给 ProTable (之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({ type: 1 });

// dataCallback 是对于返回的表格数据做处理，如果你后台返回的数据不是 list && total 这些字段，可以在这里进行处理成这些字段
// 或者直接去 hooks/useTable.ts 文件中把字段改为你后端对应的就行
const dataCallback = (data: any) => {
  return {
    list: data,
    total: data.length,
  };
};

/**
 * FIXME: 静态数据
 */
const data = [
  {
    id: '479723602537421826',
    username: 'admin',
    gender: 2,
    user: {
      detail: {
        age: 19,
      },
    },
    idCard: '479723602537421826',
    email: 'huazheleyoushang@163.com',
    address: '上海市',
    createTime: '2024-05-07 20:22:14',
    status: 1,
    avatar: 'https://i.imgtg.com/2023/01/16/QRBHS.jpg',
  },
  {
    id: '203327681661213644',
    username: 'userA',
    gender: 1,
    user: {
      detail: {
        age: 22,
      },
    },
    idCard: '203327681661213644',
    email: 'user@163.com',
    address: '上海市',
    createTime: '2024-08-07 00:23:02',
    status: 1,
    avatar: 'https://i.imgtg.com/2023/01/16/QR57a.jpg',
  },
];

/**
 * 字典枚举
 */
const genderEnum = [
  {
    genderLabel: '男',
    genderValue: 1,
  },
  {
    genderLabel: '女',
    genderValue: 2,
  },
];

// 页面按钮权限（按钮权限既可以使用 hooks，也可以直接使用 v-auth 指令，指令适合直接绑定在按钮上，hooks 适合根据按钮权限显示不同的内容）
const { BUTTONS } = useAuthButtons();

// 自定义渲染表头（使用tsx语法）
const headerRender = (scope: HeaderRenderScope<User.ResUserList>) => {
  return (
    <el-button type="primary" onClick={() => ElMessage.success('我是通过 tsx 语法渲染的表头')}>
      {scope.column.label}
    </el-button>
  );
};

// 表格配置项
const columns = reactive<ColumnProps<User.ResUserList>[]>([
  { type: 'selection', fixed: 'left', width: 70 },
  // 拖拽排序
  { type: 'sort', label: 'Sort', width: 80 },
  { type: 'expand', label: 'Expand', width: 85 },
  {
    prop: 'username',
    label: '用户姓名',
    width: 120,
    search: { el: 'input', tooltip: '我是搜索提示' },
    render: (scope) => {
      return (
        <el-button
          type="primary"
          link
          onClick={() => ElMessage.success('我是通过 tsx 语法渲染的内容')}
        >
          {scope.row.username}
        </el-button>
      );
    },
  },
  {
    prop: 'gender',
    label: '性别',
    // 字典数据（本地数据）
    enum: genderEnum,
    // 字典请求不带参数
    // enum: getUserGender,
    // 字典请求携带参数
    // enum: () => getUserGender({ id: 1 }),
    search: { el: 'select', props: { filterable: true } },
    fieldNames: { label: 'genderLabel', value: 'genderValue' },
  },
  {
    // 多级 prop
    prop: 'user.detail.age',
    label: '年龄',
    search: {
      // 自定义 search 显示内容
      render: ({ searchParam }) => {
        return (
          <div class="flx-center">
            <el-input vModel_trim={searchParam.minAge} placeholder="最小年龄" />
            <span class="mr10 ml10">-</span>
            <el-input vModel_trim={searchParam.maxAge} placeholder="最大年龄" />
          </div>
        );
      },
    },
  },
  { prop: 'idCard', label: '身份证号', search: { el: 'input' } },
  { prop: 'email', label: '邮箱' },
  { prop: 'address', label: '居住地址' },
  {
    prop: 'status',
    label: '用户状态',
    search: { el: 'tree-select', props: { filterable: true } },
    fieldNames: { label: 'userLabel', value: 'userStatus' },
    render: (scope) => {
      return (
        <>
          {BUTTONS.value.status ? (
            <el-switch
              model-value={scope.row.status}
              active-text={scope.row.status ? '启用' : '禁用'}
              active-value={1}
              inactive-value={0}
              onClick={() => changeStatus(scope.row)}
            />
          ) : (
            <el-tag type={scope.row.status ? 'success' : 'danger'}>
              {scope.row.status ? '启用' : '禁用'}
            </el-tag>
          )}
        </>
      );
    },
  },
  {
    prop: 'createTime',
    label: '创建时间',
    headerRender,
    width: 180,
    search: {
      el: 'date-picker',
      span: 2,
      props: { type: 'datetimerange', valueFormat: 'YYYY-MM-DD HH:mm:ss' },
      defaultValue: ['2022-11-12 11:35:00', '2022-12-12 11:35:00'],
    },
  },
  { prop: 'operation', label: '操作', fixed: 'right', width: 240 },
]);

// 表格拖拽排序
const sortTable = ({ newIndex, oldIndex }: { newIndex?: number; oldIndex?: number }) => {
  console.log(newIndex, oldIndex);
  console.log(proTable.value?.tableData);
  ElMessage.success('修改列表排序成功');
};

// 删除用户信息
const deleteAccount = async (params: User.ResUserList) => {
  console.log({ id: params.id }, '删除所选用户信息');
};

// 批量删除用户信息
const batchDelete = async (id: string[]) => {
  console.log({ id }, '删除所选用户信息');
  proTable.value?.clearSelection();
};

// 切换用户状态
const changeStatus = async (row: User.ResUserList) => {
  console.log({ id: row.id, status: row.status }, '切换【${row.username}】用户状态');
};

// 导出用户列表
const downloadFile = async () => {
  ElMessageBox.confirm('确认导出用户数据?', '温馨提示', { type: 'warning' }).then(() => {});
};

// 批量添加用户
const batchAdd = () => {};

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof UserDrawer> | null>(null);
const openDrawer = (title: string, row: Partial<User.ResUserList> = {}) => {
  const params = {
    title,
    isView: title === '查看',
    row: { ...row },
    api: title,
  };
  drawerRef.value?.acceptParams(params);
};
</script>
