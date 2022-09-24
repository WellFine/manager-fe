<template>
  <div class="approve-manager">
    <div class="query-form">
      <el-form ref="form" :inline="true" :model="queryForm">
        <el-form-item label="审批状态" prop="applyState">
          <el-select v-model="queryForm.applyState" placeholder="请选择审批状态">
            <el-option value="" label="全部"></el-option>
            <el-option :value="1" label="待审批"></el-option>
            <el-option :value="2" label="审批中"></el-option>
            <el-option :value="3" label="审批拒绝"></el-option>
            <el-option :value="4" label="审批通过"></el-option>
            <el-option :value="5" label="作废"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getApplyList">查询</el-button>
          <el-button @click="handleReset('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
      </div>
      <el-table :data="applyList">
        <el-table-column
          v-for="item in columns" :key="item.prop"
          :prop="item.prop" :label="item.label" :width="item.width" :formatter="item.formatter"
        ></el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <!-- 只有当前审核人是自己且审核状态是待审核和审核中才显示审核按钮 -->
            <el-button
              v-if="scope.row.curAuditUserName === userInfo.userName && [1, 2].includes(scope.row.applyState)"
              size="small"
            >审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination" background layout="prev, pager, next"
        :total="pager.total" :page-size="pager.pageSize"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
  import { ref, reactive, getCurrentInstance, onMounted } from 'vue'
  import util from '@/utils/util'

  export default {
    name: 'Approve',
    setup () {
      const { ctx, appContext } = getCurrentInstance()
      const { $api, $store } = appContext.config.globalProperties
      const queryForm = reactive({
        applyState: 1
      })
      const columns = [{
        label: '单号',
        prop: 'orderNo'
      }, {
        label: '申请人',
        prop: '',
        formatter (row) {
          return row.applyUser.userName
        }
      }, {
        label: '休假时间',
        prop: '',
        formatter (row) {
          return `${util.formateDate(new Date(row.startTime), 'yyyy-MM-dd')} - ${util.formateDate(new Date(row.endTime), 'yyyy-MM-dd')}`
        }
      }, {
        label: '休假时长',
        prop: 'leaveTime'
      }, {
        label: '休假类型',
        prop: 'applyType',
        formatter (row, column, value) {
          return {
            1: '事假',
            2: '调休',
            3: '年假'
          }[value]
        }
      }, {
        label: '休假原因',
        prop: 'reasons'
      }, {
        label: '申请时间',
        prop: 'createTime',
        formatter (row, column, value) {
          return util.formateDate(new Date(value))
        }
      }, {
        label: '审批人',
        prop: 'auditUsers'
      }, {
        label: '当前审批人',
        prop: 'curAuditUserName'
      }, {
        label: '审批状态',
        prop: 'applyState',
        formatter (row, column, value) {
          return {
            1: '待审批',
            2: '审批中',
            3: '审批拒绝',
            4: '审批通过',
            5: '作废'
          }[value]
        }
      }]
      const applyList = ref([])
      const pager = reactive({
        pageNum: 1,
        pageSize: 10,
        total: 0
      })

      onMounted(() => {
        getApplyList()
      })

      // 加载申请列表
      const getApplyList = async () => {
        const params = { ...queryForm, ...pager, type: 'approve' }
        const { list, page } = await $api.getApplyList(params)
        applyList.value = list
        pager.total = page.total
      }

      // 重置表单
      const handleReset = form => {
        ctx.$refs[form].resetFields()
      }

      // 分页事件处理
      const handleCurrentChange = current => {
        pager.pageNum = current
        this.getLeaveList()
      }

      const userInfo = $store.state.userInfo

      return {
        queryForm,
        columns,
        applyList,
        pager,
        handleReset,
        handleCurrentChange,
        getApplyList,
        userInfo
      }
    }
  }
</script>

<style lang="scss">
  .approve-manager {
    .base-table {
      .pagination {
        padding: 20px 10px;
        display: flex;
        justify-content: center;
      }
    }
  }
</style>
