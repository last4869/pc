<template>
  <div class="register center">
    <el-form ref="form" label-width="80px">
      <el-form-item label="用户名：">
        <el-input v-model="username" clearable placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码：">
        <el-input v-model="password" show-password clearable placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="性别：">
        <el-radio-group v-model="sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
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

export default class Register extends Vue {
  username: string = ''
  password: string = ''
  sex: string = '男'
  onSubmit () {
    console.log('submit!')
  }
}
</script>
<style lang="scss" scoped>
  .register {
    height: 100%;
    flex-direction: column;
  }
</style>
