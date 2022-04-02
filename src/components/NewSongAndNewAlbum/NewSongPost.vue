<template>
  <div class="container">
    <div class="container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="first" v-loading="loadingAll" :style="{height:Withd0}">
          <!--全部-->
          <div class="table-responsive">
            <el-table class="lead" style="font-size: 16px" :data="getlist" stripe lazy
                      :header-cell-style="{background:'#85ce61',color:'#fff','font-size':'17px'}">
              <!-- 序号 -->
              <el-table-column
                  type="index"
              >
              </el-table-column>
              <!-- 图片 -->
              <el-table-column
              >
                <template slot-scope="scope">
                  <div class="box_allsonglist" style="margin: 0 auto;">
                    <div class="he_ZoomInImg Songlist-style" style="margin: 0 auto;">
                      <el-image class="he_ZoomInImg_img" :src="scope.row.song_AlbumImageUrl" alt="Image 01"
                                style="width: 60px;height: 60px;"></el-image>
                      <div class="he_ZoomInImg_caption">
                        <p class="he_ZoomInImg_caption_p">
                          <img
                              src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006&v=88abebcbc1242dbbbbc836cc3e04a006&v=10e4305a2558d496548955434eaa30d9"
                              alt="icon1"></p>
                        <s>{{ scope.row.song_id }}</s>
                        <router-link class="newSong-test" :to="{path:'/songplay/'+scope.row.song_id}"></router-link>
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <!-- 歌曲名 -->
              <el-table-column
                  label="歌曲"
              >
                <template slot-scope="scope">
                  <div>
                    <router-link class="newSong-test" :to="{path:'/SongDetail/'+scope.row.song_id}">
                      {{ scope.row.song_Name }}
                    </router-link>
                  </div>
                </template>
              </el-table-column>
              <!-- 歌手名 -->
              <el-table-column
                  label="歌手"
              >
                <template slot-scope="scope">
                  <div>
                    <router-link class="newSong-test"
                                 :to="{path:'/SingerDetail/'+scope.row.singer_and_songList[0].song_Singerid}">
                      {{ scope.row.singer_and_songList[0].song_SingerName }}
                    </router-link>
                  </div>
                </template>
              </el-table-column>
              <!-- 专辑名 -->
              <el-table-column
                  label="专辑"
                  prop="song_AlbumName"
              >
                <template slot-scope="scope">
                  <div>
                    <router-link class="newSong-test" :to="{path:'/Albumdetail/'+scope.row.song_Albumid}">
                      {{ scope.row.song_AlbumName }}
                    </router-link>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="华语" name="second" v-loading="loadingsecond" :style="{height:Withd1}">
          <!--华语-->
          <div class="table-responsive">
            <el-table class="lead" style="font-size: 16px" :data="hygetlist" stripe lazy
                      :header-cell-style="{background:'#85ce61',color:'#fff','font-size':'17px'}">
              <!-- 序号 -->
              <el-table-column
                  type="index"
              >
              </el-table-column>
              <!-- 图片 -->
              <el-table-column
              >
                <template slot-scope="scope">
                  <div class="box_allsonglist" style="margin: 0 auto;">
                    <div class="he_ZoomInImg Songlist-style" style="margin: 0 auto;">
                      <img class="he_ZoomInImg_img" :src="scope.row.song_AlbumImageUrl" alt="Image 01"
                           style="width: 60px;height: 60px;">
                      <div class="he_ZoomInImg_caption">
                        <p class="he_ZoomInImg_caption_p">
                          <img
                              src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006&v=88abebcbc1242dbbbbc836cc3e04a006&v=10e4305a2558d496548955434eaa30d9"
                              alt="icon1"></p>
                        <s>{{ scope.row.song_id }}</s>
                        <router-link class="newSong-test" :to="{path:'/songplay/'+scope.row.song_id}"></router-link>
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <!-- 歌曲名 -->
              <el-table-column
                  label="歌曲"
              >
                <template slot-scope="scope">
                  <div>
                    <router-link class="newSong-test" :to="{path:'/SongDetail/'+scope.row.song_id}">
                      {{ scope.row.song_Name }}
                    </router-link>
                  </div>
                </template>
              </el-table-column>
              <!-- 歌手名 -->
              <el-table-column
                  label="歌手"
              >
                <template slot-scope="scope">
                  <div>
                    <router-link class="newSong-test"
                                 :to="{path:'/SingerDetail/'+scope.row.singer_and_songList[0].song_Singerid}">
                      {{ scope.row.singer_and_songList[0].song_SingerName }}
                    </router-link>
                  </div>
                </template>
              </el-table-column>
              <!-- 专辑名 -->
              <el-table-column
                  label="专辑"
                  prop="song_AlbumName"
              >
                <template slot-scope="scope">
                  <div>
                    <router-link class="newSong-test" :to="{path:'/Albumdetail/'+scope.row.song_Albumid}">
                      {{ scope.row.song_AlbumName }}
                    </router-link>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="欧美" name="third" v-loading="loadingthird" :style="{height:Withd2}">
          <!--欧美-->
          <div class="table-responsive">
            <el-table class="lead" style="font-size: 16px" :data="omgetlist" stripe lazy
                      :header-cell-style="{background:'#85ce61',color:'#fff','font-size':'17px'}">
              <!-- 序号 -->
              <el-table-column
                  type="index"
              >
              </el-table-column>
              <!-- 图片 -->
              <el-table-column
              >
                <template slot-scope="scope">
                  <div class="box_allsonglist" style="margin: 0 auto;">
                    <div class="he_ZoomInImg Songlist-style" style="margin: 0 auto;">
                      <img class="he_ZoomInImg_img" :src="scope.row.song_AlbumImageUrl" alt="Image 01"
                           style="width: 60px;height: 60px;">
                      <div class="he_ZoomInImg_caption">
                        <p class="he_ZoomInImg_caption_p">
                          <img
                              src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006&v=88abebcbc1242dbbbbc836cc3e04a006&v=10e4305a2558d496548955434eaa30d9"
                              alt="icon1"></p>
                        <s>{{ scope.row.song_id }}</s>
                        <router-link class="newSong-test" :to="{path:'/songplay/'+scope.row.song_id}"></router-link>
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <!-- 歌曲名 -->
              <el-table-column
                  label="歌曲"
              >
                <template slot-scope="scope">
                  <div>
                    <router-link class="newSong-test" :to="{path:'/SongDetail/'+scope.row.song_id}">
                      {{ scope.row.song_Name }}
                    </router-link>
                  </div>
                </template>
              </el-table-column>
              <!-- 歌手名 -->
              <el-table-column
                  label="歌手"
              >
                <template slot-scope="scope">
                  <div>
                    <router-link class="newSong-test"
                                 :to="{path:'/SingerDetail/'+scope.row.singer_and_songList[0].song_Singerid}">
                      {{ scope.row.singer_and_songList[0].song_SingerName }}
                    </router-link>
                  </div>
                </template>
              </el-table-column>
              <!-- 专辑名 -->
              <el-table-column
                  label="专辑"
                  prop="song_AlbumName"
              >
                <template slot-scope="scope">
                  <div>
                    <router-link class="newSong-test" :to="{path:'/Albumdetail/'+scope.row.song_Albumid}">
                      {{ scope.row.song_AlbumName }}
                    </router-link>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="韩国" name="fourth" v-loading="loadingfourth" :style="{height:Withd3}">
          <!--韩国-->
          <div class="table-responsive">
            <el-table class="lead" style="font-size: 16px" :data="kregetlist" stripe lazy
                      :header-cell-style="{background:'#85ce61',color:'#fff','font-size':'17px'}">
              <!-- 序号 -->
              <el-table-column
                  type="index"
              >
              </el-table-column>
              <!-- 图片 -->
              <el-table-column
              >
                <template slot-scope="scope">
                  <div class="box_allsonglist" style="margin: 0 auto;">
                    <div class="he_ZoomInImg Songlist-style" style="margin: 0 auto;">
                      <img class="he_ZoomInImg_img" :src="scope.row.song_AlbumImageUrl" alt="Image 01"
                           style="width: 60px;height: 60px;">
                      <div class="he_ZoomInImg_caption">
                        <p class="he_ZoomInImg_caption_p">
                          <img
                              src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006&v=88abebcbc1242dbbbbc836cc3e04a006&v=10e4305a2558d496548955434eaa30d9"
                              alt="icon1"></p>
                        <s>{{ scope.row.song_id }}</s>
                        <router-link class="newSong-test" :to="{path:'/songplay/'+scope.row.song_id}"></router-link>
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <!-- 歌曲名 -->
              <el-table-column
                  label="歌曲"
              >
                <template slot-scope="scope">
                  <div>
                    <router-link class="newSong-test" :to="{path:'/SongDetail/'+scope.row.song_id}">
                      {{ scope.row.song_Name }}
                    </router-link>
                  </div>
                </template>
              </el-table-column>
              <!-- 歌手名 -->
              <el-table-column
                  label="歌手"
              >
                <template slot-scope="scope">
                  <div>
                    <router-link class="newSong-test"
                                 :to="{path:'/SingerDetail/'+scope.row.singer_and_songList[0].song_Singerid}">
                      {{ scope.row.singer_and_songList[0].song_SingerName }}
                    </router-link>
                  </div>
                </template>
              </el-table-column>
              <!-- 专辑名 -->
              <el-table-column
                  label="专辑"
              >
                <template slot-scope="scope">
                  <div>
                    <router-link class="newSong-test" :to="{path:'/Albumdetail/'+scope.row.song_Albumid}">
                      {{ scope.row.song_AlbumName }}
                    </router-link>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="日本" name="fifth" v-loading="loadingfifth" :style="{height:Withd4}">
          <!--日本-->
          <div class="table-responsive">
            <el-table class="lead" style="font-size: 16px" :data="jpgetlist" stripe lazy
                      :header-cell-style="{background:'#85ce61',color:'#fff','font-size':'17px'}">
              <!-- 序号 -->
              <el-table-column
                  type="index"
              >
              </el-table-column>
              <!-- 图片 -->
              <el-table-column
              >
                <template slot-scope="scope">
                  <div class="box_allsonglist" style="margin: 0 auto;">
                    <div class="he_ZoomInImg Songlist-style" style="margin: 0 auto;">
                      <img class="he_ZoomInImg_img" :src="scope.row.song_AlbumImageUrl" alt="Image 01"
                           style="width: 60px;height: 60px;">
                      <div class="he_ZoomInImg_caption">
                        <p class="he_ZoomInImg_caption_p">
                          <img
                              src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006&v=88abebcbc1242dbbbbc836cc3e04a006&v=10e4305a2558d496548955434eaa30d9"
                              alt="icon1"></p>
                        <s>{{ scope.row.song_id }}</s>
                        <router-link class="newSong-test" :to="{path:'/songplay/'+scope.row.song_id}"></router-link>
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <!-- 歌曲名 -->
              <el-table-column
                  label="歌曲"
              >
                <template slot-scope="scope">
                  <div>
                    <router-link class="newSong-test" :to="{path:'/SongDetail/'+scope.row.song_id}">
                      {{ scope.row.song_Name }}
                    </router-link>
                  </div>
                </template>
              </el-table-column>
              <!-- 歌手名 -->
              <el-table-column
                  label="歌手"
              >
                <template slot-scope="scope">
                  <div>
                    <router-link class="newSong-test"
                                 :to="{path:'/SingerDetail/'+scope.row.singer_and_songList[0].song_Singerid}">
                      {{ scope.row.singer_and_songList[0].song_SingerName }}
                    </router-link>
                  </div>
                </template>
              </el-table-column>
              <!-- 专辑名 -->
              <el-table-column
                  label="专辑"
                  prop="song_AlbumName"
              >
                <template slot-scope="scope">
                  <div>
                    <router-link class="newSong-test" :to="{path:'/Albumdetail/'+scope.row.song_Albumid}">
                      {{ scope.row.song_AlbumName }}
                    </router-link>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import '../../../public/css/bootstrap.css'
