<template>
  <el-carousel :interval="4000" type="card" height="272px" class="carousel">
    <el-carousel-item v-for="(item,index) in getBannerUrl" :key="index">
      <el-image class="medium" :src="item.imageUrl"></el-image>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import axios from "axios";

export default {
  name: "Mainbanner",
  data() {
    return{
      getBannerUrl: []
    }
  },
  methods: {
    async refresh() { // 方法名随便取
      this.loading = true
      //http://119.23.243.51:8080/MusicWeb_project/banner2
      await axios.get("http://localhost:8081/banner").then((response) => (
          this.getBannerUrl = response.data
      ))
      this.loading = false
    }
  },
  created() {
    this.refresh()
  }
}
</script>

<style scoped>
.carousel{
  margin: 1.5rem;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>