<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-button type="primary" @click="onSearch" :disabled="loading">添加广告</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!--表格 -->

    <el-table
      :data="advertList"
      border
      v-loading="loading"
      style="width: 100%">
      <el-table-column
        prop="id"
        width="80"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="name"
        show-overflow-tooltip
        label="广告名称">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="广告位置">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="广告图片">
        <template slot-scope="scope">
          <div class="banner-container">
            <img class="avatar" :src="scope.row.img"/>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="时间">
        <template slot-scope="scope">
          <div>开始时间 {{scope.row.startTime}}</div>
          <div>结束时间 {{scope.row.endTime}}</div>
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
import { getAdList } from '@/services/advert'
export default Vue.extend({
  name: 'AdvertPage',
  data () {
    return {
      loading: false,
      filterForm: {
        pageSize: 10,
        pageNum: 1
      },
      currentPage: 1,
      totalCount: 0,
      advertList: [],
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
    this.loadBannerList()
  },
  methods: {
    async loadBannerList () {
      const { data } = await getAdList(this.filterForm)
      this.advertList = data.content
      this.totalCount = data.data.total
    },
    onSearch () {
      this.loadBannerList()
    },
    onReset () {
      console.log('dd')
    },
    handleDelete (item: any) {
      console.log(item, '2')
    },
    handleCurrentChange () {
      this.loadBannerList()
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
.banner-container{
  display: flex;
  justify-content: center;
  img{
    width: 180px;
    height: 100px;
    text-align: center;
  }
}
</style>
