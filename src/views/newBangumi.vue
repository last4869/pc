<template>
  <div class="newBangumi">
    <div :class="['date', activeName === item ? 'active' : '']" v-for="(item, index) in date" :key="index">
      <span class="Date current">星期{{item}}</span>
      <Timeline>
        <Timeline-item v-for="(item, index) in 2" :key="index">
          <p class="time">17:00</p>
          <img src="../assets/img/misaka.webp" alt="">
          <p class="content">魔法禁书目录3</p>
          <p class="content">第26话</p>
        </Timeline-item>
      </Timeline>
    </div>
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
    let getDay = new Date().getDay()
    getDay === 0 ? this.activeName = this.date[this.date.length - 1] : this.activeName = this.date[getDay - 1]
    return this.activeName
  }
}
</script>
<style>
</style>
<style lang="scss">
.time{
  font-size: 14px;
  font-weight: bold;
}

</style>

<style lang="scss" scoped>
  .newBangumi {
    padding: 50px 0;
    display: flex;
    .date {
      flex: 1;
      .ivu-timeline {
        margin-top: 40px;
      }
      img {
        width: 72px;
        margin: 10px 0;
      }
    }
    .active {
      .current {
        color: #409EFF;
      }
    }
  }
</style>
