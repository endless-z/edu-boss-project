<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button type="primary" @click="handleCreate">添加菜单</el-button>
    </div>

    <el-table
      :data="menus"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        label="编号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="菜单名称">
      </el-table-column>
      <el-table-column
        prop="level"
        label="菜单级数">
      </el-table-column>
      <el-table-column
        prop="icon"
        label="前端图标">
      </el-table-column>
      <el-table-column
        prop="orderNum"
        label="排序">
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
    <create-or-edit :isEdit="isEdit" ref="create"  @handleClose="handleClose" @loadAllMenus="loadAllMenus" :dialogFormVisible="dialogFormVisible" :menuId="menuId"></create-or-edit>
  </div>
</template>

<script lang="ts">
import CreateOrEdit from './components/CreateOrEdit.vue'
import Vue from 'vue'
import { getAllMenus, deleteMenu } from '@/services/menu'

export default Vue.extend({
  name: 'Menu',
  components: {
    CreateOrEdit
  },
  data () {
    return {
      dialogFormVisible: false,
      menus: [],
      menuId: -1,
      isEdit: false
    }
  },
  created () {
    this.loadAllMenus()
  },
  methods: {
    async loadAllMenus () {
      const { data } = await getAllMenus()
      if (data.code === '000000') {
        this.menus = data.data
      }
    },
    handleCreate () {
      this.dialogFormVisible = true
    },
    handleClose () {
      this.dialogFormVisible = false
    },
    handleChange () {
      console.log('change')
    },
    handleEdit (item: any) {
      this.menuId = item.id
      // (this.$refs.create as any).loadMenuInfo()
      this.dialogFormVisible = true
      this.isEdit = true
    },
    handleDelete (item: any) {
      console.log('delet', item)
      this.$confirm('确认删除吗?', '删除提示', {})
        .then(async () => {
          const { data } = await deleteMenu(item.id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            this.loadAllMenus()
          }
        }).catch(err => {
          console.log(err)
          this.$message.info('已取消删除')
        })
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
