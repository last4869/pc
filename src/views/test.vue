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
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
