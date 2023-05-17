<template>
  <div class="app-container" style="padding-top: 20px">
    <el-descriptions class="margin-top" title="WebSocket测试" :column="1" :size="size" border style="padding-right: 900px" >
      <el-descriptions-item label="发送" :contentStyle='contentStyle' :labelStyle='labelStyle'>
        {{blockSize}}
      </el-descriptions-item>
      <el-descriptions-item label="接收">{{goodSize}}</el-descriptions-item>
    </el-descriptions>
    <el-button>发送</el-button>
  </div>
</template>

<script>
import Layout from "@/layout";

export default {
  name: "test",
  components:  { Layout },
  data(){
    return{
      blockSize:"",
      goodSize:"",
      size: 'medium',
      contentStyle: {
        'text-align': 'left',
      },
      //label样式
      labelStyle: { 'width': '200px' }
    }
  },
}
</script>

<style lang="scss" scoped>
.el-descriptions__body {
  width: 50%;
}
.moreCheck {
  float: right;
  border: none;
  padding: 0;
  height: 38px;
  line-height: 38px;
  font-size: 12px;
  color: #8f8f91;
}
// .showForm{

   // }
.hiddenCheck {
  display: none;
}

.queryForm .el-form-item {
  width: 350px;
  margin-bottom: 0px;
.el-form-item__label {
  font-size: 13px;
}
}
</style>
