<template>
  <div class="login">
    <div class="login-content">
      <div class="title">
        Vue 管理系统
      </div>
      <el-form
        ref="form"
        class="login-form"
        label-position="top"
        :model="form"
        :rules="rules"
        label-width="80px">
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" :loading="isLoginLoading" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { login } from '@/services/user'
export default Vue.extend({
  name: 'store',
  data () {
    return {
      form: {
        phone: '18201288771',
        password: '111111'
      },
      isLoginLoading: false,
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async onSubmit () {
      try {
        // 表单验证
        await (this.$refs.form as Form).validate()

        this.isLoginLoading = true

        // 2、验证通过 - 提交表单
        const { data } = await login(this.form)

        // 处理结果
        if (data.state !== 1) {
          this.$message.error(data.message)
        } else {
          // 登录成功，记录登录状态，状态需要能够全局访问 (存放在Vuex中)
          this.$store.commit('setUser', data.content)
          // 在访问需要登录的页面的时候判断有没有登录状态 (路由拦截器)
          // 跳转首页
          this.$router.push({
            name: 'home'
          })
          this.$message.success('登录成功')
        }
      } catch (err) {
        this.$message.error('登录失败')
      }
      // 结束登录
      this.isLoginLoading = false
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  .login-content{
    margin-top: 10%;
    .login-form{
      width:300px;
      background: #fff;
      padding: 20px;
      border-radius: 5px;
    }
    .title{
      font-size: 30px;
      text-align: center;
      padding: 20px;
    }
    .login-btn{
      width: 100%;
    }
  }
}
</style>
