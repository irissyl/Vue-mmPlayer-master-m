<template>
  <el-container class="container-lg">
    <el-main class="container">
      <el-tabs class="container" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="first">
          <router-view></router-view>
        </el-tab-pane>
        <el-tab-pane label="华语" name="second">
          <router-view></router-view>
        </el-tab-pane>
        <el-tab-pane label="欧美" name="third">
          <router-view></router-view>
        </el-tab-pane>
        <el-tab-pane label="韩国" name="fourth">
          <router-view></router-view>
        </el-tab-pane>
        <el-tab-pane label="日本" name="fifth">
          <router-view></router-view>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<script>
import '../../../public/css/bootstrap.css'

export default {
  name: "NewAlbumPost",
  data() {
    return {
      activeName:'first'
    }
  },
  methods:{
    handleClick(tab) {
      switch (tab.name) {
        case 'first': {
          this.$router.push('/NewSongAndNewAlbum/NewAlbumPost/AlbumPostAll')
        }
          break;
        case 'second': {
          this.$router.push('/NewSongAndNewAlbum/NewAlbumPost/AlbumPosthy')
        }
          break;
        case 'third': {
          this.$router.push('/NewSongAndNewAlbum/NewAlbumPost/AlbumPostOM')
        }
          break;
        case 'fourth': {
          this.$router.push('/NewSongAndNewAlbum/NewAlbumPost/AlbumPostKor')
        }
          break;
        case 'fifth': {
          this.$router.push('/NewSongAndNewAlbum/NewAlbumPost/AlbumPostJP')
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
