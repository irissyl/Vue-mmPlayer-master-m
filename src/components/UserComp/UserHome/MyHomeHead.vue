<template>
  <div>
    <el-container>
      <div class="container row">
        <div class="col-sm-3">
          <el-avatar :size="240"
                     :src="UserInfo.user_avatarUrl"
          >
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
          </el-avatar>
        </div>
        <div class="col-sm-9">
          <div class="row">
            <span class="col-sm-6"><h1 class="lead font-weight-bold" style="font-size: 29px;">{{UserInfo.user_name}}</h1></span>
            <span style="text-align: right" class="col-sm-6"><el-button type="success" plain @click="toUpdateInfomation()">编辑个人信息</el-button></span>
          </div>
          <div>
            <span class="lead">LV:{{UserInfo.user_grade}}</span>
            <span v-if="UserInfo.user_gender == '1' ">
              <svg t="1625822655541" class="icon" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg" p-id="11843" width="20" height="20"
              ><path d="M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z" fill="#8C9EFF" p-id="11844"></path><path
                d="M403.1 795.81c-44.82 0-89.63-17.06-123.74-51.17-68.24-68.23-68.24-179.26 0-247.49 68.22-68.22 179.27-68.24 247.49 0 68.24 68.23 68.24 179.26 0 247.49-34.11 34.12-78.93 51.17-123.75 51.17z m0-307.85c-34.06 0-68.11 12.96-94.05 38.89-51.86 51.86-51.86 136.24 0 188.1 51.87 51.86 136.23 51.86 188.1 0 51.86-51.86 51.86-136.24 0-188.1-25.92-25.93-59.99-38.89-94.05-38.89zM732.61 448.51c-11.59 0-21-9.4-21-21V312.39H596.49c-11.59 0-21-9.4-21-21s9.41-21 21-21h126.49c16.88 0 30.62 13.74 30.62 30.62V427.5c0.01 11.61-9.4 21.01-20.99 21.01z m-9.62-136.12h0.14-0.14z"
                fill="#FFFFFF" p-id="11845"
              ></path><path
                d="M512 533c-5.37 0-10.75-2.05-14.85-6.15S491 517.37 491 512c0-5.37 2.05-10.75 6.15-14.85l217.79-217.79c8.2-8.2 21.49-8.2 29.7 0 4.1 4.1 6.15 9.47 6.15 14.85s-2.05 10.75-6.15 14.85L526.85 526.84c-4.1 4.11-9.48 6.16-14.85 6.16z"
                fill="#FFFFFF" p-id="11846"
              ></path></svg>
            </span>
            <span v-if="UserInfo.user_gender != '1' ">
                            <svg t="1625822749285" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg" p-id="18087" width="20" height="20"
                            ><path
                              d="M512 105.5c-220.6 0-399.5 178.9-399.5 399.5S291.4 904.5 512 904.5 911.5 725.6 911.5 505 732.6 105.5 512 105.5z m200 621.9H561.5v75.1h-99.1v-75.1H312V627.3h150.4v-6.2c-33.6-8.6-65.5-25.9-91.8-52.2-78-78-78-204.5 0-282.5s204.5-78 282.5 0 78 204.5 0 282.5c-26.3 26.3-58.1 43.7-91.7 52.2v6.2h150.4v100.1h0.2z"
                              fill="#FF4D94" p-id="18088"
                            ></path><path
                              d="M582.4 356.1c-39.1-39.1-102.5-39.1-141.6 0-39.1 39.1-39.1 102.4 0 141.5 39.1 39.1 102.5 39.1 141.6 0 39.1-39 39.1-102.4 0-141.5z"
                              fill="#FF4D94" p-id="18089"
                            ></path></svg>
            </span>
          </div>
          <el-divider style="margin: 0px;"></el-divider>
          <div class="row">
            <div class="big-title">
              <router-link to="#">
                <div class="userTitleFont">23</div>
                <div class="low-title">动态</div>
              </router-link>
            </div>
            <div class="big-title">
              <router-link to="#">
                <div class="userTitleFont">66</div>
                <div class="low-title">关注</div>
              </router-link>
            </div>
            <div class="big-title">
              <router-link to="#">
                <div class="userTitleFont">20</div>
                <div class="low-title">粉丝</div>
              </router-link>
            </div>
          </div>
          <div style="margin-top: 10px;margin-left: 5px;">
            <div>
              <span class="low-content-text">所在地区：{{UserInfo.user_address}}</span>
            </div>
            <div>
              <div class="desc-test low-content-text">
                个人介绍：{{UserInfo.user_introduction}}
              </div>
              <div style="margin-top: 10px;margin-bottom: 10px;">
                <el-popover
                  class="low-content-text"
                  placement="bottom"
                  title="简介"
                  width="500"
                  trigger="click"
                  :content="UserInfo.user_introduction"
                >
                  <el-button type="success" plain  slot="reference">展示更多</el-button>
                </el-popover>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'MyHomeHead',
  data(){
    return{
      UserInfo:{
        uid:'',
        user_name:'',
        user_avatarUrl:'',
        user_introduction:'',
        user_address:'',
        user_gender:'',
        user_grade:'',
      }
    }
  },
  methods:{
    toUpdateInfomation(){
      this.$router.push("/PersonUpdateInfo")
    },
    GetLocalStroageItem(){
      let currentCity = window.localStorage.getItem("user")
      if(currentCity != null){
        if(currentCity){
          let item=JSON.parse(currentCity);
          console.log(item,"这个时候这个item是Object")
          this.UserInfo.user_name = item.user_name
          this.UserInfo.uid = item.uid
          this.UserInfo.user_avatarUrl = item.user_avatarUrl
          this.UserInfo.user_introduction = item.user_introduction
          this.UserInfo.user_address = item.user_address
          this.UserInfo.user_gender = item.user_gender
          this.UserInfo.user_grade = item.user_grade
        }
        if(this.UserInfo.uid != ''){
          this.isLoginStatus = true
        }
      }else{
        console.log(currentCity)
      }
    },
  },
  created() {
    console.log("MyHead---Created方法调用的得到默认UserItem")
    this.GetLocalStroageItem()
  }
}
</script>

<style scoped>
.low-content-text{
  color: #333333;
  font-size: 14px;
}
.desc-test {
  width: 800px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.icon {
  margin-left: 10px;
  margin-bottom: 5px;
}

.userTitleFont {
  color: #333333;
  font-size: 20px;
}

a {
  text-decoration: none;
  color: #333333;
}

a:hover {
  text-decoration: #46b370;
}

.low-title {
  color: #929292;
}

.big-title {
  margin-left: 20px;
}

.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin: 10px 0;
}
</style>
