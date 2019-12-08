<template>
  <div class="register center">
    <el-form v-model="ruleForm" ref="ruleForm" :rules="rules" label-width="80px">
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="ruleForm.username" clearable placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model="ruleForm.password" show-password clearable placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="性别：">
        <el-radio-group v-model="ruleForm.sex">
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

interface ruleForm {
  username: string,
  password: string,
  sex: string
}
interface rules {
  username: {
    validator: Function,
    trigger: string
  },
  password: {
    validator: Function,
    trigger: string
  }
}
var validateUsername: Function,
  validatePassword: Function

@Component({})
export default class Register extends Vue {
  ruleForm: ruleForm = {
    username: '',
    password: '',
    sex: '男'
  }
  rules: rules = {
    username: {
      validator: validateUsername,
      trigger: 'blur'
    },
    password: {
      validator: validatePassword,
      trigger: 'blur'
    }
  }
  constructor () {
    super()
    validateUsername = (rule: string, value: string, callback: Function) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.username !== '') {
          this.$refs.ruleForm.validateField('username')
        }
        callback()
      }
    }
    validatePassword = (rule: string, value: string, callback: Function) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.password !== '') {
          this.$refs.ruleForm.validateField('password')
        }
        callback()
      }
    }
  }
  created () {
    console.log(this)
  }
  onSubmit () {
    console.log(this)
    return
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
