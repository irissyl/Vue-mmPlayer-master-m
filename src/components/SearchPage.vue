<template>
  <el-container>
    <el-header height="247px" class="search-bg">
      <div class="container" style="width: 1200px;">
        <div style="margin: 100px auto;text-align: center">
          <el-autocomplete
            class="inline-input"
            v-model="getKey"
            :fetch-suggestions="querySearch"
            placeholder="搜索音乐、MV、歌单、歌手"
            style="width: 570px;"
            popper-class="select-style"
            @select="handleSelect"
            @change="SearchFunction()"
            :highlight-first-item="true"
          >
            <i slot="suffix" style="color: #46b370;font-size: 20px;" class="el-input__icon el-icon-search"
               @click="SearchFunction()"
            ></i>
            <template slot-scope="{ item }">
              <div>
                <div class="name" style="color: #42b983">{{ item }}</div>
              </div>
            </template>
          </el-autocomplete>
        </div>
      </div>
    </el-header>
    <el-main>
      <div class="container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="歌曲" name="first"></el-tab-pane>
          <el-tab-pane label="专辑" name="second"></el-tab-pane>
          <el-tab-pane label="歌手" name="third"></el-tab-pane>
          <el-tab-pane label="歌单" name="fourth"></el-tab-pane>
          <el-tab-pane label="MV" name="fifth"></el-tab-pane>
        </el-tabs>
        <div id="tabs-title">
          <el-table v-if="activeName == 'first' " :data="getSearchResult">
            <el-table-column type="index">
            </el-table-column>
            <el-table-column
            label="歌曲"
            >
              <template slot-scope="scope">
                <router-link :to="{path:'/SongDetail/'+scope.row.songID}">{{scope.row.songName}}</router-link>
                <router-link :to="{path:'/mvdetail/'+scope.row.mvID}" style="margin-left: 10px;">
                  <span v-if="scope.row.mvID != 0" class="badge badge-danger">MV</span>
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              label="歌手"
            >
              <template slot-scope="scope">
                <span v-for="(item,index) in scope.row.singers">
                  <router-link :to="{path:'/SingerDetail/'+item.song_Singerid}" style="margin-right: 10px;">{{item.song_SingerName}}</router-link>
                </span>
              </template>
            </el-table-column>
            <el-table-column
              label="专辑"
            >
              <template slot-scope="scope">
                <router-link :to="{path:'/albumdetail/'+scope.row.albumID}">{{scope.row.albumName}}</router-link>
              </template>
            </el-table-column>
          </el-table>
          <el-table v-if="activeName == 'second' " :data="getSearchResult">
            <el-table-column type="index">
            </el-table-column>
            <el-table-column
            >
              <template slot-scope="scope">
                <router-link :to="{path:'/albumdetail/'+scope.row.albumID}">
                  <el-image :src="scope.row.albumIcon" style="width: 80px;height: 80px"></el-image>
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              label="专辑"
            >
              <template slot-scope="scope">
                <router-link :to="{path:'/albumdetail/'+scope.row.albumID}">{{scope.row.albumName}}</router-link>
              </template>
            </el-table-column>
            <el-table-column
              label="歌手"
            >
              <template slot-scope="scope">
                <router-link :to="{path:'/SingerDetail/'+scope.row.albumSingerID}">{{scope.row.albumSingerName}}</router-link>
              </template>
            </el-table-column>
            <el-table-column
              label="歌曲量"
            >
              <template slot-scope="scope">
                数量：{{scope.row.albumSize}}
              </template>
            </el-table-column>
            <el-table-column
              label="发行时间"
            >
              <template slot-scope="scope">
                {{scope.row.albumPublishTime | filterA}}
              </template>
            </el-table-column>
          </el-table>
          <el-table v-if="activeName == 'third' " :data="getSearchResult">
            <el-table-column type="index">
            </el-table-column>
            <el-table-column
            >
              <template slot-scope="scope">
                <router-link :to="{path:'/SingerDetail/'+scope.row.singerID}">
                  <el-image :src="scope.row.singerIcon" style="width: 65px;height: 65px;"></el-image>
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              label="歌手"
            >
              <template slot-scope="scope">
                <router-link :to="{path:'/SingerDetail/'+scope.row.singerID}">
                  {{scope.row.singerName}}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              label="专辑"
            >
              <template slot-scope="scope">
                  {{scope.row.singerAlbumSize}}
              </template>
            </el-table-column>
            <el-table-column
              label="MV"
            >
              <template slot-scope="scope">
                {{scope.row.singerMvSize}}
              </template>
            </el-table-column>
          </el-table>
          <el-table v-if="activeName == 'fourth' " :data="getSearchResult">
            <el-table-column type="index">
            </el-table-column>
            <el-table-column
            >
              <template slot-scope="scope">
                <router-link :to="{path:'/playlistdetail/'+scope.row.playlistID}">
                  <el-image :src="scope.row.playlistIcon" style="width: 80px;height: 80px"></el-image>
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              label="歌单"
            >
              <template slot-scope="scope">
                <router-link :to="{path:'/playlistdetail/'+scope.row.playlistID}">
                  {{scope.row.playlistName}}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              label="用户"
            >
              <template slot-scope="scope">
                by: {{scope.row.playlistCreatorName}}
              </template>
            </el-table-column>
          </el-table>
          <div v-if="activeName == 'fifth' ">
            <div class="row">
              <div class="UserMvStyle" v-for="(item,index) in getSearchResult"
                   :key="index"
              >
                <div class="he_ZoomInImgNewmv">
                  <el-image class="he_ZoomInImgNew_imgmv" :src="item.mvCover"></el-image>
                  <div class="he_ZoomInImgNew_captionmv">
                    <p class="he_ZoomInImgNew_caption_pmv" style="margin-bottom:0px;">
                      <img
                        src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006&v=88abebcbc1242dbbbbc836cc3e04a006&v=10e4305a2558d496548955434eaa30d9"
                        width="55px" height="55px"
                      >
                    </p>
                    <router-link class="he_ZoomInImgNew_caption_amv"
                                 :to="{path:'/mvdetail/'+item.mvID}"
                    ></router-link>
                  </div>
                </div>
                <div class="low-title-text">
                  <p class="rcplaylistText2 on-a">
                    <router-link class="no-a"
                                 :to="{path:'/mvdetail/'+item.mv_id}"
                    >{{ item.mvName }}
                    </router-link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="text-align: center;margin-top: 20px;">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="30"
            @current-change="handleCurrentChange"
            :total="NowGetSearchTotalSize">
          </el-pagination>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import axios from '../utils/axios'

