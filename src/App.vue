<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import './config/config.css';
#app {
  width: 100%;
  height: 100%;
}
.el-button {
  background: #409EFF !important;
  border-color: #409EFF !important;
}
</style>
