<template>
  <div class="details_main_qh">
    <div class="mod_data">
      <a class="data_cover">
        <img class="data_photo" :src=getSingerinfo.singer_cover />
      </a>
      <div class="data_cont">
        <div class="data_name">
          <h1 class="data_name_txt songtime">{{getSingerinfo.singer_name}}</h1>
        </div>
        <div class="data_desc">
          <div class="data_desc_txt">{{getSingerinfo.briefDesc}}</div>
          <!-- Button trigger modal -->
          <a type="button" data-toggle="modal" data-target="#exampleModalLong">[详情简介]</a>

          <!-- Modal -->
          <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">

                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">歌手简介</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>

                <div class="modal-body lead" style="font-size: 15px">
                  {{getSingerinfo.briefDesc}}
                </div>

                <div class="modal-footer">
                  <button type="button" class="btn btn-success" data-dismiss="modal">关闭</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mod_zi">
          <ul class="mod_statistic">
            <li class="data_statistic_item">
              <a href="#" title="单曲 817">
                <span class="data_statistic_tit">单曲</span>
                <strong class="data_statistic_number">{{getSingerinfo.musicSize}}</strong>
              </a>
            </li>

            <li class="data_statistic_item">
              <a href="#" title="专辑 35">
                <span class="data_statistic_tit">专辑</span>
                <strong class="data_statistic_number">{{getSingerinfo.albumSize}}</strong>
              </a>
            </li>

            <li class="data_statistic_item data_statistic_item--last">
              <a href="#" title="MV 3824">
                <span class="data_statistic_tit">MV</span>
                <strong class="data_statistic_number">{{getSingerinfo.mvSize}}</strong>
              </a>
            </li>

          </ul>
        </div>
        <div class="" role="toolbar">
          <el-button v-if="!hasCollectionButtonStatus" type="danger" plain @click="CollectSinger()">
            <div>
              <i class="el-icon-plus" style="font-size: 16px;"></i>
              收藏
            </div>
          </el-button>
          <el-button v-if="hasCollectionButtonStatus" type="success" plain @click="CollectSinger()">
            <div>
              <i class="el-icon-check" style="font-size: 16px;"></i>
              取消收藏
            </div>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap'
import axios from "axios";

export default {
  name: "SingerDhead",
  props: {
    getSingerid: String
  },
  data() {
    return {
      getSingerinfo: {},
      SingerCollect:false,
      SingerId: this.$route.params.id,
      activeName: 'shotmusic',
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
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      if (tab.name == 'shotmusic') {
        this.shotmusic();
      } else if (tab.name == 'allmusic') {
        // 触发‘用户管理’事件
        this.allmusic();
      }
    },
    shotmusic() {
      this.$router.push({
        name: 'hotsong',
        path: '/shotmusic/' + this.getSingerid
      })
    },
    allmusic() {
      this.$router.push({
        name: 'allmusic',
        path: '/allmusic/' + this.getSingerid
      })
    },
    GetLocalStroageItem() {
      let currentCity = window.localStorage.getItem('user')
      if (currentCity != null) {
        if (currentCity) {
          let item = JSON.parse(currentCity)
          console.log(item, '这个时候这个item是Object')
          this.UserInfo.user_name = item.user_name
          this.UserInfo.uid = item.uid
          this.UserInfo.user_avatarUrl = item.user_avatarUrl
          this.UserInfo.user_introduction = item.user_introduction
          this.UserInfo.user_address = item.user_address
          this.UserInfo.user_gender = item.user_gender
          this.UserInfo.user_grade = item.user_grade
        }
        console.log("当前用户信息",this.UserInfo)
        this.checkUserHasCollectPlaylist()
      } else {
        console.log(currentCity)
      }
      console.log("这个页面获取的本地用户信息", this.UserInfo)
    },
    CollectSinger(){
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
      await axios.get('http://localhost:8081/hasCSinger/' + this.SingerId + '/' + this.UserInfo.uid).then(res => {
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
    axios.get("http://localhost:8081/singer/info/detail/" + this.getSingerid).then((response) => (
        this.getSingerinfo = response.data,
          console.log("这是歌手详情",this.getSingerinfo)
    ))
    this.GetLocalStroageItem()
  },
  beforeDestroy() {
    if (this.hasCollections == true && this.hasCollectionButtonStatus == true ) {
      axios.get("http://localhost:8081/collect/singer/"+this.SingerId+"/"+this.getSingerinfo.singer_name+"/"+this.UserInfo.uid)
        .then(res=>{
          if(res.data.code == '200'){
            console.log("收藏成功")
          }else{
            console.log("收藏失败")
          }
        })
    } else if(this.hasCollections == false && this.hasCollectionButtonStatus == false) {
      axios.get("http://localhost:8081/UnCSinger/"+this.SingerId+"/"+this.UserInfo.uid)
        .then(res=>{
          if(res.data.code == '200'){
            console.log("取消收藏成功")
            console.log(res.data)
          }else{
            console.log("取消收藏失败")
            console.log(res.data)
          }
        })
    }
  }
}
</script>

<style scoped>

body {
  padding: 0;
  margin: 0;
}

.details_main_qh {
  margin: 0 auto;
  width: 1200px;
}

.mod_data {
  position: relative;
  height: 250px;
  padding-left: 305px;
  margin-top: 40px;
  margin-bottom: 35px;
}

.data_cover {
  position: absolute;
  left: 0;
  top: 0;
  width: 250px;
  height: 250px;
  cursor: pointer;
}

.data_photo {
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.data_cont {
  padding-top: 31px;
}

.data_name {
  overflow: hidden;
  line-height: 50px;
}

.data_name_txt {
  float: left;
  font-size: 40px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90%;
  margin-right: 10px;
  font-family: "微软雅黑";
}

.data_desc_txt {
  float: left;
  max-width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 2px;
  font-family: "微软雅黑";
}

.data_desc {
  font-size: 16px;
  height: 50px;
  line-height: 50px;
}

.data_desc a:hover {
  color: #36AA65;
  text-decoration: none;
}

.data_actions {
  position: absolute;
  /*bottom: 23px;*/
  font-size: 0;
  bottom: -50px;
}

.mod_zi ul li {
  float: left;
}

.mod_zi ul li a {
  color: black;
  font-family: "微软雅黑";
  text-decoration: none;
}

.mod_zi ul li a:hover {
  color: #36AA65;
}

.data_statistic_item--last {
  border-right: 0;
}

.data_statistic_item {
  display: inline-block;
  text-align: center;
  padding-right: 20px;
  margin-right: 20px;
  font-size: 18px;
  list-style: none;
  border-right: 1px solid #c9c9c9;
}

.data_statistic_number {
  font-size: 30px;
  font-weight: 400;
  margin-left: 10px;
}

.mod_part {
  position: relative;
  margin-bottom: 30px;
}

.part_hd {
  overflow: hidden;
}

.part_tit {
  float: left;
  font-size: 24px;
  font-weight: 400;
  line-height: 58px;
  font-family: "微软雅黑";
  color: black;
}

.part_more {
  position: absolute;
  top: 0px;
  right: 0;
  font-size: 17px;
  color: black;
  text-decoration: none;
  font-family: "微软雅黑";
  line-height: 65px;
}

.part_more:hover {
  color: #36AA65;
  text-decoration: none;
}

</style>
