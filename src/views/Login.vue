<template>
  <!-- 
    虽然 Vue3 支持在 template 中书写多个标签
    但还是建议用一个大的 div 包裹，这样用 scss 写样式时可以把样式都写在大 div 的 class 下
    如此 style 就不用 scoped 属性了，使用 scoped 会生成很多的 attr 属性来区分样式，这样可以节省体积
   -->
   <div class="login-wrapper">
    <div class="modal">
      <el-form>
        <div class="title">蓝星</div>
        <el-form-item>
          <el-input type="text" :prefix-icon="User"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" :prefix-icon="View"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
   </div>
</template>

<script>
  import { User, View } from '@element-plus/icons-vue'

  export default {
    name: 'Login',
    setup () {
      return {
        User,
        View
      }
    }
  }
</script>

<style lang="scss">
  .login-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f9fcff;
    width: 100vw;
    height: 100vh;
    .modal {
      width: 500px;
      padding: 50px;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0px 0px 10px 3px #c7c9cb4d;
      .title {
        font-size: 50px;
        line-height: 1.5;
        text-align: center;
        margin-bottom: 30px;
      }
      .btn-login {
        width: 100%;
      }
    }
  }
</style>
