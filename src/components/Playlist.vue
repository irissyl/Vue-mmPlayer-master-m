<template>
  <el-container>
    <el-header>
      <h1>头部</h1>
    </el-header>
    <el-main>
      <div> <h3>主内容</h3></div>
      <el-carousel height="1000px">
        <el-carousel-item  v-for="(item1,index1) in getlist" :key="index1" >
          <el-table :data="item1" style="width: 100%">
            <el-table-column
                label="歌名"
                prop="musicSong_album_name">
            </el-table-column>
            <el-table-column
                label="歌手名"
                prop="musicSong_Singer_name">
            </el-table-column>
            <el-table-column
                label="图片">
                  <template slot-scope="item1">
                    <el-image :src="item1.row.musicSong_album_imagUrl" style="width: 75px;height: 75px;">
                    </el-image>
                  </template>

            </el-table-column>
          </el-table>
        </el-carousel-item>
      </el-carousel>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";

export default {
  name: "playlist",
  data(){
    return{
      getlist: []
    }
  },
  created() {
    axios.get("http://localhost:8081/song/recommendsongs").then((response) =>{
      this.getlist = response.data,
          console.log(this.getlist)
    })
  }
}
</script>

<style scoped>

</style>
