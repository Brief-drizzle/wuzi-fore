<template>
  <div class="test">
    <div style="margin: 20px">
      <el-form
          ref="inputForm"
          :model="inputForm"
          :rules="rules"
      >
        <el-form-item prop="chara" label="项目特征（容量/线路长度）">
          <el-input
              v-model="inputForm.chara"
              type="text"
              placeholder="请输入"
              auto-complete="off"
              style="width: 50%"
          >
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="money" label="项目投资金额">
          &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
          <el-input
              v-model="inputForm.money"
              type="text"
              auto-complete="off"
              placeholder="请输入"
              style="width: 50%;"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="chara" label="模拟数据矩阵(历史项目序列)：输入历史的项目数列，包括其容量、总投资金额、需求数量和主要物资需求情况。每个项目数据用','隔开，各项目之间用';'隔开">
          <el-input
              v-model="inputForm.data"
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
              @click.native.prevent="test"
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
import {getTest} from "@/api/test/test"
export default {
  name: "test",
  data(){
    return{
      loading: false, //table请求数据遮罩层
      testList: null,
      inputForm:{
        chara:null,
        money:null,
        data:null
      },
      rules: {
        chara: [{required: true, message: '请输入项目特征：主网（容量）/配网（线路长度）', trigger: 'blur'}],
        money: [{required: true, message: '请输入项目投资金额', trigger: 'blur'}],
        data: [{required: true, message: '请输入模拟数据矩阵', trigger: 'blur'}],
      }
    }
  },
  methods:{
    test(){
      this.$refs.inputForm.validate((valid) =>{
        if (valid){
          this.loading = true;
          getTest(this.inputForm.chara,this.inputForm.money,this.inputForm.data).then(
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
