<template>
  <div class="container">
    <div style="height: 700px;text-align: left">
      <div>
        <router-link to="/UserHome"><span><i class="el-icon-arrow-left"></i>返回个人页面</span></router-link>
      </div>
      <el-form ref="form" class="container" style="margin-top: 20px;" :model="UserInfo" label-width="100px">
        <el-form-item label="头像" label-width="100px">
<!--                      :auto-upload="false"-->
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
        <el-form-item label="昵称">
          <el-input
            type="text"
            clearable
            v-model="UserInfo.user_name"
            maxlength="10"
            show-word-limit
            placeholder="取一个什么新名字呢？"
            style="width: 220px;"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <template>
            <el-radio v-model="UserInfo.user_gender" :label=1>男</el-radio>
            <el-radio v-model="UserInfo.user_gender" :label=0>女</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="生日">
          <template>
            <div class="block">
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="UserInfo.user_birthday"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </div>
          </template>
        </el-form-item>
        <el-form-item label="所在地">
          <div>
            <p class="pwrap">
              <v-distpicker @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"></v-distpicker>
            </p>
          </div>
        </el-form-item>
        <el-form-item label="个人简介">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="让大家更了解你吧"
            v-model="UserInfo.user_introduction"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" plain @click="confirmUpdate()">保存修改</el-button>
          <el-button type="info" plain @click="refuseUpdate()">取消修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import VDistpicker from 'v-distpicker'

let thats
export default {
  name: 'MyInformation',
  data() {
    return {
      imageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      successIconUrl:'',
      choiceIconUrl:'',
      UserInfo: {
        uid: '',
        user_name: '',
        user_avatarUrl: '',
        user_introduction: '',
        user_address: '',
        user_gender: '',
        user_birthday: ''
      },
      PreviewImg: '',
      txt1: '',
      txt2: '',
      txt3: '',
      getUpdateStatus: {}
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
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    isSex() {
      alert('返回个人页面')
    },
    confirmUpdate() {
      console.log("头像",this.UserInfo.user_avatarUrl)
      console.log("设置的头像",this.PreviewImg)
      if (this.txt1 != '' && this.txt2 != '' && this.txt3 != '') {
        this.UserInfo.user_address = this.txt1 + '-' + this.txt2 + '-' + this.txt3
      }
      if(this.PreviewImg != ''){
        this.UserInfo.user_avatarUrl = this.PreviewImg
      }else{
        this.UserInfo.user_avatarUrl = '无'
      }
      console.log("if后的")
      console.log("头像",this.UserInfo.user_avatarUrl)
      console.log("设置的头像",this.PreviewImg)
      let params = new URLSearchParams()
      params.append('uid', this.UserInfo.uid)
      params.append('User_name', this.UserInfo.user_name)
      params.append('User_avatarUrl', this.UserInfo.user_avatarUrl)
      params.append('User_introduction', this.UserInfo.user_introduction)
      params.append('User_gender', this.UserInfo.user_gender)
      params.append('User_birthday', this.UserInfo.user_birthday)
      params.append('User_address', this.UserInfo.user_address)
      axios.post('http://localhost:8081/infoUpdate', params)
        .then((res) => {
          console.log(res.data)
          console.log("then")
          this.getUpdateStatus = res.data
          if(this.getUpdateStatus.code == '200'){
            if(window.localStorage.getItem("user") != null){
              window.localStorage.removeItem("user")
              let selectCity=JSON.stringify(this.getUpdateStatus.requestBody);//将json对象转化成字符串
              window.localStorage.setItem("user",selectCity)
            }
            layer.msg("修改成功!")
            console.log(this.getUpdateStatus.requestBody)
            window.location.reload()
          }else{
            layer.msg("修改失败...")
          }
        })
        .catch((res) => {
          console.log(res.data)
          console.log("then")
          this.getUpdateStatus = res.data
          if(this.getUpdateStatus.code == '200'){
            let selectCity=JSON.stringify(this.getUpdateStatus.requestBody);//将json对象转化成字符串
            window.localStorage.setItem("user",selectCity)
            this.GetLocalStroageItem()
            layer.msg("修改成功!")
            console.log(this.getUpdateStatus.requestBody)

          }else{
            layer.msg("修改失败...")
          }
        })
      console.log(this.UserInfo)
    },
    refuseUpdate() {
      alert('取消修改')
    },
    GetLocalStroageItem() {
      let currentCity = window.localStorage.getItem('user')
      if (currentCity != null) {
        console.log(currentCity)
        if (currentCity) {
          let item = JSON.parse(currentCity)
          console.log(item,"这个时候这个item是Object")
          this.UserInfo.user_name = item.user_name
          this.UserInfo.uid = item.uid
          this.UserInfo.user_avatarUrl = item.user_avatarUrl
          this.UserInfo.user_introduction = item.user_introduction
          this.UserInfo.user_address = item.user_address
          this.UserInfo.user_gender = item.user_gender
          this.UserInfo.user_birthday = item.user_birthday
        }
      } else {
        console.log(currentCity)
      }
    },
    onChangeProvince(a) {
      console.log(a)
      this.txt1 = a.value
    },
    onChangeCity(a) {
      console.log(a)
      this.txt2 = a.value
    },
    onChangeArea(a) {
      console.log(a)
      this.txt3 = a.value
    }

  },
  created() {
    thats = this
    console.log("我修改信息组件Created方法调用的得到默认UserItem")
    this.GetLocalStroageItem()
  },
  components: { VDistpicker }
}
</script>

<style scoped>
/*修改element el-input 的按下边框颜色 */
>>> .el-input__inner:focus {
  border-color: #46b370;
}

a {
  color: #333333;
  text-decoration: none;
}

a:hover {
  color: #46b370;
  text-decoration: none;
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