import axios from "axios";

export default {
  name: "NewSongPost",
  data() {
    return {
      activeName: 'first',
      Allgetlist: [],
      hygetlist: [],
      jpgetlist: [],
      omgetlist: [],
      kregetlist: [],
      getlist: [],
      temp: [],
      loadingAll: false,
      loadingsecond: false,
      loadingthird: false,
      loadingfourth: false,
      loadingfifth: false,
      Withd0: '500px',
      Withd1: '500px',
      Withd2: '500px',
      Withd3: '500px',
      Withd4: '500px',
    }
  },
  methods: {
    async handleClick(tab) {
      switch (tab.name) {
        case 'second': {
          if (this.Allgetlist.length == 0) {
            this.Withd1 = '500px'
            this.loadingsecond = true
            await axios.get("http://localhost:8081/newmusic/newsong/7").then((response) => (
                this.hygetlist = response.data
            ))
            this.Withd1 = 'auto'
            setTimeout(() => {
              this.loadingsecond = false
            }, 300);
          }
        }
          break;
        case 'third': {
          if (this.omgetlist.length == 0) {
            this.Withd2 = '500px'
            this.loadingthird = true
            await axios.get("http://localhost:8081/newmusic/newsong/96").then((response) => (
                this.omgetlist = response.data
            ))
            this.Withd2 = 'auto'
            setTimeout(() => {
              this.loadingthird = false
            }, 300);
          }
        }
          break;
        case 'fourth': {
          if (this.kregetlist.length == 0) {
            this.Withd3 = '500px'
            this.loadingfourth = true
            await axios.get("http://localhost:8081/newmusic/newsong/16").then((response) => (
                this.kregetlist = response.data
            ))
            this.Withd3 = 'auto'
            setTimeout(() => {
              this.loadingfourth = false
            }, 300);
          }
        }
          break;
        case 'fifth': {
          if (this.jpgetlist.length == 0) {
            this.Withd4 = '500px'
            this.loadingfifth = true
            await axios.get("http://localhost:8081/newmusic/newsong/8").then((response) => {
              this.jpgetlist = response.data
            })
            this.Withd4 = 'auto'
            setTimeout(() => {
              this.loadingfifth = false
            }, 300);
          }
        }
      }
    },
    async getdeafult() {
      if (this.getlist.length == 0) {
        this.loadingAll = true
        this.Withd0 = '500px'
        await axios.get("http://localhost:8081/newmusic/newsong/0").then((response) => {
          this.getlist = response.data
        })
        this.Withd0 = 'auto'
        setTimeout(() => {
          this.loadingAll = false
        }, 500);
      }
    }
  },
  mounted() {
    this.getdeafult()
  }
}
</script>

