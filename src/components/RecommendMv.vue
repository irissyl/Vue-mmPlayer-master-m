<template>
  <el-container>
    <el-header class="container-lg">
      <h3 class="mv_h3" style="text-align: center">MV</h3>
      <div class="mv_q_zi offset-sm-4">
        <ul class="row">
          <li>
            <a href="javascript:;" @click="changeAxios('全部')">全部</a>
          </li>
          <li>
            <a href="javascript:;" @click="changeAxios('内地')">内地</a>
          </li>
          <li>
            <a href="javascript:;" @click="changeAxios('港台')">港台</a>
          </li>
          <li>
            <a href="javascript:;" @click="changeAxios('欧美')">欧美</a>
          </li>
          <li>
            <a href="javascript:;" @click="changeAxios('韩国')">韩国</a>
          </li>
          <li>
            <a href="javascript:;" @click="changeAxios('日本')">日本</a>
          </li>
          <li>
            <router-link to="/MVAll" href="javascript:;" class="mv_bu">更多 ></router-link>
          </li>
        </ul>
      </div>
    </el-header>
    <el-main>
      <el-carousel indicator-position="outside" height="580px">
        <el-carousel-item style="width: 100%;margin-left: 120px;" v-for="(item,index) in MvList" :key="index">
          <div class="row" style="margin: 0 auto;width: 1200px;">
            <div class="mv-box" v-for="(item1,index1) in item" :key="index1">
              <div class="he_ZoomInImg-mv">
                <el-image class="he_ZoomInImg_img-mv" :src="item1.mv_cover"></el-image>
                <div class="he_ZoomInImg_caption-mv">
                  <p class="he_ZoomInImg_caption_p-mv" style="margin-bottom:0px;">
                    <img
                        src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006&v=88abebcbc1242dbbbbc836cc3e04a006&v=10e4305a2558d496548955434eaa30d9"
                        width="55px" height="55px">
                  </p>
                  <router-link :to="{path:'/mvdetail/'+item1.mv_id}"></router-link>
                </div>
              </div>
              <div class="low-title-text">
                <p class="rcplaylistText on-a" style="margin: 0px;"><router-link class="no-a"
                                                                                 :to="{path:'/mvdetail/'+item1.mv_id}">{{ item1.mv_name }}</router-link></p>
                <p class="rcplaylistText on-a" style="margin: 0px;"><router-link class="no-a"
                                                                                 :to="{path:'/SingerDetail/'+item1.mv_singerid}">{{ item1.mv_singerName }}</router-link></p>
                <p class="rcplaylistText no-a2">
                  <a>播放量：</a>
                  <a>{{ changepalyCount(item1.playCount) }}</a>
                  <a>万</a>
                </p>
              </div>
            </div>
          </div>
          <div class="row" style="margin: 0 auto;width: 1200px;">
            <div class="mv-box" v-for="(item2,index2) in item" :key="index2">
              <div class="he_ZoomInImg-mv">
                <el-image class="he_ZoomInImg_img-mv" :src="item2.mv_cover"></el-image>
                <div class="he_ZoomInImg_caption-mv">
                  <p class="he_ZoomInImg_caption_p-mv" style="margin-bottom:0px;">
                    <img
                        src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006&v=88abebcbc1242dbbbbc836cc3e04a006&v=10e4305a2558d496548955434eaa30d9"
                        width="55px" height="55px">
                  </p>
                  <a href="javascript:;"></a>
                </div>
              </div>
              <div class="low-title-text">
                <p class="rcplaylistText on-a" style="margin: 0px;"><a class="no-a"
                                                                       href="javascript:;">{{ item2.mv_name }}</a></p>
                <p class="rcplaylistText on-a" style="margin: 0px;"><a class="no-a"
                                                                       href="javascript:;">{{ item2.mv_singerName }}</a></p>
                <p class="rcplaylistText no-a2">
                  <a>播放量：</a>
                  <a>{{ changepalyCount(item2.playCount) }}</a>
                  <a>万</a>
                </p>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-main>
  </el-container>
</template>

<script>
import '../../public/css/songlist.css'
import '../../public/css/bootstrap.css'
import axios from "axios";

export default {
  name: "RecommendMv",
  data() {
    return {
      MvList:[]
    }
  },
  methods: {
    changepalyCount(val) {
      return parseFloat(val / 10000).toFixed(2)
    },
    changeAxios(type){
      axios.get("http://localhost:8081/mv/allmainmv/+"+type+"+/全部/最热/0").then((response) => (
          this.MvList = response.data
      ))
    }
  },
  mounted() {
    axios.get("http://localhost:8081/mv/allmainmv/全部/全部/最热/0").then((response) => (
        this.MvList = response.data
    ))
  }
}
</script>

<style scoped>
/*字体*/
.mv_q_zi ul li {
  /*去掉下划线*/
  text-decoration: none;
  /*去掉点点*/
  list-style: none;
  font-size: 15px;
  font-family: "微软雅黑";
  padding-bottom: 20px;
  /*padding-left: 20px;*/

}

.mv_q_zi ul li a {
  color: black;
  margin-left: 35px;
  text-align: center;


}

.mv_q_zi ul li a:hover {
  color: #46b370;
  text-decoration: none;


}

.mv_q_zi {
  padding-right: 20px;
}

/*更多*/
.mv_bu {
  float: right;
  padding-left: 270px;
  font-family: "微软雅黑";
  font-size: 15px;
}

.mv-box {
  width: 270px;
  height: 100%;
  padding: 5px;
  margin: 20px;
}

.no-a {
  text-decoration: none;
  color: #303133;
}

.on-a a:hover {
  color: #46b370;
}

.no-a2 {
  margin-top: 5px;
  text-decoration: none;
  color: #a3a3a3;
}

.rcplaylistText {
  /*去掉下划线*/
  text-decoration: none;
  /*去掉点点*/
  font-size: 15px;
  padding-bottom: 20px;
  width: 200px;
  height: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
