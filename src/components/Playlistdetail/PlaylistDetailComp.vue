<template>
  <el-container>
    <el-header style="height: auto;">
      <div class="container" style="height: auto;width: 1200px;">
        <div class="row" style="margin: 0 auto">
          <div class="col-lg-3">
            <el-image id="PageImg" :src="getPlaylistdata.playlist_detail_coverImgUrl" style="width: 250px;height: 250px;">
            </el-image>
          </div>
          <div class="col-lg-7 playlist-text-style">
            <div style="margin-top: 0.75rem;"><h3 style="font-size: 31px;line-height: 50px;">
              {{ getPlaylistdata.playlist_detail_name }}</h3></div>
            <div><span><i class="el-icon-user buling"
                          style="font-size: 20px;"
            ></i></span><span>{{
                getPlaylistdata.playlist_detail_createName
              }}</span>
            </div>
            <div><span>标签：</span><span>{{ getPlaylistdata.playlist_detail_tags }}</span></div>
            <div><span>播放量：</span><span>{{ changepalyCount(getPlaylistdata.playlist_detail_playCount) }} 万</span></div>
            <div><span>分享量：</span><span>{{ getPlaylistdata.playlist_detail_ShareCount }}</span></div>
            <div style="margin-top: 1rem;line-height: 70px;">
              <el-button type="success" @click="drawer = true">
                <i class="el-icon-video-play " style="font-size: 16px;"></i>
                播放全部
              </el-button>
              <el-button v-if="!hasCollectionButtonStatus" type="danger" plain @click="AddPlaylist()">
                <div>
                  <i class="el-icon-plus" style="font-size: 16px;"></i>
                  收藏
                </div>
              </el-button>
              <el-button v-if="hasCollectionButtonStatus" type="success" plain @click="AddPlaylist()">
                <div>
                  <i class="el-icon-check" style="font-size: 16px;"></i>
                  取消收藏
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
    <el-main style="height: auto;">
      <div class="container">
        <el-divider content-position="left"><i class="el-icon-sugar buling"></i><span class="lead buling"
                                                                                      style="font-size: 14px;"
        >深藏blue音乐</span><i
          class="el-icon-sugar buling"
        ></i></el-divider>
        <el-divider content-position="right"><i class="el-icon-sugar buling"></i><span class="lead buling"
                                                                                       style="font-size: 14px;"
        >Deep Inside Music Club</span><i
          class="el-icon-sugar buling"
        ></i></el-divider>
        <div class="row">
          <div class="col-lg-9">
            <el-table v-loading="PlaylistLoading" :data="getPlaylistSongData" lazy class="table-text"
                      :style="{height:PlaylistDefaultHeight}"
                      :header-cell-style="{background:'#36AA65',color:'#fff','font-size':'17px'}"
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
                  <router-link :to="{path:'/Albumdetail/'+scope.row.song_Albumid}"><span>{{ scope.row.song_AlbumName
                    }}</span></router-link>
                </template>
              </el-table-column>
            </el-table>
            <div style="margin-top: 1.5rem">
              <CommentComp :get-comment-type="1000" :get-i-d="PlaylistId"></CommentComp>
            </div>
          </div>
          <div class="col-lg-3">
            <div>
              <div style="color: #303133;" class="font-weight-bold">歌单简介:</div>
              <div style="color: #606266;font-size: 15px;margin-top: 10px;" class="lead des-text">
                {{ getPlaylistdata.playlist_detail_description }}
              </div>
              <div>
                <el-popover
                  placement="left"
                  title="歌单简介："
                  width="500"
                  trigger="hover"
                  :content=getPlaylistdata.playlist_detail_description
                >
                  <el-button slot="reference" type="success" plain style="margin-top: 10px;width: auto;">[更 多]
                  </el-button>
                </el-popover>
              </div>
            </div>
            <div style="margin-top: 2.5rem;">
              <div style="color: #303133;" class="font-weight-bold">相关歌单:</div>
              <ul class="simi-list" style="padding-left: 0px;">
                <li v-for="(item,index) in getPlaylistSimi" :key="index">
                  <div class="row">
                    <div class="he_ZoomInImgNew">
                      <el-image class="he_ZoomInImgNew_img" :src="item.playlists_PicUrl"></el-image>
                      <div class="he_ZoomInImgNew_caption">
                        <p class="he_ZoomInImgNew_caption_p" style="margin-bottom:0px;">
                          <img
                            src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006&v=88abebcbc1242dbbbbc836cc3e04a006&v=10e4305a2558d496548955434eaa30d9"
                            width="25px" height="25px"
                          >
                        </p>
                        <router-link :to="{path:'/playlistdetail/'+item.playlists_id}"></router-link>
                      </div>
                    </div>
                    <div class="low-title-text">
                      <div class="rcplaylistText on-a" style="margin: 0px;">
                        <router-link class="no-a" :to="{path:'/playlistdetail/'+item.playlists_id}">
                          {{ item.playlists_Name }}
                        </router-link>
                      </div>
                      <div class="on-a" style="margin-top: 10px;">
                        <a href="javascript:;" class="no-a">{{ item.playlists_UserName }}</a>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
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
</template>

