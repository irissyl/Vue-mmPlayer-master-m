<template>
  <div>
    <h1>所有歌曲</h1>
    <h2>{{getSingerids}}</h2>
  </div>
</template>

<script>
export default {
  name: "SingerAllmusic",
  data(){return{
    getSingerids: this.$route.params.id,
  }}
}
</script>

<style scoped>

</style>