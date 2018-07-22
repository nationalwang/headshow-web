<template>
  <div class="mainBox">
    <Levelbar class=""></Levelbar>
    <transition mode="out-in" enter-active-class="fadeIn" leave-active-class="fadeOut" appear>
      <div class="scroll">
        <keep-alive>
          <router-view class="animated"></router-view>
        </keep-alive>
      </div>
    </transition>
  </div>
</template>

<script>
import Levelbar from './Levelbar'
export default {
  components: {
    Levelbar
  }
}
</script>

<style scoped>
.animated{
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.animated>>>.el-container{
  height: 100%;
}
.mainBox{
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.scroll{
  height: 0;
  flex-grow: 1;
  overflow-y: auto;
}
</style>
