<template>
  <el-menu class="el-menu-vertical-demo" :unique-opened="uniqueOpened" :default-active="activeChild" :default-openeds="defaultOpeneds">
    <div v-for="(items ,indexs) in navData" :key="indexs">
      <el-submenu :index="toString(items.id)" v-if="items.authFunctionVOChild">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>{{items.name}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="(item ,index) in items.authFunctionVOChild" :key="index" :index="toString(item.id)">
            <span @click="go(item.url)">{{item.name}}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item :index="toString(items.id)" @click="go(items.url)" v-else>
        <i class="el-icon-menu"></i>
        <span slot="title">{{items.name}}</span>
      </el-menu-item>
    </div>
  </el-menu>
</template>

<script>
export default {
  data () {
    return {
      uniqueOpened: true,
      activeChild: null,
      defaultOpeneds: []
    }
  },
  props: {
    navData: Array
  },
  watch: {
    '$route': 'watchRoute'
  },
  created () {
    console.log(this.navData);
  },
  methods: {
    watchRoute () {
      let path = this.$route.path
      if (path === '/') {
        this.activeChild = null
        this.defaultOpeneds = []
      }
      let data = this.navData
      for (let i = 0; i < data.length; i++) {
        let item = data[i].authFunctionVOChild
        if (item) {
          for (let j = 0; j < item.length; j++) {
            if (item[j].url === path) {
              let id = (item[j].id).toString()
              this.activeChild = id
            }
          }
        }
      }
    },
    toString (index) {
      return index.toString()
    },
    go (path) {
      this.$router.push({ path: path })
    }
  }
}
</script>
<style scoped>
.el-menu-vertical-demo{
  height: 100%;
  overflow: auto;
}
.el-aside {
  border-right: solid 1px #e6e6e6
}
.el-menu {
  border-right: none;
  overflow-x: hidden;
}
.is-opened .el-submenu__title,
.is-opened .el-icon-menu,
.is-opened .el-icon-arrow-down {
  color: #3e94e1;
}
.el-submenu__title {
  height: 48px;
  line-height: 48px;
}
.el-submenu__title,
.el-submenu.is-active .el-submenu__title {
  border-bottom: 1px solid #d5d5d5;
}
.el-menu-item-group__title {
  padding: 0;
}
.el-menu-item-group ul {
  border-bottom: 1px solid #d5d5d5;
}
.el-submenu .el-menu-item {
  padding: 0!important;
  height: 44px;
  line-height: 44px;
}
.el-submenu .el-menu-item span {
  display: block;
  padding-left: 40px;
}
.el-menu-item.is-active a {
    color: #409eff;
}
</style>
