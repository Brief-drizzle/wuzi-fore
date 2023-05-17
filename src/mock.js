// 引入mockjs
const Mock = require("mockjs");

//获取登陆验证码
Mock.mock("/captchaImage", "get", {
  data: {
    code: 200,
    img: "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",
    msg: "操作成功",
    uuid: "91b57b49fc3e48f2b10ee01c54d4a8c7",
  },
});

//登录
Mock.mock("/login", "post", {
  data: {
    code: 200,
    msg: "操作成功",
    token:
      "eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjYwYjliMGFhLTg4MWYtNDdlZi04YTExLTZmMTc1NWJhZWM4MCJ9.lFnRC5maRLDrViLlwY0ZS5H8o-9-uUIQ4vu6Bno8K6ZaUuxjgf4eSIAc0Yh32_vRqliEMZFY1zFQoDcgFfFkig",
  },
});

//退出登录
Mock.mock("/logout", "post", {
  data: {
    code: 200,
    msg: "操作成功",
  },
});

//注册----获取所有的主管单位
Mock.mock("/getUnits", "get", {
  data: {
    code: 200,
    msg: "操作成功",
    data: [
      {
        value: "1",
        label: "中国农业科学院",
      },
      {
        value: "2",
        label: "南京森林警察学院",
      },
      {
        value: "3",
        label: "北京林业大学",
      },
      {
        value: "4",
        label: "南京林业大学",
      },

      {
        value: "5",
        label: "东北林业大学",
      },
      {
        value: "6",
        label: "山西省林业厅",
      },
      {
        value: "7",
        label: "山东省林业厅",
      },
      {
        value: "8",
        label: "东北省林业厅",
      },
      {
        value: "9",
        label: "江西省林业厅",
      },
    ],
  },
});
// //注册
// Mock.mock("/register", "post", {
//   data: {
//     code: 200,
//     msg: "操作成功",
//     data: {
//       code: 200,
//       msg: "操作成功",
//     },
//   },
// });

//获取用户详细信息
Mock.mock("/getInfo", "get", {
  data: {
    code: 200,
    msg: "操作成功",
    roles: ["admin"],
  },
});

