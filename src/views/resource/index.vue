<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" ref="filterForm" :model="filterForm" class="demo-form-inline">
        <el-form-item label="资源名称" prop="name">
          <el-input v-model="filterForm.name" placeholder="请输入资源名称"></el-input>
        </el-form-item>
        <el-form-item label="资源路径" prop="url">
          <el-input v-model="filterForm.url" placeholder="请输入资源路径"></el-input>
        </el-form-item>
        <el-form-item label="资源分类" prop="categoryId">
          <el-select v-model="filterForm.categoryId" clearable placeholder="活动区域">
            <el-option
              :label="item.name"
              v-for="item in resourceCategories"
              :key="item.id"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchLists" :disabled="loading">查询</el-button>
          <el-button type="primary" @click="onReset" :disabled="loading">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <resource-list
      :searchValue="filterForm"
      :totalCount="totalCount"
      :loading="loading"
      :currentPage="currentPage"
      :resource="resource"
      @getResourcePages="getResourcePages"
      ref="resource"
    ></resource-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ResourceList from './components/list.vue'
import { getResourceList } from '@/services/resource'
import { getResourceCategories } from '@/services/resource.category'
import { Form } from 'element-ui'
export default Vue.extend({
  name: 'resource',
  components: {
    ResourceList
  },
  data () {
    return {
      filterForm: {
        name: '',
        url: '',
        size: 10,
        current: 1,
        categoryId: null
      },
      loading: false,
      resource: [],
      current: 1,
      currentPage: 1,
      size: 10,
      totalCount: 0,
      resourceCategories: []
    }
  },
  created () {
    this.loadResourcePages()
    this.loadResourceCategories()
  },
  methods: {
    searchLists () {
      this.loadResourcePages()
    },
    async loadResourcePages () {
      this.loading = true
      const { data } = await getResourceList(this.filterForm)
      this.resource = data.data.records
      this.totalCount = data.data.total
      this.loading = false
    },
    async loadResourceCategories () {
      const { data } = await getResourceCategories()
      this.resourceCategories = data.data
    },
    onReset () {
      (this.$refs.filterForm as Form).resetFields()
      this.filterForm.current = 1
      this.loadResourcePages()
    },
    getResourcePages (val: number) {
      this.currentPage = val
      this.filterForm.current = val
      this.loadResourcePages()
    }
  }
})
</script>

<style lang="scss" scoped>
.demo-form-inline{
  display: flex;
  align-items: center;
}
.filter-container{
  padding: 0;
}
</style>
