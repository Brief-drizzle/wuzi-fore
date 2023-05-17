<template>
  <div class="test3">
    <div style="margin: 20px">
      <el-form ref="form" label-width="80px">
      <el-form-item label="建设单位:">
      <el-select filterable="true" v-model="value" placeholder="请选择建设单位" style="width: 18%;margin-left: 20px">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      </el-form-item>
      </el-form>
      <el-radio-group v-model="labelPosition" label="label position">
        <el-radio-button label="1">10kV</el-radio-button>
        <el-radio-button label="2">110kV</el-radio-button>
        <el-radio-button label="3">220kV</el-radio-button>
      </el-radio-group>
      <el-radio-group v-model="target" label="label position" style="margin-left: 3%">
        <el-radio-button label="1">新建</el-radio-button>
        <el-radio-button label="2">扩容</el-radio-button>
      </el-radio-group>
      <div style="margin: 20px">
        <el-form label-width="150px" :model="foreForm" style="max-width: 70%" ref="foreForm">
          <el-rows>
            <el-col :span="8">
              <el-form-item label="项目总投资" prop="investment">
                <el-input v-model="foreForm.investment" type="text" auto-complete="off"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="电压等级" prop="levels">
                <el-input v-model="foreForm.levels"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="电缆规格" prop="typess">
                <el-input v-model="foreForm.typess"/>
              </el-form-item>
            </el-col>
          </el-rows>

          <el-rows v-show="labelPosition==1">
            <el-col :span="8">
              <el-form-item label="电缆沟">
                <el-input v-model="foreForm.trench"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="电缆分支箱">
                <el-input v-model="foreForm.boxes"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="容量">
                <el-input v-model="foreForm.capacity"/>
              </el-form-item>
            </el-col>
          </el-rows>
          <el-rows v-show="labelPosition==1">
            <el-col :span="8">
              <el-form-item label="柱上开关">
                <el-input v-model="foreForm.switchs"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="台区">
                <el-input v-model="foreForm.district"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="线路架空线">
                <el-input v-model="foreForm.lines"/>
              </el-form-item>
            </el-col>
          </el-rows>
          <el-rows v-show="labelPosition==1">
            <el-col :span="8">
              <el-form-item label="低压线">
                <el-input v-model="foreForm.voltage"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="低压开关柜">
                <el-input v-model="foreForm.voltageSwitch"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="配电站">
                <el-input v-model="foreForm.distribution"/>
              </el-form-item>
            </el-col>
          </el-rows>
          <el-rows v-show="labelPosition==1">
            <el-col :span="8">
              <el-form-item label="配变">
                <el-input v-model="foreForm.variation"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="配变容量">
                <el-input v-model="foreForm.variationCapacity"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="中压线路">
                <el-input v-model="foreForm.mid"/>
              </el-form-item>
            </el-col>
          </el-rows>
          <el-rows v-show="labelPosition==1">
            <el-col :span="8">
              <el-form-item label="无功补偿" prop="compensate">
                <el-input v-model="foreForm.compensate"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开关站" prop="switchPlat">
                <el-input v-model="foreForm.switchPlat"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开关柜" prop="switchcabinet">
                <el-input v-model="foreForm.switchcabinet"/>
              </el-form-item>
            </el-col>
          </el-rows>

          <el-rows v-show="labelPosition!=1">
            <el-col :span="8">
              <el-form-item label="本期主电容量">
                <el-input v-model="foreForm.mainCapacitance"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="本期变电容量">
                <el-input v-model="foreForm.subCapacitance"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="线路长度">
                <el-input v-model="foreForm.lengths"/>
              </el-form-item>
            </el-col>
          </el-rows>
          <el-rows v-show="labelPosition!=1">
            <el-col :span="8">
              <el-form-item label="本期主变台数">
                <el-input v-model="foreForm.mainVariants"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="电缆截面">
                <el-input v-model="foreForm.sections"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="本期配套线路长度">
                <el-input v-model="foreForm.lineLength"/>
              </el-form-item>
            </el-col>
          </el-rows>
          <el-rows v-show="labelPosition!=1">
            <el-col :span="24">
              <el-form-item label="本期线路长度">
                <el-input v-model="foreForm.thisLineLength"/>
              </el-form-item>
            </el-col>
          </el-rows>
          <el-rows>
            <el-col :span="8">
              <el-form-item style="width: 100%;margin-bottom: 20px">
                <el-button size="medium" type="primary" style="margin: 0" @click.native.prevent="test3">
                  <span>测试</span>
                </el-button>
              </el-form-item>
            </el-col>
          </el-rows>
        </el-form>

        <div style="margin: 20px;max-width: 70%">
          <el-table v-loading="loading" :data="testList" border :default-sort = "{prop: 'name', order: 'descending'}" height="270">
            <el-table-column sortable label="设备名称" prop="name" align="center"/>
            <el-table-column sortable label="需求数量" prop="data" align="center"/>
          </el-table>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {getForecastTest} from "@/api/test/test"

