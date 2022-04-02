<template>
  <div>
    <el-container>
      <el-header style="height: auto">
        <div class="container">
          <div class="row" style="margin: 0 auto">
            <div class="col-lg-3">
              <el-image id="PageImg" :src="getAlbum.album_picUrl"
                        style="width: 250px;height: 250px;"
              >

              </el-image>
            </div>
            <div class="col-lg-7 playlist-text-style">
              <div><h3 style="font-size: 31px;line-height: 50px;">
                {{ getAlbum.album_name }}</h3></div>
              <div><span><i class="el-icon-user buling"
                            style="font-size: 20px;"
              ></i></span><span class="singerChannel"><router-link :to="{path:'/SingerDetail/'+getAlbum.album_Singerid}">{{
                  getAlbum.album_SingerName
                }}</router-link></span>
              </div>
              <div><span>标签：</span><span>{{ getAlbum.type }}</span></div>
              <div><span>公司：</span><span>{{ getAlbum.album_company }}</span></div>
              <div><span>单曲量：</span><span>{{ getAlbum.album_MusicSize}}</span></div>
              <div><span>发行时间：</span><span>{{ getAlbum.album_publicTime | filterA}}</span></div>
              <div style="margin-top: 1rem;line-height: 70px;">
                <el-button type="success" @click="drawer = true">
                  <i class="el-icon-video-play " style="font-size: 16px;"></i>
                  播放全部
                </el-button>
                <el-button type="danger" plain>
                  <div>
                    <i class="el-icon-s-opportunity" style="font-size: 16px;"></i>
                    收藏
                  </div>
                </el-button>
                <el-button type="info" plain><i class="el-icon-chat-dot-round" style="font-size: 16px;"></i>评论</el-button>
                <el-button type="info" plain><i class="el-icon-more" style="font-size: 16px;margin-right: 5px;"></i>更多
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </el-header>
      <el-main>
        <div class="container">
          <el-divider content-position="left"><i class="el-icon-sugar buling"></i><span class="lead buling"
                                                                                        style="font-size: 14px;"
          >深藏blue音乐</span><i
            class="el-icon-sugar buling"
          ></i></el-divider>
          <el-divider content-position="right"><i class="el-icon-sugar buling"></i><span class="lead buling"
                                                                                        style="font-size: 14px;"
          >深藏blue音乐</span><i
            class="el-icon-sugar buling"
          ></i></el-divider>
          <div style="margin-top: 1.5rem;">
            <div class="row">
              <div class="col-lg-9">
                <el-table v-loading="PlaylistLoading" :data="getAlbum.album_SongList" lazy class="table-text"
                          :style="{height:PlaylistDefaultHeight}"
                          :header-cell-style="{background:'#36AA65',color:'#fff','font-size':'17px'}"
                          style="padding-bottom: 200px;"
                >
                  <el-table-column
                    type="index"
                  >
                  </el-table-column>
                  <el-table-column
                    label="歌曲"
                  >
                    <template slot-scope="scope">
                      <router-link :to="{path:'/SongDetail/'+scope.row.song_id}"><span>{{ scope.row.song_Name }}</span>
                      </router-link>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="歌手"
                  >
                    <template slot-scope="scope">
                      <router-link :to="{path:'/SingerDetail/'+scope.row.singer_and_songList[0].song_Singerid}">
                        <span>{{ scope.row.singer_and_songList[0].song_SingerName }}</span></router-link>
                      <a><span></span></a>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="专辑"
                  >
                    <template slot-scope="scope">
                      <a href="javascript:;"><span>{{ scope.row.song_AlbumName
                        }}</span></a>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="col-lg-3">
                <div>
                  <div style="color: #303133;" class="font-weight-bold">歌单简介:</div>
                  <div style="color: #606266;font-size: 15px;margin-top: 10px;" class="lead des-text">
                    {{ getAlbum.album_description }}
                  </div>
                  <div>
                    <el-popover
                      placement="left"
                      title="歌单简介："
                      width="500"
                      trigger="hover"
                      :content=getAlbum.album_description
                    >
                      <el-button slot="reference" type="success" plain style="margin-top: 10px;width: auto;">[更 多]
                      </el-button>
                    </el-popover>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <el-drawer
            size="30%"
            title="深藏blue音乐吧"
            :visible.sync="drawer"
            :with-header="false"
          >
            <a-player
              style="font-size: 17px;"
              :audio="audio"
              :theme="colors"
              :autoplay="true"
              :volume="0.5"
              :lrcType="1"
              :listMaxHeight="700"
            ></a-player>
          </el-drawer>
        </div>
        <div class="left-icon" @click="drawer = true">
          <svg t="1625487822647" class="icon" viewBox="0 0 1123 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="1468" width="60" height="60"
          >
            <path
              d="M1079.73909 342.666054m-43.744602 0a43.744603 43.744603 0 1 0 87.489205 0 43.744603 43.744603 0 1 0-87.489205 0Z"
              fill="#8BC17D" p-id="1469"
            ></path>
            <path
              d="M283.634359 58.326137m-23.283417 0a23.283418 23.283418 0 1 0 46.566835 0 23.283418 23.283418 0 1 0-46.566835 0Z"
              fill="#8BC17D" p-id="1470"
            ></path>
            <path
              d="M365.008728 698.032154m-306.682591 0a306.682591 306.682591 0 1 0 613.365181 0 306.682591 306.682591 0 1 0-613.365181 0Z"
              fill="#8BC17D" p-id="1471"
            ></path>
            <path
              d="M201.789619 1024C90.546624 1024 0 950.857143 0 861.251263S90.546624 698.502526 201.789619 698.502526c56.209463 0 107.244832 18.579697 143.933854 48.68351V165.806155a29.163068 29.163068 0 0 1 22.577859-28.222324L988.722095 0.705558a28.927882 28.927882 0 0 1 24.224161 5.644465 28.222324 28.222324 0 0 1 10.818558 22.577859v134.761599a0.940744 0.940744 0 0 1 0 1.17593v544.220487c0 89.60588-90.546624 162.748737-201.789619 162.748737s-201.789619-73.142857-201.789619-162.748737 90.546624-162.748737 201.789619-162.748737c56.444649 0 107.244832 18.579697 143.933854 48.68351V199.90813l-562.329812 124.413413v536.92972c0 89.60588-90.546624 162.748737-201.789618 162.748737z m0-267.641709c-79.49288 0-143.933854 47.037207-143.933854 104.892972s64.440974 104.657786 143.933854 104.657786 143.933854-47.037207 143.933854-104.657786-64.67616-104.892972-143.933854-104.892972z m620.185576-151.694993c-79.257694 0-143.933854 47.037207-143.933854 104.892972s64.67616 104.657786 143.933854 104.657786 143.933854-47.037207 143.933854-104.657786-64.440974-104.892972-143.933854-104.892972zM403.579237 189.089573v75.965089l562.329812-124.178227V64.911346z"
              fill="#535453" p-id="1472"
            ></path>
          </svg>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "AlbumdetailComp",
  data(){
    return{
      colors: '#42b983',
      drawer: false,
      AlbumID: this.$route.params.id,
      getAlbum: {},
      PlaylistLoading: true,
      PlaylistDefaultHeight: '650px',
      audio: [
        {
          name: '',
          artist: '',
          cover: '',
          url: '',
          lrc: ''
        }
      ],
      TempAudio: {
        name: '',
        artist: '',
        cover: '',
        url: '',
        lrc: ''
      }
    }
  },
  filters: {
    //过滤器一：（使用时没有参数，即{{msg|filterA}}）
    filterA(value) {
      let date = new Date(parseInt(value));//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + '-';
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
      return Y + M + D;
    }
  },
  methods:{
    async initData(){
      await axios.get("http://localhost:8081/album/albumsongs/"+this.AlbumID).then((res)=>{
        this.getAlbum = res.data
      })
      this.PlaylistLoading = false
      this.PlaylistDefaultHeight= 'auto'
      await this.fixALlSong()
    },
    async fixALlSong(){
      this.audio.splice(0,1)
      if (this.audio.length <= 1) {
        for (let i = 0; i < this.getAlbum.album_SongList.length; i++) {
          console.log(this.getAlbum.album_SongList)
          await axios.get('http://localhost:8081/song/lyric/' + this.getAlbum.album_SongList[i].song_id).then((res) => {
            if(res.data.lyric == ''){
              this.TempAudio.lrc = "纯音乐，无歌词"
            }else{
              this.TempAudio.lrc = res.data.lyric
            }

          })
          await axios.get('http://localhost:8081/song/play/' + this.getAlbum.album_SongList[i].song_id).then((res) => {
            this.TempAudio.url = res.data.url
          })
          this.TempAudio.name = this.getAlbum.album_SongList[i].song_Name
          this.TempAudio.cover = this.getAlbum.album_SongList[i].song_AlbumImageUrl
          this.TempAudio.artist = this.getAlbum.album_SongList[i].singer_and_songList[0].song_SingerName
          console.log(this.TempAudio)
          this.audio.push(this.TempAudio)
          this.TempAudio = {
            name: '',
            artist: '',
            cover: '',
            url: '',
            lrc: ''
          }
        }
      }
    }
  },
  created() {
    this.initData()
  }
}
</script>

