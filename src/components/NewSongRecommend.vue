<template>
  <el-container class="express">
    <el-header class="container-lg" style="height: 110px;">
      <h3 class="express_h3">新歌首发</h3>
      <div class="express_q_zi offset-sm-4">
        <ul>
          <el-container>
            <li>
              <a href="javascript:;" @click="changePlaylist(7)">华语</a>
            </li>
            <li>
              <a href="javascript:;" @click="changePlaylist(96)">欧美</a>
            </li>
            <li>
              <a href="javascript:;" @click="changePlaylist(16)">韩国</a>
            </li>
            <li>
              <a href="javascript:;" @click="changePlaylist(8)">日本</a>
            </li>
            <li class="offset-sm-4">
              <router-link href="javascript:;" class="express_bu" :to="{path:'/NewSongAndNewAlbum/NewSongPost'}">更多 ></router-link>
            </li>
          </el-container>
        </ul>
      </div>
    </el-header>
    <el-main class="container-lg">
      <div>
        <keep-alive :include="recSong">
        <el-carousel height="400px" indicator-position="outside" arrow="hover">
            <el-carousel-item v-for="(item1,index1) in recSong" :key="index1" style="padding: 5px;margin-top: 25px;margin-left:45px;height: auto" class="el-carousel__item">
              <el-container>
                <div class="container-lg" >
                  <el-container>
                    <div>
                      <el-container class="newSongCol-position">
                        <div class="he_ZoomInImg-song">
                          <el-image class="he_ZoomInImg_img-song"
                                    :src="item1[0].song_AlbumImageUrl"></el-image>
                          <div class="he_ZoomInImg_caption-song">
                            <p class="he_ZoomInImg_caption_p-song" style="margin-bottom:0px;">
                              <img
                                  src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006&v=88abebcbc1242dbbbbc836cc3e04a006&v=10e4305a2558d496548955434eaa30d9"
                                  width="55px" height="55px">
                            </p>
                            <i>{{item1[0].song_id}}</i>
