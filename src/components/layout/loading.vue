<template>
  <div class="box">
    <div><i class="el-icon-loading"></i><p>{{text}}</p></div>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: 'Loading...'
    }
  }
}
</script>
<style scoped>
.box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  z-index: 9999;
  color: #409eff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: all 1s;
}
.box div {
  margin-top: -20px;
}

.box i {
  font-size: 20px;
  margin-bottom: 10px;
}

.box p {
  font-size: 16px;
}
</style>