//获取用户路由
Mock.mock("/getRouters", "get", {
  data: {
    code: 200,
    msg: "操作成功",
    data: [
      {
        name: "成果库管理",
        path: "/result",
        hidden: false,
        redirect: "noRedirect",
        component: "Layout",
        alwaysShow: true,
        meta: {
          title: "成果库管理",
          icon: "result",
          noCache: false,
          link: null,
        },
        children: [
          //--------------------------------------------------成果申报单位------------------

          // 成果登记上报
          {
            name: "登记申报",
            path: "report",
            hidden: false,
            component: "result/report/index",
            meta: {
              title: "成果登记申报",
              icon: "register",
              noCache: false,
              link: null,
            },
          },
          // 查看审核进度
          {
            name: "监控审核进度",
            path: "moniter",
            hidden: false,
            component: "result/moniter/index",
            meta: {
              title: "审核进度监控",
              icon: "moniter",
              noCache: false,
              link: null,
            },
          },
          // 检索成果库
          {
            name: "检索成果库",
            path: "checkbase",
            hidden: false,
            component: "result/checkResBase/index",
            meta: {
              title: "检索成果库",
              icon: "checkbase",
              noCache: false,
              link: null,
            },
          },
          // //成果的初审
          {
            name: "成果初审",
            path: "review/init",
            hidden: false,
            component: "result/review/index",
            meta: {
              title: "成果初审",
              icon: "review",
              noCache: false,
              link: null,
            },
          },
          {
            name: "形式审查",
            path: "result/review/form",
            hidden: false,
            component: "result/review/index",
            meta: {
              title: "形式审查",
              icon: "form",
              noCache: false,
              link: null,
            },
          },
          {
            name: "专家审查",
            path: "result/review/expert",
            hidden: false,
            component: "result/review/index",
            meta: {
              title: "专家审查",
              icon: "review",
              noCache: false,
              link: null,
            },
          },
          {
            name: "成果终审",
            path: "result/review/final",
            hidden: false,
            component: "result/review/index",
            meta: {
              title: "成果终审",
              icon: "review",
              noCache: false,
              link: null,
            },
          },
          {
            name: "分配专家",
            path: "result/assign/expert",
            hidden: false,
            component: "result/assignExpert/index",
            meta: {
              title: "分配专家",
              icon: "assign",
              noCache: false,
              link: null,
            },
          },
        ],
      },
      {
        name: "项目库管理",
        path: "/project",
        hidden: false,
        redirect: "noRedirect",
        component: "Layout",
        alwaysShow: true,
        meta: {
          title: "项目库管理",
          icon: "project",
          noCache: false,
          link: null,
        },
        children: [
          // 项目登记上报
          {
            name: "登记申报",
            path: "report",
            hidden: false,
            component: "project/report/index",
            meta: {
              title: "项目登记申报",
              icon: "register",
              noCache: false,
              link: null,
            },
          },

          {
            name: "项目初审",
            path: "project/review/init",
            hidden: false,
            component: "project/review/index",
            meta: {
              title: "项目初审",
              icon: "review",
              noCache: false,
              link: null,
            },
          },
          {
            name: "项目终审",
            path: "project/review/final",
            hidden: false,
            component: "project/review/index",
            meta: {
              title: "项目终审",
              icon: "review",
              noCache: false,
              link: null,
            },
          },
          //检索项目库
          {
            name: "检索项目库",
            path: "checkbase",
            hidden: false,
            component: "project/checkProBase/index",
            meta: {
              title: "检索项目库",
              icon: "checkbase",
              noCache: false,
              link: null,
            },
          },
          // 查看审核进度
          {
            name: "监控审核进度",
            path: "moniter",
            hidden: false,
            component: "project/moniter/index",
            meta: {
              title: "审核进度监控",
              icon: "moniter",
              noCache: false,
              link: null,
            },
          },
        ],
      },
      {
        name: "绩效库管理",
        path: "/performance",
        hidden: false,
        redirect: "noRedirect",
        component: "Layout",
        alwaysShow: true,
        meta: {
          title: "绩效库管理",
          icon: "project",
          noCache: false,
          link: null,
        },
        children: [
          // 绩效登记上报
          {
            name: "登记申报",
            path: "report",
            hidden: false,
            component: "project/report/index",
            meta: {
              title: "项目登记申报",
              icon: "register",
              noCache: false,
              link: null,
            },
          },
        ],
      },
      {
        name: "系统管理",
        path: "/system",
        hidden: false,
        redirect: "noRedirect",
        component: "Layout",
        alwaysShow: true,
        meta: {
          title: "系统管理",
          icon: "system",
          noCache: false,
          link: null,
        },
        children: [
          {
            name: "申报单位管理",
            path: "reportdept",
            hidden: false,
            component: "system/dept/index",
            meta: {
              title: "申报单位管理",
              icon: "dept",
              noCache: false,
              link: null,
            },
          },
          {
            name: "初审单位管理",
            path: "initdept",
            hidden: false,
            component: "system/dept/index",
            meta: {
              title: "初审单位管理",
              icon: "dept",
              noCache: false,
              link: null,
            },
          },
          {
            name: "专家管理",
            path: "experts",
            hidden: false,
            component: "system/experts/index",
            meta: {
              title: "专家管理",
              icon: "dept",
              noCache: false,
              link: null,
            },
          },
          {
            name: "开放时间管理",
            path: "limitTime",
            hidden: false,
            component: "system/opentime/index",
            meta: {
              title: "开放时间管理",
              icon: "dept",
              noCache: false,
              link: null,
            },
          },
          {
            name: "查看开放时间",
            path: "lookTime",
            hidden: false,
            component: "system/opentime/index",
            meta: {
              title: "查看开放时间",
              icon: "dept",
              noCache: false,
              link: null,
            },
          },
        ],
      },
    ],
  },
});

