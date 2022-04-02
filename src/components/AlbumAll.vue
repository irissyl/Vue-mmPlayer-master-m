<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
import NewAlbumPost from './NewSongAndNewAlbum/NewAlbumPost'
export default {
  name: "AlbumAll",
  components: { NewAlbumPost }
}
</script>

<style scoped>

</style>
