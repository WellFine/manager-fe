<template>
  <h1>欢迎来到登录界面</h1>
  <el-button @click="goHome">回首页</el-button>
</template>

<!-- Componsition API 方式使用 router 跳转
<script setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const goHome = () => {
    router.push('/welcome')
  }
</script>
-->

<script>
  // Options API 方式使用 router 跳转
  export default {
    name: 'Login',
    mounted () {
      // 直接调用 request
      this.$request({
        method: 'get',
        url: '/login'
      }).then(console.log)

      // 通过 request.get 方式调用
      this.$request.get('/login').then(console.log)
    },
    methods: {
      goHome () {
        this.$router.push('/welcome')
      }
    }
  }
</script>

<style></style>
