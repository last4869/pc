<template>
  <div class="home">
    <el-header>
      <div class="main horizontal">
        <div class="left">
          <ul class="center">
            <router-link to="/bangumi" tag="li">主页</router-link>
            <router-link to="newBangumi" tag="li">新番</router-link>
          </ul>
        </div>
        <div class="right">
          <ul class="center" v-if="login">
            <router-link to="login" tag="li">登陆</router-link>
            <router-link to="register" tag="li">注册</router-link>
          </ul>
          <ul class="center" v-else>
            <router-link to="user" tag="li">
              <img src="" alt="">
            </router-link>
          </ul>
        </div>
      </div>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer class="center" height="100px">
      <ul>
        <li>关于本站</li>
        <li @click="feedback">意见反馈</li>
        <li>联系我们</li>
      </ul>
    </el-footer>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  components: {
  }
})
export default class Home extends Vue {
  login: Boolean = !false
  created () {
    console.log(this.$route)
  }
  feedback () {
    window.open(location.origin + '/feedback', '_blank')
  }
}
</script>
<style>
  .home {
    min-width: 1200px;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }
  .el-header .main {
    justify-content: space-between;
    color: white;
    flex: 0 0 auto;
  }
  .el-header, .el-main, .el-footer {
    padding: 0;
  }
  .el-main, .main {
    width: 1300px;
    color: black;
    margin: auto;
    box-sizing: border-box;
  }
  .el-footer {
    flex: 0 0 auto;
  }
  .el-main {
    flex: 1 0 auto;
    overflow: inherit;
    padding: 15px;
  }
  .el-footer {
    flex: 0 0 auto;
  }
</style>
<style lang="scss" scoped>
  .router-link-active {
    background: rgba(255, 255, 255, .5);
  }
  .el-header {
    height: 60px;
    background: #409EFF;
    div {
      height: 100%;
    }
    ul {
      height: 100%;
      li {
        width: 80px;
        height: 100%;
        line-height: 60px;
        cursor: pointer;
        &:hover {
          background: rgba(255, 255, 255, .5);
        }
      }
    }
  }
  .el-footer {
    background: #888;
    color: white;
    ul {
      display: flex;
      li {
        margin-right: 25px;
        font-size: 16px;
      }
    }
  }
</style>
