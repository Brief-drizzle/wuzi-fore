<template>
  <div class="app-container">
    <el-tabs v-model="activeName" tab-position="left" @tab-click="handleClick">
      <el-tab-pane label="成果库" name="resBase">
        <tab-list :stepData="stepData" ></tab-list>
      </el-tab-pane>
      <el-tab-pane label="项目库" name="proBase">
        <tab-list :stepData="stepData"></tab-list>
      </el-tab-pane>
      <el-tab-pane label="绩效库" name="perforBase"
        ><tab-list :stepData="stepData" ></tab-list
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import tabList from "./tabList.vue";
export default {
  components: { tabList },
  data() {
    return {
      activeName: "resBase",
      stepData: undefined,
      allStepData: [],
      
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      //发送请求
      this.allStepData = {
        resStepData: [
          {
            stepName: "	用户注册",
            stepBeginTime: "2018/12/20",
            stepEndTime: "2022/12/30",
            stepState: 1,
          },
          {
            stepName: "	用户申报",
            stepBeginTime: "2016/01/20",
            stepEndTime: "2021/12/30",
            stepState: 1,
          },
          {
            stepName: "主管部门审查",
            stepBeginTime: "2018/12/20",
            stepEndTime: "2022/12/30",
            stepState: 1,
          },
          {
            stepName: "推广处初审",
            stepBeginTime: "2016/01/20",
            stepEndTime: "2021/12/30",
            stepState: 1,
          },
          {
            stepName: "专家审查",
            stepBeginTime: "2016/01/20",
            stepEndTime: "2021/12/30",
            stepState: 1,
          },
          {
            stepName: "推广处终审",
            stepBeginTime: "2016/01/20",
            stepEndTime: "2021/12/30",
            stepState: 1,
          },
        ],
        proStepData: [
          {
            stepName: "	用户注册",
            stepBeginTime: "2018/12/30",
            stepEndTime: "2022/12/30",
            stepState: 0,
          },
        ],
      };

      this.allStepData.resStepData.forEach((obj, i) => {
        obj.isSet = false;
      });
      this.allStepData.proStepData.forEach((obj, i) => {
        obj.isSet = false;
      });
      this.stepData = this.allStepData.resStepData;
    },
    handleClick(attr) {
      if (attr.label == "成果库") {
        this.stepData = this.allStepData.resStepData;
       
      } else if (attr.label == "项目库") {
        this.stepData = this.allStepData.proStepData;
        
      }
    },
  },
};
</script>

<style>
</style>