<template>
  <el-container>
    <el-header>
      <!--字-->
      <div class="ranking_zi">
        <h3 class="ranking_h3">排行榜</h3>
        <!--<a href="javascript:;" class="ranking_bu">更多 ></a>-->
      </div>
    </el-header>
    <el-main>
      <div class="songranks" style="width: 1200px;margin: 0 auto;height: 600px;">
        <ul style="margin-left: 20px;">
          <li :class="item" v-for="(item,index) in rankClass" :key="index" style="margin-left: 50px;">
            <h3>
              <a href="javascript:;">{{rankSong[index].rankSongList_name}}</a>
              <span class="showplayer"></span>
            </h3>
            <div class="ranklist-box">
              <div class="ranklist-arow">
                <div class="row">
                  <div>
                    1
                  </div>
                  <div style="margin-left: 7px;">
                    <p class="text-over-style"><a href="javascript:;">{{rankSong[index].rankSongList_song[0]}}</a></p>
                  </div>
                </div>
                <div>
                  <p class="text-over-style"><a href="javascript:;">{{rankSong[index].rankSongList_singer[0]}}</a></p>
                </div>
              </div>
              <div class="ranklist-arow">
                <div class="row">
                  <div>
                    2
                  </div>
                  <div style="margin-left: 7px;">
                    <p class="text-over-style"><a href="javascript:;">{{rankSong[index].rankSongList_song[1]}}</a></p>
                  </div>
                </div>
                <div>
                  <p class="text-over-style"><a href="javascript:;">{{rankSong[index].rankSongList_singer[1]}}</a></p>
                </div>
              </div>
              <div class="ranklist-arow">
                <div class="row">
                  <div>
                    3
                  </div>
                  <div style="margin-left: 7px;">
                    <p class="text-over-style"><a href="javascript:;">{{rankSong[index].rankSongList_song[2]}}</a></p>
                  </div>
                </div>
                <div>
                  <p class="text-over-style"><a href="javascript:;">{{rankSong[index].rankSongList_singer[2]}}</a></p>
                </div>
              </div>
            </div>
            <div class="he_ZoomInImg_caption-song">
              <p class="he_ZoomInImg_caption_p-song" style="margin-bottom:0px;">
                <img
                    src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006&v=88abebcbc1242dbbbbc836cc3e04a006&v=10e4305a2558d496548955434eaa30d9"
                    style="width: 45px;height: 45px;" />
              </p>
              <i>{{rankSong[index].rankSongList_id}}</i>
              <router-link class="he_ZoomInImg-song_caption_a" :to="{path:'/playlistdetail/'+rankSong[index].rankSongList_id}"></router-link>
            </div>
          </li>
        </ul>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import '../../public/css/bootstrap.css'
import axios from "axios";

export default {
  name: "RankList",
  data(){
    return{
      rankClass:['rank1','rank2','rank3','rank4'],
      rankSong: []
    }
  },
  created() {
    axios.get("http://localhost:8081/playlist/mainrank").then((response) => {
      this.rankSong = response.data
    })
  }
}
</script>

<style scoped>
i{
  display: none;
}
/*排行榜*/
.ranking_h3 {
  text-align: center;
  font-weight: bold;
  font-family: "微软雅黑";

}

/*更多*/
.ranking_zi a:hover {
  color: #DE875E;
  /*去掉下划线*/
  text-decoration: none;
}

.songranks ul {
  list-style: none;
  height: 400px;
}

.songranks ul li {
  width: 200px;
  height: 500px;
  margin-right: 20px;
  float: left;
  position: relative;
  background-image: url(../assets/img.png);
  background-repeat: no-repeat;
}

.songranks ul .rank1 {
  background-position: 0 0;
  opacity: 1;
  -webkit-transition: all .4s ease-in-out;
  -moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -ms-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
  overflow: hidden
}

.songranks ul .rank1:hover .he_ZoomInImg_caption-song {
  -moz-backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: all .4s ease-in-out;
  -moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -ms-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
  overflow: hidden
}

.songranks ul .rank1:hover {
  opacity: 1;
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -o-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1);
}

.songranks ul .rank1 .he_ZoomInImg_caption-song,

.songranks ul .rank1 .he_ZoomInImg_caption-song > a {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  -webkit-transition: all .4s ease-in-out;
  -moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -ms-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
  overflow: hidden
}

.songranks ul .rank1 .he_ZoomInImg_caption_p-song {
  text-align: center;
  width: 80%;
  position: absolute;
  top: 30%;
  left: 10%;
  -webkit-transition: all .4s ease-in-out;
  -moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -ms-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
  overflow: hidden;
  opacity: 0
}

.songranks ul .rank1:hover .he_ZoomInImg_caption_p-song {
  color: #fff;
  opacity: 1
}

.songranks ul .rank2 {
  background-position: -224px 0;
  opacity: 1;
  -webkit-transition: all .4s ease-in-out;
  -moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -ms-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
  overflow: hidden
}

.songranks ul .rank2:hover {
  opacity: 1;
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -o-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1);
}

.songranks ul .rank2:hover .he_ZoomInImg_caption-song {
  color: #000;
  -moz-backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: all .4s ease-in-out;
  -moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -ms-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
  overflow: hidden
}

