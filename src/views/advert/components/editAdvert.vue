<template>
  <div class="create-container">
    <!-- <el-dialog
      :title="isEdit ? '编辑菜单': '新增菜单'"
      :visible.sync="dialogFormVisible"
      :before-close='closeDialog'
      width="30%"> -->
    <el-form ref="form" :model="form" label-width="80px" class="edit-advert">
      <el-form-item label="广告名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="广告位置">
        <el-select v-model="form.spaceId">
          <el-option
            v-for="item in bannerList"
            :key="item.id"
            :value="item.id"
            :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker
          v-model="form.startTime"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker
          v-model="form.endTime"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="上线/下线">
        <el-radio-group v-model="form.status">
          <el-radio :label="0">下线</el-radio>
          <el-radio :label="1">上线</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="广告图片">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <img v-if="form.img" :src="form.img" class="avatar">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="广告链接">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="广告备注">
        <el-input
        v-model="form.text"
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"></el-input>
      </el-form-item>
    </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    <!-- </el-dialog> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getBannerdetail, getAllSpaces } from '@/services/advert'
export default Vue.extend({
  name: 'editAdvert',
  data () {
    return {
      form: {
        name: '',
        startTime: '',
        endTime: '',
        img: '',
        link: '',
        status: 1,
        text: '',
        spaceId: ''
      },
      bannerList: []
    }
  },
  created () {
    this.loadBannerdetail()
    this.loadAllSpaces()
  },
  methods: {
    async loadBannerdetail () {
      const id = this.$route.params.id
      const { data } = await getBannerdetail({ id })
      this.form = data.content
    },
    async loadAllSpaces () {
      const { data } = await getAllSpaces()
      this.bannerList = data.content
    },
    closeDialog () {
      console.log('close')
    },
    onSubmit () {
      console.log('submit')
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
</style>
