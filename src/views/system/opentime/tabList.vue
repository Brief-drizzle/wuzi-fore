<template>
  <div style="display: flex">
    <el-card class="box-card" style="width: 70%">
      <el-table :data="stepData" border style="width: 100%" :key="key">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column
          label="时间段名称"
          prop="stepName"
          width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column label="开始时间" align="center">
          <template slot-scope="scope">
            <span v-if="!scope.row.isSet">{{ scope.row.stepBeginTime }}</span>
            <el-date-picker
              v-else
              v-model="scope.row.stepBeginTime"
              type="date"
              size="mini"
              placeholder="选择日期"
              style="width: 100%"
              value-format="yyyy/MM/dd"
            >
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column label="结束时间" align="center">
          <template slot-scope="scope">
            <span v-if="!scope.row.isSet">{{ scope.row.stepEndTime }}</span>
            <el-date-picker
              v-else
              v-model="scope.row.stepEndTime"
              type="date"
              size="mini"
              placeholder="选择日期"
              style="width: 100%"
              value-format="yyyy/MM/dd"
            >
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="120" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.stepState === 1" class="status">
              <span class="status-dot"></span>
              <span style="margin-left: 5px">开放中</span>
            </span>
            <span v-if="scope.row.stepState === 0" class="status">
              <span class="status-dot" style="background-color: #ff4d4f"></span>
              <span style="margin-left: 5px">已关闭</span>
            </span>
            <span v-if="scope.row.stepState === 2" class="status">
              <span class="status-dot" style="background-color: #52c41a"></span>
              <span style="margin-left: 5px">待开放</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="160"
          class-name="small-padding fixed-width"
          fixed="right"
          v-if="this.$route.name == '开放时间管理'"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-view"
              @click="handleSet(scope.$index)"
              >设置</el-button
            >
            <el-button
              size="mini"
              type="text"
              icon="el-icon-thumb"
              @click="handleSave(scope.$index)"
              >保存</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="box-card" style="width: 30%; margin-left: 30px"></el-card>
  </div>
</template>

<script>
export default {
  props: {
    stepData: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  data() {
    return {
      key: undefined,
    };
  },

  methods: {
    handleSet(index) {
      this.stepData[index].isSet = true;
      this.key = new Date() + "";
    },
    handleSave(index) {
      this.stepData[index].isSet = false;
      this.key = new Date() + "";
    },
  },
};
</script>

<style lang='scss' scoped>
.status {
  position: relative;
  display: inline-block;
  .status-dot {
    background-color: #1890ff;
    top: -1px;
    display: inline-block;
    width: 6px;
    height: 6px;
    vertical-align: middle;
    border-radius: 50%;
    margin-left: 5px;
  }
}
</style>