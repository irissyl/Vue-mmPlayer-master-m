<template>
  <!--歌单推荐-->
  <el-container class="song">
    <el-header class="container-lg" style="margin-bottom: 25px;">
      <div>
        <!--字体-->
        <h3 class="song_h3" style="padding-top: 1.5rem;">歌单推荐</h3>
      </div>
    </el-header>
    <el-main>
      <div class="container-lg" style="padding: 0px">
        <el-carousel height="320px" indicator-position="outside">
          <el-carousel-item style="padding: 5px;margin-top: 25px;margin-left:25px;height: auto"
                            class="el-carousel__item">
            <el-container>
              <div v-for="(rcplay3,index3) in arr3" :key="index3" style="padding-left: 24px;">
                <div class="he_ZoomInImgNew">
                  <el-image class="he_ZoomInImgNew_img" :src="rcplay3.songlist_picUrl"></el-image>
                  <div class="he_ZoomInImgNew_caption">
                    <p class="he_ZoomInImgNew_caption_p" style="margin-bottom:0px;">
                      <img
                          src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006&v=88abebcbc1242dbbbbc836cc3e04a006&v=10e4305a2558d496548955434eaa30d9"
                          width="55px" height="55px">
                    </p>
                    <router-link class="he_ZoomInImgNew_caption_a" :to="{path:'/playlistdetail/'+rcplay3.songlist_id}" ></router-link>
                  </div>
                </div>
                <div class="low-title-text">
                  <p class="rcplaylistText on-a" style="margin: 0px;"><router-link class="no-a"
                                                                         :to="{path:'/playlistdetail/'+rcplay3.songlist_id}" >{{ rcplay3.songlist_name }}</router-link></p>
                  <p class="rcplaylistText no-a2">
                    <a>播放量：</a>
                    <a>{{ changepalyCount(rcplay3.songlist_playCount) }}</a>
                    <a>万</a>
                  </p>
                </div>
              </div>
            </el-container>
          </el-carousel-item>
          <el-carousel-item style="padding: 5px;margin-top: 25px;margin-left:25px;height: auto"
                            class="el-carousel__item">
            <el-container>
              <div v-for="(rcplay2,index2) in arr2" :key="index2" style="padding-left: 24px;">
                <div class="he_ZoomInImgNew">
                  <el-image class="he_ZoomInImgNew_img" :src="rcplay2.songlist_picUrl"></el-image>
                  <div class="he_ZoomInImgNew_caption">
                    <p class="he_ZoomInImgNew_caption_p" style="margin-bottom:0px;">
                      <img
                          src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006&v=88abebcbc1242dbbbbc836cc3e04a006&v=10e4305a2558d496548955434eaa30d9"
                          width="55px" height="55px">
                    </p>
                    <router-link class="he_ZoomInImgNew_caption_a" :to="{path:'/playlistdetail/'+rcplay2.songlist_id}" ></router-link>
                  </div>
                </div>
                <div class="low-title-text">
                  <p class="rcplaylistText on-a" style="margin: 0px;"><router-link class="no-a"
                                                                         :to="{path:'/playlistdetail/'+rcplay2.songlist_id}">{{ rcplay2.songlist_name }}</router-link></p>
                  <p class="rcplaylistText no-a2">
                    <a>播放量：</a>
                    <a>{{ changepalyCount(rcplay2.songlist_playCount) }}</a>
                    <a>万</a>
                  </p>
                </div>
              </div>
            </el-container>
          </el-carousel-item>
          <el-carousel-item style="padding: 5px;margin-top: 25px;margin-left:25px;height: auto"
                            class="el-carousel__item">
            <el-container>
              <div v-for="(rcplay1,index1) in arr1" :key="index1" style="padding-left: 24px;">
                <div class="he_ZoomInImgNew">
                  <el-image class="he_ZoomInImgNew_img" :src="rcplay1.songlist_picUrl"></el-image>
                  <div class="he_ZoomInImgNew_caption">
                    <p class="he_ZoomInImgNew_caption_p" style="margin-bottom:0px;">
                      <img
                          src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006&v=88abebcbc1242dbbbbc836cc3e04a006&v=10e4305a2558d496548955434eaa30d9"
                          width="55px" height="55px">
                    </p>
                    <router-link :to="{path:'/playlistdetail/'+rcplay1.songlist_id}"></router-link>
                  </div>
                </div>
                <div class="low-title-text">
                  <p class="rcplaylistText on-a" style="margin: 0px;">
                    <router-link class="no-a" :to="{path:'/playlistdetail/'+rcplay1.songlist_id}">{{ rcplay1.songlist_name }}</router-link>
                  </p>
                  <p class="rcplaylistText no-a2">
                    <a>播放量：</a>
                    <a>{{ changepalyCount(rcplay1.songlist_playCount) }}</a>
                    <a>万</a>
                  </p>
                </div>
              </div>
            </el-container>
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import '../../public/css/songlist.css'
import '../../public/css/bootstrap.css'
import axios from "axios";
//
export default {
  name: "RecommendPlaylist",
  data() {
    return {
      arr1: [],
      arr2: [],
      arr3: []
    }
  },
  methods: {
    fixarr(get) {
      this.arr1 = [
        get[0],
        get[1],
        get[2],
        get[3],
        get[4]
      ],
          this.arr2 = [
            get[5],
            get[6],
            get[7],
            get[8],
            get[9]
          ],
          this.arr3 = [
            get[10],
            get[11],
            get[12],
            get[13],
            get[14]
          ]
    },
    changepalyCount(val) {
      return parseFloat(val / 10000).toFixed(2)
    }
  },
  mounted() {
    axios.get("http://localhost:8081/playlist/recommendplaylist").then((response) => (
        this.fixarr(response.data)
    ))
  }
}
</script>

<style scoped>

button:focus {
  box-shadow: none;
  outline: none;
  border: none;
}

/* 轮播 */
.el-carousel__item {
  font-size: 18px;
  width: 100vw;
}

.low-title-text {
  margin-top: 8px;
}

/*歌单推荐*/
.song {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(#f5f5f5, white);
}

.song_h3 {
  text-align: center;
  font-weight: bold;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
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

.song_q_zi ul li a {
  color: #303133;
  margin-left: 35px;
  text-align: center;
}

.song_q_zi ul li a:hover {
  color: #36aa65;
  text-decoration: none;
}

.songSheet_content ul {
  list-style: none;

}

.songSheet_content ul li {
  position: relative;
  width: 224px;
  float: left;
  margin-right: 20px;
  font-size: 14px;
  font-weight: 400;

}

.songSheet_content ul li img {
  width: 224px;
  height: 224px;
  padding-bottom: 15px;
}

.songSheet_content ul li a {
  display: block;
  text-decoration: none;
  color: #333;
  line-height: 22px;
  font-family: "微软雅黑";
}

.songSheet_content ul li a:hover {
  color: #36aa65;
}

.songSheet_content ul li span {
  display: block;
  font-size: 14px;
  line-height: 21px;
  color: #C0C4CC;
  font-family: "微软雅黑";
}

</style>