<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" ref="filterForm" :model="filterForm" class="demo-form-inline">
        <el-form-item label="课程名称" prop="courseName">
          <el-input v-model="filterForm.courseName" placeholder="请输入课程名称"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="filterForm.status" clearable placeholder="活动区域">
            <el-option label="全部" value=""></el-option>
            <el-option
              :label="item.name"
              v-for="item in resourceCategories"
              :key="item.id"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch" :disabled="loading">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!--表格 -->

    <el-table
      :data="courseList"
      border
      v-loading="loading"
      style="width: 100%">
      <el-table-column
        type="index"
        width="80"
        label="编号">
      </el-table-column>
      <el-table-column
        prop="courseName"
        show-overflow-tooltip
        label="课程名称">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="价格">
        <template slot-scope="scope">
          <span>¥ {{scope.row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="sortNum"
        label="排序">
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          <div :class="
          scope.row.status === 1 ? 'status-success-color': 'status-danger-color'"
          >{{scope.row.status === 1 ? '已上架' : '已下架'}}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="320px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            v-if="scope.row.status === 1"
            @click="handleEdit(scope.$index, scope.row, 0)">下架</el-button>
          <el-button v-else size="mini" type="success" @click="handleEdit(scope.$index, scope.row, 1)">上架</el-button>
          <el-button size="mini">编辑</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleEditContent(scope.row)">内容管理</el-button>
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
import { getCoursesList, changeState } from '@/services/courses'
export default Vue.extend({
  name: 'Course',
  data () {
    return {
      loading: false,
      filterForm: {
        pageSize: 10,
        currentPage: 1,
        courseName: '',
        status: ''
      },
      currentPage: 1,
      totalCount: 0,
      courseList: [],
      resourceCategories: [{
        name: '上架',
        id: 1
      }, {
        name: '下架',
        id: 0
      }]
    }
  },
  created () {
    this.loadQueryCourses()
  },
  methods: {
    async loadQueryCourses () {
      const { data } = await getCoursesList(this.filterForm)
      this.courseList = data.data.records
      this.totalCount = data.data.total
    },
    onSearch () {
      this.loadQueryCourses()
    },
    onReset () {
      console.log('dd')
    },
    async handleEdit (index: number, item: any, status: number) {
      await changeState({ courseId: item.id, status })
      this.$set(this.courseList[index], 'status', status)
    },
    handleDelete (item: any) {
      console.log(item, '2')
    },
    handleCurrentChange (val: number) {
      this.filterForm.currentPage = val
      this.loadQueryCourses()
    },
    handleSizeChange (val: number) {
      console.log(val)
    }
  }
})
</script>

<style lang="scss" scoped>
.status-success-color{
  color: #51cf66;
}
.status-danger-color{
  color: #ff6b6b;
}
</style>