<style scoped>
.left-icon {
  position: fixed;
  right: 0;
  top: 50%;
  /*border-top-right-radius: 50%;*/
  border-top-left-radius: 50%;
  border-bottom-left-radius: 50%;
  /*border-bottom-right-radius: 50%;*/
  background-color: #e3e3e3;
}
.singerChannel a{
  text-decoration: none;
  color: #333333;
}
.singerChannel a:hover{
  color: #46b370;
}
.el-tabs__item.is-active {
  color: #42b983;
}
.el-tabs__item:hover {
  color: #42b983;
  cursor: pointer;
}
.el-tabs__active-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background-color: #42b983;
  z-index: 1;
  transition: transform .3s cubic-bezier(.645,.045,.355,1);
  list-style: none;
}
.el-tabs__item {
  padding: 0 20px;
  height: 40px;
  box-sizing: border-box;
  line-height: 40px;
  display: inline-block;
  list-style: none;
  font-size: 17px;
  font-weight: 500;
  color: #303133;
  position: relative;
}
.des-text {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.playlist-text-style span {
  font-size: 14px;
  line-height: 27px;
  color: #303133;
  margin-left: 7px;
}

.el-button--info.is-plain {
  color: #333333;
}

.el-button--info.is-plain:focus, .el-button--info.is-plain:hover {
  background: #EDEDED;
  border-color: #c9c9c9;
  color: #000;
}

.buling:hover {
  color: #42b983;
}

.table-text a {
  color: #333333;
  text-decoration: none;
}

.table-text a:hover, .table-text a:focus {
  color: #46b370;
}

</style>
