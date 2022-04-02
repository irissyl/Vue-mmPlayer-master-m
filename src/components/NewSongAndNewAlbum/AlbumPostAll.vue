<template>
  <el-container>
    <el-main v-loading="loadingAll" :style="{height:BoxdefaultHeight}">
      <span id="thePosition" class="lead" style="font-size: 26px;">全部新碟</span>
      <el-container>
        <div class="row">
          <div class="Album-style" v-for="(item,index) in getAlbumData" :key="index" v-loading="loadingAll" :style="{height:BoxdefaultHeight}">
            <div class="he_ZoomInImgNew">
              <el-image class="he_ZoomInImgNew_img" :src="item.album_picUrl"></el-image>
              <div class="he_ZoomInImgNew_caption">
                <p class="he_ZoomInImgNew_caption_p" style="margin-bottom:0px;">
                  <img
                      src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006&v=88abebcbc1242dbbbbc836cc3e04a006&v=10e4305a2558d496548955434eaa30d9"
                      width="55px" height="55px">
                </p>
                <s>{{item.album_id}}</s>
                <router-link :to="{path:'/albumdetail/'+item.album_id}" ></router-link>
              </div>
            </div>
            <div>
              <div class="album-all-text text-eclipse"><router-link :to="{path:'/albumdetail/'+item.album_id}">{{item.album_name}}</router-link></div>
              <div class="album-singer-all-text text-eclipse"><router-link :to="{path:'/SingerDetail/'+item.album_Singerid}">{{item.album_SingerName}}</router-link></div>
            </div>
          </div>
        </div>
      </el-container>
      <el-container style="margin-bottom: 30px;">
        <div class="col-sm-6" style="text-align: left;">
          <el-button @click="prevOffset" type="success" style="color: white;"><i class="el-icon-back"
                                                                                 style="font-size: 20px;">上一页</i>
          </el-button>
        </div>
        <div class="col-sm-6" style="text-align: right;">
          <el-button @click="nextOffset" type="success" style="color: white;"><i class="el-icon-right"
                                                                                 style="font-size: 20px;">下一页</i>
          </el-button>
        </div>
      </el-container>
      <el-container style="margin-bottom: 30px;">
        <div class="col-sm-6" style="text-align: left;">
          <el-button @click="toFirstData" type="success" style="color: white;">回到首页
          </el-button>
        </div>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
import '../../../public/css/bootstrap.css'
import axios from "axios";
import layer from "layui-layer";

export default {
  name: "AlbumPostAll",
  data(){
    return{
      getAlbumData:[],
      BoxdefaultHeight: '600px',
      loadingAll: false,
      AlbumOffset: 0,
    }
  },
  methods:{
    async getDeafultData(){
      if (this.getAlbumData.length == 0) {
        this.loadingAll = true
        this.BoxdefaultHeight = '600px'
        await axios.get("http://localhost:8081/newmusic/newalbum/0/All").then((response) => {
          this.getAlbumData = response.data
        })
        this.BoxdefaultHeight = 'auto'
        setTimeout(() => {
          this.loadingAll = false
        }, 300);
      }
    },
    nextOffset() {
      console.log("下一页")
      if (this.AlbumOffset < 0) {
        console.log("下一页" + this.AlbumOffset)
        this.AlbumOffset = 0;
      } else if (this.AlbumOffset >= 0) {
        this.AlbumOffset = this.AlbumOffset + 20;
        axios.get("http://localhost:8081/newmusic/newalbum/"+this.AlbumOffset+"/All").then((response) => {
          this.tempAlbum = response.data
          if (this.tempAlbum.length != 0) {
            this.getAlbumData = this.tempAlbum
          } else {
            layer.msg("已经到最后一页了~"),
                this.AlbumOffset = this.AlbumOffset - 20;
          }
        })
        this.moveScrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})
        console.log("下一页" + this.AlbumOffset)
      }
    },
    prevOffset() {
      if (this.AlbumOffset <= 0) {
        layer.msg("你已经是第一页了~"),
            console.log("上一页" + this.AlbumOffset)
        this.AlbumOffset = 0;
      } else if (this.AlbumOffset > 0) {
        this.AlbumOffset = this.AlbumOffset - 10;
        axios.get("http://localhost:8081/newmusic/newalbum/"+this.AlbumOffset+"/All").then((response) => {
          if (response.data != null) {
            this.getAlbumData = response.data
          } else {
            this.AlbumOffset = this.AlbumOffset + 10;
          }
        })
        this.moveScrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})
        console.log("上一页" + this.AlbumOffset)
      }
    },
    moveScrollIntoView(content) {
      let ele = document.getElementById('thePosition')
      setTimeout(() => {
        console.log("开始跳转行")
            ele.scrollIntoView(content)
          }, 50)
    },
    toFirstData(){
        axios.get("http://localhost:8081/newmusic/newalbum/0/All").then((response) => {
          this.getAlbumData = response.data
        })
      }
  },
  mounted() {
    this.getDeafultData()
  }
}

</script>

<style scoped>

s{
  display: none;
}
.Album-style {
  margin: 25px;
}
.album-all-text a{
  margin-top: 5px;
  margin-bottom: 5px;
  color: #606266;
  text-decoration: none;
}

.album-singer-all-text a{
  color: #909399;
  text-decoration: none;
}

.album-all-text a:hover,.album-all-text a:focus{
  color: #46b370;
}

.album-singer-all-text a:hover,.album-singer-all-text a:focus{
  color: #46b370;
}

.text-eclipse{
  width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

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
.he_ZoomInImgNew .he_ZoomInImgNew_caption>a {
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