.songranks ul .rank2 .he_ZoomInImg_caption-song,
.songranks ul .rank2 .he_ZoomInImg_caption-song > a {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  -webkit-transition: all .4s ease-in-out;
  -moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -ms-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
  overflow: hidden
}

.songranks ul .rank2 .he_ZoomInImg_caption_p-song {
  text-align: center;
  width: 80%;
  position: absolute;
  top: 30%;
  left: 10%;
  -webkit-transition: all .4s ease-in-out;
  -moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -ms-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
  overflow: hidden;
  opacity: 0
}

.songranks ul .rank2:hover .he_ZoomInImg_caption_p-song {
  color: #fff;
  opacity: 1
}

.songranks ul .rank3 {
  background-position: -448px 0;
  opacity: 1;
  -webkit-transition: all .4s ease-in-out;
  -moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -ms-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
  overflow: hidden
}

.songranks ul .rank3:hover {
  opacity: 1;
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -o-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1);
}

.songranks ul .rank3:hover .he_ZoomInImg_caption-song {
  color: #000;
  -moz-backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: all .4s ease-in-out;
  -moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -ms-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
  overflow: hidden
}

.songranks ul .rank3 .he_ZoomInImg_caption-song,
.songranks ul .rank3 .he_ZoomInImg_caption-song > a {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  -webkit-transition: all .4s ease-in-out;
  -moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -ms-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
  overflow: hidden
}

.songranks ul .rank3 .he_ZoomInImg_caption_p-song {
  text-align: center;
  width: 80%;
  position: absolute;
     top: 30%;
  left: 10%;
  -webkit-transition: all .4s ease-in-out;
  -moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -ms-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
  overflow: hidden;
  opacity: 0
}

.songranks ul .rank3:hover .he_ZoomInImg_caption_p-song {
  color: #fff;
  opacity: 1
}

.songranks ul .rank4 {
  background-position: -672px 0;
  opacity: 1;
  -webkit-transition: all .4s ease-in-out;
  -moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -ms-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
  overflow: hidden
}

.songranks ul .rank4:hover {
  opacity: 1;
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -o-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1);
}

.songranks ul .rank4:hover .he_ZoomInImg_caption-song {
  color: #000;
  -moz-backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: all .4s ease-in-out;
  -moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -ms-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
  overflow: hidden
}

.songranks ul .rank4 .he_ZoomInImg_caption-song,
.songranks ul .rank4 .he_ZoomInImg_caption-song > a {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  -webkit-transition: all .4s ease-in-out;
  -moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -ms-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
  overflow: hidden
}

.songranks ul .rank4 .he_ZoomInImg_caption_p-song {
  text-align: center;
  width: 80%;
  position: absolute;
     top: 30%;
  left: 10%;
  -webkit-transition: all .4s ease-in-out;
  -moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -ms-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
  overflow: hidden;
  opacity: 0
}

.songranks ul .rank4:hover .he_ZoomInImg_caption_p-song {
  color: #fff;
  opacity: 1
}

.songranks ul .rank5 {
  background-position: -897px 0;
  opacity: 1;
  -webkit-transition: all .4s ease-in-out;
  -moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -ms-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
  overflow: hidden
}

.songranks ul .rank5:hover {
  opacity: 1;
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -o-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1);
}

.songranks ul .rank5:hover .he_ZoomInImg_caption-song {
  color: #000;
  -moz-backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: all .4s ease-in-out;
  -moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -ms-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
  overflow: hidden
}

.songranks ul .rank5 .he_ZoomInImg_caption-song,
.songranks ul .rank5 .he_ZoomInImg_caption-song > a {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  -webkit-transition: all .4s ease-in-out;
  -moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -ms-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
  overflow: hidden
}

.songranks ul .rank5 .he_ZoomInImg_caption_p-song {
  text-align: center;
  width: 80%;
  position: absolute;
     top: 30%;
  left: 10%;
  -webkit-transition: all .4s ease-in-out;
  -moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -ms-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
  overflow: hidden;
  opacity: 0
}

.songranks ul .rank5:hover .he_ZoomInImg_caption_p-song {
  color: #fff;
  opacity: 1
}

.songranks ul li h3 {
  width: 200px;
  height: 58px;
  position: absolute;
  left: 50%;
  margin-left: -100px;
  top: 50px;
}

.songranks ul li h3 a {
  display: block;
  height: 36px;
  text-decoration: none;
  color: #fff;
  font-weight: 400;
  font-size: 26px;
  line-height: 36px;
  text-align: center;
  padding-top: 22px;
  background-image: url(../assets/content_title.png);
  background-repeat: no-repeat;
  background-position: 65px -300px;
}

.songranks ul li h3 span {
  display: block;
  width: 36px;
  height: 2px;
  background-color: #fff;
  margin: 30px 0 50px 80px;
}

.ranklist-box {
  position: relative;
  top: 200px;
  left: 30%;
  color: white;
}

.text-over-style {
  width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ranklist-box a {
  text-decoration: none;
  color: white;


}

.ranklist-arow {
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>