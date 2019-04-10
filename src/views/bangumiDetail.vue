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
            <el-tag>冒险</el-tag>
            <el-tag>穿越</el-tag>
          </li>
        </ul>
        <div class="btn">
          <el-button type="primary">播放</el-button>
          <el-button type="primary">追番</el-button>
        </div>
      </div>
    </div>
    <div class="container">
      <article>
        <h2>集数详情</h2>
         <el-row tag="ul" class="list">
          <el-col :span="2" tag="li" v-for="(item, index) in 24" :key="index">
            {{item}}
          </el-col>
        </el-row>
      </article>
      <aside>
        <div class="list">
          <h2>角色声优</h2>
          <ul class="staff">
            <li>利姆鲁·特恩佩斯特：冈咲美保</li>
            <li>大贤者：丰口惠美</li>
            <li>维鲁德拉·特恩佩斯特：前野智昭</li>
            <li>井沢静江：花守由美里</li>
            <li>岚牙：小林亲弘</li>
            <li>红丸：古川慎</li>
            <li>朱菜：千本木彩花</li>
            <li>紫苑：M・A・O</li>
            <li>苍影：江口拓也</li>
            <li>白老：大塚芳忠</li>
            <li>三上悟：寺岛拓笃</li>
            <li>希兹：花守由美里</li>
            <li>利古鲁德：山本兼平</li>
            <li>利古鲁：石谷春贵</li>
            <li>哥布塔：泊明日菜</li>
            <li>凯金：斧敦</li>
            <li>托蕾妮：田中理惠</li>
            <li>艾莲：熊田茜音</li>
            <li>卡巴尔：高梨谦吾</li>
            <li>米莉姆：日高里菜</li>
          </ul>
        </div>
        <div class="list">
          <h2>STAFF</h2>
          <ul class="staff">
            <li>原作：川上泰树、伏濑、みっつばー《关于我转生变成史莱姆这档事》（讲谈社《月刊少年天狼星》连载）</li>
            <li>监督：菊地康仁</li>
            <li>副监督：中山敦史</li>
            <li>系列构成：笔安一幸</li>
            <li>角色设计：江畑谅真</li>
            <li>怪物设计：岸田隆宏</li>
            <li>美术监督：佐藤步</li>
            <li>美术设定：藤濑智康、佐藤正浩</li>
            <li>色彩设计：齐藤麻记</li>
            <li>摄影监督：佐藤洋</li>
            <li>图形设计：生原雄次</li>
            <li>编辑：神宫司由美</li>
            <li>音响监督：明田川仁</li>
            <li>音乐：Elements Garden</li>
            <li>动画制作：8bit（8-bit）</li>
          </ul>
        </div>
      </aside>
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
    .bg {
      display: flex;
      img{
        min-width: 250px;
        height: 330px;
        border: 5px solid #409dff;
        border-radius: 5px;
        margin-right: 15px;
      }
      ul {
        li {
          display: flex;
          margin: 10px 0;
          font-size: 14px;
          &:first-child {
            font-size: 25px;
            margin-top: 0;
          }
          .description {
            line-height: 23px;
          }
          span {
            display: inline-block;
            &:nth-of-type(1) {
              min-width: 90px;
            }
          }
          .el-tag {
            margin-right: 15px;
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
  }
  .container {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    article {
      flex: 1;
      margin-right: 20px;
      .list {
        display: flex;
        flex-wrap: wrap;
        li {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 40px;
          background: #eee;
          margin: 15px 16.6px 10px 0;
          border-radius: 5px;
          &:nth-child(10n) {
            margin-right: 0;
          }
        }
      }
    }
    aside {
      .list {
        width: 250px;
        margin-bottom: 15px;
        li {
          margin: 5px 0;
          font-size: 14px;
          line-height: 25px;
        }
      }
    }
  }
</style>
