<template>
  <div class="menu-manager">
    <div class="query-form">
      <el-form :inline="true" :model="queryForm">
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="queryForm.menuName" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item label="菜单状态" prop="menuState">
          <el-select v-model="queryForm.menuState" placeholder="请选择菜单状态">
            <el-option :value="1" label="正常" />
            <el-option :value="2" label="停用" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleAdd">创建</el-button>
      </div>
      <!-- 
        树形结构必须要定义 row-key
        tree-props 定义树形数据中子项的属性名称，这里我们返回的数据已经是 children 了，可以不用写，这里是为了演示
       -->
      <el-table :data="menuList" row-key="_id" :tree-props="{children: 'children'}">
        <el-table-column
          v-for="item in columns" :key="item.prop"
          :prop="item.prop" :label="item.label"
          :width="item.width" :formatter="item.formatter"
        />
        <el-table-column label="操作" width="220">
          <template #default="scope">
            <el-button type="primary" @click="handleAdd(scope.row)" size="small">新增</el-button>
            <el-button type="success" @click="handleEdit(scope.row)" size="small">编辑</el-button>
            <el-button type="danger" @click="handleDel(scope.row)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import util from '@/utils/util'

  const columns = [{
    label: '菜单名称',
    prop: 'menuName',
    width: 180
  }, {
    label: '图标',
    prop: 'icon'
  }, {
    label: '菜单类型',
    prop: 'menuType',
    formatter (row, column, value) {
      return {
        1: '菜单',
        2: '按钮'
      }[value]
    }
  }, {
    label: '权限标识',
    prop: 'menuCode'
  }, {
    label: '路由地址',
    prop: 'path'
  }, {
    label: '组件路径',
    prop: 'component'
  }, {
    label: '菜单状态',
    prop: 'menuState',
    width: 90,
    formatter (row, column, value) {
      return {
        1: '正常',
        2: '停用'
      }[value]
    }
  }, {
    label: '创建时间',
    prop: 'createTime',
    width: 150,
    formatter (row, column, value) {
      return util.formateDate(new Date(value))
    }
  }]

  export default {
    name: 'Menu',
    data () {
      return {
        queryForm: {
          menuState: 1
        },
        menuList: [],
        columns
      }
    },
    mounted () {
      this.getMenuList()
    },
    methods: {
      async getMenuList () {
        try {
          this.menuList = await this.$api.getMenuList(this.queryForm)
        } catch (error) {
          throw new Error(error)
        }
      },
      handleQuery () {},
      handleReset () {},
      handleAdd () {},
      handleEdit () {},
      handleDel () {}
    }
  }
</script>
