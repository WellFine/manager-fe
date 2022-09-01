<template>
  <div class='user-manager'>
    <div class="query-form">
      <!-- inline 设置行内表单 -->
      <el-form :inline="true" :model="user">
        <el-form-item>
          <el-input v-model="user.userId" placeholder="请输入用户 ID"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="user.userName" placeholder="请输入用户名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="user.state" placeholder="请选择用户状态">
            <el-option :value="0" label="所有"></el-option>
            <el-option :value="1" label="在职"></el-option>
            <el-option :value="2" label="离职"></el-option>
            <el-option :value="3" label="试用期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <!-- base-table 和 action 在 @/assets/style/index.scss 中设置了部分样式，主要是一些间距和边框 -->
      <div class="action">
        <el-button type="primary">新增</el-button>
        <el-button type="danger">批量删除</el-button>
      </div>
      <el-table :data="userList">
        <!-- type="selection" 是复选框 -->
        <el-table-column type="selection" width="55"></el-table-column>
        <!-- prop 对应传入 el-table 的 data 数据中的属性 -->
        <el-table-column
          v-for="item in columns" :key="item.prop"
          :prop="item.prop" :label="item.label" :width="item.width"
        ></el-table-column>
        <el-table-column label="操作" width="150">
          <template #default>
            <el-button size="small">编辑</el-button>
            <el-button type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import { reactive } from 'vue'

  export default {
    name: 'User',
    setup () {
      const user = reactive({})
      // 弄个假数据测试页面结构
      const userList = reactive([{
        "state": 1,
        "role": 0,
        "roleList": [
          "60180b07b1eaed6c45fbebdb",
          "60150cb764de99631b2c3cd3",
          "60180b59b1eaed6c45fbebdc"
        ],
        "deptId": [
          "60167059c9027b7d2c520a61",
          "60167345c6a4417f2d27506f"
        ],
        "userId": 1000002,
        "userName": "admin",
        "userEmail": "admin@imooc.com",
        "createTime": "2021-01-17T13:32:06.381Z",
        "lastLoginTime": "2021-01-17T13:32:06.381Z",
        "__v": 0,
        "job": "前端架构师",
        "mobile": "17611020000"
      }])
      const columns = [{
        label: '用户 ID',
        prop: 'userId'
      }, {
        label: '用户名',
        prop: 'userName'
      }, {
        label: '用户邮箱',
        prop: 'userEmail'
      }, {
        label: '用户角色',
        prop: 'role'
      }, {
        label: '用户状态',
        prop: 'state'
      }, {
        label: '注册时间',
        prop: 'createTime'
      }, {
        label: '最后登录时间',
        prop: 'lastLoginTime'
      }]

      return {
        user,
        userList,
        columns
      }
    }
  }
</script>

<style lang='scss'>
</style>
