<template>
  <el-container>
    <el-header style="height: auto;">
      <div class="container el-header">
        <h3>歌手人气榜</h3>
        <div class="RanKTopTitle">
          <ol class="row">
            <li><a href="javascript:;" @click="changeRankType('1')">华语</a></li>
            <li><a href="javascript:;" @click="changeRankType('2')">欧美</a></li>
            <li><a href="javascript:;" @click="changeRankType('3')">韩国</a></li>
            <li><a href="javascript:;" @click="changeRankType('4')">日本</a></li>
          </ol>
          <el-divider content-position="left"><i class="el-icon-sugar buling"></i><span class="lead buling"
                                                                                        style="font-size: 14px;"
          >深藏blue音乐</span><i
            class="el-icon-sugar buling"
          ></i></el-divider>
        </div>
      </div>
    </el-header>
    <el-main>
      <div class="container el-main">
        <div class="row" style="width: 1100px">
          <div class="TopThree" v-for="(item,index) in getTopThreeSinger" :key="index">
            <router-link :to="{path:'/SingerDetail/'+item.singer_id}">
              <el-image
                :src="item.singer_imgUrl"
                class="img-circle"
                style="width: 230px;height: 230px;"
              ></el-image>
            </router-link>
            <div class="TopThree-content">
              <span v-if="(index+1) == 1 "><i><svg t="1625574302609" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                                   xmlns="http://www.w3.org/2000/svg" p-id="3134" width="30" height="30"
              ><path
                d="M657.212778 692.010817c198.527542-34.618449 302.065663-272.621051 302.065663-485.913878-63.067384 0-134.414339 0-162.91751 0 9.620102-68.769246 15.646352-124.139322 15.646352-143.373385-91.650373 0-506.526335 0-598.173638 0 3.317559 36.776601 7.833409 87.304392 14.016225 143.373385-28.79686 0-99.963713 0-163.856905 0 0 216.192877 104.930841 453.824019 307.677475 486.460324 32.152281 41.288358 56.08025 58.536184 83.363639 67.988464 0 19.120476 0 47.786353 0 47.786353L339.263355 808.332079l-86.837764 152.959717 520.990768 0L686.578596 808.333102 570.804802 808.333102l0-47.786353C595.832825 754.150062 628.084367 727.289298 657.212778 692.010817zM715.530998 598.039585c24.75173-57.706283 52.937676-207.106941 72.409147-334.572008 12.798491 0 32.917714 0 60.302411 0 0 179.800016-78.458933 313.974901-135.833665 341.376994C713.450616 602.567715 714.549647 600.293929 715.530998 598.039585zM175.243745 263.4686c26.479071 0 46.303582 0 59.31799 0 15.940041 128.166031 40.496319 269.923616 78.456886 341.55198C254.878456 578.178235 175.243745 443.267593 175.243745 263.4686zM399.837966 563.42216 399.837966 503.305991l75.555813 0L475.393779 271.492344l-77.660754 17.544585 0-61.98882 153.216567-32.280194L550.949592 503.305991l75.088162 0 0 60.117193L399.837966 563.423183z"
                p-id="3135"
                fill="#f0e514"
              ></path></svg></i></span>
              <span v-if="(index+1) == 2 "><i>
                <svg t="1625574400073" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="3527" width="30" height="30"
                ><path
                  d="M657.212778 692.010817c198.527542-34.618449 302.065663-272.621051 302.065663-485.913878-63.067384 0-134.414339 0-162.91751 0 9.620102-68.769246 15.646352-124.139322 15.646352-143.373385-91.650373 0-506.526335 0-598.173638 0 3.317559 36.776601 7.833409 87.304392 14.016225 143.373385-28.79686 0-99.963713 0-163.856905 0 0 216.192877 104.930841 453.824019 307.677475 486.460324 32.152281 41.288358 56.08025 58.536184 83.363639 67.988464 0 19.120476 0 47.786353 0 47.786353L339.263355 808.332079l-86.837764 152.959717 520.990768 0L686.578596 808.333102 570.804802 808.333102l0-47.786353C595.832825 754.150062 628.084367 727.289298 657.212778 692.010817zM715.530998 598.039585c24.75173-57.706283 52.937676-207.106941 72.409147-334.572008 12.798491 0 32.917714 0 60.302411 0 0 179.800016-78.458933 313.974901-135.833665 341.376994C713.450616 602.567715 714.549647 600.293929 715.530998 598.039585zM175.243745 263.4686c26.479071 0 46.303582 0 59.31799 0 15.940041 128.166031 40.496319 269.923616 78.456886 341.55198C254.878456 578.178235 175.243745 443.267593 175.243745 263.4686zM384.166031 563.42216l0-59.415204 104.093776-99.882871c21.831214-20.895913 37.112246-38.439474 45.848211-52.631708 8.730848-14.18814 13.099343-28.925796 13.099343-44.210921 0-34.462906-18.479887-51.696406-55.438637-51.696406-31.03483 0-61.053518 12.478196-90.059132 37.427424l0-67.134003c31.030737-20.584827 66.276473-30.877241 105.731066-30.877241 35.709293 0 64.012919 9.085936 84.912925 27.251667 20.894889 18.168802 31.344892 43.315528 31.344892 75.439156 0 42.419112-25.731034 86.86437-77.193103 133.332704l-75.555813 68.070328 0 1.403976 149.473313 0 0 62.924121L384.166031 563.423183z"
                  p-id="3528"
                  fill="#bfbfbf"
                ></path></svg>
              </i></span>
              <span v-if="(index+1) == 3 ">
                <i>
                  <svg t="1625574432129" class="icon" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg" p-id="4166" width="30" height="30"
                  ><path
                    d="M657.212778 692.010817c198.527542-34.618449 302.065663-272.621051 302.065663-485.913878-63.067384 0-134.414339 0-162.91751 0 9.620102-68.769246 15.646352-124.139322 15.646352-143.373385-91.650373 0-506.526335 0-598.173638 0 3.317559 36.776601 7.833409 87.304392 14.016225 143.373385-28.79686 0-99.963713 0-163.856905 0 0 216.192877 104.930841 453.824019 307.677475 486.460324 32.152281 41.288358 56.08025 58.536184 83.363639 67.988464 0 19.120476 0 47.786353 0 47.786353L339.263355 808.332079l-86.837764 152.959717 520.990768 0L686.578596 808.333102 570.804802 808.333102l0-47.786353C595.832825 754.150062 628.084367 727.289298 657.212778 692.010817zM715.530998 598.039585c24.75173-57.706283 52.937676-207.106941 72.409147-334.572008 12.798491 0 32.917714 0 60.302411 0 0 179.800016-78.458933 313.974901-135.833665 341.376994C713.450616 602.567715 714.549647 600.293929 715.530998 598.039585zM175.243745 263.4686c26.479071 0 46.303582 0 59.31799 0 15.940041 128.166031 40.496319 269.923616 78.456886 341.55198C254.878456 578.178235 175.243745 443.267593 175.243745 263.4686zM483.814566 569.738006c-37.272905 0-67.291592-6.161327-90.058109-18.479887l0-66.666352c24.170492 18.092054 52.398394 27.13501 84.678588 27.13501 20.427238 0 36.644595-4.520967 48.654117-13.566994 12.006452-9.041934 18.012236-21.907962 18.012236-38.59604 0-17.152658-7.134491-30.252001-21.403472-39.298028-14.267958-9.041934-34.268478-13.566994-59.999512-13.566994l-32.280194 0 0-58.245566 29.707602 0c48.65514 0 72.983221-16.373922 72.983221-49.122791 0-30.877241-18.637476-46.315862-55.906288-46.315862-24.327058 0-47.953152 7.953136-70.877257 23.859407L407.325497 214.416418c24.949228-12.941753 54.345746-19.415189 88.187505-19.415189 34.305317 0 62.142316 7.916297 83.507926 23.74275 21.363564 15.829524 32.04688 37.777395 32.04688 65.847707 0 47.408753-24.016996 77.193103-72.046896 89.357144l0 1.169639c25.263383 2.806929 45.457308 12.046361 60.584843 27.719318 15.124466 15.671934 22.690792 34.736129 22.690792 57.192583 0 34.466999-12.595876 61.366649-37.778418 80.70202C559.33047 560.070832 525.762957 569.738006 483.814566 569.738006z"
                    p-id="4167"
                    fill="#e28d3a"
                  ></path></svg>
                </i>
              </span>
              <span class="lead"><router-link :to="{path:'/SingerDetail/'+item.singer_id}"
              >{{ item.singer_name }}</router-link></span>
            </div>
          </div>
        </div>
        <div class="container">
          <el-table :data="getAllSinger"  lazy
                    :header-cell-style="{background:'#46b370',color:'#fff','font-size':'17px','text-align':'center'}">
            <el-table-column >
              <template slot-scope="scope">
                <div style="text-align: center">
                  {{scope.$index+4}}
                </div>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <div class="box_allsonglist" style="margin: 0 auto;">
                  <div class="he_ZoomInImg Songlist-style" style="margin: 0 auto;">
                    <el-image lazy class="he_ZoomInImg_img"  :src="scope.row.singer_imgUrl" alt="Image 01"
                              style="width: 60px;height: 60px;"></el-image>
                    <div class="he_ZoomInImg_caption">
                      <p class="he_ZoomInImg_caption_p">
                        <img
                          src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006&v=88abebcbc1242dbbbbc836cc3e04a006&v=10e4305a2558d496548955434eaa30d9"
                          alt="icon1"></p>
                      <s>{{ scope.row.song_id }}</s>
                      <router-link :to="{path:'/SingerDetail/'+scope.row.singer_id}"></router-link>
                    </div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="歌手"
            >
              <template slot-scope="scope">
                <div style="text-align: center">
                  <router-link :to="{path:'/SingerDetail/'+scope.row.singer_id}">{{scope.row.singer_name}}</router-link>
                </div>
              </template>
            </el-table-column>
            <el-table-column>
            </el-table-column>
            <el-table-column
              label="热度"
            >
              <template slot-scope="scope">
                <div style="text-align: center">
                  {{scope.row.singer_score}}人气值
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SingerRank',
  data() {
    return {
      RankType: '1',
      getTopThreeSinger: [],
      getAllSinger: [],
      TempgetAllSinger: []
    }
  },
  methods: {
    changeRankType(val) {
      this.RankType = val
      this.initData()
    },
    async initData() {
      await axios.get('http://localhost:8081/singer/RankSinger/' + this.RankType).then((res) => {
        this.TempgetAllSinger = res.data
        this.getAllSinger = this.TempgetAllSinger.splice(3, (this.TempgetAllSinger.length - 3))
        this.getTopThreeSinger = this.TempgetAllSinger
        this.TempgetAllSinger = []
      })
    }
  },
  created() {
    this.initData()
  }
}
</script>

