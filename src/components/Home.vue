<template>
  <div class="basic-layout">
    <div class="nav-side"></div>
    <div class="content-right">
      <div class="nav-top">
        <div class="bread">面包屑</div>
        <div class="user-info">用户</div>
      </div>
      <div class="wrapper">
        <!-- 
          main-page 主要是为了帮助 router-view 显示的组件加入背景色和高度样式
          这样不用每个 router-view 要显示的组件都写一遍背景色和高度样式
         -->
        <div class="main-page">
          <!-- 这个 router-view 用于显示 Home 组件路由的子路由组件，如 '/welcome' 对应的 Welcome 组件 -->
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home'
  }
</script>

<style lang="scss">
  .basic-layout {
    position: relative;
    .nav-side {
      position: fixed;
      width: 200px;
      height: 100vh;
      background-color: #001529;
      color: #fff;
      overflow-y: auto;  /* 侧边栏菜单多的话自动出现滚动条 */
      transition: width .5s;  /* 侧边栏未来是可收缩的，先给个过渡效果 */
    }
    .content-right {
      margin-left: 200px;  // 这个距离不是固定不变的，应该随着 nav-side 的宽度而变化，以后再处理变化问题
      .nav-top {
        height: 50px;
        line-height: 50px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ddd;
        padding: 0 20px;
      }
      .wrapper {
        background-color: #eef0f3;
        padding: 20px;
        /*
          这里 100vh 是页面视口高度，减去 nav-top 的 50px 就得到了 wrapper 的高度，至于 padding 上下的 40px 不用管
          因为引入的 index.scss 中设置了除 element-plus 元素外的所有元素为 border-box 模型
         */
        height: calc(100vh - 50px);
        .main-page {
          background-color: #fff;
          height: 100%;
        }
      }
    }
  }
</style>
