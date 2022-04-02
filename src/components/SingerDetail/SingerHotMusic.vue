<template>
  <!--*********************************************************-->
  <!--热门歌曲的-->
  <div class="container-lg">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="热门歌曲" name="first">
        <span class="lead" style="font-size: 30px;">TOP50首单曲</span>
        <el-container style="margin-bottom: 30px;">
          <el-main class="container-lg">
            <el-table :data="getSingerMusic" stripe lazy>
              <el-table-column
                  type="index"
              >
              </el-table-column>
              <el-table-column
                  label="歌曲"
              >
                <template slot-scope="scope">
                  <router-link :to="{path:'/SongDetail/'+scope.row.song_id}"><span>{{ scope.row.song_Name }}</span></router-link>
                </template>
              </el-table-column>
              <el-table-column
                  label="专辑"
              >
                <template slot-scope="scope">
                  <router-link :to="{path:'/Albumdetail/'+scope.row.song_Albumid}"><span>{{ scope.row.song_AlbumName }}</span></router-link>
                </template>
              </el-table-column>
              <el-table-column
              >
                <template slot-scope="scope">
                  <div>
                    <el-button circle><i class="el-icon-plus" style="font-size: 20px;"></i></el-button>
                    <router-link :to="{path:'/SongDetail/'+scope.row.song_id}">
                      <el-button circle>
                        <i class="el-icon-caret-right" style="font-size: 20px;"></i>
                      </el-button>
                    </router-link>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-main>
        </el-container>
      </el-tab-pane>
      <el-tab-pane label="全部单曲" name="second">
        <el-container class="container-lg">
          <span id="hotSingleSong" class="lead" style="font-size: 30px;">所有单曲</span>
        </el-container>
        <el-container style="margin-bottom: 30px;">
          <el-main class="container-lg">
            <el-table :data="getSingerAllMusic" stripe lazy>
              <el-table-column
                  type="index"
              >
              </el-table-column>
              <el-table-column
                  label="歌曲"
              >
                <template slot-scope="scope">
                  <router-link :to="{path:'/SongDetail/'+scope.row.song_id}"><span>{{ scope.row.song_Name }}</span></router-link>
                </template>
              </el-table-column>
              <el-table-column
                  label="专辑"
              >
                <template slot-scope="scope">
                  <router-link :to="{path:'/Albumdetail/'+scope.row.song_Albumid}"><span>{{ scope.row.song_AlbumName }}</span></router-link>
                </template>
              </el-table-column>
              <el-table-column
              >
                <template slot-scope="scope">
                  <el-button circle><i class="el-icon-plus" style="font-size: 20px;"></i></el-button>
                  <router-link :to="{path:'/SongDetail/'+scope.row.song_id}">
                    <el-button circle><i class="el-icon-caret-right" style="font-size: 20px;"></i></el-button>
                  </router-link>
                </template>
              </el-table-column>
            </el-table>
          </el-main>
        </el-container>
        <el-container style="margin-bottom: 30px;">
          <div class="col-sm-6" style="text-align: left;">
            <el-button @click="SongprevOffset" type="success" style="color: white;"><i class="el-icon-back"
                                                                                   style="font-size: 20px;">上一页</i>
            </el-button>
          </div>
          <div class="col-sm-6" style="text-align: right;">
            <el-button @click="SongnextOffset" type="success" style="color: white;"><i class="el-icon-right"
                                                                                   style="font-size: 20px;">下一页</i>
            </el-button>
          </div>
        </el-container>
      </el-tab-pane>
      <el-tab-pane label="全部专辑" name="third">
        <el-container class="container-lg">
          <span id="albumtop" class="lead" style="font-size: 30px;">新碟推送</span>
        </el-container>
        <el-container>
          <el-main>
            <el-table :data="getSingerAllAlbum" stripe lazy>
              <el-table-column
                  type="index"
              >
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <router-link :to="{path:'/albumdetail/'+scope.row.album_id}">
                    <el-image :src="scope.row.album_picUrl" style="width: 170px;height: 170px;">
                    </el-image>
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column
                  label="专辑"
              >
                <template slot-scope="scope">
                  <router-link :to="{path:'/albumdetail/'+scope.row.album_id}"><span class="lead" style="font-size: 17px;">{{ scope.row.album_Name }}</span></router-link>
                  <s>{{ scope.row.album_id }}</s>
                </template>
              </el-table-column>
              <el-table-column
                  label="发行日期"
              >
                <template slot-scope="scope">
                  <span class="lead">{{ scope.row.album_PublishTime | filterA }}</span>
                </template>
              </el-table-column>
              <el-table-column
              >
                <template>
                  <el-button circle><i class="el-icon-plus" style="font-size: 20px;"></i></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-main>
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
      </el-tab-pane>
      <el-tab-pane label="相关MV" name="fourth">
        <el-container class="container-lg">
          <span id="allMV" class="lead" style="font-size: 30px;">所有MV</span>
        </el-container>
        <el-container>
          <el-main>
            <div class="row" style="margin: 0 auto;">
              <div class="mv-box" v-for="(item1,index1) in getSingerAllMV" :key="index1">
                <div class="he_ZoomInImg-mv">
                  <el-image class="he_ZoomInImg_img-mv" :src="item1.mv_imgurl"></el-image>
                  <div class="he_ZoomInImg_caption-mv">
                    <p class="he_ZoomInImg_caption_p-mv" style="margin-bottom:0px;">
                      <img
                          src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006&v=88abebcbc1242dbbbbc836cc3e04a006&v=10e4305a2558d496548955434eaa30d9"
                          width="55px" height="55px">
                    </p>
                    <router-link :to="{path:'/mvdetail/'+item1.mv_Id}" href="javascript:;"></router-link>
                  </div>
                </div>
                <div class="low-title-text">
                  <div class="rcplaylistText on-a" style="margin-top: 10px;"><router-link class="no-a" :to="{path:'/mvdetail/'+item1.mv_Id}"
                                                                          href="javascript:;">{{ item1.mv_Name }}</router-link></div>
                  <div class="rcplaylistText no-a2">
                    <a>播放量：</a>
                    <a>{{ changepalyCount(item1.mv_playCount) }}</a>
                    <a>万</a>
                  </div>
                  <div class="rcplaylistText no-a2">
                    <a>发行时间：</a>
                    <a style="font-size: 15px;">{{ item1.mv_publishTime }}</a>
                  </div>
                </div>
              </div>
            </div>
          </el-main>
        </el-container>
      </el-tab-pane>
      <el-tab-pane label="歌手介绍" name="fifth">
        <el-container class="container-lg">
          <span id="alldesc" class="lead" style="font-size: 30px;">个人介绍</span>
        </el-container>
        <el-container>
          <el-main>
            <div>
              <div class="lead" style="border-bottom: 2px solid #46b370; width: 85px;margin-bottom: 20px;">个人简介</div>
              <p class="font-weight-light">{{SingerDesc}}</p>
            </div>
            <div v-for="(infos,indexs) in getSingerDesc" :key="indexs">
              <div class="lead" style="border-bottom: 2px solid #46b370; width: 85px;margin-bottom: 20px;">{{infos.title}}</div>
              <p class="font-weight-light">{{infos.content}}</p>
            </div>
          </el-main>
        </el-container>
      </el-tab-pane>
    </el-tabs>
  </div>


