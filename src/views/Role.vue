<template>
  <div class="role-manager">
    <div class="query-form">
      <el-form ref="form" :inline="true" :model="queryForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="queryForm.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getRoleList">查询</el-button>
          <el-button @click="handleReset('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary">创建</el-button>
      </div>
      <el-table :data="roleList">
        <el-table-column
          v-for="item in columns" :key="item.prop"
          :prop="item.prop" :label="item.label"
          :width="item.width" :formatter="item.formatter"
        />
        <el-table-column label="操作" width="260">
          <template #default>
            <el-button size="small">编辑</el-button>
            <el-button type="primary" size="small">设置权限</el-button>
            <el-button type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination" background
        layout="prev, pager, next"
        :total="pager.total" :page-size="pager.pageSize"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
  import util from '@/utils/util'

  const columns = [{
    label: '角色名称',
    prop: 'roleName'
  }, {
    label: '备注',
    prop: 'remark'
  }, {
    label: '权限列表',
    prop: 'menuList'
  }, {
    label: '创建时间',
    prop: 'createTime',
    formatter (row, column, value) {
      return util.formateDate(new Date(value))
    }
  }]

  export default {
    name: 'Role',
    data () {
      return {
        queryForm: {},
        roleList: [],
        columns,
        pager: {
          pageNum: 1,
          pageSize: 10,
          total: 0
        }
      }
    },
    mounted () {
      this.getRoleList()
    },
    methods: {
      async getRoleList () {
        try {
          const { list, page } = await this.$api.getRoleList(this.queryForm)
          this.roleList = list
          this.pager.total = page.total
        } catch (error) {
          throw new Error(error)
        }
      },
      handleReset (form) {
        this.$refs[form].resetFields()
      },
      handleCurrentChange (current) {
        this.pager.pageNum = current
        this.getRoleList()
      }
    }
  }
</script>

<style lang='scss'>
  .role-manager {
    .base-table {
      .pagination {
        padding: 20px 10px;
        display: flex;
        justify-content: center;  // 设置分页器居中
      }
    }
  }
</style>
