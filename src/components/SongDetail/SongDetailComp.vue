<template>
  <el-container>
    <el-header style="height: auto;">
      <div class="container" style="height: auto;width: 1200px;">
        <div class="row" style="margin: 0 auto">
          <div class="col-lg-3">
            <el-image id="SongImg" :src="ObjSongdetail.song_AlbumImageUrl" style="width: 250px;height: 250px;">

            </el-image>
          </div>
          <div class="col-lg-7 playlist-text-style">
            <div style="margin-top: 0.75rem;">
              <h3 style="font-size: 31px;line-height: 50px;">{{ ObjSongdetail.song_Name }}</h3>
            </div>
            <div>
              <span><i class="el-icon-user buling" style="font-size: 20px;"></i></span>
              <span class="table-text">歌手：<router-link
                :to="{path:'/SingerDetail/'+ObjSongdetail.singer_and_songList[0].song_Singerid}"
              >{{
                  ObjSongdetail.singer_and_songList[0].song_SingerName
                }}</router-link></span>
            </div>
            <div><span class="table-text">所属专辑：</span><span>{{ ObjSongdetail.song_AlbumName }}</span></div>
            <div><span>发行时间：</span><span>{{ ObjSongdetail.publishTime | filterA }}</span></div>
            <div style="margin-top: 2.5rem;line-height: 70px;">
              <el-button type="success" @click="drawer = true" :disabled="checkButton">
                <i class="el-icon-video-play " style="font-size: 16px;"></i>
                播放
              </el-button>
                <router-link :to="{path:'/mvdetail/'+getMvdetail.mv_id}" style="margin-left: 10px;margin-right: 10px;">
                  <el-button type="success" :class="{isFalseMvButton:isFalseMv}">
                    <i class="el-icon-video-play " style="font-size: 16px;"></i>
                    MV
                  </el-button>
                </router-link>
              <el-button type="danger" style="margin-right: 5px;" plain  data-toggle="modal" data-target="#exampleModalCenter">
                <div>
                  <i class="el-icon-star-off" style="font-size: 16px;"></i>
                  喜欢
                </div>
              </el-button>
              <el-button v-if="!hasCollectionButtonStatus" type="danger" style="margin-right: 10px;" plain @click="AddCollectionSong()">
                <div>
                  <i class="el-icon-plus" style="font-size: 16px;"></i>
                  收藏
                </div>
              </el-button>
              <el-button v-if="hasCollectionButtonStatus" type="success" style="margin-right: 10px;" plain @click="AddCollectionSong()">
                <div>
                  <i class="el-icon-check" style="font-size: 16px;"></i>
                  取消收藏
                </div>
              </el-button>
              <!-- Modal -->
              <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalCenterTitle">添加到歌单</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <el-table class="container" :data="getUserPlaylist">
                        <el-table-column>
                          <template slot-scope="scope">
                            <el-image :src="scope.row.playlist_icon" style="width: 60px;height: 60px;"></el-image>
                          </template>
                        </el-table-column>
                        <el-table-column
                          label="歌单名">
                          <template slot-scope="scope">
                            <a href="javascript:;" @click="AddPlaylist()">{{scope.row.playlist_name}}</a>
                          </template>
                        </el-table-column>
                        <el-table-column>
                          <template>
                            <span>{{UserInfo.user_name}}</span>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
                    </div>
                  </div>
                </div>
              </div>
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
        <span class="lyric-text">歌词</span>
        <el-divider content-position="left"><i class="el-icon-sugar buling"></i><span class="lead buling"
                                                                                      style="font-size: 14px;"
        >深藏blue音乐</span><i
          class="el-icon-sugar buling"
        ></i></el-divider>
        <div class="row">
          <div class="col-lg-8" style="text-align: left">
            <ul class="lyric" :class="{'lyric-showSet':MoreLyricShow}">
              <li class="lead" style="font-size: 17px;" v-for="(item,index) in lyricData" :key="index">{{ item.c }}</li>
            </ul>
            <a @click="MoreLyric()" href="javascript:;" class="show-more">{{ MoreLyricText }}</a>
            <div>
              <CommentComp :get-comment-type="1" :get-i-d="getSongID"></CommentComp>
            </div>
          </div>
          <div class="col-lg-4">
            <div style="margin-top: 2.5rem;">
              <div style="color: #303133;" class="font-weight-bold">相似歌曲:</div>
              <ul class="simi-list" style="padding-left: 0px;">
                <li v-for="(item,index) in getSimiSong" :key="index">
                  <div class="row">
                    <div class="he_ZoomInImgNew">
                      <el-image class="he_ZoomInImgNew_img" :src="item.song_picUrl"></el-image>
                      <div class="he_ZoomInImgNew_caption">
                        <p class="he_ZoomInImgNew_caption_p" style="margin-bottom:0px;">
                          <img
                            src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006&v=88abebcbc1242dbbbbc836cc3e04a006&v=10e4305a2558d496548955434eaa30d9"
                            width="35px" height="35px"
                          >
                        </p>
                        <router-link :to="{path:'/songplay/'+item.song_id}"></router-link>
                      </div>
                    </div>
                    <div class="low-title-text">
                      <div class="rcplaylistText on-a" style="margin: 0px;">
                        <router-link class="no-a" :to="{path:'/SongDetail/'+item.song_id}">歌曲：
                          {{ item.song_name }}
                        </router-link>
                      </div>
                      <div class="on-a rcplaylistText" style="margin-top: 10px;">
                        <router-link class="no-a" :to="{path:'/SingerDetail/'+item.song_Singer_id}">歌手：
                          {{ item.song_Singer_name }}
                        </router-link>
                      </div>
                      <div class="on-a rcplaylistText" style="margin-top: 10px;">
                        <router-link class="no-a" :to="{path:'/albumdetail/'+item.song_album_id}">专辑：
                          {{ item.song_album_name }}
                        </router-link>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div style="margin-top: 2.5rem;" :class="{isShowSimiMV:isFalseMv}">
              <div style="color: #303133;" class="font-weight-bold">歌曲MV:</div>
              <ul class="simi-list" style="padding-left: 0px;">
                <li style="margin-top: 5px;margin-left: 2px;">
                  <div>
                    <div class="he_ZoomInImgNew_MV">
                      <el-image class="he_ZoomInImgNew_img" :src="getMvdetail.mv_cover"></el-image>
                      <div class="he_ZoomInImgNew_caption">
                        <p class="he_ZoomInImgNew_caption_p" style="margin-bottom:0px;">
                          <img
                            src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006&v=88abebcbc1242dbbbbc836cc3e04a006&v=10e4305a2558d496548955434eaa30d9"
                            width="55px" height="55px"
                          >
                        </p>
                        <router-link :to="{path:'/mvdetail/'+getMvdetail.mv_id}"></router-link>
                      </div>
                    </div>
                    <div class="low-title-text" style="margin-left: 3px;">
                      <div class="rcplaylistText on-a" style="margin: 0px;">
                        <router-link class="no-a" :to="{path:'/mvdetail/'+getMvdetail.mv_id}">
                          {{ getMvdetail.mv_name }}
                        </router-link>
                      </div>
                      <div class="on-a rcplaylistText" style="margin-top: 10px;">
                        <router-link class="no-a" style="color: #999"
                                     :to="{path:'/SingerDetail/'+getMvdetail.mv_artistsId[0]}"
                        >
                          {{ getMvdetail.mv_artistName }}
                        </router-link>
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
            :listMaxHeight="300"
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
import Vue from 'vue';
import APlayer from '@moefe/vue-aplayer';
import CommentComp from '../CommentComp/CommentComp'

