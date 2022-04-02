<template>
  <div>这是播放音乐界面
    {{this.SongPlayID}}
    <div>
      <a-player
        style="font-size: 17px;"
        :audio="audio"
        :theme="colors"
        :autoplay="true"
        :volume="0.5"
        :lrcType="1"
        :listMaxHeight="300"
      ></a-player>
    </div>
  </div>
</template>

<script>
import '../../../public/css/bootstrap.css'
import axios from 'axios'

export default {
  name: "SongPlayComp",
  data() {
    return {
      SongPlayID:this.$route.params.id,
      colors: '#42b983',
      getLyric: {},
      getUrl: {},
      getInfo: [],
      audio: {
        name: '',
        artist: '',
        cover: '',
        url: '',
        lrc: ''
      },
    }
  },
  methods: {
    async initData() {
      await axios.get('http://localhost:8081/song/detail/' + this.SongPlayID).then((res) => {
        this.getInfo = res.data
      })
      await axios.get('http://localhost:8081/song/lyric/' + this.SongPlayID).then((res) => {
        this.getLyric.lyric = res.data.lyric
      })
      await axios.get('http://localhost:8081/song/play/' + this.SongPlayID).then((res) => {
        this.getUrl.url = res.data.url
      })
      this.fixObject()
    },
    fixObject() {
      this.audio = [
        {
          name: this.getInfo[0].song_Name,
          artist: this.getInfo[0].singer_and_songList[0].song_SingerName,
          cover: this.getInfo[0].song_AlbumImageUrl,
          url: this.getUrl.url,
          lrc: this.getLyric.lyric
        },
        {
          name: this.getInfo[0].song_Name,
          artist: this.getInfo[0].singer_and_songList[0].song_SingerName,
          cover: this.getInfo[0].song_AlbumImageUrl,
          url: this.getUrl.url,
          lrc: this.getLyric.lyric
        },
        {
          name: this.getInfo[0].song_Name,
          artist: this.getInfo[0].singer_and_songList[0].song_SingerName,
          cover: this.getInfo[0].song_AlbumImageUrl,
          url: this.getUrl.url,
          lrc: this.getLyric.lyric
        }
      ]
    },
  },
  mounted() {
    this.initData()
  }
}
</script>

<style scoped>

</style>
