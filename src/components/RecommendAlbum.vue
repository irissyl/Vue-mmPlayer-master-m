<template>

  <el-container class="song">
    <el-header class="container-lg" style="height: 110px;">
      <h3 class="song_h3" style="padding-top: 1.5rem;">新碟上架</h3>
      <div class="song_q_zi offset-sm-4">
        <ul style="list-style: none">
          <el-container>
            <li>
              <a href="javascript:;" @click="changePlaylist('ALL')">全部</a>
            </li>
            <li>
              <a href="javascript:;" @click="changePlaylist('ZH')">华语</a>
            </li>
            <li>
              <a href="javascript:;" @click="changePlaylist('EA')">欧美</a>
            </li>
            <li>
              <a href="javascript:;" @click="changePlaylist('KR')">韩国</a>
            </li>
            <li>
              <a href="javascript:;" @click="changePlaylist('JP')">日本</a>
            </li>
            <li class="offset-sm-4">
              <router-link to="/NewSongAndNewAlbum/NewAlbumPost" href="javascript:;" class="express_bu">更多 ></router-link>
            </li>
          </el-container>
        </ul>
      </div>
    </el-header>
    <el-main class="container-lg">
        <el-carousel style="width: 100%;padding-left: 25px;"  height="550px" indicator-position="outside" arrow="never">
          <el-carousel-item style="padding: 5px;margin-top: 25px;height: 500px;">
            <div class="row" style="width: 1200px;margin: 0px;">
              <div v-for="(album1,index1) in arr1" :key="index1" style="padding-left: 20px;margin-bottom: 15px;">
                <div class="he_ZoomInImgNew">
                  <el-image class="he_ZoomInImgNew_img" :src="album1.album_picUrl"></el-image>
                  <div class="he_ZoomInImgNew_caption">
                    <p class="he_ZoomInImgNew_caption_p" style="margin-bottom:0px;">
                      <img
                          src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006&v=88abebcbc1242dbbbbc836cc3e04a006&v=10e4305a2558d496548955434eaa30d9"
                          width="55px" height="55px">
                    </p>
                    <i>{{ album1.album_name }}</i>
                    <router-link class="he_ZoomInImgNew_caption_a" :to="{path:'/albumdetail/'+album1.album_id}"></router-link>
                  </div>
                </div>
                <div class="low-title-text">
                  <p class="rcplaylistText on-a" style="margin: 0px;"><router-link class="no-a"
                                                                         :to="{path:'/albumdetail/'+album1.album_id}">{{ album1.album_name }}</router-link></p>
                </div>
              </div>
            </div>
          </el-carousel-item>
          <el-carousel-item style="padding: 5px;margin-top: 25px;height: 500px;">
            <div class="row" style="width: 1200px;margin: 0px;">
              <div v-for="(album2,index2) in arr2" :key="index2" style="padding-left: 20px;margin-bottom: 15px;">
                <div class="he_ZoomInImgNew">
                  <el-image class="he_ZoomInImgNew_img" :src="album2.album_picUrl"></el-image>
                  <div class="he_ZoomInImgNew_caption">
                    <p class="he_ZoomInImgNew_caption_p" style="margin-bottom:0px;">
                      <img
                          src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006&v=88abebcbc1242dbbbbc836cc3e04a006&v=10e4305a2558d496548955434eaa30d9"
                          width="55px" height="55px">
                    </p>
                    <i>{{album2.album_id}}</i>
                    <router-link class="he_ZoomInImgNew_caption_a" :to="{path:'/albumdetail/'+album2.album_id}"></router-link>
                  </div>
                </div>
                <div class="low-title-text">
                  <p class="rcplaylistText on-a" style="margin: 0px;"><router-link class="no-a" :to="{path:'/albumdetail/'+album2.album_id}">{{ album2.album_name }}</router-link></p>
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
//
export default {
  name: "RecommendAlbum",
  data() {
    return {
      arr1: [],
      arr2: []
    }
  },
  methods: {
    fixarr(get) {
      this.arr1 = [
        get[0],
        get[1],
        get[2],
        get[3],
        get[4],
        get[5],
        get[6],
        get[7],
        get[8],
        get[9]
      ],
      this.arr2 = [
            get[10],
            get[11],
            get[12],
            get[13],
            get[14],
            get[15],
            get[16],
            get[17],
            get[18],
            get[19]
          ]
    },
    changePlaylist(type){
      // console.log(type)
      axios.get("http://localhost:8081/newmusic/newalbum/0/"+type).then((response) => (
          this.fixarr(response.data)
      ))
    }
  },
  mounted() {
    axios.get("http://localhost:8081/newmusic/newalbum/0/All").then((response) => (
        this.fixarr(response.data)
    ))
  }
}
</script>

<style scoped>
i{
  display: none;
}
button:focus{
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
  height: auto;
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

.no-a {
  text-decoration: none;
  color: #303133;
}

.on-a a:hover {
  color: #46b370;
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
