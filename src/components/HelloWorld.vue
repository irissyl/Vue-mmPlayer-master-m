<template>
  <div class="hello">
    <SecondNavhead></SecondNavhead>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

import SecondNavhead from './SecondNavhead'
export default {
  name: 'HelloWorld',
  components: {
    SecondNavhead
  },
  props: {
    msg: String
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
