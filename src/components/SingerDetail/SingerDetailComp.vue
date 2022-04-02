<template>
  <div>
    <SingerDhead :getSingerid="getSingerID" />
    <SingerHotMusic  :getSingerid="getSingerID" />
  </div>
</template>

<script>
import SingerDhead from "../../components/SingerDetail/SingerDhead";
import SingerHotMusic from "../../components/SingerDetail/SingerHotMusic";
export default {
  name: "SingerDetailComp",
  components: {SingerHotMusic,SingerDhead},
  props: {
    id: String
  },
  data(){
    return{
      getSingerID: this.$route.params.id,
    }
  },
  created() {

  }
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
