<template>
  <el-form
    ref="form"
    id="userInfo"
    :model="userInfo"
    :rules="rules"
    label-width="100px"
  >
    <template v-if="userInfo.role != '专家'">
      <el-form-item label="单位名称" prop="username">
        <el-input v-model="userInfo.username" maxlength="11" />
      </el-form-item>
      <el-form-item label="单位邮箱" prop="email">
        <el-input v-model="userInfo.email" maxlength="50" />
      </el-form-item>
      <el-form-item label="单位联系人" prop="adminName">
        <el-input v-model="userInfo.adminName" maxlength="50" />
      </el-form-item>
      <el-form-item label="联系人手机" prop="adminPhone">
        <el-input v-model="userInfo.adminPhone" maxlength="50" />
      </el-form-item>
    </template>
    <template v-else>
      <el-form-item label="专家姓名" prop="username">
        <el-input v-model="userInfo.username" maxlength="11" />
      </el-form-item>
      <el-form-item label="专家邮箱" prop="email">
        <el-input v-model="userInfo.email" maxlength="50" />
      </el-form-item>
      <el-form-item label="专家手机" prop="adminPhone">
        <el-input v-model="userInfo.adminPhone" maxlength="50" />
      </el-form-item>
      <el-form-item label="熟悉专业" prop="major">
        <el-input v-model="userInfo.major" maxlength="50" />
      </el-form-item>
      <el-form-item label="研究领域" prop="field">
        <el-input v-model="userInfo.field" maxlength="50" />
      </el-form-item>
    </template>
    <el-form-item>
      <el-button type="primary" size="mini" @click="submit">保存</el-button>
      <el-button type="danger" size="mini" @click="close">关闭</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { updateUserProfile } from "@/api/system/user";
import { getUserProfile } from "@/api/system/user";
// import { MessageBox } from "element-ui";
export default {
  data() {
    return {
      userInfo: {},
      // 表单校验
      rules: {
        adminName: [
          { required: true, message: "单位联系人不能为空", trigger: "blur" },
        ],
        username: [
          { required: true, message: "单位名称不能为空", trigger: "blur" },
        ],
        email: [
          { required: true, message: "邮箱地址不能为空", trigger: "blur" },
          {
            type: "email",
            message: "'请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        adminPhone: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
      },
      userParams:{}
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    // 获取信息
    getUser() {
      getUserProfile().then((response) => {
        this.userInfo = response.role;
      });
    },
    submit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.$modal
            .confirm("是否确定要修改基本信息")
            .then(() => {
             
              if (this.userInfo.role != "专家") {
                this.userParams = {
                  userId: this.userInfo.user_id,
                  name: this.userInfo.username,
                  phone: this.userInfo.adminPhone,
                  email: this.userInfo.email,
                  unitName: this.userInfo.username,
                };
              } else {
                this.userParams = {
                  userId: this.userInfo.user_id,
                  name: this.userInfo.username,
                  phone: this.userInfo.adminPhone,
                  email: this.userInfo.email,
                  major: this.userInfo.major,
                  field: this.userInfo.field,
                };
              }
              console.log(this.userParams);
              updateUserProfile(this.userParams)
                .then((response) => {
                  this.$modal.msgSuccess("修改成功");
                  this.$emit("fatherMethod");
                })
                .catch(() => {
                  this.$modal.msgError("修改失败!");
                });
            })
            .catch(() => {});
        }
      });
    },
    close() {
      this.$store.dispatch("tagsView/delView", this.$route);
      this.$router.push({ path: "/index" });
    },
  },
};
</script>
<style lang='scss' coped>
#userInfo .el-input__inner {
  color: #a5a8ad;
}

#userInfo .el-input input:focus {
  color: #303133;
}
</style>
