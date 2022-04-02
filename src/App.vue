<template>
  <div id="app">
    <router-view></router-view>
    <!--播放器-->
    <audio ref="mmPlayer"></audio>
  </div>
</template>

<script>
import PlayerComp from './components/content/PlayerComp'
import { getPlaylistDetail } from './api'
import { defaultSheetId, VERSION } from './config'
import { createTopList } from './utils/song'
import { mapActions, mapMutations } from 'vuex'
export default {
  name: 'App',
  components: {
    PlayerComp
  },
  data(){
    return{
      drawer: false,
    }
  },
  created() {
    // 首次加载完成后移除动画
    let loadDOM = document.querySelector('#appLoading')
    if (loadDOM) {
      const animationendFunc = function() {
        loadDOM.removeEventListener('animationend', animationendFunc)
        loadDOM.removeEventListener('webkitAnimationEnd', animationendFunc)
        document.body.removeChild(loadDOM)
        loadDOM = null
      }.bind(this)
      loadDOM.addEventListener('animationend', animationendFunc)
      loadDOM.addEventListener('webkitAnimationEnd', animationendFunc)
      loadDOM.classList.add('removeAnimate')
    }

    // 设置audio元素
    this.$nextTick(() => {
      this.setAudioele(this.$refs.mmPlayer)
    })

    // 获取正在播放列表
    getPlaylistDetail(defaultSheetId).then(playlist => {
      const list = playlist.tracks.slice(0, 100)
      this.setPlaylist({ list })
    })
  },
  methods: {
    // 歌曲数据处理
    _formatSongs(list) {
      alert("歌曲数据处理")
      let ret = []
      list.forEach(item => {
        const musicData = item
        if (musicData.id) {
          ret.push(createTopList(musicData))
        }
      })
      return ret
    },
    ...mapMutations({
      setAudioele: 'SET_AUDIOELE'
    }),
    ...mapActions(['setPlaylist'])
  }
}
</script>

<style lang="less">
#app{
  margin: 0px;
  padding: 0px;
}

</style>