//-----------------------------------------------个人中心------------------
//用户上传头像
Mock.mock("/system/user/profile/avatar", "post", {
  data: {
    code: 200,
    msg: "操作成功",
    data: {},
  },
});
// 查询用户个人信息
Mock.mock("/system/user/profile", "get", {
  data: {
    code: 200,
    msg: "操作成功",
    data: {
      userName: "admin",
      role: "国家林草局科技司",
      unitName: "山西省林草局",
      supperUnit: "国家林草局科技司",
      supperUnitUser: "马小跳",
      supperUnitPhone: "18035711317",
      registerTime: "2022-3-1",
    },
  },
});
//用户密码重置
Mock.mock("/system/user/profile/updatePwd", "put", {
  data: {
    code: 200,
    msg: "操作成功",
  },
});
// 查询成果注册列表"/result/regist/list"
let data1 = [
  {
    resId: "1400104",
    resName: "'彼特罗'核桃",
    resYield: "林木良种",
    resGetTime: "2022-3-8",
    resAttr: "洛阳农林科学院",
    resCreTime: "2022-3-9",
    resFirAuthor: "马贯羊",
  },
  {
    resId: "14010003",
    resName: "'达林－1'油茶无性系良种",
    resYield: "林木良种",
    resGetTime: "2022-3-8",
    resAttr: "烟台市林业科学研究所 ",
    resCreTime: "2022-3-9",
    resFirAuthor: "祁树安",
  },
  {
    resId: "14010005",
    resName: "'北林雄株1号'、'北林雄株2号'新品种选育",
    resYield: "林木良种",
    resGetTime: "2022-3-8",
    resAttr: "	北京林业大学 ",
    resCreTime: "2022-3-9",
    resFirAuthor: "康向阳",
  },
];
Mock.mock(RegExp("/result/regist/list" + ".*"), "get", {
  data: {
    code: 200,
    msg: "操作成功",
    data: data1,
    total: 3,
  },
});
Mock.mock("/result/regist/", "delete", {
  data: {
    code: 200,
    msg: "操作成功",
    // data:data1,
    // total:3
  },
});
Mock.mock(RegExp("/result/resinfo/" + ".*"), "get", {
  data: {
    code: 200,
    msg: "操作成功",
    data: {
      resId: "1400104",
      resName: "'彼特罗'核桃",
      resYield: "林木良种",
      resGetTime: "2022-3-8",
      resAttr: "洛阳农林科学院",
      resCreTime: "2022-3-9",
      origin: "国家级别",
      introduction: "hhhhhhhhhhhhhhhhhh",
      keywords: [
        {
          value: "树木",
          key: "123",
        },
        {
          value: "核桃",
          key: "13",
        },
      ],
      units: [
        {
          value: "北京林业大学",
          key: "123",
        },
        {
          value: "南京林业大学",
          key: "123",
        },
      ],
      workers: [
        {
          workername: "张三",
          workerphone: "13313571314",
          workertel: "0351-6213390",
          workeremail: "133584613@qq.com",
        },
      ],
      price: [
        {
          pricename: "优秀奖",
        },
      ],
    },
  },
});

Mock.mock(RegExp("/result/all/list" + ".*"), "get", {
  data: {
    code: 200,
    msg: "操作成功",
    data: data1,
    total: 3,
  },
});

Mock.mock(RegExp("/result/moniter/list" + ".*"), "get", {
  data: {
    code: 200,
    msg: "操作成功",
    data: [
      {
        resId: "1400102",
        resName: "'彼特罗'核桃'",
        beginTime: "2022-03-13",
        endTime: "",
        nowLink: "专家审核",
        nowState: "审核中",
      },
      {
        resId: "1400105",
        resName: "'宝丰'板栗 ",
        beginTime: "2022-03-13",
        endTime: "2022-4-15",
        nowLink: "审核完成",
        nowState: "已入库",
      },
      {
        resId: "1400122",
        resName: "'华仲10号'杜仲",
        beginTime: "2022-03-13",
        endTime: "",
        nowLink: "二级审核",
        nowState: "审核中",
      },
      {
        resId: "1400132",
        resName: "'华仲5号'杜仲",
        beginTime: "2022-03-13",
        endTime: "2022-4-15",
        nowLink: "审核完成",
        nowState: "已入库",
      },
      {
        resId: "1400122",
        resName: "'华仲6号'杜仲",
        beginTime: "2022-03-13",
        endTime: "2022-4-15",
        nowLink: "审核完成",
        nowState: "驳回",
      },
    ],
    total: 5,
  },
});

Mock.mock("/system/units/report", "get", {
  data: {
    code: 200,
    msg: "操作成功",
    data: [
      {
        id: "124",
        unitName: "中国林科院",
        userName: "gjlyj62",
        userPassword: "123456",
        openTime: "2022-01-12",
        contacter: "董大伟",
        contacterPhone: "18035711317",
        unitTel: "0351-62133900",
        accountState: "已授权",
      },
      {
        id: "125",
        unitName: "	西北农林科技大学",
        userName: "gjlyj52",
        userPassword: "123456",
        openTime: "",
        contacter: "顾京",
        contacterPhone: "13335711317",
        unitTel: "0351-62133900",
        accountState: "待授权",
      },
      {
        id: "126",
        unitName: "东北林业大学",
        userName: "gjlyj55",
        userPassword: "123456",
        openTime: "",
        contacter: "魏焕勇",
        contacterPhone: "13335711317",
        unitTel: "0351-62133900",
        accountState: "已拒绝",
      },
    ],
    total: 5,
  },
});
Mock.mock("/system/del/report", "delete", {
  data: {
    code: 200,
    msg: "操作成功",
    // data:data1,
    // total:3
  },
});
