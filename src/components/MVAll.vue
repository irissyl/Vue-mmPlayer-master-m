<template>
  <div class="container">
    <div class="mv-main container-fluid" style="margin-top: 3.5rem;">
      <div class="mv-main-q" style="margin-left: 5px;">
        <div class="mv-top">
          <!--上面的字-->
          <div class="mv-time">

            <div class="mv-top-list row" style="margin: 0px;">

              <div class="mv-top2">
                <a href="javascript:;">
                  <h5>最新MV ></h5>
                </a>
              </div>

              <div class="mv-nav-zi offset-sm-6">
                <ul class="row mv-tag">
                  <li>
                    <a href="javascript:;" class="current" @click="initDataNewMV('内地')">内地</a>
                  </li>
                  <div class="yy"></div>
                  <li>
                    <a href="javascript:;" @click="initDataNewMV('港台')">港台</a>
                  </li>
                  <div class="yy"></div>
                  <li>
                    <a href="javascript:;" @click="initDataNewMV('欧美')">欧美</a>
                  </li>
                  <div class="yy"></div>
                  <li>
                    <a href="javascript:;" @click="initDataNewMV('日本')">日本</a>
                  </li>
                  <div class="yy"></div>
                  <li>
                    <a href="javascript:;" @click="initDataNewMV('韩国')">韩国</a>
                  </li>
                </ul>
              </div>

            </div>

          </div>
        </div>
        <div class="newest-mv" style="padding: 0px;">
          <ul class="mv_list_list" style="padding: 0px;overflow: hidden;">
            <li class="mv_list_item mv_list_slide_item" v-for="(item,index) in getNewMv" :key="index">
              <div class="he_ZoomInImg-zjhmv">
                <img class="he_ZoomInImg_img-zjhmv"
                     :src="item.mv_cover"
                     style="width: 250px;height: 140px;"
                />
                <div class="he_ZoomInImg_caption-zjhmv">
                  <p class="he_ZoomInImg_caption_p-zjhmv" style="margin-bottom:0px;">
                    <img
                      src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006&v=88abebcbc1242dbbbbc836cc3e04a006&v=10e4305a2558d496548955434eaa30d9"
                      width="50px" height="50px"
                    >
                  </p>
                  <router-link :to="{path:'/mvdetail/'+item.mv_id}"></router-link>
                </div>

              </div>
              <div class="mv_list_title">
                <router-link :to="{path:'/mvdetail/'+item.mv_id}">{{ item.mv_name }}</router-link>
              </div>
              <div class="mv-zi-h6">
                <router-link :to="{path:'/SingerDetail/'+item.mv_singerid}">{{ item.mv_singerName }}</router-link>
              </div>
            </li>
          </ul>
        </div>


        <!--热卖mv-->
        <div class="mv-top2">

          <a href="javascript:;">
            <h5>热卖MV ></h5>
          </a>
        </div>
        <div class="newest-mv" style="padding: 0px; margin-top:30px;">
          <ul class="mv_list_list" style="padding: 0px;overflow: hidden;">
            <li class="mv_list_item mv_list_slide_item" v-for="(item,index) in getHotMv" :key="index">
              <div class="he_ZoomInImg-zjhmv">
                <img class="he_ZoomInImg_img-zjhmv"
                     :src="item.mv_cover"
                     style="width: 250px;height: 140px;"
                />

                <div class="he_ZoomInImg_caption-zjhmv">
                  <p class="he_ZoomInImg_caption_p-zjhmv" style="margin-bottom:0px;">
                    <img
                      src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006&v=88abebcbc1242dbbbbc836cc3e04a006&v=10e4305a2558d496548955434eaa30d9"
                      width="50px" height="50px"
                    >
                  </p>
                  <router-link :to="{path:'/mvdetail/'+item.mv_id}"></router-link>
                </div>
              </div>
              <div class="mv_list_title">
                <router-link :to="{path:'/mvdetail/'+item.mv_id}">{{ item.mv_name }}</router-link>
              </div>
              <div class="mv-zi-h6">
                <router-link :to="{path:'/SingerDetail/'+item.mv_singerid}">{{ item.mv_singerName }}</router-link>
              </div>
            </li>


          </ul>
        </div>

        <!--网易出品-->
        <div class="mv-top2">
          <a href="javascript:;">
            <h5>网易出品 ></h5>
          </a>
        </div>
        <div class="newest-mv" style="padding: 0px; margin-top: 30px;">
          <ul class="mv_list_list" style="padding: 0px;overflow: hidden;">
            <li class="mv_list_item mv_list_slide_item" v-for="(item,index) in getWYMv" :key="index">
              <div class="he_ZoomInImg-zjhmv">
                <img class="he_ZoomInImg_img-zjhmv"
                     :src="item.mv_cover"
                     style="width: 250px;height: 140px;"
                />
                <div class="he_ZoomInImg_caption-zjhmv">
                  <p class="he_ZoomInImg_caption_p-zjhmv" style="margin-bottom:0px;">
                    <img
                      src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006&v=88abebcbc1242dbbbbc836cc3e04a006&v=10e4305a2558d496548955434eaa30d9"
                      width="50px" height="50px"
                    >
                  </p>
                  <router-link :to="{path:'/mvdetail/'+item.mv_id}"></router-link>
                </div>
              </div>
              <div class="mv_list_title_chu" style="width:250px;">
                <router-link :to="{path:'/mvdetail/'+item.mv_id}">{{ item.mv_name }}</router-link>
              </div>
              <div class="mv-zi-h6">
                <router-link :to="{path:'/SingerDetail/'+item.mv_singerid}">{{ item.mv_singerName }}</router-link>
              </div>
            </li>
          </ul>
        </div>
        <!--mv排行榜-->
        <!--上面的字-->
        <div class="mv-time">
          <div class="mv-top-list row" style="margin: 0px;">
            <div class="mv-top2">
              <a href="javascript:;">
                <h5>排行榜 ></h5>
              </a>
            </div>
            <div class="mv-nav-zi offset-sm-6">
              <ul class="row mv-tag">
                <li>
                  <a href="javascript:;" class="current" @click="initDataRankMV('内地')">内地</a>
                </li>
                <div class="yy"></div>
                <li>
                  <a href="javascript:;" @click="initDataRankMV('港台')">港台</a>
                </li>
                <div class="yy"></div>
                <li>
                  <a href="javascript:;" @click="initDataRankMV('欧美')">欧美</a>
                </li>
                <div class="yy"></div>
                <li>
                  <a href="javascript:;" @click="initDataRankMV('日本')">日本</a>
                </li>
                <div class="yy"></div>
                <li>
                  <a href="javascript:;" @click="initDataRankMV('韩国')">韩国</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!--这是网易出品下面的那个图片那个-->
        <div class="Products" style="margin-left: 20px;">
          <div class="Products-mv" style="padding: 0px; margin-top: 15px;">
            <ul class="mv_list_list row" style="padding: 0px;overflow: hidden;">
              <li class="mv_list_item mv_list_slide_itemrank" v-for="(item,index) in getRankMv" :key="index">
                <div class="row">
                  <div class="lead code-style">{{ index + 1 }}.</div>
                  <div class="he_ZoomInImg-Products">
                    <img class="he_ZoomInImg_img-Products"
                         :src="item.mv_cover"
                         style="width: 250px;height: 140px;"
                    />
                    <div class="he_ZoomInImg_caption-Products">
                      <p class="he_ZoomInImg_caption_p-Products" style="margin-bottom:0px;">
                        <img
                          src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006&v=88abebcbc1242dbbbbc836cc3e04a006&v=10e4305a2558d496548955434eaa30d9"
                          width="50px" height="50px"
                        >
                      </p>
                      <router-link :to="{path:'/mvdetail/'+item.mv_id}"></router-link>
                    </div>
                  </div>
                  <!--字体-->
                  <div class="Products-zi">
                    <p><router-link :to="{path:'/mvdetail/'+item.mv_id}" >{{ item.mv_name }}</router-link></p>
                    <br />
                    <p><router-link :to="{path:'/SingerDetail/'+item.mv_singerid}">{{ item.mv_singerName }}</router-link></p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MVAll',
  data() {
    return {
      getNewMv: [],
      newMvType: '内地',
      getHotMv: [],
      getWYMv: [],
      getRankMv: [],
      rankMvType: '内地'
    }
  },
  methods: {
    initDataNewMV(val) {
      this.newMvType = val
      axios.get('http://localhost:8081/mv/newmv/' + this.newMvType + '/8').then((res) => {
        this.getNewMv = res.data
      })
    },
    initDataRankMV(val) {
      this.rankMvType = val
      axios.get('http://localhost:8081/mv/mvrank/' + this.rankMvType + '/10').then((res) => {
        this.getRankMv = res.data
      })
    }
  },
  created() {
    axios.get('http://localhost:8081/mv/newmv/' + this.newMvType + '/8').then((res) => {
      this.getNewMv = res.data
    })
    axios.get('http://localhost:8081/mv/allmv/全部/全部/最热/0/8').then((res) => {
      this.getHotMv = res.data
    })
    axios.get('http://localhost:8081/mv/wyimv').then((res) => {
      this.getWYMv = res.data
    })
    axios.get('http://localhost:8081/mv/mvrank/' + this.rankMvType + '/10').then((res) => {
      this.getRankMv = res.data
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

.mv-main {
  margin: 0 auto;
  width: 1200px;
}

.mv-top2 a {
  color: black;
  text-decoration: none;
  font-family: "微软雅黑";

}

.mv-nav-zi {
  margin-right: 20px;
}

.mv-nav-zi ul li {
  list-style: none;
  margin-left: 15px;
  margin-right: 15px;
}

.mv-nav-zi ul li a {
  font-size: 14px;
  color: darkgray;
  text-decoration: none;
}

.yy {
  height: 25px;
  border: 1px solid gainsboro;
}

.mv-tag li a:hover {
  color: #46b370;
}

.mv-tag li a:focus {
  background: #46b370;
  color: white;
}

.mv-tag li a {
  font-size: 18px;
  border-radius: 3px;
  padding: 3px 5px 3px 5px;
}

/*最新mv*/
.he_ZoomInImg-zjhmv {
  background: #000;
  width: 250px;
  height: 140px;
  padding: 0;
  margin: 0;
  border-radius: 5px;
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

.he_ZoomInImg-zjhmv .he_ZoomInImg_img-zjhmv {
  position: relative;
  display: block;
  width: 250px;
  height: 140px;
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

.he_ZoomInImg-zjhmv:hover .he_ZoomInImg_img-zjhmv {
  opacity: .7;
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -o-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1)
}

.he_ZoomInImg-zjhmv .he_ZoomInImg_caption-zjhmv {
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

.he_ZoomInImg-zjhmv .he_ZoomInImg_caption-zjhmv,
.he_ZoomInImg-zjhmv .he_ZoomInImg_caption-zjhmv > a {
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

.he_ZoomInImg-zjhmv .he_ZoomInImg_caption_p-zjhmv {
  text-align: center;
  width: 100%;
  position: absolute;
  top: 45px;
  left: 0;
  -webkit-transition: all .4s ease-in-out;
  -moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -ms-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
  overflow: hidden;
  opacity: 0
}

.he_ZoomInImg-zjhmv:hover .he_ZoomInImg_caption_p-zjhmv {
  color: #fff;
  opacity: 1
}

.mv_list_title {
  margin-top: 7px;
  width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mv_list_title a {
  color: black;
  font-family: "微软雅黑";
  font-size: 18px;
  text-decoration: none;
}

.mv_list_item a:hover {
  color: #46B370;
}

.mv_list_slide_item {
  list-style: none;
}

.mv_list_slide_itemrank {
  margin-right: 80px;
  padding: 15px;
  list-style: none;
}

.mv-zi-h6 {
  margin-bottom: 20px;
}

.mv-zi-h6 a {
  color: gray;
  font-family: "微软雅黑";
  text-decoration: none;
  font-size: 13px;
}

.mv-zi-h6 a:hover {
  color: #46B370;
  font-family: "微软雅黑";
}

.newest-mv ul li {
  float: left;
  /*margin-left: 60px;*/
  margin-right: 20px;

}

.newest-mv {
  margin-top: 10px;
}

/*网易出品*/
/*字的样式*/
.mv_list_title_chu {
  margin-top: 10px;
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mv_list_title_chu a {
  color: black;
  text-decoration: none;
  font-family: "微软雅黑";
  font-size: 18px;
}

/*mv排行榜*/

.he_ZoomInImg-Products {
  background: #000;
  width: 224px;
  height: 119px;
  padding: 0;
  margin: 0;
  border-radius: 5px;
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

.he_ZoomInImg-Products .he_ZoomInImg_img-Products {
  position: relative;
  display: block;
  width: 224px;
  height: 119px;
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

.he_ZoomInImg-Products:hover .he_ZoomInImg_img-Products {
  opacity: .7;
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -o-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1)
}

.he_ZoomInImg-Products .he_ZoomInImg_caption-Products {
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

.he_ZoomInImg-Products .he_ZoomInImg_caption-Products,
.he_ZoomInImg-Products .he_ZoomInImg_caption-Products > a {
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

.he_ZoomInImg-Products .he_ZoomInImg_caption_p-Products {
  text-align: center;
  width: 100%;
  position: absolute;
  top: 40px;
  left: 0;
  -webkit-transition: all .4s ease-in-out;
  -moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -ms-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
  overflow: hidden;
  opacity: 0
}

.he_ZoomInImg-Products:hover .he_ZoomInImg_caption_p-Products {
  color: #fff;
  opacity: 1
}

.mv-nav-zi-x {
  margin-right: 30px;
}

.mv-nav-zi-x ul li {
  list-style: none;
  margin-left: 15px;
  margin-right: 15px;
}

.mv-nav-zi-x ul li a {
  color: darkgray;
  text-decoration: none;
}

.code-style {
  color: #46b370;
  font-size: 25px;
  margin-right: 10px;
  width: 20px;
  text-align: center;
  margin-top: 50px;
}

.mv_list_item1 {
  float: right;

}

.Products-zi {
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.Products-zi a{
  font-family: "微软雅黑";
  color: black;
  text-decoration: none;
  text-align: center;
}

.Products-zi a.Products-zi-s {
  font-size: 18px;
}

.Products-zi a.Products-zi-x {
  color: gray;
  font-size: 13px;
}

.Products-zi a.Products-zi-x:hover {
  color: #46B370;
}
</style>
