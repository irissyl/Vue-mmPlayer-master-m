<template>
      <div>
        我操你吗
      </div>
</template>

<script>
import PlayerComp from './PlayerComp'
export default {
  name: 'TestComp',
  components: { PlayerComp },
  created() {
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
  }
}
</script>

<style scoped>

</style>
