<template>
  <div class="">
    <footer class="page-footer">
      <div class="foooter_font">
        <br />
        <div class="foooter_t1">
          <a class="active1" href="firstpage.html">网站首页</a>|
          <a class="active1" href="Neteork_Repair.html">关于我们</a>|
          <a class="active1" href="absent_sleep.html">联系我们 </a>|
          <a class="active1" href="about_us.html">广告服务 </a>|
          <a class="active1" href="student_message.html">更多服务 </a><br />
        </div>
        <br /><br /><br /><br />
        <div class="" style="float: left;margin-left: 5%;margin-top: -80px;">
          <img src="../assets/rqcode.jpg" width="80px" style="float: left;" />
          <img src="../assets/icon.png" width="150px" height="140px" style="float: left;margin-top: -30px;" />

        </div>
        <div style="float: left;text-align: center;margin-top: -30px;">
          <a>互联网不良信息举报中心：www.12377.cn 深藏blue不良信息举报邮箱：jubao_music@blue.net 客服邮箱：kefu@blue.net</a><br /><br />
          <a>我们致力于推动网络正版音乐发展，相关版权合作请联系copyrights@blue.com</a> <br /><br />
          <a>Copyright © 2004-2021 blue-Inc.All Rights Reserved</a>

        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "MusicFooter"
}
</script>

<style scoped>
.page-footer {
  height: 200px;
  /*border: 1px solid saddlebrown;*/
  font-size: 12px;
  background-color: #333;
  color: #CCCCCC;
  text-align: center;
  background-image: url(../assets/icon1.png);
  background-position: 50px 190px;
}
html {
  height: 100%;
}

body {
  min-height: 100%;
  margin: 0;
  padding: 0;
  position: relative;
}

.page-footer div a {
  text-decoration: none;
  color: white;
}

.foooter_font a:hover {
  color: #36aa65;
}

.foooter_font a {}

.foooter_font {
  width: 1200px;
  height: 200px;
  /*border: 1px solid #333333;*/
  /*text-align: center;*/
  margin: 0 auto;
}

.foooter_t1 {
  width: 500px;
  height: 20px;
  margin-left: 30%;
  /*margin-top: 20px;*/
  /*border: 1px solid red;*/
}
</style>