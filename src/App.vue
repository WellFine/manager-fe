<template>
  <!-- 这个 router-view 用于显示顶级路由的组件，如 '/' 对应的 Home 组件 -->
  <router-view></router-view>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="scss">
  @import './assets/style/reset.css';
  @import './assets/style/index.scss';
</style>
