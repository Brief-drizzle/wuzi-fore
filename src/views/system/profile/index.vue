<template>
  <!-- 2022年2月28日09:08:08 -->
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="8" :xs="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>用户信息</span>
          </div>
          <div>
            <!-- 头像部分 -->
            <div class="text-center">
              <!-- <img
                :src="avatar"
                class="user-avatar"
                style="width: 40px; height: 40px"
              /> -->
              <userAvatar :user="user" />
            </div>
            <!-- 信息列表 -->
            <ul
              class="list-group list-group-striped"
              v-if="
                user.role === '未开通的申报单位' ||
                user.role === '申报单位' ||
                user.role === '初审单位'
              "
            >
              <!-- 用户名称 -->
              <li class="list-group-item">
                <svg-icon icon-class="user" class="svg-left" />用户昵称
                <div class="pull-right">{{ user.user_id }}</div>
              </li>
              <!-- 单位名称 -->
              <li class="list-group-item">
                <svg-icon icon-class="unit" class="svg-left" />单位名称
                <div class="pull-right">{{ user.username }}</div>
              </li>
              <!-- 用户类别 -->
              <li class="list-group-item">
                <svg-icon icon-class="role" class="svg-left" />所属角色
                <div class="pull-right">{{ user.role }}</div>
              </li>

              <!-- 主管单位 -->
              <li class="list-group-item">
                <svg-icon
                  icon-class="supper
                "
                  class="svg-left"
                />上级主管单位
                <div class="pull-right">{{ user.super }}</div>
              </li>
              <!-- 主管单位联系人 -->
              <li class="list-group-item">
                <svg-icon
                  icon-class="linker"
                  class="svg-left"
                />上级主管单位联系人
                <div class="pull-right">{{ user.super_name }}</div>
              </li>
              <!-- 联系人手机 -->
              <li class="list-group-item">
                <svg-icon
                  icon-class="phone"
                  class="svg-left"
                />上级主管联系人手机
                <div class="pull-right">{{ user.super_phone }}</div>
              </li>

              <!-- 注册时间 -->
              <li class="list-group-item">
                <svg-icon icon-class="regDate" class="svg-left" />注册时间
                <div class="pull-right">{{ user.createTime }}</div>
              </li>
            </ul>
            <ul
              class="list-group list-group-striped"
              v-if="user.role == '专家'"
            >
              <li class="list-group-item">
                <svg-icon icon-class="user" class="svg-left" />用户昵称
                <div class="pull-right">{{ user.user_id }}</div>
              </li>
              <!-- 用户类别 -->
              <li class="list-group-item">
                <svg-icon icon-class="role" class="svg-left" />所属角色
                <div class="pull-right">{{ user.role }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="user" class="svg-left" />专家姓名
                <div class="pull-right">{{ user.username }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="user" class="svg-left" />单位名称
                <div class="pull-right">{{ user.super }}</div>
              </li>
              <!-- 注册时间 -->
              <li class="list-group-item">
                <svg-icon icon-class="regDate" class="svg-left" />注册时间
                <div class="pull-right">{{ user.createTime }}</div>
              </li>
            </ul>
            <ul
              class="list-group list-group-striped"
              v-if="user.role == '推广处'"
            >
              <li class="list-group-item">
                <svg-icon icon-class="user" class="svg-left" />用户昵称
                <div class="pull-right">{{ user.user_id }}</div>
              </li>
              <!-- 用户类别 -->
              <li class="list-group-item">
                <svg-icon icon-class="role" class="svg-left" />所属角色
                <div class="pull-right">{{ user.role }}</div>
              </li>
       
              <!-- 注册时间 -->
              <li class="list-group-item">
                <svg-icon icon-class="regDate" class="svg-left" />注册时间
                <div class="pull-right">{{ user.createTime }}</div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <!-- 基本资料 -->
      <el-col :span="16" :xs="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>修改基本资料</span>
          </div>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="基本资料" name="userinfo">
              <userInfo @fatherMethod="getUser"/>
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="resetPwd">
              <resetPwd :user="user" />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import avatarImg from "@/assets/images/avator.png";
import resetPwd from "./components/resetPwd.vue";
import userInfo from "./components/userInfo";
import { getUserProfile } from "@/api/system/user";
import userAvatar from "./components/userAvatar.vue";

export default {
  components: { resetPwd, userInfo, userAvatar },
  data() {
    return {
      activeTab: "userinfo",
      user: {},
      avatar: avatarImg,
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      getUserProfile().then((response) => {
        this.user = response.role;
      });
    },
  },
};
</script>

<style lang='scss' coped>
.svg-left {
  margin-right: 2px;
}
ul li .pull-right{
  color:#a5a8ad
}
</style>