<!--                            <router-link class="he_ZoomInImg-song_caption_a" :to="{path:'/music'}"></router-link>-->
                            <router-link class="he_ZoomInImg-song_caption_a" :to="{path:'/SongDetail/'+item1[0].song_id}"></router-link>
                          </div>
                        </div>
                        <div>
                          <p class="text-over-style"><router-link class="text-over-style newSong-position" :to="{path:'/SongDetail/'+item1[0].song_id}">{{item1[0].song_Name}}</router-link>
                          </p>
                          <i>{{item1[0].singer_and_songList[0].song_Singerid}}</i>
                          <p class="text-over-style"><router-link class="text-over-style newSinger-position" :to="{path:'/SingerDetail/'+item1[0].singer_and_songList[0].song_Singerid}">{{item1[0].singer_and_songList[0].song_SingerName}}</router-link>
                          </p>
                        </div>
                      </el-container>
                    </div>
                  </el-container>
                  <el-container>
                    <div>
                      <el-container class="newSongCol-position">
                        <div class="he_ZoomInImg-song">
                          <el-image class="he_ZoomInImg_img-song"
                                    :src="item1[1].song_AlbumImageUrl"></el-image>
                          <div class="he_ZoomInImg_caption-song">
                            <p class="he_ZoomInImg_caption_p-song" style="margin-bottom:0px;">
                              <img
                                  src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006&v=88abebcbc1242dbbbbc836cc3e04a006&v=10e4305a2558d496548955434eaa30d9"
                                  width="55px" height="55px">
                            </p>
                            <i>{{item1[1].song_id}}</i>
                            <router-link class="he_ZoomInImg-song_caption_a" :to="{path:'/SongDetail/'+item1[1].song_id}"></router-link>
                          </div>
                        </div>
                        <div>
                          <p class="text-over-style"><router-link class="text-over-style newSong-position" :to="{path:'/SongDetail/'+item1[1].song_id}">{{item1[1].song_Name}}</router-link>
                          </p>
                          <i>{{item1[1].singer_and_songList[0].song_Singerid}}</i>
                          <p class="text-over-style"><router-link :to="{path:'/SingerDetail/'+item1[1].singer_and_songList[0].song_Singerid}" class="text-over-style newSinger-position" href="javascript:;">{{item1[1].singer_and_songList[0].song_SingerName}}</router-link>
                          </p>
                        </div>
                      </el-container>
                    </div>
                  </el-container>
                  <el-container>
                    <div>
                      <el-container class="newSongCol-position">
                        <div class="he_ZoomInImg-song">
                          <el-image class="he_ZoomInImg_img-song"
                                    :src="item1[2].song_AlbumImageUrl"></el-image>
                          <div class="he_ZoomInImg_caption-song">
                            <p class="he_ZoomInImg_caption_p-song" style="margin-bottom:0px;">
                              <img
                                  src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006&v=88abebcbc1242dbbbbc836cc3e04a006&v=10e4305a2558d496548955434eaa30d9"
                                  width="55px" height="55px">
                            </p>
                            <i>{{item1[2].song_id}}</i>
                            <router-link class="he_ZoomInImg-song_caption_a" :to="{path:'/SongDetail/'+item1[2].song_id}"></router-link>
                          </div>
                        </div>
                        <div>
                          <p class="text-over-style"><router-link class="text-over-style newSong-position" :to="{path:'/SongDetail/'+item1[2].song_id}">{{item1[2].song_Name}}</router-link>
                          </p>
                          <i>{{item1[2].singer_and_songList[0].song_Singerid}}</i>
                          <p class="text-over-style"><router-link :to="{path:'/SingerDetail/'+item1[2].singer_and_songList[0].song_Singerid}" class="text-over-style newSinger-position" href="javascript:;">{{item1[2].singer_and_songList[0].song_SingerName}}</router-link>
                          </p>
                        </div>
                      </el-container>
                    </div>
                  </el-container>
                </div>
                <div class="container-lg" >
                  <el-container>
                    <div>
                      <el-container class="newSongCol-position">
                        <div class="he_ZoomInImg-song">
                          <el-image class="he_ZoomInImg_img-song"
                                    :src="item1[3].song_AlbumImageUrl"></el-image>
                          <div class="he_ZoomInImg_caption-song">
                            <p class="he_ZoomInImg_caption_p-song" style="margin-bottom:0px;">
                              <img
                                  src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006&v=88abebcbc1242dbbbbc836cc3e04a006&v=10e4305a2558d496548955434eaa30d9"
                                  width="55px" height="55px">
                            </p>
                            <i>{{item1[3].song_id}}</i>
                            <router-link class="he_ZoomInImg-song_caption_a" :to="{path:'/SongDetail/'+item1[3].song_id}"></router-link>
                          </div>
                        </div>
                        <div>
                          <p class="text-over-style"><router-link class="text-over-style newSong-position" :to="{path:'/SongDetail/'+item1[3].song_id}">{{item1[3].song_Name}}</router-link>
                          </p>
                          <i>{{item1[3].singer_and_songList[0].song_Singerid}}</i>
                          <p class="text-over-style"><router-link class="text-over-style newSinger-position" :to="{path:'/SingerDetail/'+item1[3].singer_and_songList[0].song_Singerid}">{{item1[3].singer_and_songList[0].song_SingerName}}</router-link>
                          </p>
                        </div>
                      </el-container>
                    </div>
                  </el-container>
                  <el-container>
                    <div>
                      <el-container class="newSongCol-position">
                        <div class="he_ZoomInImg-song">
                          <el-image class="he_ZoomInImg_img-song"
                                    :src="item1[4].song_AlbumImageUrl"></el-image>
                          <div class="he_ZoomInImg_caption-song">
                            <p class="he_ZoomInImg_caption_p-song" style="margin-bottom:0px;">
                              <img
                                  src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006&v=88abebcbc1242dbbbbc836cc3e04a006&v=10e4305a2558d496548955434eaa30d9"
                                  width="55px" height="55px">
                            </p>
                            <i>{{item1[4].song_id}}</i>
                            <router-link class="he_ZoomInImg-song_caption_a" :to="{path:'/SongDetail/'+item1[4].song_id}"></router-link>
                          </div>
                        </div>
                        <div>
                          <p class="text-over-style"><router-link class="text-over-style newSong-position" :to="{path:'/SongDetail/'+item1[4].song_id}">{{item1[4].song_Name}}</router-link>
                          </p>
                          <i>{{item1[4].singer_and_songList[0].song_Singerid}}</i>
                          <p class="text-over-style"><router-link class="text-over-style newSinger-position" :to="{path:'/SingerDetail/'+item1[4].singer_and_songList[0].song_Singerid}">{{item1[4].singer_and_songList[0].song_SingerName}}</router-link>
                          </p>
                        </div>
                      </el-container>
                    </div>
                  </el-container>
                  <el-container>
                    <div>
                      <el-container class="newSongCol-position">
                        <div class="he_ZoomInImg-song">
                          <el-image class="he_ZoomInImg_img-song"
                                    :src="item1[5].song_AlbumImageUrl"></el-image>
                          <div class="he_ZoomInImg_caption-song">
                            <p class="he_ZoomInImg_caption_p-song" style="margin-bottom:0px;">
                              <img
                                  src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006&v=88abebcbc1242dbbbbc836cc3e04a006&v=10e4305a2558d496548955434eaa30d9"
                                  width="55px" height="55px">
                            </p>
                            <i>{{item1[5].song_id}}</i>
                            <router-link class="he_ZoomInImg-song_caption_a" :to="{path:'/SongDetail/'+item1[5].song_id}"></router-link>
                          </div>
                        </div>
                        <div>
                          <p class="text-over-style"><router-link class="text-over-style newSong-position" :to="{path:'/SongDetail/'+item1[5].song_id}">{{item1[5].song_Name}}</router-link>
                          </p>
                          <i>{{item1[5].singer_and_songList[0].song_Singerid}}</i>
                          <p class="text-over-style"><router-link class="text-over-style newSinger-position" :to="{path:'/SingerDetail/'+item1[5].singer_and_songList[0].song_Singerid}">{{item1[5].singer_and_songList[0].song_SingerName}}</router-link>
                          </p>
                        </div>
                      </el-container>
                    </div>
                  </el-container>
                </div>
                <div class="container-lg" >
                  <el-container>
                    <div>
                      <el-container class="newSongCol-position">
                        <div class="he_ZoomInImg-song">
                          <el-image class="he_ZoomInImg_img-song"
                                    :src="item1[6].song_AlbumImageUrl"></el-image>
                          <div class="he_ZoomInImg_caption-song">
                            <p class="he_ZoomInImg_caption_p-song" style="margin-bottom:0px;">
                              <img
                                  src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006&v=88abebcbc1242dbbbbc836cc3e04a006&v=10e4305a2558d496548955434eaa30d9"
                                  width="55px" height="55px">
                            </p>
                            <i>{{item1[6].song_id}}</i>
                            <router-link class="he_ZoomInImg-song_caption_a" :to="{path:'/SongDetail/'+item1[6].song_id}"></router-link>
                          </div>
                        </div>
                        <div>
                          <p class="text-over-style"><router-link class="text-over-style newSong-position" :to="{path:'/SongDetail/'+item1[6].song_id}">{{item1[6].song_Name}}</router-link>
                          </p>
                          <i>{{item1[6].singer_and_songList[0].song_Singerid}}</i>
                          <p class="text-over-style"><router-link class="text-over-style newSinger-position" :to="{path:'/SingerDetail/'+item1[6].singer_and_songList[0].song_Singerid}">{{item1[6].singer_and_songList[0].song_SingerName}}</router-link>
                          </p>
                        </div>
                      </el-container>
                    </div>
                  </el-container>
                  <el-container>
                    <div>
                      <el-container class="newSongCol-position">
                        <div class="he_ZoomInImg-song">
                          <el-image class="he_ZoomInImg_img-song"
                                    :src="item1[7].song_AlbumImageUrl"></el-image>
                          <div class="he_ZoomInImg_caption-song">
                            <p class="he_ZoomInImg_caption_p-song" style="margin-bottom:0px;">
                              <img
                                  src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006&v=88abebcbc1242dbbbbc836cc3e04a006&v=10e4305a2558d496548955434eaa30d9"
                                  width="55px" height="55px">
                            </p>
                            <i>{{item1[7].song_id}}</i>
                            <router-link class="he_ZoomInImg-song_caption_a" :to="{path:'/SongDetail/'+item1[7].song_id}"></router-link>
                          </div>
                        </div>
                        <div>
                          <p class="text-over-style"><router-link class="text-over-style newSong-position" :to="{path:'/SongDetail/'+item1[7].song_id}">{{item1[7].song_Name}}</router-link>
                          </p>
                          <i>{{item1[7].singer_and_songList[0].song_Singerid}}</i>
                          <p class="text-over-style"><router-link class="text-over-style newSinger-position" :to="{path:'/SingerDetail/'+item1[7].singer_and_songList[0].song_Singerid}">{{item1[7].singer_and_songList[0].song_SingerName}}</router-link>
                          </p>
                        </div>
                      </el-container>
                    </div>
                  </el-container>
                  <el-container>
                    <div>
                      <el-container class="newSongCol-position">
                        <div class="he_ZoomInImg-song">
                          <el-image class="he_ZoomInImg_img-song"
                                    :src="item1[8].song_AlbumImageUrl"></el-image>
                          <div class="he_ZoomInImg_caption-song">
                            <p class="he_ZoomInImg_caption_p-song" style="margin-bottom:0px;">
                              <img
                                  src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006&v=88abebcbc1242dbbbbc836cc3e04a006&v=10e4305a2558d496548955434eaa30d9"
                                  width="55px" height="55px">
                            </p>
                            <i>{{item1[8].song_id}}</i>
                            <router-link class="he_ZoomInImg-song_caption_a" :to="{path:'/SongDetail/'+item1[8].song_id}"></router-link>
                          </div>
                        </div>
                        <div>
                          <p class="text-over-style"><router-link class="text-over-style newSong-position" :to="{path:'/SongDetail/'+item1[8].song_id}">{{item1[8].song_Name}}</router-link>
                          </p>
                          <i>{{item1[8].singer_and_songList[0].song_Singerid}}</i>
                          <p class="text-over-style"><router-link class="text-over-style newSinger-position" :to="{path:'/SingerDetail/'+item1[8].singer_and_songList[0].song_Singerid}">{{item1[8].singer_and_songList[0].song_SingerName}}</router-link>
                          </p>
                        </div>
                      </el-container>
                    </div>
                  </el-container>
                </div>
              </el-container>
            </el-carousel-item>
        </el-carousel>
        </keep-alive>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import '../../public/css/songlist.css'
