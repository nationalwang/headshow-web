<template>
  <div>
    <el-tabs
      v-model="activeValue" type="card" closable @tab-click="tabChange"
      @edit="handleTabsEdit" @contextmenu.native.prevent="shouMenu" @click.native="hideRightMenu"
    >
      <el-tab-pane v-for="(item, index) in tabsList" :key="index" :label="item.label" :name="item.name"></el-tab-pane>
    </el-tabs>
    <ul class="rightMenu" v-show="isShowMenu" :style="rightMenuStyle">
      <li v-for="(item, index) in rightMenu" :key="index" @click="clickMenu(index)">{{item}}</li></ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      activeValue: 'Home',
      isShowMenu: false,
      rightMenu: ['刷新当前', '关闭当前', '关闭其它', '关闭所有'],
      rightMenuIndex: null,
      rightMenuStyle: {
        top: '',
        left: ''
      },
      pathList: [
        '/interface/manage',
        '/interface/InterfaceLog',
        '/cms/manage',
        '/cms/ContentEditor',
        '/cms/ContentPreview'
      ]
    }
  },
  computed: {
    ...mapState({
      tabsList: state => state.tabs.list.tabsList,
      editableTabsValue: state => state.tabs.list.value
    })
  },
  created () {
    this.watchRoute()
  },
  watch: {
    editableTabsValue () {
      this.activeValue = this.editableTabsValue
    },
    '$route': 'watchRoute'
  },
  methods: {
    watchRoute () { // 监听路由变化
      let name = this.$route.name
      let path = this.$route.path
      if (name === 'RefreshPage') { return false }
      let label = this.$route.meta.label
      let matched = this.$route.matched.filter(item => item.name)
      let first = matched[0]
      let tabsList = this.$store.state.tabs.list.tabsList.slice()
      if (first.parent && (first.meta.label !== first.parent.meta.label)) { // 跳转子路由
        this.$store.dispatch('tabs/getList', {type: 'UPDATE', name: path, obj: tabsList, index: this.activeValue})
      } else {
        let temp = {
          name: name,
          label: label,
          path: first.path
        }
        if (tabsList.filter(tab => tab.name === name).length === 0) {
          tabsList.push(temp)
          this.$store.dispatch('tabs/getList', {type: 'ADD', name: '', obj: tabsList, index: name})
        } else {
          this.$store.dispatch('tabs/getList', {type: 'ADD', name: '', obj: tabsList, index: name})
        }
      }
    },
    tabChange () {
      let activeTabs = this.tabsList.filter(item => item.name === this.activeValue)
      if (activeTabs[0].path) {
        this.$router.push({ path: activeTabs[0].path })
      } else {
        this.$router.push({ name: activeTabs[0].name })
      }
    },
    handleTabsEdit (targetName, action) {
      if (action === 'remove') { this.deteleTabs(targetName) }
    },
    shouMenu (e) { // 显示右键菜单
      let firstId = e.srcElement.id
      if (firstId !== '') {
        this.isShowMenu = true
        this.rightMenuStyle = {
          top: e.pageY + 'px',
          left: e.pageX + 'px'
        }
        let parentChild = e.srcElement.parentElement.childNodes
        for (let i = 0; i < parentChild.length; i++) {
          if (parentChild[i].id === firstId) {
            this.rightMenuIndex = i
            break
          }
        }
      } else {
        this.isShowMenu = false
        this.rightMenuIndex = null
      }
    },
    clickMenu (index) { // 选中右键菜单
      this.isShowMenu = false
      let targetName = this.tabsList[this.rightMenuIndex].name
      switch (index) {
        case 0: // 刷新当前
          let path = this.$route.path
          let query = this.$route.query
          if (this.pathList.filter(item => item === path).length > 0) {
            query.path = path
            this.$router.push({name: 'RefreshPage', params: query})
          } else {
            this.$router.push({name: 'RefreshPage', params: {routeName: targetName}})
          }
          break
        case 1: // 关闭当前
          this.deteleTabs(targetName)
          break
        case 2: // 关闭其他
          let tabsList = this.$store.state.tabs.list.tabsList.slice()
          let data = []
          data.push(tabsList[0])
          if (this.rightMenuIndex > 0) {
            data.push(tabsList[this.rightMenuIndex])
          }
          this.$router.push({ name: targetName })
          this.$store.dispatch('tabs/getList', {type: 'ADD', name: '', obj: data, index: targetName})
          break
        case 3: // 关闭所有
          this.$store.dispatch('tabs/getList', {type: 'EMPTY'})
          this.$router.push({ name: 'Home' })
          break
        default:
          break
      }
    },
    hideRightMenu () {
      this.isShowMenu = false
    },
    deteleTabs (targetName) { // 删除tabs指定项
      if (targetName !== 'Home') {
        let tabs = this.tabsList
        let activeName = this.editableTabsValue
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) { activeName = nextTab.name }
            }
          })
        }
        this.$store.dispatch('tabs/getList', {type: 'DETELE', name: targetName, index: activeName})
        this.$router.push({ name: activeName })
      }
    }
  }
}
</script>

<style scoped>
.el-tabs{
  box-shadow: 0px 1px 11px #ccc;
}
div>>> .el-tabs__header{
  margin: 0;
  box-shadow: 0px 1px 11px rgba(107 107, 107, .42);
}
.el-tabs__nav .el-tabs__item:first-child .el-icon-close {
  display: none;
}
.rightMenu {
  display: inline-block;
  border-radius: 6px;
  box-shadow: 0px 1px 11px #ccc;
  padding: 4px 0;
  position: fixed;
  background: #fff;
  z-index: 999;
}
.rightMenu li {
  font-size: 14px;
  height: 28px;
  line-height: 28px;
  padding: 0 14px;
  color: #3a3939;
  cursor: pointer;
}
.rightMenu li:hover {
  color: #3e94e1;
}
</style>
