<template>
  <div>
    <el-container>
      <el-main>
        <div class="container">
          <div v-for="(item,index) in getDefaultFour" :key="index">
            <div class="row RankListSong">
              <div>
                <router-link :to="{path:'/playlistdetail/'+item.rankSongList_id}">
                  <el-image lazy :src="item.rankSongList_coverImgUrl"
                            style="width: 200px;height: 200px;border-radius: 10px;"
                  ></el-image>
                </router-link>
              </div>
              <div class="row">
                <div>
                  <div v-for="(item2,index2) in item.rankSongList_song" :key="index2">
                    <div class="RankListSong lead">
                      <a href="javascript:;">{{ item2 }}</a>
                    </div>
                  </div>
                </div>
                <div>
                  <div v-for="(item3,index3) in item.rankSongList_singer" :key="index3">
                    <div class="RankListSong lead" style="margin-left: 50px">
                      <a href="javascript:;">{{ item3 }}</a>
                    </div>
                  </div>
                </div>
                <div class="toApposition"><router-link :to="{path:'/playlistdetail/'+item.rankSongList_id}">查看全部 ></router-link></div>
              </div>
            </div>
          </div>

        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SongRank',
  data() {
    return {
      getDefaultFour: [],
      getDefaultTemp: []
    }
  },
  methods: {},
  created() {
    axios.get('http://localhost:8081/playlist/rankplaylist').then((res) => {
      this.getDefaultTemp = res.data
      this.getDefaultTemp.splice(4, (this.getDefaultTemp.length - 4))
      this.getDefaultFour = this.getDefaultTemp
      this.getDefaultTemp = []
    })
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
.RankListSong{
  margin-left: 60px;
  font-size: 17px;
  color: #333333;
  padding: 5px;
  margin-top: 15px;
}
.toApposition{
  position: absolute;
  right: 50px;
}
</style>
