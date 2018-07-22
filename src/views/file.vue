<template>
  <div id="app">
    <div @click="uploadFile">
    点击我上传文件
    </div>
    <div>
      <el-upload
        class="upload-demo"
        action="http://119.23.18.224:168/file/fileupload"
        name="myFile"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">大小不超过500mb</div>
      </el-upload>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      fileList: []//{name: '123.jjg', url: 'qnmdurl'}
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  }
}
</script>


<style>

</style>
