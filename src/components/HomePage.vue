<template>
  <div class="initPage">
    <NavHead/>
    <transition>
      <router-view></router-view>
    </transition>
    <MusicFooter></MusicFooter>
  </div>
</template>

<script>
import NavHead from './NavHead'
import MusicFooter from './MusicFooter'
export default {
  name: 'HomePage',
  components: { MusicFooter, NavHead }
}
</script>

<style scoped>
.initPage{
  margin: 0px;
  padding: 0px;
}
</style>
