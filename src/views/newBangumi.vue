<template>
  <div class="newBangumi">
    <div :class="['date', activeName === day ? 'active' : '']" v-for="(day, index) in date" :key="index">
      <span class="Date current">星期{{day}}</span>
      <Timeline>
        <Timeline-item v-for="(item, index) in list[index]" :key="index" @click.native="$router.push('bangumiDetail')">
          <p class="time">17:00</p>
          <img src="../assets/img/misaka.jpg" alt="">
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
  list: Array<Number> = []
  created () {
    this.defaultActive()
    this.random(7)
  }
  random (len: number):void {
    for (let i = 0; i < len; i++) {
      this.list.push(Math.floor((Math.random() * 5) + 1))
    }
  }
  defaultActive (): string {
    let getDay = new Date().getDay()
    getDay === 0 ? this.activeName = this.date[this.date.length - 1] : this.activeName = this.date[getDay - 1]
    return this.activeName
  }
}
</script>
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
