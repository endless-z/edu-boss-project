# edu-boss-fed

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 调整初始目录结构
- 默认生成的目录结构不满足我们的开发需求，所以需要做一些自定义改动

这里主要处理下面的内容

修改 App.vue

```js
<template>
  <div id="app">
    <div id="nav">
      <!-- 根路由出口 -->
      <router-link/>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss" scoped></style>
```

删除 router 的内容
```js
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

// 路由配置规则
const routes: Array<RouteConfig> = [
]

const router = new VueRouter({
  routes
})

export default router

```

删除 views 和 components 的组件

删除assets 的logo