<script>
import '../../../public/css/bootstrap.css'
import axios from 'axios'
import CommentComp from '../CommentComp/CommentComp'

export default {
  name: 'PlaylistDetailComp',
  components: { CommentComp },
  data() {
    return {
      drawer: false,
      colors: '#42b983',
      PlaylistId: this.$route.params.id,
      getPlaylistdata: {},
      getPlaylistSongData: [],
      getPlaylistSimi: [],
      PlaylistLoading: 'false',
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
      },
      UserInfo: {
        uid: '',
        user_name: '',
        user_avatarUrl: '',
        user_introduction: '',
        user_address: '',
        user_gender: '',
        user_grade: ''
      },
      hasCollections: false,
      hasCollectionButtonStatus: false
    }
  },
  watch: {
    '$route'(nval) {
      this.PlaylistId = nval.params.id
      this.getData()
    }
  },
  methods: {
    changepalyCount(val) {
      return parseFloat(val / 10000).toFixed(2)
    },
    async initDatas(){
      await axios.get('http://localhost:8081/playlist/playlists/detail/' + this.PlaylistId).then((res) => {
        this.getPlaylistdata = res.data
        console.log('这是歌单图片', res.data.playlist_detail_coverImgUrl)
      })
      if (this.getPlaylistSongData.length <= 0) {
        this.PlaylistLoading = true
        this.PlaylistDefaultHeight = '650px'
        await axios.get('http://localhost:8081/playlist/playlists/playlistallSong/' + this.getPlaylistdata.song_tracksStr).then((res) => {
          this.getPlaylistSongData = res.data
        })
        this.PlaylistDefaultHeight = 'auto'
        this.PlaylistLoading = false
        await this.fixALlSong()
      }
      await axios.get('http://localhost:8081/playlist/simi/playlists/' + this.PlaylistId).then((res) => {
        this.getPlaylistSimi = res.data
      })
    },
    async getData() {
      this.moveScrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
      await this.checkUserHasCollectPlaylist()
      await axios.get('http://localhost:8081/playlist/playlists/detail/' + this.PlaylistId).then((res) => {
        this.getPlaylistdata = res.data
        console.log('这是歌单图片', res.data.playlist_detail_coverImgUrl)
      })
      if (this.getPlaylistSongData.length <= 0) {
        this.PlaylistLoading = true
        this.PlaylistDefaultHeight = '650px'
        await axios.get('http://localhost:8081/playlist/playlists/playlistallSong/' + this.getPlaylistdata.song_tracksStr).then((res) => {
          this.getPlaylistSongData = res.data
        })
        this.PlaylistDefaultHeight = 'auto'
        this.PlaylistLoading = false
        await this.fixALlSong()
      }
      await axios.get('http://localhost:8081/playlist/simi/playlists/' + this.PlaylistId).then((res) => {
        this.getPlaylistSimi = res.data
      })
    },
    moveScrollIntoView(content) {
      let ele = document.getElementById('PageImg')
      setTimeout(() => {
        let lal = document.getElementById('PageImg').scrollIntoView(content)
      }, 20)
    },
    async fixALlSong() {
      this.audio.splice(0, 1)
      if (this.audio.length <= 1) {
        for (let i = 0; i < this.getPlaylistSongData.length; i++) {
          await axios.get('http://localhost:8081/song/lyric/' + this.getPlaylistSongData[i].song_id).then((res) => {
            if (res.data.lyric == '') {
              this.TempAudio.lrc = '纯音乐，无歌词'
            } else {
              this.TempAudio.lrc = res.data.lyric
            }

          })
          await axios.get('http://localhost:8081/song/play/' + this.getPlaylistSongData[i].song_id).then((res) => {
            this.TempAudio.url = res.data.url
          })
          this.TempAudio.name = this.getPlaylistSongData[i].song_Name
          this.TempAudio.cover = this.getPlaylistSongData[i].song_AlbumImageUrl
          this.TempAudio.artist = this.getPlaylistSongData[i].singer_and_songList[0].song_SingerName
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
    },
    LoadUserinfo() {
      let currentCity = window.localStorage.getItem('user')
      if (currentCity != null) {
        console.log(currentCity)
        if (currentCity) {
          let item = JSON.parse(currentCity)
          this.UserInfo.user_name = item.user_name
          this.UserInfo.uid = item.uid
          this.UserInfo.user_avatarUrl = item.user_avatarUrl
          this.UserInfo.user_introduction = item.user_introduction
          this.UserInfo.user_address = item.user_address
          this.UserInfo.user_gender = item.user_gender
          this.UserInfo.user_grade = item.user_grade
        }
        this.checkUserHasCollectPlaylist()
      } else {
        console.log(currentCity)
      }
    },
    AddPlaylist() {
      let hasLogin = window.localStorage.getItem('user')
      if(hasLogin == null){
        layer.msg("还没登录，请登录")
      }else{
        if (this.hasCollectionButtonStatus == false) {
          this.hasCollectionButtonStatus = true
        } else {
          this.hasCollectionButtonStatus = false
        }
      }
    },
    async checkUserHasCollectPlaylist() {
      await axios.get('http://localhost:8081/hasCPlaylist/' + this.PlaylistId + '/' + this.UserInfo.uid).then(res => {
        if (res.data.code == '200') {
          console.log('歌曲没有收藏过')
          this.hasCollectionButtonStatus = false
          this.hasCollections = true
        } else {
          console.log('歌曲已经收藏了')
          this.hasCollectionButtonStatus = true
          this.hasCollections = false
        }
      })
    }
  },
  created() {
    this.initDatas()
    console.log("重要提示1：","这个this.hasCollectionButtonStatus 为false就是代表用户不想收藏这个，为true就是想！")
    console.log("重要提示2：","这个this.hasCollections 为false就是代表用户 已经 收藏过这个了  为true就是没有收藏过可以进行收藏的操作！")
    this.LoadUserinfo()
  },
  beforeDestroy() {
    if (this.hasCollections == true && this.hasCollectionButtonStatus == true ) {
      axios.get("http://localhost:8081/collect/playlist/"+this.PlaylistId+"/"+this.getPlaylistdata.playlist_detail_name+"/"+this.UserInfo.uid)
      .then(res=>{
        if(res.data.code == '200'){
          console.log("收藏成功")
        }else{
          console.log("收藏失败")
        }
      })
    } else if(this.hasCollections == false && this.hasCollectionButtonStatus == false) {
      axios.get("http://localhost:8081/UnCPlaylist/"+this.PlaylistId+"/"+this.UserInfo.uid)
      .then(res=>{
        if(res.data.code == '200'){
          console.log("取消收藏成功")
        }else{
          console.log("取消收藏失败")
        }
      })
    }
  }
}
///simi/playlists
</script>

<style scoped>
>>> .el-button--info:focus{
  outline: none;
}
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

.table-text a {
  color: #333333;
  text-decoration: none;
}

.table-text a:hover, .table-text a:focus {
  color: #46b370;
}

/* 相似歌单 */
.low-title-text {
  margin-top: 10px;
  margin-left: 10px;
  font-size: 13px;
}

.simi-list {
  list-style: none;
}

.simi-list li {
  margin: 14px;
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
  font-size: 14px;
  padding-bottom: 20px;
  width: 150px;
  height: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 相似歌单过渡效果 */
.he_ZoomInImgNew {
  border-radius: 5px;
  background: #000;
  width: 75px;
  height: 75px;
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
.he_ZoomInImgNew-album {
  background: #000;
  width: 160px;
  height: 160px;
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
.he_ZoomInImgNew .he_ZoomInImgNew_img {
  position: relative;
  display: block;
  width: 75px;
  height: 75px;
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
.he_ZoomInImgNew:hover .he_ZoomInImgNew_img {
  opacity: .7;
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -o-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1)
}
.he_ZoomInImgNew .he_ZoomInImgNew_caption {
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
.he_ZoomInImgNew .he_ZoomInImgNew_caption,
.he_ZoomInImgNew .he_ZoomInImgNew_caption > a {
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
.he_ZoomInImgNew .he_ZoomInImgNew_caption_p {
  text-align: center;
  width: 80%;
  position: absolute;
  top: 35%;
  left: 10%;
  -webkit-transition: all .4s ease-in-out;
  -moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -ms-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
  overflow: hidden;
  opacity: 0
}
.he_ZoomInImgNew:hover .he_ZoomInImgNew_caption_p {
  color: #fff;
  opacity: 1
}

/* 头部样式 */
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

</style>
