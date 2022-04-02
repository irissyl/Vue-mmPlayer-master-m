<template>
  <div>
    <div>
      <p class="pwrap">
        <v-distpicker @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"></v-distpicker>
      </p>
    </div>
    <CommentComp/>
  </div>
</template>

<script>
import VDistpicker from 'v-distpicker'
import CommentComp from './CommentComp/CommentComp'

export default {
  name: "MusicInfo",
  data(){
    return{
      txt1:'',
      txt2:'',
      txt3:'',
    }
  },
  methods: {
    onChangeProvince(a){
      console.log(a)
      this.txt1 = a.value
    },
    onChangeCity(a){
      console.log(a)
      this.txt2 = a.value
    },
    onChangeArea(a){
      console.log(a)
      this.txt3 = a.value
    }
  },
  components: { CommentComp, VDistpicker}
}
</script>

<style scoped>

</style>
