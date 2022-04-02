<template>
  <!--独家放送-->
  <div class="recommend">
    <div class="container">
      <el-container>
        <el-header class="container" style="margin-bottom: 25px;">
          <div class="recommend_zi">
            <!--字体-->
            <h3 class="recommend_h3" style="padding-top: 1.5rem;margin-right: 13px;">独家放送</h3>
          </div>
        </el-header>
        <el-main>
          <el-carousel indicator-position="outside">
            <el-carousel-item v-for="(item,index) in getExclusive" :key="index">
              <div class="recommend_q_h row">
                <div style="margin: 0 auto" v-for="(item2,index2) in item" :key="index2">
                  <router-link class="ex-a1" title="独家放送" :to="{path:'/mvdetail/'+item2.mv_id}"><img :src="item2.name" alt="加载中..." /></router-link>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </el-main>
      </el-container>


    </div>
  </div>
</template>

<script>
import '../../public/css/bootstrap.css'
import axios from "axios";

export default {
  name: "Exclusive",
  data(){
    return{
      getExclusive: []
    }
  },
  created() {
    this,axios.get("http://localhost:8081/exclusivelist").then((response) => {
      this.getExclusive = response.data
    })
  }
}
</script>

<style scoped>
/*独家放送*/
.recommend{
  width: 100%;
  height:auto;
  background-image: linear-gradient(#f5f5f5, white);
}
.recommend_h3{
  margin-bottom: 20px;
  margin-top: 15px;
  text-align: center;
  font-weight: bold;
  font-family: "微软雅黑";
}
.recommend_bu{
  float: right;
  padding-left:270px ;
  font-family: "微软雅黑";
  font-size: 15px;
  color:black;

}
.recommend_bu:hover{
  color: #46b370;
  text-decoration: none;
}

.recommend_q_h{
  width: 1200px;
  height: 300px;
}
.recommend_q_h a{
  display: block;
  width: 560px;
  height: 235px;
  float: left;
}

.ex-a1{
  margin-right: 30px;
}

.ex-a2{
  margin-right: 15px;
}

.recommend_q_h a img{
  width: 560px;
  height: 235px;
  margin: 0 auto;
}
</style>