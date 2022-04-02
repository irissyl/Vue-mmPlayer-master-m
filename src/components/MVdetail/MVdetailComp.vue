<template>
  <div>
    <div style="background: #fafafa;width: auto;height: auto;margin:  30px auto;">
      <div style="background: #333;width: auto;height:auto;margin: 0 auto;border: 1px solid saddlebrown;">
        <div style="width: 1200px;height:750px;margin: 0 auto;">
          <div style="background: black;width: 1200px;height: auto;margin:10px auto;">
            <video width="1200px" height="600px" :poster="mvplay.mv_cover" controls style="background: black;"
                   :src="mvplay.mvurl"
            ></video>
          </div>
          <div class="mv__info" style="height: 10px;">
            <div class="mv__title" style="color: white;margin-top: 20px;">
              <div class="" style="float: left;">
                <span class="mv__name" title="Rainy,rainy" style="color: white;font-size: 22px;">{{ mvplay.mv_name
                  }}</span>
                <span class="mv__line">-</span>
                <router-link :to="{path:'/SingerDetail/'+mvplay.mv_artistID}" class="mv__singer" href="javascript:;" style="color: white;font-size: 17px;text-decoration: none;"
                >{{ mvplay.mv_artistName }}</router-link>
                <span style="color: gainsboro;margin-left: 50px;"
                      class="mv__listen mv__singer"
                >发布时间:{{ mvplay.mv_publishTime }}</span>
                <span style="color: gainsboro;margin-left: 10px;" class="mv__listen mv__singer"
                >播放次数:{{ mvplay.mv_playCount }}</span>
              </div>
              <div style="float: right;margin: 10px;">
                <el-button type="success" plain><i class="fa fa-thumbs-up" aria-hidden="true"
                ></i>点赞({{ mvplay.mv_playCount }})
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
                </el-button>                <el-button icon="el-icon-share" type="success" plain>转发({{ mvplay.mv_shareCount }})
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="background: #fafafa;width: 1200px;height:auto;margin:  30px auto;">
        <!--mv简介-->
        <div class="" style="margin-top: 50px;">
							<span class="main_f1" style="font-size: 20px;color: #333333;">
							mv简介
						</span>
          <hr style="height: 1px;width:1200px;background-color: gainsboro;" />
          <span>{{ mvplay.mv_desc | filterA }}</span>
        </div>
        <!--相关推荐-->
        <div style="margin-top: 50px;height: auto;">
							<span class="main_f1" style="font-size: 20px;color: #333333;">
							mv相关推荐
						</span>
          <hr style="height: 1px;width:1200px;background-color: gainsboro;" />
          <div v-for="(item1,index1) in getlist" :key="index1" class="box_allsonglist"
               style="float: left;margin-right: 60px;"
          >
            <div class="he_ZoomInImg Songlist-style">
              <img id="songlist_s0" class="he_ZoomInImg_img" :src="item1.mv_cover" width="100px"
                   height="100px" alt="Image 01"
              >
              <div class="he_ZoomInImg_caption">
                <p class="he_ZoomInImg_caption_p" style="margin-bottom:0px;">
                  <img
                    src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006&v=88abebcbc1242dbbbbc836cc3e04a006&v=10e4305a2558d496548955434eaa30d9"
                    alt="icon1" width="55px" height="55px"
                  ></p>
                <router-link href="javascript:;" :to="{path:'/mvdetail/'+item1.mv_id}"></router-link>
              </div>
            </div>
            <div :data="item1" class="songlist-title">
              <i id="songlist_id0"
                 style="font-size: 15px;width: 170px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;display: block;"
              >
                <i class="el-icon-video-camera"></i>
                <router-link href="javascript:;" style="color: black;" :to="{path:'/mvdetail/'+item1.mv_id}">{{ item1.mv_name }}</router-link>
              </i>
              <!--<i class="songlist-text-style" style="font-size: 14px;color: gray;">04:40</i>-->
              <i class="songlist-text-style" style="font-size: 14px;color: gray;"><a style="color: gray;"
                                                                                     :title="item1.mv_singerName"
                                                                                     href="javascript:;"
              >{{ item1.mv_singerName }}</a></i>
            </div>
          </div>
        </div>
        <div style="margin-top: 250px;height: auto;">
          <div style="margin-top: 5.5rem;">
            <CommentComp :get-comment-type="1004" :get-i-d="MvID"></CommentComp>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CommentComp from '../CommentComp/CommentComp'

export default {
  name: 'MVdetailComp',
  components: { CommentComp },
  data() {
    return {
      MvID: this.$route.params.id,
      visible: false,
      getlist: [],
      mvplay: {},
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
  filters: {
    //过滤器一：（使用时没有参数，即{{msg|filterA}}）
    filterA(value) {
      if (value == '') {
        return '暂无视频简介'
      } else {
        return value
      }
    }
  },
  watch:{
    '$route'(newval){
      this.MvID = newval.params.id
      this.initData()
    }
  },
  methods:{
    initData(){
      this.checkUserHasCollectPlaylist()
      axios.get('http://localhost:8081/mv/simiMv/' + this.MvID).then((response) => {
        this.getlist = response.data
      })
      axios.get('http://localhost:8081/mv/mvdetial/' + this.MvID).then((response) => {
        this.mvplay = response.data
        console.log("视频详情",this.mvplay)
      })
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
      await axios.get('http://localhost:8081/hasCMv/' + this.MvID + '/' + this.UserInfo.uid).then(res => {
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
    this.initData()
    this.LoadUserinfo()
  },
  beforeDestroy() {
    if (this.hasCollections == true && this.hasCollectionButtonStatus == true ) {
      axios.get("http://localhost:8081/collect/vediomv/"+this.MvID+"/"+this.mvplay.mv_name+"/"+this.UserInfo.uid)
        .then(res=>{
          if(res.data.code == '200'){
            console.log("收藏成功")
          }else{
            console.log("收藏失败")
          }
        })
    } else if(this.hasCollections == false && this.hasCollectionButtonStatus == false) {
      axios.get("http://localhost:8081/UnCMv/"+this.MvID+"/"+this.UserInfo.uid)
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
.btn:focus,
.btn:active:focus,
.btn.active:focus,
.btn.focus,
.btn:active.focus,
.btn.active.focus {
  box-shadow: none;
}

/*default*/
.he_ZoomInImg {
  background: #000;
  width: 180px;
  height: 100px;
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
  overflow: hidden;
  border-radius: 10px;
}

.he_ZoomInImg .he_ZoomInImg_img {
  border-radius: 10px;
  position: relative;
  display: block;
  width: 180px;
  height: 100px;
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
  overflow: hidden
}

.he_ZoomInImg .he_ZoomInImg_caption,
.he_ZoomInImg .he_ZoomInImg_caption > a {
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

.he_ZoomInImg .he_ZoomInImg_caption_p {
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

.he_ZoomInImg:hover .he_ZoomInImg_caption_p {
  color: #fff;
  opacity: 1
}

/* caption */

.he_ZoomInImg_caption_p img {
  width: 40px;
  height: 40px;
  margin: 0 auto;
  text-align: center;
}

vedio:focus {
  border: none;
  outline: none;
  box-shadow: none;
}
</style>
