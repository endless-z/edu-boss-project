<template>
  <el-container>
    <el-aside width="200px">
      <app-aside />
    </el-aside>
    <el-container>
      <el-header>
        <app-header />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue'
import AppAside from './components/app-aside.vue'
import AppHeader from './components/app-header.vue'
export default Vue.extend({
  name: 'LayoutIndex',
  components: {
    AppAside,
    AppHeader
  }
})
</script>
<style lang="scss" scoped>
.el-container{
  min-height: 100vh;
}
 .el-aside {
  background-color: #D3DCE6;
  color: #333;
  line-height: 200px;
}
.el-header, .el-footer {
  background-color: #ffffff;
}
.el-main {
  background-color: #E9EEF3;
  color: #333;
}
</style>
