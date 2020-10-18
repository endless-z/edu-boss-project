<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-button type="primary" @click="onAddBanner" :disabled="loading">添加广告位</el-button>
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
        prop="spaceKey"
        width="100"
        label="spaceKey">
      </el-table-column>
      <el-table-column
        prop="name"
        show-overflow-tooltip
        label="广告位名称">
      </el-table-column>
      <el-table-column
        label="创建时间">
        <template slot-scope="scope">
          <div>{{scope.row.createTime | formatDate}}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="更新时间">
        <template slot-scope="scope">
          <div>{{scope.row.updateTime | formatDate}}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="320px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllSpaces } from '@/services/advert-space'
import dayjs from 'dayjs'
export default Vue.extend({
  name: 'AdvertSpace',
  data () {
    return {
      filterForm: {
        pageNum: 1,
        pageSize: 5
      },
      advertList: []
    }
  },
  created () {
    this.loadGetAllSpacesList()
  },
  methods: {
    async loadGetAllSpacesList () {
      const { data } = await getAllSpaces(this.filterForm)
      console.log(data)
      this.advertList = data.content
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
