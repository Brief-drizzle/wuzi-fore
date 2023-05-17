<template>
  <div>
    <div class="user-info-head" @click="editCropper()">
      <img
        v-bind:src="options.img"
        title="点击上传头像"
        class="img-circle img-lg"
      />
    </div>
    <el-dialog
      title="修改头像"
      :visible.sync="open"
      width="800px"
      append-to-body
      @open="modalOpened"
      @close="closeDialog()"
    >
      <el-row>
        <el-col :xs="24" :md="12" :style="{ height: '350px' }">
          <vue-cropper
            ref="cropper"
            :img="options.img"
            :info="true"
            :autoCrop="options.autoCrop"
            :autoCropWidth="options.autoCropWidth"
            :autoCropHeight="options.autoCropHeight"
            :fixedBox="options.fixedBox"
            @realTime="realTime"
            v-if="visible"
          />
        </el-col>
        <el-col :xs="24" :md="12" :style="{ height: '350px' }">
          <div class="avatar-upload-preview">
            <img :src="previews.url" :style="previews.img" />
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :lg="2" :md="2">
          <el-upload
            action="#"
            :http-request="requestUpload"
            :show-file-list="false"
            :before-upload="beforeUpload"
          >
            <el-button size="small">
              选择
              <i class="el-icon-upload el-icon--right"></i>
            </el-button>
          </el-upload>
        </el-col>
        <el-col :lg="{ span: 1, offset: 2 }" :md="2">
          <el-button
            icon="el-icon-plus"
            size="small"
            @click="changeScale(1)"
          ></el-button>
        </el-col>
        <el-col :lg="{ span: 1, offset: 1 }" :md="2">
          <el-button
            icon="el-icon-minus"
            size="small"
            @click="changeScale(-1)"
          ></el-button>
        </el-col>
        <el-col :lg="{ span: 1, offset: 1 }" :md="2">
          <el-button
            icon="el-icon-refresh-left"
            size="small"
            @click="rotateLeft()"
          ></el-button>
        </el-col>
        <el-col :lg="{ span: 1, offset: 1 }" :md="2">
          <el-button
            icon="el-icon-refresh-right"
            size="small"
            @click="rotateRight()"
          ></el-button>
        </el-col>
        <el-col :lg="{ span: 2, offset: 6 }" :md="2">
          <el-button type="primary" size="small" @click="upLoad()"
            >提 交</el-button
          >
        </el-col>
      </el-row>
      <br />
    </el-dialog>
    <!-- <el-upload
      class="avatar-uploader"
      action="/uploadImage"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :http-request="upLoad"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload> -->
    <br />
  </div>
</template>

<script>
import store from "@/store";
import { VueCropper } from "vue-cropper";
import { uploadAvatar } from "@/api/system/user";

export default {
  components: { VueCropper },
  props: {
    user: {
      type: Object,
    },
  },
  data() {
    return {
      imageUrl: "",
      // 是否显示弹出层
      open: false,
      // 是否显示cropper
      visible: false,

      options: {
        img: store.getters.avatar, //裁剪图片的地址
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 200, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
      },
      previews: {},
    };
  },
  methods: {
    // 编辑头像
    editCropper() {
      this.open = true;
    },
    modalOpened() {
      this.visible = true;
      console.log(this.getUrlBase64(this.options.img));
      this.options.img = this.getUrlBase64(this.options.img,'',this.getUrlBase64);
    },

    getUrlBase64(url, ext, callback) {
      var canvas = document.createElement("canvas"); //创建canvas DOM元素
      var ctx = canvas.getContext("2d");
      var img = new Image();
      img.crossOrigin = "Anonymous"; //外网访问必须加否则会报错
      img.src = url;
      img.onload = function () {
        canvas.height = 140; //指定画板的高度,自定义
        canvas.width = 120; //指定画板的宽度，自定义
        ctx.drawImage(img, 0, 0, 140, 120); //参数可自定义 高度，宽度
        var dataURL = canvas.toDataURL("image/" + ext);
        callback.call(this, dataURL); //回掉函数获取Base64编码
        canvas = null;
      };
    },
    // //处理跨域1
    // imgTrick(src) {
    //   const img = new Image();
    //   img.crossOrigin = "*";
    //   img.src = src + "?timeStamp=" + new Date();
    //   img.onload = function () {};
    //   return img.src;
    // },

    // 覆盖默认的上传行为
    requestUpload() {},
    // 向左旋转
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    // 向右旋转
    rotateRight() {
      this.$refs.cropper.rotateRight();
    },
    // 上传预处理
    beforeUpload(file) {
      if (file.type.indexOf("image/") == -1) {
        this.$modal.msgError(
          "文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。"
        );
      } else {
        // 转化为blob
        const reader = new FileReader();
        reader.onload = (e) => {
          let data;
          if (typeof e.target.result === "object") {
            data = window.URL.createObjectURL(new Blob([e.target.result]));
          } else {
            data = e.target.result;
          }
          this.options.img = data;
        };
        // 转化为base64
        reader.readAsDataURL(file);
      }
    },
    // 图片缩放
    changeScale(num) {
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    },
    closeDialog() {
      this.options.img = store.getters.avatar;
      this.visible = false;
    },
    // 实时预览
    realTime(data) {
      this.previews = data;
    },
    handleAvatarSuccess(res, file) {
      console.log(res, file);
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl);
    },
    beforeAvatarUpload(file) {
      console.log(file);
    },

    upLoad() {
      let _this = this;
      this.$refs.cropper.getCropBlob((data) => {
        
        const formData = new FormData();
        var fileOfBlob = new File([data], "a.png");
        formData.append("avatar", fileOfBlob);       
        uploadAvatar(formData).then((res) => {
          this.options.img = res.avatar;
          store.commit("SET_AVATAR", this.options.img);
        });
      });
      // console.log(file);
      // const formData = new FormData();
      // formData.append("avatar", file.file);
      // console.log("bbbbbbbbbbbbb", formData);
      // uploadAvatar(formData).then((res) => {
      //   console.log(res);
      //   console.log("上传成功");
      //   // if (res.code === "sys.success") {
      //   //   this.userInfoForm.avatar = this.fileServerUrl() + res.data.fileSrc;
      //   //   const previewImage = this.userInfoForm.avatar;
      //   //   console.log("previewImage", previewImage);
      //   // } else {
      //   //   this.$message("头像上传失败");
      //   // }
      // });
    },
  },
};
</script>
<style scoped lang="scss">
.user-info-head {
  position: relative;
  display: inline-block;
  height: 120px;
}

.user-info-head:hover:after {
  content: "+";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  color: #eee;
  background: rgba(0, 0, 0, 0.5);
  font-size: 24px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  cursor: pointer;
  line-height: 110px;
  border-radius: 50%;
}
</style>