</template>

<script>
import '../../../public/css/songlist.css'
import axios from "axios";
import layer from 'layui-layer'

export default {
  name: "SingerHotMusic",
  props: {
    getSingerid: String
  },
  data() {
    return {
      getSingerMusic: [],
      getSingerAllMusic: [],
      getSingerAllAlbum: [],
      tempAlbum: [],
      getSingerAllMV: [],
      getSingerDesc: [],
      activeName: 'first',
      SingerDesc: '',
      AlbumOffset: 0,
      SongOffset: 0,
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
  methods: {
    changepalyCount(val) {
      return parseFloat(val / 10000).toFixed(2)
    },
    handleClick(tab, event) {
      console.log(tab, event);
      switch (tab.name) {
        case 'second': {
          axios.get("http://localhost:8081/singer/allsongs/" + this.getSingerid+'/0').then((response) => (
              this.getSingerAllMusic = response.data
          ))
        }
          break;
        case 'third': {
          axios.get("http://localhost:8081/album/artist/albums/" + this.getSingerid + '/10/0').then((response) => (
              this.getSingerAllAlbum = response.data
          ))
        }
          break;
        case 'fourth': {
          axios.get("http://localhost:8081/mv/singermv/" + this.getSingerid).then((response) => (
              this.getSingerAllMV = response.data
          ))
        }
          break;
        case 'fifth':{
          axios.get("http://localhost:8081/singer/info/desc/" + this.getSingerid).then((response) => {
              this.getSingerDesc = response.data,
                  this.SingerDesc = response.data[0].descinfo
          })
        }
      }
    },
    nextOffset() {
      console.log("下一页")
      if (this.AlbumOffset < 0) {
        console.log("下一页" + this.AlbumOffset)
        this.AlbumOffset = 0;
      } else if (this.AlbumOffset >= 0) {
        this.AlbumOffset = this.AlbumOffset + 10;
        axios.get("http://localhost:8081/album/artist/albums/" + this.getSingerid + '/10/' + this.AlbumOffset).then((response) => {
          this.tempAlbum = response.data
          if (this.tempAlbum.length != 0) {
            this.getSingerAllAlbum = this.tempAlbum
          } else {
            layer.msg("已经到最后一页了~"),
                this.AlbumOffset = this.AlbumOffset - 10;
          }
        })
        this.moveScrollIntoViewhot({behavior: 'smooth', block: 'start', inline: 'nearest'})
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
        axios.get("http://localhost:8081/album/artist/albums/" + this.getSingerid + '/10/' + this.AlbumOffset).then((response) => {
          if (response.data != null) {
            this.getSingerAllAlbum = response.data
          } else {
            this.AlbumOffset = this.AlbumOffset + 10;
          }
        })
        this.moveScrollIntoViewhot({behavior: 'smooth', block: 'start', inline: 'nearest'})
        console.log("上一页" + this.AlbumOffset)
      }
    },
    SongnextOffset() {
      console.log("下一页")
      if (this.SongOffset < 0) {
        console.log("下一页" + this.SongOffset)
        this.SongOffset = 0;
      } else if (this.SongOffset >= 0) {
        this.SongOffset = this.SongOffset + 100;
        axios.get("http://localhost:8081/singer/allsongs/" + this.getSingerid+'/'+this.SongOffset).then((response) => {
          this.tempAlbum = response.data
          if (this.tempAlbum.length != 0) {
            this.getSingerAllMusic = this.tempAlbum
          } else {
            layer.msg("已经到最后一页了~"),
                this.SongOffset = this.SongOffset - 100;
          }
        })
        this.moveScrollIntoViewhot2({behavior: 'smooth', block: 'start', inline: 'nearest'})
        console.log("下一页" + this.SongOffset)
      }
    },
    SongprevOffset() {
      if (this.SongOffset <= 0) {
        layer.msg("你已经是第一页了~"),
            console.log("上一页" + this.SongOffset)
        this.SongOffset = 0;
      } else if (this.SongOffset > 0) {
        this.SongOffset = this.SongOffset - 100;
        axios.get("http://localhost:8081/singer/allsongs/" + this.getSingerid+'/'+this.SongOffset).then((response) => {
          if (response.data != null) {
            this.getSingerAllMusic = response.data
          } else {
            this.SongOffset = this.SongOffset + 100;
          }
        })
        this.moveScrollIntoViewhot2({behavior: 'smooth', block: 'start', inline: 'nearest'})
        console.log("上一页" + this.SongOffset)
      }
    },
    moveScrollIntoViewhot(content) {
      let ele = document.getElementById('albumtop')
      setTimeout(() => {
            ele.scrollIntoView(content)
          },
          50)
    },
    moveScrollIntoViewhot2(content) {
      let ele = document.getElementById('hotSingleSong')
      setTimeout(() => {
            ele.scrollIntoView(content)
          },
          50)
    }
  },
  created() {
    axios.get("http://localhost:8081/singer/hotSong/" + this.getSingerid).then((response) => (
        this.getSingerMusic = response.data
    ))
  }
}
</script>

<style scoped>

s {
  display: none;
}

.mv-box {
  width: 270px;
  height: 100%;
  padding: 5px;
  margin: 20px;
}

.rcplaylistText {
  /*去掉下划线*/
  text-decoration: none;
  /*去掉点点*/
  font-size: 15px;
  padding-bottom: 20px;
  width: 280px;
  height: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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

.el-button:focus, .el-button:hover {
  background-color: #fff;
  color: #46b370;
  border-color: #46b370;
}

.el-icon-caret-right {
  font-size: 26px;
}

.el-icon-plus {
  font-size: 26px;
}

.el-button--success {
  color: #FFF;
  background-color: #42b983;
  border-color: #42b983;
}

.el-button:focus, .el-button:hover {
  background-color: #67C23A;
  color: #fff;
  border-color: #67C23A;
}
a{
  text-decoration: none;
  color: #303133;
}
a:hover,a:focus{
  color: #42b983;
}
</style>
