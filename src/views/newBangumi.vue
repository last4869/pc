<template>
  <div class="newBangumi">
    <el-tabs v-model="activeName">
      <el-tab-pane v-for="(item, index) in date" :key="index" :label="'周' + item" :name="item">
        <ul>
          <li v-for="(item, index) in 20" :key="index">
            <img src="../assets/img/test.webp" alt="">
            <div>
              <span>转生成为史莱姆的这件事</span>
              <span>17:00</span>
            </div>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Login extends Vue {
  activeName: string = '一'
  date: Array<string> = ['一', '二', '三', '四', '五', '六', '日']
  created () {
    this.defaultActive()
  }
  defaultActive (): string {
    this.activeName = this.date[new Date().getDay() - 1]
    return this.activeName
  }
}
</script>
<style>
  .el-tabs__item {
    width: 170px;
    text-align: center;
  }
</style>
<style lang="scss" scoped>
  .newBangumi {
    padding: 50px;
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 108px;
        border-radius: 10px;
        overflow: hidden;
        display: flex;
        align-items: center;
        flex-direction: column;
        margin: 10px;
        img {
          width: 100%;
          height: 70px;
          margin: 0px 0 10px;
        }
        div {
          display: flex;
          flex-direction: column;
          font-size: 14px;
          span {
            line-height: 20px;
          }
        }
      }
    }
  }
</style>
