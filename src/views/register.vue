<template>
  <div class="register">
    <div class="bgimg">
      <div class="title">
        <span>申报单位注册</span>
      </div>
    </div>
    <div class="registerForm" style="margin-top: -70px">
      <el-form
        ref="registerForm"
        :model="registerForm"
        :rules="registerRules"
        class="register-form"
        label-position="right"
        label-width="120px"
      >
        <!-- 主管单位 -->
        <el-form-item label="主管单位" prop="superUnit">
          <el-select
            v-model="registerForm.superUnit"
            filterable
            placeholder="输入主管单位关键字"
            clearable
            size="small"
            style="width: 435px"
          >
            <el-option
              v-for="dict in units"
              :key="dict.adminId"
              :label="dict.adminName"
              :value="dict.adminName"
            />
          </el-select>
        </el-form-item>
        <!-- 承担单位全称 -->
        <el-form-item label="申报单位全称" prop="reportUnit">
          <el-input
            v-model="registerForm.reportUnit"
            type="text"
            auto-complete="off"
            placeholder="申报单位全称"
          >
          </el-input>
        </el-form-item>
        <!-- 用户名 -->
        <el-form-item prop="username" label="用户名">
          <el-input
            v-model="registerForm.username"
            type="text"
            auto-complete="off"
            placeholder="请输入用户名"
           
          >
            <!-- -->
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password" label="密码">
          <el-input
            v-model="registerForm.password"
            type="password"
            auto-complete="off"
            placeholder="密码"
          >
          </el-input>
          <PasswordStrength
            v-model="registerForm.password"
            v-if="registerForm.password != ''"
          ></PasswordStrength>
        </el-form-item>

        <!-- 确认密码 -->
        <el-form-item prop="confirmPassword" label="确认密码">
          <el-input
            v-model="registerForm.confirmPassword"
            type="password"
            auto-complete="off"
            placeholder="确认密码"
          >
          </el-input>
        </el-form-item>
        <!-- 单位法人代码 -->
        <el-form-item label="单位法人代码">
          <el-input
            v-model="registerForm.jurCode"
            type="text"
            auto-complete="off"
            placeholder="单位法人代码"
          >
          </el-input>
        </el-form-item>
        <!-- 法人代表姓名 -->
        <el-form-item label="法人代表姓名">
          <el-input
            v-model="registerForm.jurName"
            type="text"
            auto-complete="off"
            placeholder="法人代表姓名"
          >
          </el-input>
        </el-form-item>
        <!-- 法人联系手机 -->
        <el-form-item label="法人联系手机" prop="jurPhone">
          <el-input
            v-model="registerForm.jurPhone"
            type="text"
            auto-complete="off"
            placeholder="法人联系手机"
          >
          </el-input>
        </el-form-item>
        <!-- 单位联系人姓名 -->
        <el-form-item label="单位联系人姓名">
          <el-input
            v-model="registerForm.name"
            type="text"
            auto-complete="off"
            placeholder="单位联系人姓名"
          >
          </el-input>
        </el-form-item>
        <!-- 身份证号 -->
        <el-form-item label="联系人身份证号" prop="card">
          <el-input
            v-model="registerForm.card"
            type="text"
            auto-complete="off"
            placeholder="联系人身份证号"
          >
          </el-input>
        </el-form-item>
        <!-- 联系人手机号 -->
        <el-form-item label="联系人手机" prop="phone">
          <el-input
            v-model="registerForm.phone"
            type="text"
            auto-complete="off"
            placeholder="联系人手机"
          >
          </el-input>
        </el-form-item>
        <!-- 联系邮箱 -->
        <el-form-item label="单位邮箱" prop="email">
          <el-input
            v-model="registerForm.email"
            type="text"
            auto-complete="off"
            placeholder="单位邮箱"
          >
          </el-input>
        </el-form-item>
        <!-- 单位详细地址 -->
        <el-form-item label="单位地址">
          <el-input
            v-model="registerForm.position"
            type="text"
            auto-complete="off"
            placeholder="单位地址"
          >
          </el-input>
        </el-form-item>
        <div>
          <el-button type="primary" @click.native.prevent="handleRegister"
            >提交</el-button
          >
        </div>
      </el-form>
    </div>
    <div class="el-register-footer">
      <span>Copyright © 2021-2022 ruoyi.vip All Rights Reserved.</span>
    </div>
  </div>
