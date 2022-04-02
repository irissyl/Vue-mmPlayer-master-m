<template>

</template>

<script>
import '../../../public/css/bootstrap.css'
import axios from 'axios'

export default {
  name: 'MvComp',
  data(){
    return{
      visible: false,
      getlist: [],
      mvplay: {}
    }
  },
  created() {
    axios.get("json/Similar.json").then((response) => {
      this.getlist = response.data,
        console.log(this.getlist)
    })
    axios.get("json/MVurl.json").then((response) => {
        this.mvplay = response.data,
          console.log(this.mvplay)
    })
  }
}
</script>

<style scoped>
/*default*/
.he_ZoomInImg {
  background: #000;
  width: 180px;
  height: 100px;
  padding: 0;
  margin: 0;
  position: relative;
  box-sizing: border-box;
  cursor: pointer;
  -webkit-transition: all .4s ease-in-out;
  -moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -ms-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
  overflow: hidden;
  border-radius: 10px;
}

.he_ZoomInImg .he_ZoomInImg_img {
  border-radius: 10px;
  position: relative;
  display: block;
  width: 180px;
  height: 100px;
  padding: 0;
  margin: 0;
  opacity: 1;
  -webkit-transition: all .4s ease-in-out;
  -moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -ms-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
  overflow: hidden
}

.he_ZoomInImg:hover .he_ZoomInImg_img {
  opacity: .7;
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -o-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1)
}

.he_ZoomInImg .he_ZoomInImg_caption {
  color: #000;
  -moz-backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: all .4s ease-in-out;
  -moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -ms-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
  overflow: hidden
}

.he_ZoomInImg .he_ZoomInImg_caption,
.he_ZoomInImg .he_ZoomInImg_caption > a {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  -webkit-transition: all .4s ease-in-out;
  -moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -ms-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
  overflow: hidden
}

.he_ZoomInImg .he_ZoomInImg_caption_p {
  text-align: center;
  width: 80%;
  position: absolute;
  top: 30%;
  left: 10%;
  -webkit-transition: all .4s ease-in-out;
  -moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -ms-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
  overflow: hidden;
  opacity: 0
}

.he_ZoomInImg:hover .he_ZoomInImg_caption_p {
  color: #fff;
  opacity: 1
}

/* caption */

.he_ZoomInImg_caption_p img {
  width: 40px;
  height: 40px;
  margin: 0 auto;
  text-align: center;
}
</style>
