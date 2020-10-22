<template>
  <div class="createOredit">
    <el-dialog
      :title="isEdit ? '编辑菜单': '新增菜单'"
      :visible.sync="dialogFormVisible"
      :before-close='closeDialog'
      width="30%">
    <el-form ref="form" :model="role" label-width="80px">
      <el-form-item label="角色名称">
        <el-input v-model="role.name"></el-input>
      </el-form-item>
      <el-form-item label="角色编码">
        <el-input v-model="role.href"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="text" v-model="role.description"></el-input>
      </el-form-item>
    </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    dialogFormVisible: {
      type: Boolean,
      default: false
    },
    menuId: {
      type: Number,
      default: 6
    }
  },
  data () {
    return {
      role: {
        name: '',
        href: '',
        description: ''
      }
    }
  },
  methods: {
    closeDialog () {
      this.$emit('handleClose')
    },
    async onSubmit () {
      console.log('0')
      // 1、表单验证
      // 2、验证通过， 通过表单
      // const { data } = await createOrUpdateMenu(this.form)
      // if (data.code === '000000') {
      //   this.$message.success('提交成功')
      //   this.closeDialog()
      //   this.$emit('loadRoleList')
      // } else {
      //   this.$message.error('提交失败')
      // }
    }
  }
}
</script>

<style>

</style>
