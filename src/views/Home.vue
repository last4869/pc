<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="main horizontal">
          <div class="left">
            <ul class="center">
              <router-link to="/bangumi" tag="li">主页</router-link>
              <router-link to="newBangumi" tag="li">新番</router-link>
            </ul>
          </div>
          <div class="right">
            <ul class="center">
              <router-link to="login" tag="li">登陆</router-link>
              <router-link to="register" tag="li">注册</router-link>
            </ul>
          </div>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer class="center" height="auto">
        <ul>
          <li>制作人：last order</li>
          <li>如果有问题或者建议，请联系QQ：2495713984</li>
          <li>本站采用Vue、ts进行编写，会用到部分高级api可能导致不兼容，请升级浏览器、或者更换为谷歌浏览器、并且本站不支持ie浏览器。</li>
          <li>版权说明：本站所有内容，均属于版权方所有。</li>
          <li>特别说明：本站属于个人制作，不涉及任何盈利行为。</li>
          <li>2019年3月14日到至今</li>
        </ul>
      </el-footer>
    </el-container>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
  }
})
export default class Home extends Vue {
  created () {
    console.log(this.$route)
  }
}
</script>
<style>
  .el-container {
    width: 100%;
    height: 100%;
  }
  .el-header .main {
    height: 100%;
    justify-content: space-between;
    color: white;
  }
  .el-header, .el-main, .el-footer {
    padding: 0;
  }
  .el-main, .main {
    width: 1300px;
    color: black;
    margin: auto;
    border-left: 2px solid red;
    border-right: 2px solid red;
    box-sizing: border-box;
  }
  .el-main {
    overflow: inherit;
    /* min-height: 1000px; */
  }
</style>

<style lang="scss" scoped>
  .home {
    width: 100%;
    height: 100%;
  }
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
        // border: 2px solid red;
        &:hover {
          background: rgba(255, 255, 255, .5);
        }
      }
    }
  }
  .el-footer {
    color: white;
  }
  .el-footer {
    padding: 25px 0;
    background: #888;
    ul li {
      line-height: 30px;
    }
  }
</style>
