<template>
  <div class="test1">
    <div style="margin: 20px">
      <el-form
          ref="inputForm2"
          :model="inputForm2"
          :rules="rules"
      >
        <el-form-item prop="chara" label="影响因素矩阵: 每个项目特征，主网项目（容量+总投资金额）/配网项目（线路长度+总投资金额），（容量/线路长度）和投资金额之间用','隔开，各项目之间用';'隔开">
          <el-input
              v-model="inputForm2.chara"
              type="textarea"
              auto-complete="off"
              placeholder="请输入"
          >
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="result" label="预测物资信息: 每类项目多个物资的历史需求量，各物资之间用','隔开，各项目之间用';'隔开">
          <el-input
              v-model="inputForm2.result"
              type="textarea"
              auto-complete="off"
              placeholder="请输入"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="forecast" label="预测影响因素: 本年度即将投资的该类型所有项目特征，主网项目（容量+总投资金额）/配网项目（线路长度+总投资金额），容量/线路长度和投资金额之间用','隔开，各项目之间用';'隔开">
          <el-input
              v-model="inputForm2.forecast"
              type="textarea"
              auto-complete="off"
              placeholder="请输入"
          >
          </el-input>
        </el-form-item>
        <el-form-item style="width: 100%;margin-bottom: 1px;">
          <el-button
              size="medium"
              type="primary"
              style="margin: 0"
              @click.native.prevent="test1"
          >
            <span >测试</span>
          </el-button>
        </el-form-item>
      </el-form>
    </div>


    <div style="margin: 20px">
      <el-table
          v-loading="loading"
          :data="testList"
          border
      >
        <el-table-column label="名称" prop="name" align="center"/>
        <el-table-column label="数量" prop="data" align="center"/>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getForeTest } from "@/api/test/test"
export default {
  name: "test2",
  data(){
    return{
      loading: false, //table请求数据遮罩层
      testList: null,
      inputForm2:{
        chara:null,
        result:null,
        forecast:null
      },
      rules: {
        chara: [{required: true, message: '请输入影响因素矩阵', trigger: 'blur'}],
        result: [{required: true, message: '请输入预测物资信息', trigger: 'blur'}],
        forecast: [{required: true, message: '请输入预测影响因素', trigger: 'blur'}],
      }
    }
  },
  methods:{
    test1(){
      this.$refs.inputForm2.validate((valid) => {
        if (valid) {
          this.loading = true;
          getForeTest(this.inputForm2.chara, this.inputForm2.result, this.inputForm2.forecast).then(
              (response) => {
                this.testList = response.params;
                console.log(response)
                this.loading = false;
              }
          )
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
