<template>
  <div class="base-table">
    <div class="action">
      <slot name="action"></slot>
    </div>
    <!-- data、selection-change 等属性和事件都直接透传给 el-table -->
    <el-table v-bind="$attrs">
      <el-table-column type="selection" width="55" v-if="selection" />
      <!-- label、prop、width、formatter 等都通过 v-bind="item" 赋值给 el-table-column -->
      <el-table-column v-for="item in columns" :key="item.prop" v-bind="item" />
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'BaseTable',
    props: {
      columns: Array,
      selection: Boolean
    }
  }
</script>
