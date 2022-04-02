<template>
  <el-container>
    <div class="container">
      <!--  我创建的歌单    -->
      <el-divider content-position="left"><span class="lead"><i class="el-icon-headset"></i>我创建的歌单</span></el-divider>
      <el-button
        type="success"
        icon="el-icon-circle-plus-outline"
        plain
        class="offset-lg-10"
        @click="dialogFormVisible = true"
      >
        创建新的歌单
      </el-button>
      <!-- Form -->
      <el-dialog title="创建属于你的歌单吧" :visible.sync="dialogFormVisible" center width="600px">
        <el-form :model="UserPlaylistInfo" :rules="rules">
          <el-form-item label="歌单名称" :label-width="formLabelWidth" prop="Playlist_name">
            <el-input
              type="text"
              v-model="UserPlaylistInfo.Playlist_name"
              autocomplete="off"
              style="width: 350px;"
              maxlength="10"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="歌单简介" :label-width="formLabelWidth" prop="Playlist_desc">
            <el-input
              type="text"
              v-model="UserPlaylistInfo.Playlist_desc"
              autocomplete="off"
              style="width: 350px;"
            ></el-input>
          </el-form-item>
          <el-form-item label="歌单标签" :label-width="formLabelWidth" prop="Playlist_tags">
            <el-select v-model="UserPlaylistInfo.Playlist_tags" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="歌单图片" :label-width="formLabelWidth" prop="Playlist_icon">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:8081/upload"
              :show-file-list="false"
              :on-change="handleAvatarSuccess2"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="info" @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="success" @click="CreatePlaylist()">确 定</el-button>
        </div>
      </el-dialog>
      <el-table class="container" :data="getUserPlaylist">
        <el-table-column>
          <template slot-scope="scope">
            <el-image :src="scope.row.playlist_icon" style="width: 80px;height: 80px;" lazy></el-image>
          </template>
        </el-table-column>
        <el-table-column
          label="歌单名"
        >
          <template slot-scope="scope">
            <router-link :to="{path:'/UserPlaylist/'+scope.row.playlist_id}">{{ scope.row.playlist_name }}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="用户名"
        >
          <template>
            <span>{{ UserInfo.user_name }}</span>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <span @click="showDeleteIcon(scope.row.playlist_id,scope.row.playlist_name)"><i class="el-icon-delete"
                                                                                            style="font-size: 22px;"
            ></i></span>
          </template>
        </el-table-column>
      </el-table>
      <el-divider content-position="left"><span class="lead"><i class="el-icon-discount"></i>我的收藏</span></el-divider>
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="歌单" name="first">
          <el-container>
            <div class="container">
              <el-empty v-if="getUserCollectPlaylist.length == 0" :image-size="200" description="还没有收藏的歌单哦，快去收藏吧"
              ></el-empty>
              <div class="row">
                <div class="UserPlaylistStyle" v-if="getUserCollectPlaylist.length != 0" v-for="(item,index) in realGetUserCollectPlaylist"
                     :key="index"
                >
                  <div class="he_ZoomInImgNew">
                    <el-image class="he_ZoomInImgNew_img" :src="item.playlist_detail_coverImgUrl"></el-image>
                    <div class="he_ZoomInImgNew_caption">
                      <p class="he_ZoomInImgNew_caption_p" style="margin-bottom:0px;">
                        <img
                          src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006&v=88abebcbc1242dbbbbc836cc3e04a006&v=10e4305a2558d496548955434eaa30d9"
                          width="55px" height="55px"
                        >
                      </p>
                      <router-link class="he_ZoomInImgNew_caption_a"
                                   :to="{path:'/playlistdetail/'+item.playlist_detail_id}"
                      ></router-link>
                    </div>
                  </div>
                  <div class="low-title-text">
                    <p class="rcplaylistText on-a" style="margin: 0px;">
                      <router-link class="no-a"
                                   :to="{path:'/playlistdetail/'+item.playlist_detail_id}"
                      >{{ item.playlist_detail_name }}
                      </router-link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </el-container>
        </el-tab-pane>
        <el-tab-pane label="歌曲" name="second">
          <el-container>
            <div class="container">
              <el-empty v-if="getUserCollectSong.length == 0" :image-size="200" description="还没有收藏的歌曲哦，快去收藏吧"
              ></el-empty>
              <el-table :data="realGetUserCollectSong" v-if="getUserCollectSong.length != 0">
                <el-table-column
                  type="index"
                >
                </el-table-column>
                <el-table-column>
                  <template slot-scope="scope">
                    <router-link :to="{path:'/SongDetail/'+scope.row.song_id}">
                      <el-image :src="scope.row.song_AlbumImageUrl" style="width: 75px;height: 75px;">
                      </el-image>
                    </router-link>
                  </template>
                </el-table-column>
                <el-table-column
                  label="歌曲"
                >
                  <template slot-scope="scope">
                    <router-link :to="{path:'/SongDetail/'+scope.row.song_id}">
                      {{ scope.row.song_Name }}
                    </router-link>
                  </template>
                </el-table-column>
                <el-table-column
                  label="专辑"
                >
                  <template slot-scope="scope">
                    <router-link :to="{path:'/albumdetail/'+scope.row.song_Albumid}">
                      {{ scope.row.song_AlbumName }}
                    </router-link>
                  </template>
                </el-table-column>
                <el-table-column
                  label="歌手"
                >
                  <template slot-scope="scope">
                    <router-link :to="{path:'/SingerDetail/'+scope.row.singer_and_songList[0].song_Singerid}">
                      {{ scope.row.singer_and_songList[0].song_SingerName }}
                    </router-link>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-container>
        </el-tab-pane>
        <el-tab-pane label="歌手" name="third">
          <el-container>
            <div class="container">
              <el-empty v-if="getUserCollectSinger.length == 0" :image-size="200" description="还没有收藏的歌手哦，快去收藏吧"
              ></el-empty>
              <el-table :data="realGetUserCollectSinger" v-if="getUserCollectSinger.length != 0">
                <el-table-column
                  type="index"
                >
                </el-table-column>
                <el-table-column>
                  <template slot-scope="scope">
                    <router-link :to="{path:'/SingerDetail/'+scope.row.singer_id}">
                      <el-image :src="scope.row.singer_cover" style="width: 75px;height: 75px;">
                      </el-image>
                    </router-link>
                  </template>
                </el-table-column>
                <el-table-column
                  label="歌手"
                >
                  <template slot-scope="scope">
                    <router-link :to="{path:'/SingerDetail/'+scope.row.singer_id}">
                      {{ scope.row.singer_name }}
                    </router-link>
                  </template>
                </el-table-column>
                <el-table-column
                  label="专辑"
                >
                  <template slot-scope="scope">
                    <span>专辑：{{scope.row.albumSize}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="MV"
                >
                  <template slot-scope="scope">
                    <span>MV：{{scope.row.mvSize}}</span>
                  </template>
                </el-table-column>
              </el-table>

            </div>
          </el-container>
        </el-tab-pane>
        <el-tab-pane label="MV" name="fourth">
          <el-container>
            <div class="container">
              <el-empty v-if="getUserCollectMv.length == 0" :image-size="200" description="还没有收藏的MV哦，快去收藏吧"></el-empty>
              <div class="row">
                <div class="UserMvStyle" v-if="getUserCollectMv.length != 0" v-for="(item,index) in realGetUserCollectMv"
                     :key="index"
                >
                  <div class="he_ZoomInImgNewmv">
                    <el-image class="he_ZoomInImgNew_imgmv" :src="item.mv_cover"></el-image>
                    <div class="he_ZoomInImgNew_captionmv">
                      <p class="he_ZoomInImgNew_caption_pmv" style="margin-bottom:0px;">
                        <img
                          src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006&v=88abebcbc1242dbbbbc836cc3e04a006&v=10e4305a2558d496548955434eaa30d9"
                          width="55px" height="55px"
                        >
                      </p>
                      <router-link class="he_ZoomInImgNew_caption_amv"
                                   :to="{path:'/mvdetail/'+item.mv_id}"
                      ></router-link>
                    </div>
                  </div>
                  <div class="low-title-text">
                    <p class="rcplaylistText2 on-a" style="margin: 0px;">
                      <router-link class="no-a"
                                   :to="{path:'/mvdetail/'+item.mv_id}"
                      >{{ item.mv_name }}
                      </router-link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </el-container>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MyHomeBody',
  data() {
    return {
      activeName: 'first',
      UserInfo: {
        uid: '',
        user_name: '',
        user_avatarUrl: '',
        user_introduction: '',
        user_address: '',
        user_gender: '',
        user_grade: ''
      },
      UserPlaylistInfo: {
        Playlist_name: '',
        Playlist_desc: '',
        Playlist_tags: '',
        Playlist_icon: '',
        User_id: ''
      },
      formLabelWidth: '120px',
      getUserPlaylist: [],

      getUserCollectPlaylist: [],
      getUserCollectSong: [],
      getUserCollectSinger: [],
      getUserCollectMv: [],

      realGetUserCollectPlaylist: [],
      realGetUserCollectSong: [],
      realGetUserCollectSinger: [],
      realGetUserCollectMv: [],

      deleteIconIsShow: true,
      dialogFormVisible: false,
      PreviewImg: '',
      imageUrl: '',
      options: [
        {
          value: '华语',
          label: '华语'
        },
        {
          value: '欧美',
          label: '欧美'
        },
        {
          value: '韩语',
          label: '韩语'
        },
        {
          value: '日语',
          label: '日语'
        },
        {
          value: '粤语',
          label: '粤语'
        },
        {
          value: '另类/独立',
          label: '另类/独立'
        },
        {
          value: 'R&B/Soul',
          label: 'R&B/Soul'
        },
        {
          value: '民谣',
          label: '民谣'
        },
        {
          value: '小语种',
          label: '小语种'
        },
        {
          value: '学习',
          label: '学习'
        },
        {
          value: '夜晚',
          label: '夜晚'
        },
        {
          value: 'Bossa Nova',
          label: 'Bossa Nova'
        },
        {
          value: 'ACG',
          label: 'ACG'
        },
        {
          value: '影视原声',
          label: '影视原声'
        },
        {
          value: '性感',
          label: '性感'
        },
        {
          value: '流行',
          label: '流行'
        },
        {
          value: '摇滚',
          label: '摇滚'
        }
      ],
      value: '',
      rules: {
        Playlist_name: [
          { required: true, message: '请输入歌单名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        Playlist_desc: [
          { required: true, message: '请输入歌单简介', trigger: 'blur' }
        ],
        Playlist_tags: [
          { required: true, message: '请选择歌单标签', trigger: 'change' }],
        Playlist_icon: [
          { required: true, message: '请上传歌单图片', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleClick(tab) {
      console.log(tab.name)
    },
    async initMyPlaylist() {
      await axios.get('http://localhost:8081/userCplaylist/' + this.UserInfo.uid).then(res => {
        this.getUserPlaylist = res.data
        console.log(this.getUserPlaylist)
      })
      await axios.get('http://localhost:8081/ucPlaylist/' + this.UserInfo.uid).then(res => {
        this.getUserCollectPlaylist = res.data
        for (let i = 0; i < this.getUserCollectPlaylist.length; i++) {
          axios.get('http://localhost:8081/playlist/playlists/detail/' + this.getUserCollectPlaylist[i].playlist_id).then(res => {
            let getPlaylistDetailObj = res.data
            // console.log(getPlaylistDetailObj)
            this.realGetUserCollectPlaylist.push(getPlaylistDetailObj)
          })
        }
        console.log(this.getUserCollectPlaylist)
      })
      await axios.get('http://localhost:8081/ucSong/' + this.UserInfo.uid).then(res => {
        this.getUserCollectSong = res.data
        for (let i = 0; i < this.getUserCollectSong.length; i++) {
          axios.get('http://localhost:8081/song/detail/' + this.getUserCollectSong[i].music_id).then(res => {
            let getSongDetailObj = res.data[0]
            // console.log(getSongDetailObj)
            this.realGetUserCollectSong.push(getSongDetailObj)
          })
        }
        console.log(this.getUserCollectSong)
      })
      await axios.get('http://localhost:8081/ucSinger/' + this.UserInfo.uid).then(res => {
        this.getUserCollectSinger = res.data
        for (let i = 0; i < this.getUserCollectSinger.length; i++) {
          axios.get('http://localhost:8081/singer/info/detail/' + this.getUserCollectSinger[i].singer_id).then(res => {
            let getSingerDetailObj = res.data
            // console.log(getSingerDetailObj)
            this.realGetUserCollectSinger.push(getSingerDetailObj)
          })
        }
        console.log(this.getUserCollectSinger)
      })
      await axios.get('http://localhost:8081/ucMv/' + this.UserInfo.uid).then(res => {
        this.getUserCollectMv = res.data
        for (let i = 0; i < this.getUserCollectMv.length; i++) {
          axios.get('http://localhost:8081/mv/mvdetial/' + this.getUserCollectMv[i].mv_id).then(res => {
            let getMVDetailObj = res.data
            // console.log(getMVDetailObj)
            this.realGetUserCollectMv.push(getMVDetailObj)
          })
        }
        console.log(this.getUserCollectMv)
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
        if (this.UserInfo.uid != '') {
          this.isLoginStatus = true
        }
      } else {
        console.log(currentCity)
      }
    },
    showDeleteIcon(getPlaylistId, PlaylistName) {
      console.log('getid和getname', getPlaylistId, PlaylistName)
      if (PlaylistName == '我喜欢的音乐') {
        layer.msg('这个歌单不能删除哦')
      } else {
        this.open1(getPlaylistId)
      }
    },
    open1(getPlaylistId) {
      this.$confirm('你确定要删除这个歌单吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.get('http://localhost:8081/DeleteUserPlaylist/' + getPlaylistId)
          .then(res => {
            if (res.data.code == '200') {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              //刷新一下加载新数据
              window.location.reload()
            } else {
              this.$message({
                type: 'info',
                message: '删除失败...'
              })
            }
          })
          .catch(res => {
            this.$message({
              type: 'info',
              message: '删除失败'
            })
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    //成功才调用
    handleAvatarSuccess(res, file) {
      this.PreviewImg = this.successIconUrl
    },
    //改变就调用
    handleAvatarSuccess2(file, fileList) {
      this.PreviewImg = file.name
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    CreatePlaylist() {
      this.UserPlaylistInfo.Playlist_icon = this.PreviewImg
      this.UserPlaylistInfo.User_id = this.UserInfo.uid
      if (this.UserPlaylistInfo.Playlist_name != '' && this.UserPlaylistInfo.Playlist_desc != '' && this.UserPlaylistInfo.Playlist_tags != '' && this.UserPlaylistInfo.Playlist_icon != '') {
        let params = new URLSearchParams()
        params.append('Playlist_name', this.UserPlaylistInfo.Playlist_name)
        params.append('Playlist_desc', this.UserPlaylistInfo.Playlist_desc)
        params.append('Playlist_tags', this.UserPlaylistInfo.Playlist_tags)
        params.append('Playlist_icon', this.UserPlaylistInfo.Playlist_icon)
        params.append('User_id', this.UserPlaylistInfo.User_id)
        console.log(params)
        console.log('userPlaylist', this.UserPlaylistInfo)
        axios.post('http://localhost:8081/UserPlaylistCreate', params).then(res => {
          console.log(res.data)
          if (res.data.code == '200') {
            layer.msg('歌单创建成功，快去收藏歌曲吧！')
            //刷新一下加载新数据
            window.location.reload()
          } else {
            layer.msg('歌单创建出问题了...')
          }
        })
      } else {
        layer.msg('还有内容没填写')
        console.log('userPlaylist', this.UserPlaylistInfo)
      }
    }

  },
  created() {
    console.log('HomeBody---Created方法调用的得到默认UserItem')
    //这个方法必须先执行
    this.GetLocalStroageItem()
    this.initMyPlaylist()
  }

}
</script>

<style scoped>
.rcplaylistText {
  /*去掉下划线*/
  text-decoration: none;
  /*去掉点点*/
  font-size: 15px;
  padding-bottom: 20px;
  width: 200px;
  height: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.rcplaylistText2 {
  /*去掉下划线*/
  text-decoration: none;
  /*去掉点点*/
  font-size: 15px;
  padding-bottom: 20px;
  width: 250px;
  height: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.UserPlaylistStyle{
  margin: 10px;
}

.UserMvStyle{
  margin: 10px;
}
/*歌单*/
.he_ZoomInImgNew {
  border-radius: 5px;
  background: #000;
  width: 190px;
  height: 190px;
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

.he_ZoomInImgNew-album {
  background: #000;
  width: 190px;
  height: 190px;
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

.he_ZoomInImgNew .he_ZoomInImgNew_img {
  position: relative;
  display: block;
  width: 190px;
  height: 190px;
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

.he_ZoomInImgNew:hover .he_ZoomInImgNew_img {
  opacity: .7;
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -o-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1)
}

.he_ZoomInImgNew .he_ZoomInImgNew_caption {
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

.he_ZoomInImgNew .he_ZoomInImgNew_caption,
.he_ZoomInImgNew .he_ZoomInImgNew_caption > a {
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

.he_ZoomInImgNew .he_ZoomInImgNew_caption_p {
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

.he_ZoomInImgNew:hover .he_ZoomInImgNew_caption_p {
  color: #fff;
  opacity: 1
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

/*修改element的tabs focus伪类的item颜色*/
>>> .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  color: #46b370;
  background-color: #FFF;
  border-right-color: #DCDFE6;
  border-left-color: #DCDFE6;
  font-size: 17px;
}

/*修改element的tabs hover伪类的item颜色*/
>>> .el-tabs--border-card > .el-tabs__header .el-tabs__item:not(.is-disabled):hover {
  color: #46b370;
}

/* 修改element的success按钮 */
>>> .el-button--success:focus, .el-button--success:hover {
  background: #4dd094;
  border-color: #4dd094;
  color: #FFF;
}

>>> .el-button--success {
  color: #FFF;
  background-color: #46b370;
  border-color: #46b370;
}

/*修改element的select下拉框背景颜色*/
>>> .el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
  background-color: #7cc38b;
  color: #333333;
}

/*修改element el-input 的按下边框颜色 */
>>> .el-input__inner:focus {
  border-color: #46b370;
}

.isShowDeleteIcon {
  display: none;
}

a {
  color: #333333;
  text-decoration: none;
}

a:hover {
  color: #46b370;
  text-decoration: none;
}

/* 对话框 */
.secondaryClassification >>> .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.secondaryClassification >>> .avatar-uploader .el-upload:hover {
  border-color: #46b370;
}

.secondaryClassification >>> .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.secondaryClassification >>> .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #46b370;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
