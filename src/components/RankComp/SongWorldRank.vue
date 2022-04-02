<template>
  <el-container>
    <el-main>
      <div class="container">
        <div class="row" style="margin-left: 10px;">
          <div v-for="(item,index) in getDefaultFour" :key="index" class="worldContent">
            <div class="he_ZoomInImgNew">
              <el-image class="he_ZoomInImgNew_img" :src="item.rankSongList_coverImgUrl"></el-image>
              <div class="he_ZoomInImgNew_caption">
                <p class="he_ZoomInImgNew_caption_p" style="margin-bottom:0px;">
                  <img
                    src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006&v=88abebcbc1242dbbbbc836cc3e04a006&v=10e4305a2558d496548955434eaa30d9"
                    width="55px" height="55px"
                  >
                </p>
                <s>{{ item.album_id }}</s>
                <router-link :to="{path:'/playlistdetail/'+item.rankSongList_id}"></router-link>
              </div>
            </div>
            <div style="text-align: center;margin-top: 10px;"><router-link :to="{path:'/playlistdetail/'+item.rankSongList_id}" href="javascript:;">{{ item.rankSongList_name }}</router-link></div>
            <div style="text-align: center">更新时间：<a href="javascript:;">{{ item.rankSongList_updateTime | filterA }}</a></div>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SongWorldRank',
  data() {
    return {
      getDefaultFour: [],
      getDefaultTemp: []
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
  created() {
    axios.get('http://localhost:8081/playlist/rankplaylist').then((res) => {
      this.getDefaultTemp = res.data
      this.getDefaultFour = this.getDefaultTemp.splice(4, (this.getDefaultTemp.length - 4))
      this.getDefaultTemp = []
    })
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: #333333;
}

a:hover {
  color: #46b370;
  text-decoration: none;
}

.worldContent {
  margin: 10px;
}

.he_ZoomInImgNew {
  border-radius: 5px;
  background: #000;
  width: 200px;
  height: 200px;
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
  width: 200px;
  height: 200px;
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
  width: 200px;
  height: 200px;
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
</style>
