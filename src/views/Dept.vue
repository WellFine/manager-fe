<template>
  <div class="dept-manager">
    <div class="query-form">
      <el-form ref="queryForm" :model="queryForm" :inline="true">
        <el-form-item label="部门名称" prop="deptName">
          <el-input v-model="queryForm.deptName" placeholder="请输入部门名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getDeptList">查询</el-button>
          <el-button @click="handleReset('queryForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary">创建</el-button>
      </div>
      <!-- stripe 斑马条纹 -->
      <el-table :data="deptList" row-key="_id" stripe>
        <!-- v-bind 会把 item 中的值绑定到 el-table-column 上，如 label、prop、width、formatter -->
        <el-table-column
          v-for="item in columns" :key="item.prop"
          v-bind="item"
        />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" @click="handleDel(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'dept',
    data () {
      return {
        queryForm: {},
        columns: [{
          label: '部门名称',
          prop: 'deptName'
        }, {
          label: '负责人',
          prop: 'userName'
        }, {
          label: '创建时间',
          prop: 'createTime'
        }, {
          label: '更新时间',
          prop: 'updateTime'
        }],
        deptList: [],
        pager: {
          pageNum: 1,
          pageSize: 10
        }
      }
    },
    mounted () {
      this.getDeptList()
    },
    methods: {
      async getDeptList () {
        try {
          this.deptList = await this.$api.getDeptList({
            ...this.queryForm,
            ...this.pager
          })
        } catch (error) {
          this.$message.error(`获取部门列表失败：${error}`)
        }
      },
      handleReset (form) {
        this.$refs[form].resetFields()
      }
    }
  }
</script>