Vue.use(APlayer);
export default {
  name: 'SongDetailComp',
  components: { CommentComp },
  data() {
    return {
      checkButton: false,
      drawer: false,
      getSongID: this.$route.params.id,
      getSongDetail: [],
      ObjSongdetail: {},
      lyricData: [],
      TemplyricData: [],
      MoreLyricShow: true,
      MoreLyricText: '[展开]',
      isSimiMv: false,
      isFalseMv: true,
      getSimiSong: [],
      getMvdetail: {
        mv_cover: '',
        mv_id: '',
        mv_name: '',
        mv_artistsId: [],
        mv_artistName: ''
      },
      getMvId: '',
      colors: '#42b983',
      getLyric: {},
      getUrl: {},
      getInfo: [],
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
      getUserPlaylist:[],
      UserInfo:{
        uid:'',
        user_name:'',
        user_avatarUrl:'',
        user_introduction:'',
        user_address:'',
        user_gender:'',
        user_grade:'',
      },
      hasCollections: false,
      hasCollectionButtonStatus: false
    }
  },
  filters: {
    //过滤器一：（使用时没有参数，即{{msg|filterA}}）
    filterA(value) {
      if (value == '0') {
        return '无'
      } else {
        let date = new Date(parseInt(value))//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '-'
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
        return Y + M + D
      }
    }
  },
  watch: {
    '$route'(nval) {
      this.getSongID = nval.params.id
      this.getSimiSongDetail()
    }
  },
  methods: {
    async initData() {
      await axios.get('http://localhost:8081/song/detail/' + this.getSongID).then((res) => {
        this.getSongDetail = res.data
        this.ObjSongdetail = this.getSongDetail[0]
        console.log("得到的歌曲信息",this.ObjSongdetail)
        if (this.ObjSongdetail.song_MVid == '0') {
          this.isSimiMv = false
          this.isFalseMv = true
        } else {
          this.isSimiMv = true
          this.isFalseMv = false
        }
      })
      await axios.get('http://localhost:8081/song//lyric/' + this.getSongID).then((res) => {
        this.ExplainLyric(res.data.lyric)
      })
      await axios.get('http://localhost:8081/song/simi/' + this.getSongID).then((res) => {
        this.getSimiSong = res.data
      })
      if (this.ObjSongdetail.song_MVid != '0') {
        await axios.get('http://localhost:8081/mv/mvdetial/' + this.ObjSongdetail.song_MVid).then((res) => {
          this.getMvdetail = res.data
        })
      }
      await axios.get('http://localhost:8081/song/detail/' + this.getSongID).then((res) => {
        this.getInfo = res.data
      })
      await axios.get('http://localhost:8081/song/lyric/' + this.getSongID).then((res) => {
        this.getLyric.lyric = res.data.lyric
      })
      await axios.get('http://localhost:8081/song/play/' + this.getSongID).then((res) => {
        this.getUrl.url = res.data.url
      })
      this.fixObject()
    },
    async getSimiSongDetail() {
      this.moveScrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
      await this.checkUserHasCollectPlaylist()
      await axios.get('http://localhost:8081/song/detail/' + this.getSongID).then((res) => {
        this.getSongDetail = res.data
        this.ObjSongdetail = this.getSongDetail[0]
        if (this.ObjSongdetail.song_MVid == '0') {
          this.isSimiMv = false
          this.isFalseMv = true
        } else {
          this.isSimiMv = true
          this.isFalseMv = false
        }
      })
      await axios.get('http://localhost:8081/song//lyric/' + this.getSongID).then((res) => {
        this.ExplainLyric(res.data.lyric)
      })
      await axios.get('http://localhost:8081/song/simi/' + this.getSongID).then((res) => {
        this.getSimiSong = res.data
      })
      if (this.ObjSongdetail.song_MVid != '0') {
        axios.get('http://localhost:8081/mv/mvdetial/' + this.ObjSongdetail.song_MVid).then((res) => {
          this.getMvdetail = res.data
        })
      }
      await axios.get('http://localhost:8081/song/detail/' + this.getSongID).then((res) => {
        this.getInfo = res.data
      })
      await axios.get('http://localhost:8081/song/lyric/' + this.getSongID).then((res) => {
        this.getLyric.lyric = res.data.lyric
      })
      await axios.get('http://localhost:8081/song/play/' + this.getSongID).then((res) => {
        this.getUrl.url = res.data.url
      })
      this.fixObject()
    },
    ExplainLyric(lyric) {
      if (lyric.length == 0) return
      let lrcs = lyric.split('\n')//用回车拆分成数组
      for (let i in lrcs) {//遍历歌词数组
        lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, '') //去除前后空格
        let t = lrcs[i].substring(lrcs[i].indexOf('[') + 1, lrcs[i].indexOf(']'))//取[]间的内容
        let s = t.split(':')//分离:前后文字
        if (!isNaN(parseInt(s[0]))) { //是数值
          let arr = lrcs[i].match(/\[(\d+:.+?)\]/g)//提取时间字段，可能有多个
          let start = 0
          for (let k in arr) {
            start += arr[k].length //计算歌词位置
          }
          let content = lrcs[i].substring(start)//获取歌词内容
          for (let k in arr) {
            let t = arr[k].substring(1, arr[k].length - 1)//取[]间的内容
            let s = t.split(':')//分离:前后文字
            this.TemplyricData.push({//对象{t:时间,c:歌词}加入ms数组
              t: (parseFloat(s[0]) * 60 + parseFloat(s[1])).toFixed(3),
              c: content
            })
          }
        }
      }
      this.lyricData = this.TemplyricData
      this.TemplyricData = []
    },
    MoreLyric() {
      if (this.MoreLyricShow == true) {
        this.MoreLyricShow = false
        this.MoreLyricText = '[收起]'
      } else {
        this.MoreLyricShow = true
        this.MoreLyricText = '[展开]'
      }
    },
    moveScrollIntoView(content) {
      let ele = document.getElementById('SongImg')
      setTimeout(() => {
        console.log('开始跳转行')
        ele.scrollIntoView(content)
      }, 20)
    },
    fixObject() {
      console.log(this.getSimiSong)
      this.audio = [
        {
          name: this.getInfo[0].song_Name,
          artist: this.getInfo[0].singer_and_songList[0].song_SingerName,
          cover: this.getInfo[0].song_AlbumImageUrl,
          url: this.getUrl.url,
          lrc: this.getLyric.lyric
        }
      ]
      this.fixSimiList()
    },
    async fixSimiList() {
      if (this.audio.length <= 1) {
        for (let i = 0; i < this.getSimiSong.length; i++) {
          await axios.get('http://localhost:8081/song/lyric/' + this.getSimiSong[i].song_id).then((res) => {
            this.TempAudio.lrc = res.data.lyric
          })
          await axios.get('http://localhost:8081/song/play/' + this.getSimiSong[i].song_id).then((res) => {
            this.TempAudio.url = res.data.url
            console.log(res.data.url)
          })
          this.TempAudio.name = this.getSimiSong[i].song_name
          this.TempAudio.cover = this.getSimiSong[i].song_picUrl
          this.TempAudio.artist = this.getSimiSong[i].song_Singer_name
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
    isUrl(e){
      alert(e)
    },
    LoadUserinfo(){
      let currentCity = window.localStorage.getItem("user")
      if(currentCity != null){
        console.log(currentCity)
        if(currentCity){
          let item=JSON.parse(currentCity);
          this.UserInfo.user_name = item.user_name
          this.UserInfo.uid = item.uid
          this.UserInfo.user_avatarUrl = item.user_avatarUrl
          this.UserInfo.user_introduction = item.user_introduction
          this.UserInfo.user_address = item.user_address
          this.UserInfo.user_gender = item.user_gender
          this.UserInfo.user_grade = item.user_grade
        }
        this.checkUserHasCollectPlaylist()
      }else{
        console.log(currentCity)
      }
      this.LoadUserPlaylist()
    },
    LoadUserPlaylist(){
      axios.get("http://localhost:8081/userCplaylist/"+this.UserInfo.uid).then(res=>{
        this.getUserPlaylist = res.data
        console.log(this.getUserPlaylist)
      })
    },
    AddPlaylist(){
      console.log(this.getSongDetail)
      console.log(this.getUserPlaylist)
      let params = new URLSearchParams()
      params.append('Music_id', this.getSongDetail[0].song_id)
      params.append('Music_name', this.getSongDetail[0].song_Name)
      params.append('Music_album_name', this.getSongDetail[0].song_AlbumName)
      params.append('Music_album_id', this.getSongDetail[0].song_Albumid)
      params.append('Music_singer_name', this.getSongDetail[0].singer_and_songList[0].song_SingerName)
      params.append('Music_singer_id', this.getSongDetail[0].singer_and_songList[0].song_Singerid)
      params.append('playlist_id', this.getUserPlaylist[0].playlist_id)
      axios.post("http://localhost:8081/addSongToPlaylist",params).then(res=>{
        console.log("then")
        console.log(res.data)
        if(res.data.code == '200'){
          layer.msg("收藏成功！")
        }else if(res.data.code == '501'){
          layer.msg("歌曲已存在，请勿重复添加！")
        }else{
          layer.msg("收藏失败！")
        }
      }).catch(res => {
        console.log("catch")
        console.log(res.data)
      })
    },
    AddCollectionSong(){
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
      console.log("按钮显示",this.hasCollectionButtonStatus)
      console.log("查询是否收藏过",this.hasCollections)
    },
    async checkUserHasCollectPlaylist() {
      await axios.get('http://localhost:8081/hasCSong/' + this.getSongID + '/' + this.UserInfo.uid).then(res => {
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
  mounted() {
    this.initData()
    axios.get('http://localhost:8081/song/play/' + this.getSongID).then((res) => {
      console.log(res.data.url)
      if(res.data.url == ''){
        layer.msg("歌曲因版权问题无法播放ε=(´ο｀*)))唉...")
        this.checkButton = true
      }
    })
  },
  created() {
    this.LoadUserinfo()
  },
  beforeDestroy() {
    console.log("是否收藏过",this.hasCollections)
    console.log("是否在页面点击了收藏",this.hasCollectionButtonStatus)
    if (this.hasCollections == true && this.hasCollectionButtonStatus == true ) {
      axios.get("http://localhost:8081/collect/song/"+this.getSongID+"/"+this.ObjSongdetail.song_Name+"/"+this.UserInfo.uid)
        .then(res=>{
          if(res.data.code == '200'){
            console.log("收藏成功")
          }else{
            console.log("收藏失败")
          }
        })
    } else if(this.hasCollections == false && this.hasCollectionButtonStatus == false) {
      axios.get("http://localhost:8081/UnCSong/"+this.getSongID+"/"+this.UserInfo.uid)
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
</script>

<style scoped>
a{
  color: #333333;
  text-decoration: none;
}
a:hover{
  color: #46b370;
  text-decoration: none;
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


/* 相似歌单 */
.low-title-text {
  margin-top: 5px;
  margin-left: 10px;
  font-size: 13px;
}

.simi-list {
  list-style: none;
}

.simi-list li {
  margin: 15px;
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
  width: 220px;
  height: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 其他的一些特殊设置 */
.isFalseMvButton {
  display: none;
}

.isShowSimiMV {
  display: none;
}

.show-more {
  padding-left: 40px;
  color: #36aa65;
  text-decoration: none;
}

.lyric {
  margin-top: 1.5rem;
  list-style: none;
}

.lyric-showSet {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 20;
}

.lyric-text {
  font-size: 30px;
  font-weight: 400;
  margin-right: 10px
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

.table-text a {
  color: #333333;
  text-decoration: none;
}

.table-text a:hover, .table-text a:focus {
  color: #46b370;
}

/* 相似歌单过渡效果 */
.he_ZoomInImgNew {
  border-radius: 5px;
  background: #000;
  width: 85px;
  height: 85px;
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
  width: 85px;
  height: 85px;
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
  width: 85px;
  height: 85px;
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

/* 相似MV过渡效果 */
.he_ZoomInImgNew_MV {
  border-radius: 5px;
  background: #000;
  width: 290px;
  height: 164px;
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

.he_ZoomInImgNew_MV .he_ZoomInImgNew_img {
  position: relative;
  display: block;
  width: 290px;
  height: 164px;
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

.he_ZoomInImgNew_MV:hover .he_ZoomInImgNew_img {
  opacity: .7;
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -o-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1)
}

.he_ZoomInImgNew_MV .he_ZoomInImgNew_caption {
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

.he_ZoomInImgNew_MV .he_ZoomInImgNew_caption,
.he_ZoomInImgNew_MV .he_ZoomInImgNew_caption > a {
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

.he_ZoomInImgNew_MV .he_ZoomInImgNew_caption_p {
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

.he_ZoomInImgNew_MV:hover .he_ZoomInImgNew_caption_p {
  color: #fff;
  opacity: 1
}

</style>
