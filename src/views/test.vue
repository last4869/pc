<template>
  <div class="home">
    <player></player>
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
.home {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
