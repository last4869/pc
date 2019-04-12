<template>
  <div class="mask" @click="close">
    <div class="player">
      <player></player>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import player from '../components/player.vue'
@Component({
  components: {
    player
  }
})
export default class Home extends Vue {
}
</script>
<style lang="scss" scoped>
  .mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .player {
      // min-width: 1100px;
      // min-height: 621px;
      width: 1100px;
      height: 621px;
    }
  }

</style>
