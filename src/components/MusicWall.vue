<template>
  <div>
    <PlayerComp/>
  </div>
</template>

<script>
import PlayerComp from './content/PlayerComp'
export default {
  name: "MusicWall",
  components: { PlayerComp, SingerDetailComp}
}
</script>

<style scoped>

</style>
