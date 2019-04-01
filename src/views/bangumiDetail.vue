<template>
  <div class="bangumiDetail">
    <div class="bg" style="">
      <img src="../assets/img/test.webp"/>
      <div class="right">
        <ul>
          <li>关于我转生成为史莱姆的这件事</li>
           <li>
            <span>原名：</span>
            <span>転生したらスライムだった件</span>
          </li>
          <li>
            <span>开播时间：</span>
            <span>2018年10月</span>
          </li>
          <li>
            <span>状态：</span>
            <span>连载中, 周二更新</span>
          </li>
          <li>
            <span>剧情简介：</span>
            <span class="description">史莱姆生活，开始了。上班族的三上悟在道路上被歹徒给刺杀身亡后，回过神来发现自己转生到了异世界。不过，自己居然是“史莱姆”！他在得到利姆露这个名字后开始了自己的史莱姆人生，随着与各个种族相处交流的过程中，他定下了一个目标——那就是“建立一个任何种族都能愉快地一起生活的国家”！</span>
          </li>
          <li>
            <span>标签：</span>
            <el-tag type="info">标签</el-tag>
          </li>
        </ul>
        <div class="btn">
          <el-button type="primary">播放</el-button>
          <el-button type="primary">追番</el-button>
        </div>
      </div>
    </div>
    <div class="container">
      <!-- <article>主体</article>
      <aside>staff</aside> -->
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})

export default class Login extends Vue {
}
</script>
<style lang="scss" scoped>
  .bangumiDetail {
    padding-top: 20px;
    // box-sizing: border-box;
    .bg {
      display: flex;
      img{
        min-width: 230px;
        height: 300px;
        border: 5px solid #409dff;
        border-radius: 5px;
        margin-right: 15px;
      }
      ul {
        li {
          display: flex;
          margin: 15px 0;
          &:first-child {
            font-size: 25px;
            margin-top: 0;
          }
          .description {
            line-height: 25px;
          }
          span {
            display: inline-block;
            &:nth-of-type(1) {
              min-width: 90px;
            }
          }
        }
      }
      .right {
        position: relative;
        .btn {
          position: absolute;
          bottom: 0;
        }
      }
    }
    .container {
      margin-top: 20px;
      display: flex;
      article {
        flex: 7;
        background: #eee;
        margin-right: 20px;
        height: 700px;
      }
      aside {
        background: white;
        flex: 3;
        height: 700px;
      }
    }
  }
</style>