import '../../public/css/bootstrap.css'
import axios from "axios";

export default {
  name: "NewSongRecommend",
  data(){
     return{
        recSong: [],
        getSongType: 0,
        SingerID:'',
        SongID:''
     }
  },
  methods: {
    changePlaylist(type){
      // console.log(type)
      axios.get("http://localhost:8081/newmusic/mainnewsong/"+type).then((response) => (
          this.recSong = response.data
      ))
    },
  },
  created() {
    axios.get("http://localhost:8081/newmusic/mainnewsong/"+this.getSongType).then((response) => (
        this.recSong = response.data
    ))
  }
}
</script>

<style scoped>
i{
  display: none;
}

.newSongCol-position {
  margin: 15px;
}

.text-over-style {
  margin-top: 10px;
  margin-left: 7px;
  width: 170px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.newSong-position {
  color: #606266;
  text-decoration: none;
}

.newSong-position:hover {
  color: #46b370;
  text-decoration: none;
}

.newSinger-position {
  color: #909093;
  font-size: 13px;
  text-decoration: none;
}

.newSinger-position:hover {
  color: #46b370;
  text-decoration: none;
}

/*新歌首发*/
.express {
  width: 100%;
  height: auto;
  background-image: linear-gradient(#f5f5f5, white);
}

.express_h3 {
  text-align: center;
  font-weight: bold;
  font-family: "微软雅黑";
}

h3 {
  padding-top: 30px;
  padding-bottom: 20px;
}

.express_q_zi ul li {
  /*去掉下划线*/
  text-decoration: none;
  /*去掉点点*/
  list-style: none;
  font-size: 15px;
  font-family: "微软雅黑";
  padding-bottom: 20px;
  /*padding-left: 20px;*/
}

/*更多*/
.express_bu {
  float: right;
  font-family: "微软雅黑";
  font-size: 15px;
}

.express_q_zi ul li a {
  color: black;
  margin-left: 35px;
  text-align: center;
}

.express_q_zi a:hover {
  color: #46b370;
  text-decoration: none;
}

.express_q_zi a:focus {
  color: #46b370;
  text-decoration: none;
}

.express_q_zi {
  padding-right: 20px;
}

.express_q_h ul {
  list-style: none;

}

.express_q_h ul li {
  width: 350px;
  height: 110px;
  float: left;
  font-size: 14px;
  color: #333;
  position: relative;
  border-top: 1px solid #ededed;
  padding: 10px 0 10px 0;

}
</style>
