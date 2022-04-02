<template>
  <div class="playerComp">
    <!--主体-->
    <mm-header />
    <router-view class="router-view" />
    <!--播放器-->
    <audio ref="mmPlayer"></audio>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import { getPlaylistDetail } from '../../api'
import { defaultBG, defaultSheetId, VERSION } from '../../config'
import { createTopList } from '../../utils/song'
import MmHeader from '../../components/mm-header/mm-header'
import MmDialog from '../../base/mm-dialog/mm-dialog'

export default {
  name: 'PlayerComp',
  components: {
    MmHeader,
    MmDialog
  },
  created() {
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

<style lang="less" scoped>
.playerComp {
  position: relative;
  width: 100%;
  height: 100%;
  color: @text_color;
  font-size: @font_size_medium;

  .router-view {
    width: 100%;
    height: 100%;
  }

  audio {
    position: fixed;
  }
}
</style>
