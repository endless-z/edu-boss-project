<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" ref="filterForm" :model="filterForm" class="demo-form-inline">
        <el-form-item label="手机号" prop="courseName">
          <el-input v-model="filterForm.phone" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="注册时间" prop="status">
          <el-date-picker
            v-model="createTime"
            type="daterange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            @change="changeCreateTime"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch" :disabled="loading">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!--表格 -->

    <el-table
      :data="userList"
      v-loading="loading"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="用户Id">
      </el-table-column>
      <el-table-column
        prop="portrait"
        show-overflow-tooltip
        label="头像">
        <template slot-scope="scope">
          <img v-if="scope.row.portrait === null"
            class="avatar"
            src="http://www.lgstatic.com/thumbnail_100x100/i/image2/M01/5E/65/CgotOVszSAOANi0LAAAse2IVWAE693.jpg" />
          <img v-else class="avatar" :src="scope.row.portrait"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        show-overflow-tooltip
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="phone"
        show-overflow-tooltip
        label="手机号">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="注册时间">
        <template slot-scope="scope">
          <span>{{scope.row.createTime}}</span>
        </template>
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
          <el-button size="mini">禁用</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleEditContent(scope.row)">分配角色</el-button>
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
import { getUserPages } from '@/services/user'
export default Vue.extend({
  name: 'Course',
  data () {
    return {
      loading: false,
      filterForm: {
        pageSize: 10,
        currentPage: 1,
        phone: '',
        startCreateTime: '',
        endCreateTime: ''
      },
      createTime: '',
      currentPage: 1,
      totalCount: 0,
      userList: [],
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
    this.loadUserList()
  },
  methods: {
    async loadUserList () {
      const { data } = await getUserPages(this.filterForm)
      this.userList = data.data.records
      this.totalCount = data.data.total
    },
    changeCreateTime (e: any) {
      this.filterForm.startCreateTime = e[0]
      this.filterForm.endCreateTime = e[1]
    },
    onSearch () {
      this.loadUserList()
    },
    onReset () {
      console.log('dd')
    },
    // async handleEdit (index: number, item: any, status: number) {
    //   await changeState({ courseId: item.id, status })
    //   this.$set(this.courseList[index], 'status', status)
    // },
    handleDelete (item: any) {
      console.log(item, '2')
    },
    handleCurrentChange (val: number) {
      this.filterForm.currentPage = val
      this.loadUserList()
    },
    handleSizeChange (val: number) {
      console.log(val)
    }
  }
})
</script>

<style lang="scss" scoped>
.app-container {
  .status-success-color{
    color: #51cf66;
  }
  .status-danger-color{
    color: #ff6b6b;
  }
  .el-table{
    border: 1px solid #f5f5f5;
  }
  .avatar{
    width:30px;
    border-radius: 50%;
    height: 30px;
  }
}
</style>
