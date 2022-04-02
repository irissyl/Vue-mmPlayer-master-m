<template>
  <el-container>
    <div class="container" style="height: 700px;">
      <h4>注册账户</h4>
      <div>
        <el-form class="container col-sm-6" label-position="left" label-width="80px">
          <el-form-item label="用户名" label-width="100px">
            <el-input
              type="text"
              placeholder="用户名"
              clearable
              style="width: 290px;"
              v-model="UserAccount1"
              maxlength="10"
              show-word-limit
            >
            </el-input>
            <span :class="{'checkstyle' : !acStyle}" :style="{display:showacStyle}">用户名不能为空</span>
          </el-form-item>
          <el-form-item label="密码" label-width="100px">
            <el-input
              type="password"
              placeholder="密码"
              clearable
              show-password
              style="width: 290px;"
              v-model="UserPassword1"
            >
            </el-input>
            <span :class="{'checkstyle' : !pasStyle}" :style="{display:showpasStyle}">密码不能为空</span>
          </el-form-item>
          <el-form-item label="昵称" label-width="100px">
            <el-input
              type="text"
              placeholder="你想取什么名字呢？"
              clearable
              style="width: 290px;"
              maxlength="10"
              show-word-limit
              v-model="UserName1"
            >
            </el-input>
            <span :class="{'checkstyle' : !nameStyle}" :style="{display:shownameStyle}">昵称不能为空</span>
          </el-form-item>
          <el-form-item label="头像" label-width="100px">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:8081/upload"
              :show-file-list="false"
              :on-change="handleAvatarSuccess2"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label-width="100px">
            <el-button type="success" @click="isRegister">完成注册</el-button>
            <el-button type="info" style="margin-left: 80px;" @click="initAllform()">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-container>
</template>

<script>
import axios from 'axios'

let thats
export default {
  name: 'Register',
  data() {
    return {
      imageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      PreviewImg: '',
      UserAccount1: '',
      UserPassword1: '',
      UserName1: '',
      acStyle: false,
      showacStyle: 'none',
      pasStyle: false,
      showpasStyle: 'none',
      nameStyle: false,
      shownameStyle: 'none',
      RegisterReturnData: {}
    }
  },
  watch: {
    UserAccount1(nval) {
      if (nval != '') {
        this.acStyle = true
        this.showacStyle = 'none'
      } else {
        this.acStyle = false
        this.showacStyle = 'inline'
      }
    },
    UserPassword1(nval) {
      if (nval != '') {
        this.pasStyle = true
        this.showpasStyle = 'none'
      } else {
        this.pasStyle = false
        this.showpasStyle = 'inline'
      }
    },
    UserName1(nval) {
      if (nval != '') {
        this.nameStyle = true
        this.shownameStyle = 'none'
      } else {
        this.nameStyle = false
        this.shownameStyle = 'inline'
      }
    }
  },
  filters: {
    filterA(val) {
      thats.PreviewImg = val
      return val
    }
  },
  methods: {
    //成功才调用
    handleAvatarSuccess(res, file) {
      this.successIconUrl = res
      this.PreviewImg = this.successIconUrl
    },
    //改变就调用
    handleAvatarSuccess2(file, fileList) {
      this.choiceIconUrl = file.name
      this.PreviewImg = this.choiceIconUrl
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    isRegister() {
      if (this.UserAccount1 != '' && this.UserPassword1 != '' && this.UserName1 != '' && this.PreviewImg != '') {
        let params = new URLSearchParams()
        params.append('UserAccount', this.UserAccount1)
        params.append('UserPassword', this.UserPassword1)
        params.append('UserName', this.UserName1)
        params.append('Icon', this.PreviewImg)
        axios.post('http://localhost:8081/register', params).then((res) => {
          console.log(res.data)
          this.RegisterReturnData = res.data
          if(res.data.code == '200'){
            layer.msg("注册成功，快去登录吧！")
            this.$router.push('/sHomepage')
          }else if(res.data.code == '400'){
            layer.msg("已经注册过了不要重复注册哦！")
          }
        }).catch((res) => {
          console.log(res.data)
          this.RegisterReturnData = res.data
        })
      } else {
        layer.msg('还有内容没有填写')
      }

    },
    initAllform() {
      this.UserName1 = '',
        this.UserAccount1 = '',
        this.UserPassword1 = '',
        this.Register = {
          UserAccount: '',
          UserPassword: '',
          UserName: '',
          Icon: this.PreviewImg
        }
    }
  },
  created() {
    thats = this
  }
}
</script>

<style scoped>
/*修改element el-input 的按下边框颜色 */
>>> .el-input__inner:focus {
  border-color: #46b370;
}

.checkstyle {
  display: inline;
  margin-left: 10px;
  color: red;
  font-size: 14px;
}


/* 对话框 */
.secondaryClassification >>> .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.secondaryClassification >>> .avatar-uploader .el-upload:hover {
  border-color: #46b370;
}

.secondaryClassification >>> .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.secondaryClassification >>> .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #46b370;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
