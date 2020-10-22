<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" ref="filterForm" :model="filterForm" class="demo-form-inline">
        <el-form-item label="角色名称" prop="courseName">
          <el-input v-model="filterForm.name" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch" :disabled="loading">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onAddUser" :disabled="loading">添加角色</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      :data="roleList"
      border
      v-loading="loading"
      style="width: 100%">
      <el-table-column
        prop="id"
        width="80"
        label="编号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="角色名称">
      </el-table-column>
      <el-table-column
        prop="description"
        show-overflow-tooltip
        label="描述">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="添加时间">
        <template slot-scope="scope">
          <span>{{scope.row.createdTime | formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row)">分配菜单</el-button>
         <el-button
            size="mini"
            type="success"
            @click="handleEdit(scope.row)">分配资源</el-button>
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
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :disabled="loading"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="totalCount">
      </el-pagination>
    </div>

    <create-or-edit
    :isEdit="isEdit"
    ref="create"
    @handleClose="handleClose"
    @loadRoleList="loadRoleList"
    :dialogFormVisible="dialogFormVisible"
    ></create-or-edit>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getRoleList } from '@/services/role'
import dayjs from 'dayjs'
import createOrEdit from './component/CreateOrEdit.vue'
export default Vue.extend({
  name: 'RolePage',
  components: {
    createOrEdit
  },
  data () {
    return {
      filterForm: {
        current: 1,
        name: '',
        size: 10
      },
      dialogFormVisible: false,
      loading: false,
      isEdit: false,
      currentPage: 1,
      roleList: [],
      totalCount: 0
    }
  },
  created () {
    this.loadRoleList()
  },
  methods: {
    async loadRoleList () {
      this.loading = true
      const { data } = await getRoleList(this.filterForm)
      if (data.code === '000000') {
        this.roleList = data.data.records
        this.totalCount = data.data.total
        this.loading = false
      } else {
        this.$message.error(data.mesg)
      }
    },
    handleCurrentChange (val: number) {
      this.filterForm.current = val
      this.loadRoleList()
    },
    onSearch () {
      this.filterForm.current = 1
      this.loadRoleList()
    },
    handleClose () {
      this.dialogFormVisible = false
    },
    onAddUser () {
      console.log('add')
      this.dialogFormVisible = true
    }
  },
  filters: {
    formatDate (date: any) {
      return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
