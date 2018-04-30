<template>
  <div id="resetpwd">
    修改密码
    <hr>
    <span class="mobile">手机号</span>{{ ruleForm2.mobile }}

    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="密码" prop="pwd">
        <el-input type="password" v-model="ruleForm2.pwd" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="rePwd">
        <el-input type="password" v-model="ruleForm2.rePwd" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="sms_code">
        <el-input v-model.number="ruleForm2.sms_code" style="width:250px"></el-input>
        <el-button id="smsBut"
        type="primary" 
        @click="getSmsCode($event)"
        style="width:140px"
        >获取验证码
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
      </el-form-item>
    </el-form>
    <br>
  </div>
</template>

<script>
var pwdReg = /^[0-9a-zA-Z]{6}/;
import Axios from "axios";
import state from "../../store/state";
import { parseCode } from "../../../static/parseCodeToJSON";

export default {
  data() {
    //密码验证方法
    var checkPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (value.length < 6) {
          callback(new Error("密码不能少于6位"));
        } else if (!pwdReg.test(value)) {
          callback(new Error("密码请使用字母和数字"));
        }
        callback();
      }
    };
    //重复密码验证方法
    var checkRePwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        mobile: state.user[0].mobile,
        pwd: "",
        rePwd: "",
        sms_code: ""
      },
      //失去焦点,调用方法验证
      rules2: {
        pwd: [{ validator: checkPwd, trigger: "blur" }],
        rePwd: [{ validator: checkRePwd, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      //验证输入是否正确
      this.$refs[formName].validate(valid => {
        //如果正确,post注册请求
        if (valid) {
          Axios.post("http://www.ftusix.com/static/data/reset.php", {
            mobile: this.ruleForm2.mobile, //  手机号
            pwd: this.ruleForm2.pwd, //  新密码
            pwd2: this.ruleForm2.rePwd, //  确认密码
            sms_code: this.ruleForm2.sms_code //  短信验证码
          })
            .then(response => {
              let data = response.data;
              console.log(data)
              //修改成功
              if (data.status === 1) {
                this.$message({
                  showClose: true,
                  message: "修改成功",
                  type: "success"
                });
              } else if (data.status === 0) {
                //修改失败
                this.$message.error({
                  showClose: true,
                  message: data.info
                });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getSmsCode(event) {
      let t = 60;
      let button = event.target;
      //event.target有可能是文字,event.target不是按钮时不能设置按钮禁用
      button = document.getElementById("smsBut");

      Axios.post("http://www.ftusix.com/static/data/sendsms.php", {
        mobile: this.ruleForm2.mobile
      })
        .then(res => {
          let data = res.data;
          //获取成功
          if (data.status === 1) {
            
            this.ruleForm2.sms_code = data.data.code;
            button.disabled = true;
            button.innerText = `${t--}秒后重新获取`;
            let timer = setInterval(() => {
              if (t === 0) {
                clearInterval(timer);
                button.innerText = "获取验证码";
                button.disabled = false;
              } else {
                button.innerText = `${t--}秒后重新获取`;
              }
            }, 1000);
            // this.$router
          } else if (data.status === 0) {
            //获取失败
            this.$message.error({
              showClose: true,
              message: data.info
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  computed: {
    myInfo() {
      return JSON.parse(sessionStorage.getItem("user"));
    }
  }
};
</script>

<style>
#resetpwd {
  position: relative;
  display: inline-block;
  width: 800px;
  vertical-align: top;
  margin-top: 20px;
  margin-left: 20px;
  text-align: left;
}

#resetpwd .mobile {
  display: inline-block;
  width: 90px;
  line-height: 60px;
  padding-right: 10px;
  font-size: 14px;
  text-align: right;
}
.el-form-item__label {
  margin-top: 10px;
}
</style>