<style scoped>
body {
  overflow: scroll;
}

s {
  display: none;
}

.getPlaylist-table tbody tr td {
  text-align: center;
  line-height: 60px;
}

.t1 {
  color: dimgrey;
  font-size: 14px;
  font-family: "微软雅黑";
  font-weight: 500;
}

.t1:hover {
  color: black;
}

.newSong-test {
  text-decoration: none;
  color: #303133;
}

.newSong-test:hover, .newSong-test:focus {
  color: #46b370;
}

.he_ZoomInImg {
  background: #000;
  width: 60px;
  height: 60px;
  padding: 0;
  margin: 0;
  position: relative;
  box-sizing: border-box;
  cursor: pointer;
  -webkit-transition: all .4s ease-in-out;
  -moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -ms-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
  overflow: hidden
}

.he_ZoomInImg .he_ZoomInImg_img {
  position: relative;
  display: block;
  width: 60px;
  height: 60px;
  padding: 0;
  margin: 0;
  opacity: 1;
  -webkit-transition: all .4s ease-in-out;
  -moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -ms-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
  overflow: hidden
}

.he_ZoomInImg:hover .he_ZoomInImg_img {
  opacity: .7;
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -o-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1)
}

.he_ZoomInImg .he_ZoomInImg_caption {
  color: #000;
  -moz-backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: all .4s ease-in-out;
  -moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -ms-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
  overflow: hidden;
}

.he_ZoomInImg .he_ZoomInImg_caption,
.he_ZoomInImg .he_ZoomInImg_caption > a {
  position: absolute;
  top: 10px;
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

.he_ZoomInImg .he_ZoomInImg_caption_p {
  text-align: center;
  width: 80%;
  position: absolute;
  top: 10%;
  left: 10%;
  -webkit-transition: all .4s ease-in-out;
  -moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -ms-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
  overflow: hidden;
  opacity: 0
}

.he_ZoomInImg:hover .he_ZoomInImg_caption_p {
  color: #fff;
  opacity: 1
}

/* caption */

.he_ZoomInImg_caption_p img {
  width: 25px;
  height: 25px;
  margin: 0 auto;
  text-align: center;
}

</style>
