<template>
  <div class="create-container">
    <el-button type="primary" @click="goBack">返回</el-button>
    <!-- <el-dialog
      :title="isEdit ? '编辑菜单': '新增菜单'"
      :visible.sync="dialogFormVisible"
      :before-close='closeDialog'
      width="30%"> -->
      <div class="edit-form-container">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="edit-advert">
          <el-form-item label="广告名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="广告位置">
            <el-select v-model="ruleForm.spaceId">
              <el-option
                v-for="item in bannerList"
                :key="item.id"
                :value="item.id"
                :label="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开始时间" prop="startTime">
            <el-date-picker
              v-model="ruleForm.startTime"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间" prop="endTime">
            <el-date-picker
              v-model="ruleForm.endTime"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="上线/下线">
            <el-radio-group v-model="ruleForm.status">
              <el-radio :label="0">下线</el-radio>
              <el-radio :label="1">上线</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="广告图片" >
            <el-upload
              action="http://eduboss.lagou.com/boss/course/upload"
              list-type="picture-card"
              :show-file-list="false"
              :http-request="uploadImg"
              :before-upload="enbeforeAvatarUpload"
              :on-remove="handleRemove">
              <img v-if="ruleForm.img" :src="ruleForm.img" class="avatar">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="广告链接" prop="link">
            <el-input v-model="ruleForm.link"></el-input>
          </el-form-item>
          <el-form-item label="广告备注">
            <el-input
            v-model="ruleForm.text"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="goBack">取 消</el-button>
          <el-button type="primary" @click="onSubmit">确 定</el-button>
        </span>
      </div>
    <!-- </el-dialog> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getBannerdetail, getAllSpaces, saveOrUpdate, uploadBannerImg } from '@/services/advert'
import { Form } from 'element-ui'
export default Vue.extend({
  name: 'editAdvert',
  data () {
    return {
      ruleForm: {
        name: '',
        startTime: '',
        endTime: '',
        img: '',
        link: '',
        status: 1,
        text: '',
        sort: 0,
        spaceId: ''
      },
      bannerList: [],
      rules: {
        name: [
          { required: true, message: '请输入广告名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        startTime: [
          { required: true, message: '请选择开始时间', trigger: 'change' }
        ],
        endTime: [
          { required: true, message: '请选择到期时间', trigger: 'change' }
        ],
        link: [
          { required: true, message: '请输入广告链接', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    const id = this.$route.params.id
    if (id !== 'null') {
      this.loadBannerdetail(id)
    }
    this.loadAllSpaces()
  },
  methods: {
    async loadBannerdetail (id: any) {
      const { data } = await getBannerdetail({ id })
      this.ruleForm = data.content
    },
    async loadAllSpaces () {
      const { data } = await getAllSpaces()
      this.bannerList = data.content
    },
    async saveBannerItem () {
      const { data } = await saveOrUpdate(this.ruleForm)
      console.log(data)
    },
    goBack () {
      this.$router.back()
    },
    async uploadImg (item: any) {
      const formData = new FormData()
      formData.append('file', item.file)
      const { data } = await uploadBannerImg(formData)
      if (data.code === '000000') {
        this.$message.success('上传成功')
        this.ruleForm.img = data.data.name
      } else {
        this.$message.error(data.mesg)
      }
    },
    async onSubmit () {
      try {
        await (this.$refs.ruleForm as Form).validate()
        const { data } = await saveOrUpdate(this.ruleForm)
        if (data.message === 'success') {
          this.$message.success('保存成功')
          this.$router.back()
        }
      } catch (err) {
        this.$message.error('保存失败')
      }
    },
    enbeforeAvatarUpload (res: any) {
      console.log(res)
    },
    handlePictureCardPreview () {
      console.log('submit')
    },
    handleRemove () {
      console.log('submit')
    }
  }
})
</script>

<style lang="scss" scoped>
.edit-advert{
  width: 800px;
  .avatar{
    width: 100%;
    height: 100%;
  }
}
.edit-form-container{
  margin-top: 30px;
}
</style>
