<template>
  <el-container>
    <el-header style="height: auto;">
      <div class="container" style="height: auto;width: 1200px;">
        <div class="row" style="margin: 0 auto">
          <div class="col-lg-3">
            <el-image id="PageImg" :src="getUserPlaylist.playlist_icon"
                      style="width: 250px;height: 250px;"
            >
            </el-image>
          </div>
          <div class="col-lg-7 playlist-text-style">
            <div style="margin-top: 0.75rem;">
              <h3 style="font-size: 31px;line-height: 50px;">{{ getUserPlaylist.playlist_name }}</h3>
            </div>
            <div><span class="lead" style="font-size: 15px;"><i class="el-icon-user-solid" style="color: #46b370;font-size: 16px;"></i>用户：</span><span style="font-size: 13px;">{{UserInfo.user_name}}</span></div>
            <div v-if="getUserPlaylist.playlist_tags == '' "><span class="lead" style="font-size: 15px;">标签：</span><span style="font-size: 13px;">收藏的音乐</span></div>
            <div v-if="getUserPlaylist.playlist_tags != '' "><span class="lead" style="font-size: 15px;">标签：</span><span style="font-size: 13px;">{{getUserPlaylist.playlist_tags}}</span></div>
            <div v-if="getUserPlaylist.playlist_desc != '' "><span class="lead" style="font-size: 15px;">简介：</span><span style="font-size: 13px;">{{getUserPlaylist.playlist_desc}}</span></div>
            <div v-if="getUserPlaylist.playlist_desc == '' "><span class="lead" style="font-size: 15px;">简介：</span><span style="font-size: 13px;">暂无简介</span></div>
          </div>
        </div>
      </div>
    </el-header>
    <el-main style="height: auto;">
      <div class="container">
        <el-divider content-position="left"><i class="el-icon-sugar buling"></i><span class="lead buling"
                                                                                      style="font-size: 14px;"
        >深藏blue音乐</span><i
          class="el-icon-sugar buling"
        ></i></el-divider>
        <el-divider content-position="right"><i class="el-icon-sugar buling"></i><span class="lead buling"
                                                                                       style="font-size: 14px;"
        >Deep Inside Music Club</span><i
          class="el-icon-sugar buling"
        ></i></el-divider>
        <div class="row">
          <div class="col-lg-9">
            <el-table :data="getUserPlaylistSng" lazy class="table-text">
              <el-table-column
                type="index"
              >
              </el-table-column>
              <el-table-column
                label="歌曲"
              >
                <template slot-scope="scope">
                  <router-link :to="{path:'/SongDetail/'+scope.row.music_id}"><span>{{ scope.row.music_name }}</span>
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column
                label="歌手"
              >
                <template slot-scope="scope">
                  <router-link :to="{path:'/SingerDetail/'+scope.row.music_singer_id}">
                    <span>{{ scope.row.music_singer_name }}</span></router-link>
                  <a><span></span></a>
                </template>
              </el-table-column>
              <el-table-column
                label="专辑"
              >
                <template slot-scope="scope">
                  <router-link :to="{path:'/Albumdetail/'+scope.row.music_album_id}"><span>{{ scope.row.music_album_name }}</span></router-link>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UserPlaylist',
  data(){
    return{
      PlaylistId: this.$route.params.id,
      getUserPlaylist:{},
      getUserPlaylistSng:[],
      UserInfo: {
        uid: '',
        user_name: '',
        user_avatarUrl: '',
      },
    }
  },
  methods: {
    async initUserPlayData() {
      await axios.get("http://localhost:8081/userPlaylist/" + this.PlaylistId).then(res => {
        this.getUserPlaylist = res.data[0]
        console.log("得到的用户歌单信息", res.data[0])
      })
      await axios.get("http://localhost:8081/userPlaylistSong/" + this.PlaylistId).then(res => {
        this.getUserPlaylistSng = res.data
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
        }
        if (this.UserInfo.uid != '') {
          this.isLoginStatus = true
        }
      } else {
        console.log(currentCity)
      }
    }
  },
  created() {
    this.initUserPlayData()
    this.GetLocalStroageItem()
  }
}
</script>

<style scoped>
a{
  color: #333333;
  text-decoration: none;
}
a:hover{
  color: #46b370;
  text-decoration: none;
}
</style>
