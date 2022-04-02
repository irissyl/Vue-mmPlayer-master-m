<template>
  <div class="container top">
    <!--导航栏全部-->
    <div class="container">
      <!--上面导航-->
      <div class="nav_t row">
        <!--图片-->
        <div class="top-logo">
        </div>
        <!-- Nav pills -->
        <div class="top_nav_item">
          <ul class="nav top-item nav-pills" role="tablist">
            <li class="nav-item top-item">
              <router-link class="nav-link router-link-active active" style="border-radius: 0px;" data-toggle="pill"
                           title="音乐馆" to="/"
              >音乐馆
              </router-link>
            </li>
            <li class="nav-item top-item">
              <router-link class="nav-link router-link-active" style="border-radius: 0px;" data-toggle="pill"
                           title="音乐墙" to="/music"
              >沉浸模式
              </router-link>
            </li>
            <li class="nav-item top-item">
              <a class="nav-link router-link-active" style="border-radius: 0px;" data-toggle="pill"
                           title="我的音乐" @click="toMyMusic()"
              >我的音乐
              </a>
            </li>
            <li class="nav-item top-item">
              <router-link class="nav-link router-link-active" style="border-radius: 0px;" data-toggle="pill"
                           title="音乐动态" to="/MusicInfo"
              >音乐动态
              </router-link>
            </li>
          </ul>
        </div>
        <!--搜索框-->
        <div class="form-group search search-style row">

          <div>
            <el-autocomplete
              class="inline-input"
              v-model="SearchKeyWords"
              :fetch-suggestions="querySearch"
              placeholder="搜索音乐、MV、歌单、歌手"
              style="width: 270px;"
              popper-class="select-style"
              @select="handleSelect"
              @change="SearchFunction()"
              :highlight-first-item="true"
            >
              <i slot="suffix" style="color: #46b370" class="el-input__icon el-icon-search" @click="SearchFunction()"></i>
              <template slot-scope="{ item }" style="overflow-x: hidden">
                <div>
                  <div class="name" style="color: #42b983">{{ item.searchWord }}</div>
                  <span class="addr" style="color: #909399;font-size: 13px;">{{ item.content }}</span>
                </div>
              </template>
            </el-autocomplete>
          </div>

        </div>
        <!--用户登录后显示-->
        <div :class="{'isLogin':!isLoginStatus}">
          <el-dropdown>
            <div class="el-dropdown-link row">
              <el-avatar :size="60" :src="UserInfo.icon">
                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
              </el-avatar>
              <div style="margin-left: 10px;margin-top: 20px;color: #1b1e21;font-weight: bold;">{{UserInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i></div>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-s-home" @click.native="ToPsersonHome()">个人主页</el-dropdown-item>
<!--              <el-dropdown-item icon="el-icon-s-custom" @click.native="ToPsersonInformation()">个人信息</el-dropdown-item>-->
<!--              <el-dropdown-item icon="el-icon-s-unfold" @click.native="ToUserInofUpdate()">用户修改</el-dropdown-item>-->
              <el-dropdown-item icon="el-icon-headset" @click.native="ToPlayModel()">播放器模式</el-dropdown-item>
              <el-dropdown-item icon="el-icon-close" @click.native="LoginGone()">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!--按钮-->
        <div class="header_buttons login-button login-button-style" :class="{'isLogin':isLoginStatus}">
          <button class="btn btn-outline-scmusic" @click="dialogFormVisible = true">登 录</button>
        </div>
        <el-dialog title="登 录" :visible.sync="dialogFormVisible" width="35%" :center="true">
          <el-form :model="login">
            <el-form-item label="用户名" :label-width="formLabelWidth">
              <el-input
                type="text"
                v-model="login.Account"
                placeholder="请输入用户名"
                style="width: 270px;"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
              <el-input
                placeholder="请输入密码"
                v-model="login.Password"
                show-password
                style="width: 270px;"
                type="password"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item>
              <div style="margin-left: 120px;">
                <vue-simple-verify ref="verify" @success="success" :width="270" />
              </div>
            </el-form-item>
            <el-form-item style="text-align: center">
              <div>
                <span>还没有账户？<router-link to="/register"><span style="color: #46b370" @click="dialogFormVisible = false">点击注册</span></router-link></span>
              </div>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="info" @click="Confuse">取 消</el-button>
            <el-button type="success" @click="CheckLogin">登录</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
import '../../public/css/bootstrap.css'
import axios from '../utils/axios'

export default {
  name: 'NavHead',
  data() {
    return {
      login: {
        Account: '',
        Password: ''
      },
      SearchKeyWords:'',
      getSearchHotSuggestion:[],
      formLabelWidth: '120px',
      dialogFormVisible: false,
      Verify: false,
      getLoginStatus: {},
      isLoginStatus: false,
      UserInfo:{
        name:'',
        icon:'',
        uid:'',
      }
    }
  },
  methods: {
    success() {
      this.Verify = true
    },
    async ResetVerify() {
      if (this.Verify == true) {
        setTimeout(() => {
          this.$refs.verify.reset()
        }, 3000)
      }
    },
    CheckLogin() {
      if (this.login.Account == '' && this.login.Password == '') {
        layer.msg('用户名和密码不能为空')
      } else if (this.login.Password == '') {
        layer.msg('密码不能为空')
      } else if (this.login.Account == '') {
        layer.msg('用户名不能为空')

      } else {
        if (this.Verify == true) {
          let params = new URLSearchParams()
          params.append('Account', this.login.Account)
          params.append('Password', this.login.Password)
          axios.post('http://localhost:8081/login', params)
            .then((res) => {
              console.log("then登录成功log",res.data)
              this.getLoginStatus = res.data
              console.log("then登录成功返回的类容log",this.getLoginStatus.requestBody)
              let selectCity=JSON.stringify(this.getLoginStatus.requestBody);//将json对象转化成字符串
              window.localStorage.setItem("user",selectCity)
              if (this.getLoginStatus.code == 200) {
                this.ResetVerify()
                this.dialogFormVisible = false
                this.isLoginStatus = true
                this.login.Account = ''
                this.login.Password = ''
                layer.msg('登录成功！')
                this.GetLocalStroageItem()
              } else {
                layer.msg('登录失败！')
              }
            })
            .catch((res) => {
              console.log("catch登录成功log",res.data)
              this.getLoginStatus = res.data
              console.log("catch登录成功返回的类容log",this.getLoginStatus.requestBody)
              let selectCity=JSON.stringify(this.getLoginStatus.requestBody);//将json对象转化成字符串
              window.localStorage.setItem("user",selectCity)
              if (this.getLoginStatus.code == 200) {
                this.ResetVerify()
                this.dialogFormVisible = false
                this.isLoginStatus = true
                this.login = {
                  Account: '',
                  Password: ''
                }
                layer.msg('登录成功！')
                console.log("登录成功方法调用的得到默认UserItem")
                this.GetLocalStroageItem()
              } else {
                layer.msg('登录失败！')
              }
            })
        } else {
          layer.msg('请进行验证！')
        }
      }

    },
    Confuse() {
      this.dialogFormVisible = false
      this.login = {
        Account: '',
        Password: ''
      }
    },
    GetLocalStroageItem(){
      let currentCity = window.localStorage.getItem("user")
      if(currentCity != null){
        if(currentCity){
          let item=JSON.parse(currentCity);
          console.log(item,"这个时候这个item是Object")
          this.UserInfo.name = item.user_name
          this.UserInfo.uid = item.uid
          this.UserInfo.icon = item.user_avatarUrl
        }
        if(this.UserInfo.uid != ''){
          this.isLoginStatus = true
        }
      }else{
        console.log("得到userLocalStorage",currentCity)
      }
    },
    async LoginGone(){
      window.localStorage.removeItem("user")
      this.isLoginStatus = false
      layer.msg("您已退出")
      await this.$router.push('/UserHome')
    },
    ToPsersonHome(){
      this.$router.push('/UserHome')
    },
    ToPsersonInformation(){
      alert("个人信息")
    },
    ToUserInofUpdate(){
      alert("用户修改")
    },
    ToPlayModel(){
      this.$router.push("/music")
    },
    querySearch(queryString, cb) {
      let restaurants = this.getSearchHotSuggestion;
      let results = queryString ? restaurants : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createStateFilter(queryString) {
      //调用的后台接口
      //从后台获取到对象数组
      axios.get( "http://localhost:8081/music/search/"+queryString+"/1/0/10").then((response)=>{
        //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
        return response.data.self_ResponseBody;
      }).catch((error)=>{
        return error.data.self_ResponseBody;
      });
    },
    handleSelect(item) {
      this.SearchKeyWords = item.searchWord
      console.log(this.$route)
      if(this.$route.name =='searchKey'){
        this.$router.push("/search/"+this.SearchKeyWords)
        window.location.reload()
      }else{
        this.$router.push("/search/"+this.SearchKeyWords)
      }
    },
    SearchFunction(){
      console.log("1",this.$route.name)
      console.log("2",this.SearchKeyWords)
      if(this.SearchKeyWords == '' && this.$route.name !='searchKey'){
        this.$router.push("/search")
      }else if(this.$route.name != 'searchKey' && this.SearchKeyWords!=''){
        this.$router.push("/search/"+this.SearchKeyWords)
      }else if(this.$route.name == 'searchKey' && this.SearchKeyWords!=''){
        this.$router.push("/search/"+this.SearchKeyWords)
        window.location.reload()
      }
    },
    toMyMusic(){
      let currentCity = window.localStorage.getItem("user")
      if(currentCity == null){
        layer.msg("还没登录，快去登录吧")
      }else{
        this.$router.push('/UserHome')
      }
    },
  },
  mounted() {
    axios.get("http://localhost:8081/music/hotsearch").then(res=>{
      console.log("then")
      this.getSearchHotSuggestion = res.data
      console.log("得到的搜索建议列表",this.getSearchHotSuggestion)
    }).catch(res=>{
      console.log("catch")
      this.getSearchHotSuggestion = res.data
      console.log("得到的搜索建议列表",this.getSearchHotSuggestion)
    })
  },
  created() {
    console.log("Created方法调用的得到默认UserItem")
    this.GetLocalStroageItem()
  }
}
</script>

<style scoped>

.el-dropdown-link{
  position: relative;
  top: 20px;
}
.isLogin {
  display: none;
}

a {
  color: black;
  text-decoration: none;
}

.top-logo {
  width: 200px;
  height: 70px;
  background-image: url(../../src/assets/icon.png);
  background-size: 200px 150px;
  background-position: 1px -30px;
}

.top_nav_item {
  margin-left: 1.5rem;
}

.top-item {
  line-height: 70px;
}

.search {
  margin: auto 0;
  width: 25%;
}

.search-style {
  margin-left: 2rem;
}

.login-button {
  margin: auto 0;
}

.login-button-style {
  margin-left: 2rem;
}

.nav_x {
  margin-left: 230px;
}

.search-icon {
  width: 15px;
  height: 15px;
}

.song_q_zi ul li {
  /*去掉下划线*/
  text-decoration: none;
  /*去掉点点*/
  list-style: none;
  font-size: 15px;
  font-family: "微软雅黑";
  padding-bottom: 20px;
  /*padding-left: 20px;*/

}

.song_q_zi ul li a {
  color: black;
  margin-left: 35px;
  text-align: center;


}

.song_q_zi ul li a:hover {
  color: #36aa65;
  text-decoration: none;


}

.song_q_zi ul li {
  /*去掉下划线*/
  text-decoration: none;
  /*去掉点点*/
  list-style: none;
  font-size: 15px;
  font-family: "微软雅黑";
  padding-bottom: 20px;
  /*padding-left: 20px;*/

}

.song_q_zi ul li a {
  color: black;
  margin-left: 35px;
  text-align: center;


}

.song_q_zi ul li a:hover {
  color: #36aa65;
  text-decoration: none;


}

.nav_x {
  margin-left: 230px;
}

.nav_x ul li {
  list-style: none;


}

.nav_x ul li a {
  color: black;
  text-decoration: none;
  font-family: "微软雅黑";
  font-size: 15px;
  margin-left: 38px;
}

.nav_x ul li a:hover {
  color: #36aa65;
  font-family: "微软雅黑";
  font-size: 15px;
}

.btn:focus,
.btn:active:focus,
.btn.active:focus,
.btn.focus,
.btn:active.focus,
.btn.active.focus {
  box-shadow: none;
}

.router-link-active:checked {
  text-decoration: none;
  color: #fff;
  background-color: #36aa65;
}

/*修改element el-input 的按下边框颜色 */
>>> .el-input__inner:focus {
  border-color: #46b370;
}

</style>