export default {
  name: "test3",
  data() {
    return {
      labelPosition: "1",
      target: "1",
      loading: false,
      datas: null,
      foreForm: {
        switchcabinet: null,
        switchPlat: null,
        compensate: null,
        mid: null,
        variationCapacity: null,
        variation: null,
        distribution: null,
        voltageSwitch: null,
        voltage: null,
        lines: null,
        district: null,
        switchs: null,
        capacity: null,
        boxes: null,
        trench: null,
        typess: null,
        levels: null,
        investment: null,
        thisLineLength: null,
        lineLength: null,
        sections: null,
        mainVariants: null,
        lengths: null,
        subCapacitance: null,
        mainCapacitance: null
      },
      testList: null,
      options: [{value: '选项1', label: '广西电网公司本部'
      }, {value: '选项2', label: '广西新电力投资集团有限责任公司'
      }, {value: '选项3', label: '广西电网公司电网建设分公司'
      }, {value: '选项4', label: '规划发展部'
      }, {value: '选项5', label: '百色供电局'
      }, {value: '选项5', label: '百色平果供电局'
      }, {value: '选项2', label: '北海供电局'
      }, {value: '选项3', label: '崇左供电局'
      }, {value: '选项4', label: '防城港东兴供电局'
      }, {value: '选项5', label: '防城港供电局'
      }, {value: '选项5', label: '贵港供电局'
      }, {value: '选项2', label: '桂林供电局'
      }, {value: '选项3', label: '河池供电局'
      }, {value: '选项4', label: '贺州供电局'
      }, {value: '选项5', label: '来宾供电局'
      }, {value: '选项5', label: '柳州供电局'
      }, {value: '选项2', label: '南宁宾阳供电局'
      }, {value: '选项3', label: '南宁供电局'
      }, {value: '选项4', label: '南宁邕宁供电局'
      }, {value: '选项5', label: '钦州供电局'
      }, {value: '选项5', label: '梧州供电局'
      }, {value: '选项5', label: '玉林供电局'
      }, {value: '选项5', label: '玉林陆川供电局'
      }],
      value: ''
    }
  },
  methods: {
    test3() {
      this.loading = true;
      if (this.labelPosition == "1") {
        this.datas = this.foreForm.investment + "," + this.foreForm.levels + "," + this.foreForm.trench + "," + this.foreForm.boxes + "," +
            this.foreForm.capacity + "," + this.foreForm.switchs + "," + this.foreForm.district + "," +
            this.foreForm.lines + "," + this.foreForm.voltage + "," + this.foreForm.voltageSwitch + "," +
            this.foreForm.distribution + "," + this.foreForm.variation + "," + this.foreForm.variationCapacity + "," + this.foreForm.mid + "," +
            this.foreForm.compensate + "," + this.foreForm.switchPlat + "," + this.foreForm.switchcabinet
      } else {
        this.datas = this.foreForm.investment + "," + this.foreForm.levels + "," + this.foreForm.mainCapacitance + "," + this.foreForm.subCapacitance
            + "," + this.foreForm.lengths + "," + this.foreForm.typess + "," + this.foreForm.mainVariants + "," + this.foreForm.sections
            + "," + this.foreForm.lineLength + "," + this.foreForm.thisLineLength
      }
      console.log("target" + this.target)
      console.log("label" + this.labelPosition)
      console.log("data" + this.datas)
      getForecastTest(this.labelPosition, this.target, this.datas).then((response) => {
        this.testList = response.params;
        console.log(response)
        this.loading = false;
      })
    }
  }
}
</script>

<style scoped>

</style>
