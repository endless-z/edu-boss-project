<template>
  <div class="resource-list">
    <el-table
      :data="resource"
      border
      v-loading="loading"
      style="width: 100%">
      <el-table-column
        type="index"
        label="编号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="资源名称">
      </el-table-column>
      <el-table-column
        prop="url"
        show-overflow-tooltip
        label="资源路径">
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="添加时间">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :disabled="loading"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'resourcePage',
  props: {
    searchValue: {
      type: Object,
      default: function () {
        return {}
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    resource: {
      type: Array,
      default: function () {
        return []
      }
    },
    currentPage: {
      type: Number,
      default: 1
    },
    totalCount: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleSizeChange (val: number) {
      console.log(val)
    },
    handleCurrentChange (val: number) {
      // 请求数据
      console.log(val)
      this.$emit('getResourcePages', val)
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
