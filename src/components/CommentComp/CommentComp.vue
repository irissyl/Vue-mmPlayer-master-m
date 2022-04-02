<template>
  <div class="container">
    <div>
      <el-form>
        <el-form-item style="height: 30px;">
          <div class="lead">发表你的评论吧：</div>
        </el-form-item>
        <el-form-item>
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="textarea"
            maxlength="150"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="getTypetoComment()">评论</el-button>
        </el-form-item>
      </el-form>
      <div>
        <ol>
          <li v-for="(item,index) in getCommentList" :key="index">
            <div>
              <div class="row">
                <!-- 用户显示 -->
                <div class="User-icon">
                  <el-image
                    :src="item.Icon"
                  >
                  </el-image>
                </div>
                <div class="User-content col-sm-11">
                  <div class="container">
                    <span class="User-name lead">{{ item.name }}:</span>
                    <div class="User-text">{{ item.content }}</div>
                  </div>
                  <div style="text-align: right">
                    <a data-toggle="collapse" @click="ChangeReplyButton(index)"
                       :href="addIdindex('#collapseExample',index)" role="button" aria-expanded="false"
                       aria-controls="collapseExample" style="font-size: 13px;margin: 15px;"
                    >
                      <i class="el-icon-chat-dot-round" style="font-size: 18px;"></i>
                    </a>
                  </div>
                  <el-divider content-position="left" style="margin-left: 20px;">
                    <div class="User-Comment-time">{{ item.time }}</div>
                  </el-divider>
                  <div class="collapse container" style="margin-bottom: 20px;margin-top: 10px;"
                       :id="addIdindex('collapseExample',index)"
                  >
                    <div class="card card-body">
                      <div>
                        <ol>
                          <li>
                            <el-form>
                              <el-form-item>
                                  <el-input
                                    type="text"
                                    :rows="1"
                                    placeholder="请输入内容"
                                    v-model="textarea2"
                                    maxlength="150"
                                    show-word-limit
                                  >
                                  </el-input>
                                  <el-button type="text" style="margin-top: 5px;" @click="getTypetoReply(index)">回复</el-button>
                              </el-form-item>
                            </el-form>
                          </li>
                          <li v-for="(reply,index2) in getCommentReplyList" :key="index2">
                            <div>
                              <div v-if="item.id == reply.id">
                                <span><span style="color: #46b370">{{ reply.name }}</span> <span
                                  style="color: #8590a6;"
                                >回复</span> {{ item.name }}</span>
                                <div style="margin-top: 5px;" class="User-text">{{ reply.content }}</div>
                              </div>
                            </div>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['getCommentType', 'getID'],
  name: 'CommentComp',
  data() {
    return {
      textarea: '',
      textarea2:'',
      getNotFixComment: [],
      getCommentList: [],
      getCommentReplyList: [],
      replyTitle: '查看回复',
      addIdindex(val, index) {
        return val + index
      },
      UserInfo: {
        uid: '',
        user_name: '',
        user_avatarUrl: '',
        user_introduction: '',
        user_address: '',
        user_gender: '',
        user_grade: ''
      }
    }
  },
  methods: {
    async initCommentData() {
      this.getCommentList = []
      this.getCommentReplyList = []
      switch (this.getCommentType) {
        case 1: {
          await axios.get('http://localhost:8081/SongComment/all/' + this.getID).then(res => {
            this.getNotFixComment = res.data
            console.log('没fix的所有评论', res.data)
            for (let i = 0; i < res.data.length; i++) {
              axios.get('http://localhost:8081/gerUserinfo/' + res.data[i].uid).then(response => {
                let getCommentResult = {
                  Icon: response.data.user_avatarUrl,
                  name: response.data.user_name,
                  content: this.getNotFixComment[i].content,
                  time: this.getNotFixComment[i].publishTime,
                  id: this.getNotFixComment[i].id,
                  uid: this.getNotFixComment[i].uid,
                }
                this.getCommentList.push(getCommentResult)
              })
              axios.get('http://localhost:8081/replySong/all/' + res.data[i].id).then(response2 => {
                console.log('没fix的所有评论2', response2.data)
                for (let j = 0; j < response2.data.length; j++) {
                  axios.get('http://localhost:8081/gerUserinfo/' + response2.data[j].replyUser_id).then(resReply => {
                    let getCommentResult2 = {
                      id: resReply.data.reply_songid,
                      name: resReply.data.user_name,
                      content: response2.data[j].reply_content
                    }
                    this.getCommentReplyList.push(getCommentResult2)
                  })
                }
              })
            }
          })
          console.log('我得到的当前对象的一级评论', this.getCommentList)
        }
          break
        case 1000: {
          await axios.get('http://localhost:8081/PlaylistComment/all/' + this.getID).then(res => {
            this.getNotFixComment = res.data
            console.log('没fix的所有评论', res.data)
            for (let i = 0; i < res.data.length; i++) {
              axios.get('http://localhost:8081/gerUserinfo/' + res.data[i].uid).then(response => {
                let getCommentResult = {
                  Icon: response.data.user_avatarUrl,
                  name: response.data.user_name,
                  content: this.getNotFixComment[i].content,
                  time: this.getNotFixComment[i].publishTime,
                  id: this.getNotFixComment[i].id,
                  uid: this.getNotFixComment[i].uid,
                }
                this.getCommentList.push(getCommentResult)
                console.log("最后一波",this.getCommentList)
              })
              axios.get('http://localhost:8081/replyPlaylist/all/' + res.data[i].id).then(response2 => {
                console.log('没fix的所有评论2', response2.data)
                for (let j = 0; j < response2.data.length; j++) {
                  axios.get('http://localhost:8081/gerUserinfo/' + response2.data[j].replyUser_id).then(resReply => {
                    let getCommentResult2 = {
                      id: resReply.data.reply_playlistid,
                      name: resReply.data.user_name,
                      content: response2.data[j].reply_content
                    }
                    this.getCommentReplyList.push(getCommentResult2)
                    console.log("最后一波",this.getCommentReplyList)
                  })
                }
              })
            }
          })
          console.log('我得到的当前对象的一级评论', this.getCommentList)
        }break;
        case 1004: {
          await axios.get('http://localhost:8081/MvComment/all/' + this.getID).then(res => {
            this.getNotFixComment = res.data
            console.log('没fix的所有评论', res.data)
            for (let i = 0; i < res.data.length; i++) {
              axios.get('http://localhost:8081/gerUserinfo/' + res.data[i].uid).then(response => {
                let getCommentResult = {
                  Icon: response.data.user_avatarUrl,
                  name: response.data.user_name,
                  content: this.getNotFixComment[i].content,
                  time: this.getNotFixComment[i].publishTime,
                  id: this.getNotFixComment[i].id,
                  uid: this.getNotFixComment[i].uid,
                }
                this.getCommentList.push(getCommentResult)
              })
              axios.get('http://localhost:8081/replyMV/all/' + res.data[i].id).then(response2 => {
                console.log('没fix的所有评论2', response2.data)
                for (let j = 0; j < response2.data.length; j++) {
                  axios.get('http://localhost:8081/gerUserinfo/' + response2.data[j].replyUser_id).then(resReply => {
                    console.log("final",resReply.data)
                    let getCommentResult2 = {
                      id: response2.data[j].reply_mvid,
                      name: resReply.data.user_name,
                      content: response2.data[j].reply_content
                    }
                    this.getCommentReplyList.push(getCommentResult2)
                  })
                }
              })
            }
          })
          console.log('我得到的当前对象的一级评论', this.getCommentList)
        }break;
      }
    },
    ChangeReplyButton(getKey) {
      if (this.replyTitle == '查看回复') {
        this.replyTitle = '收起'
      } else {
        this.replyTitle = '查看回复'
      }
    },
    LoadUserinfo() {
      let currentCity = window.localStorage.getItem('user')
      if (currentCity != null) {
        console.log(currentCity)
        if (currentCity) {
          let item = JSON.parse(currentCity)
          this.UserInfo.user_name = item.user_name
          this.UserInfo.uid = item.uid
          this.UserInfo.user_avatarUrl = item.user_avatarUrl
          this.UserInfo.user_introduction = item.user_introduction
          this.UserInfo.user_address = item.user_address
          this.UserInfo.user_gender = item.user_gender
          this.UserInfo.user_grade = item.user_grade
        }
      } else {
        console.log(currentCity)
      }
    },
    getTypetoComment() {
      let now = new Date()
      switch (this.getCommentType) {
        case 1: {
          let params = new URLSearchParams()
          params.append('content', this.textarea)
          params.append('time', now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate())
          params.append('uid', this.UserInfo.uid)
          params.append('songid', this.getID)
          axios.post('http://localhost:8081/cSong', params).then(res => {
            if (res.data.code == '200') {
              layer.msg('评论成功')
              // window.location.reload()
              this.initCommentData()
            } else {
              layer.msg('评论失败')
            }
          })
        }
          break
        case 1000: {
          let params = new URLSearchParams()
          params.append('content', this.textarea)
          params.append('time', now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate())
          params.append('uid', this.UserInfo.uid)
          params.append('playlistid', this.getID)
          axios.post('http://localhost:8081/cPlaylist', params).then(res => {
            if (res.data.code == '200') {
              layer.msg('评论成功')
              // window.location.reload()
              this.initCommentData()
            } else {
              layer.msg('评论失败')
            }
          })
        }break;
        case 1004: {
          let params = new URLSearchParams()
          params.append('content', this.textarea)
          params.append('time', now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate())
          params.append('uid', this.UserInfo.uid)
          params.append('mvid', this.getID)
          axios.post('http://localhost:8081/cMv', params).then(res => {
            if (res.data.code == '200') {
              layer.msg('评论成功')
              // window.location.reload()
              this.initCommentData()
            } else {
              layer.msg('评论失败')
            }
          }).catch(res=>{
            if (res.data.code == '200') {
              layer.msg('评论成功')
              // window.location.reload()
              this.initCommentData()
            } else {
              layer.msg('评论失败')
            }
          })
        }break;
      }
    },
    getTypetoReply(index){
      switch (this.getCommentType) {
        case 1: {
          let params = new URLSearchParams()
          params.append('content', this.textarea2)
          params.append('replyUserid', this.UserInfo.uid)
          params.append('songid', this.getCommentList[index].id)
          axios.post('http://localhost:8081/songReply', params).then(res => {
            if (res.data.code == '200') {
              layer.msg('评论成功')
              // window.location.reload()
              this.initCommentData()
            } else {
              layer.msg('评论失败')
            }
          })
        }
          break
        case 1000: {
          let params = new URLSearchParams()
          params.append('content', this.textarea2)
          params.append('replyUserid', this.UserInfo.uid)
          params.append('playlistid', this.getCommentList[index].id)
          axios.post('http://localhost:8081/playlistReply', params).then(res => {
            if (res.data.code == '200') {
              layer.msg('评论成功')
              // window.location.reload()
              this.initCommentData()
            } else {
              layer.msg('评论失败')
            }
          })
        }break;
        case 1004: {
          // console.log(index)
          // console.log(this.getCommentList[index].id)
          // console.log(this.getCommentReplyList)
          let params = new URLSearchParams()
          params.append('content', this.textarea2)
          params.append('replyUserid', this.UserInfo.uid)
          params.append('mvid', this.getCommentList[index].id)
          axios.post('http://localhost:8081/mvReply', params).then(res => {
            if (res.data.code == '200') {
              layer.msg('评论成功')
              // window.location.reload()
              this.initCommentData()
            } else {
              layer.msg('评论失败')
            }
          }).catch(res=>{
            if (res.data.code == '200') {
              layer.msg('评论成功')
              // window.location.reload()
              this.initCommentData()
            } else {
              layer.msg('评论失败')
            }
          })
        }break;
      }
    }
  },
  created() {
    console.log('type', this.getCommentType)
    console.log('id', this.getID)
    this.LoadUserinfo()
    this.initCommentData()
  }
}
</script>

<style scoped>
>>> .el-button--success:focus{
  outline: none;
}
>>> .el-button--text:focus{
  outline: none;
}
a {
  color: #333333;
  text-decoration: none;
}

a:hover {
  color: #46b370;
  text-decoration: none;
}

.User-icon {
  border-radius: 50%;
  width: 30px;
  height: 30px;
}

.User-name {
  color: #46b370;
  margin-right: 1rem;
  font-weight: bold;
  font-size: 16px;
}

.User-Comment-time {

}
</style>
