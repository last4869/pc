<template>
  <div class="register center">
    <el-form v-model="ruleForm" ref="ruleForm" :rules="rules" label-width="80px">
      <el-form-item label="用户名：">
        <el-input v-model="ruleForm.username" clearable placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码：">
        <el-input v-model="ruleForm.password" show-password clearable placeholder="请输入密码"></el-input>
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
import { MessageBox } from 'element-ui'

interface rules {
  username: string,
  password: string,
  sex: string
}
@Component({})
export default class Register extends Vue {
  ruleForm: rules = {
    username: '',
    password: '',
    sex: '男'
  }
  
  constructor () {
    super()
    const validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }
  }
  onSubmit () {
    console.log(this)
    // return
    this.$http('user/register', 'post', {
      username: this.ruleForm.username,
      password: this.ruleForm.password,
      sex: this.ruleForm.sex === '男' ? 0 : 1
    }).then((res: any) => {
      console.log(res)
      MessageBox('您的用户id是：' + res.data.uid, '注册成功')
    })
  }
}
</script>
<style lang="scss" scoped>
  .register {
    height: 100%;
    flex-direction: column;
  }
</style>
