<template>
  <div class="feedback">
    <mavon-editor style="height: 100%"></mavon-editor>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  name: 'feedback',
  components: {
    mavonEditor
  },
  data () {
    return {
    }
  },
  created () {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.feedback {
  margin: auto;
  width: 80%;
  height: 580px;
}
</style>
