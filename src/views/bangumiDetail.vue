<template>
  <div class="bangumiDetail">
    <div class="bg" style="">
      <img src="../assets/img/test.webp"/>
      <div class="right">
        <ul>
          <li>关于我转生成为史莱姆的这件事</li>
          <li>开播时间：2010年10月</li>
          <li>制作：某某某</li>
          <li>连载中, 周二更新</li>
          <li>剧情简介：史莱姆生活，开始了。上班族的三上悟在道路上被歹徒给刺杀身亡后，回过神来发现自己转生到了异世界。不过，自己居然是“史莱姆”！他在得到利姆露这个名字后开始了自己的史莱姆人生，随着与各个种族相处交流的过程中，他定下了一个目标——那就是“建立一个任何种族都能愉快地一起生活的国家”！</li>
        </ul>
      </div>
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
    padding: 20px;
    // box-sizing: border-box;
    .bg {
      display: flex;
      img{
        width: 230px;
        height: 300px;
        border: 5px solid #409dff;
        border-radius: 5px;
        margin-right: 15px;
      }
      ul {
        li {
          line-height: 25px;
        }
      }
    }
  }
</style>
