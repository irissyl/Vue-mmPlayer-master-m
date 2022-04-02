<template>
  <el-container>
    <el-header style="height: auto">
      <div class="container">
        <h3 id="top-mark">分类歌单</h3>
        <div>
          <div>
            <ol class="playlist-tags row" style="overflow: hidden">
              <li><a href="javascript:;" @click="setDefaultTags()" :class="{'tags-default':defaultTags}"
                     :style="{color:defaultTagsStyle}"
              >全部</a></li>
              <li v-for="(item,index) in getTags" :key="index"><a href="javascript:;"
                                                                  @click="LoadingTagsData(item.cat)"
              >{{ item.cat }}</a></li>
            </ol>
          </div>
        </div>
      </div>
    </el-header>
    <el-main>
      <div class="container">
        <div class="row" v-loading="initLoading" :style="{height:initHeight}">
          <div v-for="(item,index) in getDefaultPlaylist" :key="index" class="playlist-style">
            <div class="he_ZoomInImgNew">
              <el-image class="he_ZoomInImgNew_img" :src="item.playlists_imageUrl"></el-image>
              <div class="he_ZoomInImgNew_caption">
                <p class="he_ZoomInImgNew_caption_p" style="margin-bottom:0px;">
                  <img
                    src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006&v=88abebcbc1242dbbbbc836cc3e04a006&v=10e4305a2558d496548955434eaa30d9"
                    width="55px" height="55px"
                  >
                </p>
                <router-link class="he_ZoomInImgNew_caption_a" :to="{path:'/playlistdetail/'+item.playlists_id}"
                ></router-link>
              </div>
            </div>
            <div class="low-title-text">
              <p class="rcplaylistText on-a" style="margin: 0px;">
                <router-link class="no-a"
                             :to="{path:'/playlistdetail/'+item.playlists_id}"
                >{{ item.playlists_name }}
                </router-link>
              </p>
              <p class="rcplaylistText no-a2">
                <a>播放量：</a>
                <a>{{ changepalyCount(item.playlists_playCount) }}</a>
                <a>万</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="to-top-icon" @click="moveScrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })">
        <svg t="1625494869772" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="2386" width="80" height="80" fill="#2caf6f"
        >
          <path
            d="M526.848 202.24c-4.096-4.096-9.216-6.144-14.848-6.144s-11.264 2.048-14.848 6.144L342.016 356.864c-8.192 8.192-8.192 21.504 0 30.208 8.192 8.192 21.504 8.192 30.208 0L512 247.296l139.776 139.776c4.096 4.096 9.728 6.144 14.848 6.144 5.632 0 10.752-2.048 14.848-6.144 8.192-8.192 8.192-21.504 0-30.208L526.848 202.24zM116.224 595.968h90.624v231.936h42.496V595.968h90.624v-42.496H115.712v42.496z m458.24-42.496h-112.64c-13.824 0-27.136 5.12-37.376 15.36s-15.36 24.064-15.36 37.376v168.448c0 13.824 5.12 27.136 15.36 37.376s24.064 15.36 37.376 15.36h112.64c13.824 0 27.136-5.12 37.376-15.36s15.36-24.064 15.36-37.376V606.208c0-13.824-5.12-27.136-15.36-37.376s-23.552-15.36-37.376-15.36z m10.752 221.696c0 2.048-0.512 5.12-3.072 7.68s-5.632 3.072-7.68 3.072h-112.64c-2.048 0-5.12-0.512-7.68-3.072s-3.072-5.632-3.072-7.68V606.72c0-2.048 0.512-5.12 3.072-7.68s5.632-3.072 7.68-3.072h112.64c2.048 0 5.12 0.512 7.68 3.072s3.072 5.632 3.072 7.68v168.448z m307.2-205.824c-10.24-10.24-24.064-15.36-37.376-15.36H709.632v274.432h42.496v-120.32H855.04c13.824 0 27.136-5.12 37.376-15.36s15.36-24.064 15.36-37.376v-48.128c0-14.336-5.12-27.648-15.36-37.888z m-27.136 84.992c0 2.048-0.512 5.12-3.072 7.68s-5.632 3.072-7.68 3.072H751.104v-69.12H855.04c2.048 0 5.12 0.512 7.68 3.072s3.072 5.632 3.072 7.68v47.616h-0.512z"
            p-id="2387"
          ></path>
        </svg>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PlayListAll',
  data() {
    return {
      getTags: [],
      getDefaultPlaylist: [],
      checkTag: '全部',
      initLoading: true,
      initHeight: '700px',
      defaultTags: true,
      defaultTagsStyle: '#fff'
    }
  },
  methods: {
    setDefaultTags() {
      this.defaultTags = true
      this.defaultTagsStyle = '#fff'
      this.LoadingTagsData('全部')
    },
    changepalyCount(val) {
      return parseFloat(val / 10000).toFixed(2)
    },
    async initPlaylist() {
      await axios.get('http://localhost:8081/playlist/normal/playlists/' + this.checkTag + '/100/0').then((res) => {
        this.getDefaultPlaylist = res.data
      })
      this.initLoading = false
      this.initHeight = 'auto'
    },
    async LoadingTagsData(valTgs) {
      if (valTgs != '全部') {
        this.defaultTags = false
        this.defaultTagsStyle = '#606266'
      }
      await axios.get('http://localhost:8081/playlist/normal/playlists/' + valTgs + '/100/0').then((res) => {
        this.getDefaultPlaylist = res.data
      })
      // this.moveScrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
    },
    moveScrollIntoView(content) {
      let ele = document.getElementById('top-mark')
      setTimeout(() => {
        ele.scrollIntoView(content)
      }, 20)
    },
  },
  created() {
    axios.get('http://localhost:8081/playlist/normal/cat').then((res) => {
      this.getTags = res.data
    })
    this.initPlaylist()
  }
}
</script>

<style scoped>
/* 回到顶部icon */
.to-top-icon{
  position: fixed;
  top: 70%;
  right: 20px;
  border-radius: 50%;
}

/* tags */
.playlist-tags ol li {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.playlist-tags li {
  margin-top: 12px;
}

.playlist-tags li a {
  padding: 3px 5px 3px 5px;
  margin: 5px;
  border-radius: 5px;
  color: #606266;
  text-decoration: none;
  list-style: none;
}

.playlist-tags li a:hover {
  color: #46b370;
}

.playlist-tags li a:focus {
  color: white;
  background-color: #46b370;
}

/* 歌单 */
.he_ZoomInImgNew {
  border-radius: 5px;
  background: #000;
  width: 220px;
  height: 220px;
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
  width: 220px;
  height: 220px;
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
  width: 220px;
  height: 220px;
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

/* 歌单style */
.playlist-style {
  margin: 5px;
}

/* 歌单文字 */
.low-title-text {
  margin-top: 8px;
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
  width: 225px;
  height: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 默认选择全部tag */
.tags-default {
  color: white;
  background-color: #46b370;
}

</style>
