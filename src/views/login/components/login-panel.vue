<template>
  <div class="login-panel">
    <div class="login-panel-content">
      <div class="title">后台管理系统</div>
      <el-tabs type="border-card" stretch v-model="currentTab">
        <el-tab-pane name="account">
          <template #label>
            <!-- <span>
              <el-icon><user /></el-icon> 账号登录
            </span> -->
            <span><i class="el-icon-user-solid"></i> 账号登录</span>
          </template>
          <login-account ref="accountRef" />
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <!-- <span>
              <el-icon><iphone /></el-icon>手机登录
            </span> -->
            <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
          </template>
          <login-phone ref="phoneRef" />
        </el-tab-pane>
      </el-tabs>

      <div class="account-control">
        <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
        <el-link type="primary">忘记密码</el-link>
      </div>

      <el-button type="primary" class="login-btn" @click="handleLoginClick">
        立即登录
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
// import { Iphone, User } from '@element-plus/icons-vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    // Iphone,
    // User,
    LoginAccount,
    LoginPhone
  },
  setup() {
    const currentTab = ref('account')
    const isKeepPassword = ref(true)
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()

    const handleLoginClick = () => {
      console.log(accountRef.value)
      accountRef.value?.loginAction(isKeepPassword.value)
    }

    return {
      currentTab,
      isKeepPassword,
      handleLoginClick,
      accountRef,
      phoneRef
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  width: 350px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 3px;
  // box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 12%), 0 0 6px 0 rgb(0 0 0 / 4%);

  .login-panel-content {
    width: 320px;
    .title {
      text-align: center;
      height: 20px;
      line-height: 20px;
      font-weight: bold;
      font-size: 30px;
      margin-bottom: 20px;
    }

    .account-control {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
    }

    .login-btn {
      width: 100%;
      margin-top: 10px;
    }
  }
}
</style>