export default {
  name: 'SearchPage',
  data() {
    return {
      activeName:'first',
      getKey: this.$route.params.key,
      SearchKeyWords: '',
      getSearchHotSuggestion: [],
      getSearchResult: [],
      NowGetSearchTotalSize:'',
      searchType:1,
      searchOffset:0,
      SearchHistoryList:[],
      tempHistoryList:[],
      getNowPage:'',
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
    querySearch(queryString, cb) {
      let restaurants = this.SearchHistoryList
      let results = queryString ? restaurants : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    // createStateFilters(queryString) {
    //   //调用的后台接口
    //   //从后台获取到对象数组
    //   axios.get('http://localhost:8081/music/search/' + queryString + '/1/0/10').then((response) => {
    //     //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
    //     return response.data.self_ResponseBody
    //   }).catch((error) => {
    //     return error.data.self_ResponseBody
    //   })
    // },
    handleSelect(item) {
      this.getKey = item
      this.initSearchData()
    },
    SearchFunction() {
      this.tempHistoryList.push(this.getKey)
      for (let i = 0; i < this.tempHistoryList.length; i++) {
        if(this.SearchHistoryList.indexOf(this.tempHistoryList[i])==-1){
          this.SearchHistoryList.push(this.tempHistoryList[i]);
        }
      }
      console.log("有重复的历史记录",this.tempHistoryList)
      console.log("无重复的历史记录",this.SearchHistoryList)
      this.initSearchData()
    },
    handleClick(tab) {
      switch (tab.name) {
        case 'first': {
          if(this.searchType != 1){
            this.searchType = 1
            this.initSearchData()
          }
        }
          break;
        case 'second': {
          if(this.searchType != 10){
            this.searchType = 10
            this.initSearchData()
          }
        }
          break;
        case 'third': {
          if(this.searchType != 100){
            this.searchType = 100
            this.initSearchData()
          }
        }
          break;
        case 'fourth': {
          if(this.searchType != 1000){
            this.searchType = 1000
            this.initSearchData()
          }
        }
          break;
        case 'fifth': {
          if(this.searchType != 1004){
            this.searchType = 1004
            this.initSearchData()
          }
        }
      }
    },
    async initSearchData(){
      console.log(this.getKey,this.searchType,this.searchOffset)
      await axios.get('http://localhost:8081/music/search/' + this.getKey + '/'+this.searchType+'/'+this.searchOffset+'/30').then((res) => {
        this.getSearchResult = res.data.self_ResponseBody
        this.NowGetSearchTotalSize = res.data.self_ResponseSize
        console.log("then")
        console.log(res.data.self_ResponseBody)
      }).catch((res) => {
        this.getSearchResult = res.data.self_ResponseBody
        this.NowGetSearchTotalSize = res.data.self_ResponseSize
        console.log("catch")
        console.log(res.data.self_ResponseBody)
      })
    },
    handleCurrentChange(currentPage){
      if(currentPage == 1){
        this.searchOffset = 0
        this.initSearchData()
      }else{
        this.searchOffset = currentPage * 30
        this.getNowPage = currentPage;
        this.initSearchData()
      }
      this.moveScrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
      console.log(this.getNowPage)  //点击第几页
      console.log("当前的offset",this.searchOffset)  //点击第几页

    },
    moveScrollIntoView(content) {
      let ele = document.getElementById('tabs-title')
      setTimeout(() => {
        ele.scrollIntoView(content)
      }, 20)
    },
  },
  created() {
    if(this.getKey != undefined){
      console.log(this.getKey)
      this.initSearchData()
      this.SearchKeyWords = this.getKey
    }else{
      this.getKey = '热门'
      this.initSearchData()
      console.log("无搜索key",this.getKey)
    }
  }
}
</script>

<style scoped>
>>> .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #46b370;
  color: #FFF;
}
>>> .el-pagination.is-background .el-pager li:not(.active):not(.disabled):hover {
  color: #46b370;
}
.rcplaylistText2 {
  /*去掉下划线*/
  text-decoration: none;
  /*去掉点点*/
  font-size: 15px;
  margin-top: 8px;
  padding-bottom: 20px;
  width: 250px;
  height: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.UserMvStyle{
  margin: 10px;
}
/*MV*/
.he_ZoomInImgNewmv {
  border-radius: 5px;
  background: #000;
  width: 250px;
  height: 150px;
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
.he_ZoomInImgNew-albummv {
  background: #000;
  width: 250px;
  height: 150px;
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
.he_ZoomInImgNewmv .he_ZoomInImgNew_imgmv {
  position: relative;
  display: block;
  width: 250px;
  height: 150px;
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
.he_ZoomInImgNewmv:hover .he_ZoomInImgNew_imgmv {
  opacity: .7;
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -o-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1)
}
.he_ZoomInImgNewmv .he_ZoomInImgNew_captionmv {
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
.he_ZoomInImgNewmv .he_ZoomInImgNew_captionmv,
.he_ZoomInImgNewmv .he_ZoomInImgNew_captionmv > a {
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
.he_ZoomInImgNewmv .he_ZoomInImgNew_caption_pmv {
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
.he_ZoomInImgNewmv:hover .he_ZoomInImgNew_caption_pmv {
  color: #fff;
  opacity: 1
}

a{
  color: #333333;
  text-decoration: none;
}
a:hover{
  color: #46b370;
  text-decoration: none;
}

.search-bg {
  height: 247px;
  background-image: url("../assets/img/bg_search.jpg");
}
>>> .el-tabs__item {
  padding: 0 20px;
  height: 40px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  line-height: 40px;
  display: inline-block;
  list-style: none;
  font-size: 18px;
  font-weight: 500;
  color: #303133;
  position: relative;
}
>>> .el-tabs__active-bar {
  position: absolute;
  bottom: 0;
  left: 1px;
  height: 2px;
  background-color: #46b370;
  z-index: 1;
  -webkit-transition: -webkit-transform .3s cubic-bezier(.645,.045,.355,1);
  transition: -webkit-transform .3s cubic-bezier(.645,.045,.355,1);
  transition: transform .3s cubic-bezier(.645,.045,.355,1);
  transition: transform .3s cubic-bezier(.645,.045,.355,1), -webkit-transform .3s cubic-bezier(.645,.045,.355,1);
  transition: transform .3s cubic-bezier(.645,.045,.355,1),-webkit-transform .3s cubic-bezier(.645,.045,.355,1);
  list-style: none;
}
>>> .el-tabs__item:hover {
  color: #46b370;
  cursor: pointer;
}
>>> .el-tabs__item.is-active {
  color: #46b370;
}
/*修改element el-input 的按下边框颜色 */
>>> .el-input__inner:focus {
  border-color: #46b370;
}
</style>