<style scoped>
a{
  text-decoration: none;
  color: #333333;
}
a:hover{
  color: #46b370;
  text-decoration: none;
}
.icon{
  margin-bottom: 12px;
  margin-right: 10px;
}

.img-circle {
  border-radius: 50%;
}

.RanKTopTitle {
  font-size: 16px;
  margin-top: 2rem;
}

.RanKTopTitle li a {
  color: #333333;
  margin: 10px;
  padding: 3px 5px 3px 5px;
  border-radius: 5px;
  text-decoration: none;
}

.RanKTopTitle ol li a:hover {
  color: #46b370;
}

.RanKTopTitle ol li a:focus, .RanKTopTitle ol li a:checked {
  color: #fff;
  background-color: #46b370;
}

.TopThree {
  margin:0 auto;
}

.TopThree a {
  text-decoration: none;
  color: #333333;
  font-size: 28px;
}

.TopThree a:hover{
  text-decoration: none;
  color: #46b370;
}

.TopThree-content {
  text-align: center;
  margin-top: 10px;
}

.he_ZoomInImg {
  background: #000;
  width: 60px;
  height: 60px;
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

.he_ZoomInImg .he_ZoomInImg_img {
  position: relative;
  display: block;
  width: 60px;
  height: 60px;
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
  overflow: hidden;
}

.he_ZoomInImg .he_ZoomInImg_caption,
.he_ZoomInImg .he_ZoomInImg_caption > a {
  position: absolute;
  top: 10px;
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
  top: 10%;
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
  width: 25px;
  height: 25px;
  margin: 0 auto;
  text-align: center;
}

</style>
