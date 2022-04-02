<template>
  <div class="container">
    <MyHomeHead/>
    <MyHomeBody/>
  </div>
</template>

<script>
import MyHomeHead from './MyHomeHead'
import MyHomeBody from './MyHomeBody'
export default {
  name: 'MyHomeComp',
  components: { MyHomeBody, MyHomeHead }
}
</script>

<style scoped>

</style>
