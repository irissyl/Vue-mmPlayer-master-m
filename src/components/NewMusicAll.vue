<template>
  <div>
    <div class="offset-lg-5">
      <router-link class="btn btn-success" style="margin: 10px;background-color: #85CE61;border-color: #85CE61;border-radius: 20px;" to="/NewSongAndNewAlbum/NewSongPost">新歌速递</router-link>
      <router-link class="btn btn-success" style="margin: 10px;background-color: #e6a23c;border-color: #e6a23c;border-radius: 20px;" to="/NewSongAndNewAlbum/NewAlbumPost">新碟上架</router-link>
    </div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import '../../public/css/bootstrap.css'
export default {
  name: "NewMusicAll",
  components: {}
}
</script>

<style>
.el-tabs__item.is-active {
  color: #42b983;
}
.el-tabs__item:hover {
  color: #42b983;
  cursor: pointer;
}
.el-tabs__active-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background-color: #42b983;
  z-index: 1;
  transition: transform .3s cubic-bezier(.645,.045,.355,1);
  list-style: none;
}
.el-tabs__item {
  padding: 0 20px;
  height: 40px;
  box-sizing: border-box;
  line-height: 40px;
  display: inline-block;
  list-style: none;
  font-size: 17px;
  font-weight: 500;
  color: #303133;
  position: relative;
}
</style>