<template>
  <div class="login center">
    <el-form ref="form" label-width="80px">
      <el-form-item label="用户名：">
        <el-input v-model="username" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码：">
        <el-input v-model="password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})

export default class Login extends Vue {
  username: string = ''
  password: string = ''
  onSubmit () {
    console.log('submit!')
  }
}
</script>
<style>
.login, .register {
  min-height: 650px;
}
</style>

<style lang="scss" scoped>
  .login {
    height: 100%;
  }
</style>