</template>

<script>
import { getUnits, register, isRepeatName } from "@/api/login";
import PasswordStrength from "../components/PasswordGrade";

export default {
  name: "Register",
  components: {
    PasswordStrength,
  },
  created() {
    this.GetUnits();
  },
  methods: {
    GetUnits() {
      getUnits().then((res) => {
        this.units = res.adminsIdandNames;
      });
    },
    
    handleRegister() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          register(this.registerForm)
            .then((res) => {
              console.log(res);
              this.$confirm("提交完成！等待上级部门审批通过！！！", "提示", {
                confirmButtonText: "确定",
                type: "warning",
              }).then(() => {
                this.$router.push("/login");
              });
            })
            .catch((err) => {
              console.log(err);
              this.$message({
                message: "注册失败！！！",
                type: "success",
              });
            });
        } else {
          console.log("校验失败");
        }
      });
    },
  },
  data() {
    const equalToPassword = (rule, value, callback) => {
      if (this.registerForm.password !== value) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };

    const checkPhone = (rule, value, callback) => {
      if (value != "") {
        let reg = /^1[345789]\d{9}$/;
        if (!reg.test(value)) {
          callback(new Error("请输入11位手机号"));
        } else {
          callback();
        }
      }
      callback();
    };
    const checkRepeatName = async (rule, value, callback) => {
      const data = {
        userId: value,
      };
      await isRepeatName(data)
        .then((res) => {
          callback();
        })
        .catch(() => {
          callback(new Error("用户名已存在！"));
        });
    };

    return {
      registerForm: {
        superUnit: "",
        reportUnit: "",
        username: "",
        password: "",
        confirmPassword: "",
        name: "",
        card: "",
        phone: "",
        email: "",
        position: "",
        jurCode: "", //单位法人代码
        jurName: "",
        jurPhone: "",
      },

      // 下拉菜单选项
      units: [],
      registerRules: {
        superUnit: [
          {
            required: true,
            trigger: "blur",
            message: "请输入您的上级主管单位",
          },
        ],
        reportUnit: [
          { required: true, trigger: "blur", message: "请输入单位全称" },
        ],
        username: [
          { required: true, trigger: "blur", message: "请输入您的用户名" },
          {
            min: 5,
            max: 20,
            message: "用户名长度必须介于 5 和 20 之间",
            trigger: "blur",
          },
          { required: true, validator: checkRepeatName, trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不得为空！", trigger: "blur" },
          {
            min: 5,
            max: 18,
            message: "长度在 5 到 18 个字符",
            trigger: "blur",
          },
        ],
        confirmPassword: [
          { required: true, trigger: "blur", message: "请再次输入您的密码" },
          { required: true, validator: equalToPassword, trigger: "blur" },
        ],
        card: [
          { required: true, message: "请输入身份证ID", trigger: "blur" },
          {
            pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
            message: "你的身份证格式不正确",
            trigger: "blur",
          },
        ],
        email: [
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        phone: [
          {
            type: "number",
            validator: checkPhone,
            message: "请输入正确的手机号",
          },
        ],
        jurPhone: [
          {
            type: "number",
            validator: checkPhone,
            message: "请输入正确的手机号",
          },
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.register {
  width: 100%;
  background: #f2f2f2;
  position: relative;

  .bgimg {
    background: url("../assets/images/bg.png");
    height: 200px;

    .title {
      height: 100%;
      font-size: 30px;
      color: white;
      line-height: 100px;
      margin-left: 305px;
    }
  }

  .registerForm {
    margin-top: -70px;
    zoom: 1;
    width: 1200px;
    margin: 20px auto;
    background: #fff;
    min-height: 758px;
    padding: 30px 20px 0;
  }
}

.register-form {
  border-radius: 6px;
  background: #ffffff;
  width: 800px;
  margin: auto;
  padding: 25px 25px 85px 25px;

  .el-form-item__label {
    font-size: 15px;
  }
  .el-input {
    width: 435px;
  }
  .el-button {
    width: 180px;
    height: 55px;
    font-size: 19px;
    color: #ffffff;

    line-height: 55px;

    padding: 0px;
    float: none;
    margin: auto;
    position: absolute;
    left: 50%;
    margin-left: -140px;
  }
}

.el-register-footer {
  height: 40px;
  line-height: 40px;
  width: 100%;
  text-align: center;
  color: #333;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
</style>