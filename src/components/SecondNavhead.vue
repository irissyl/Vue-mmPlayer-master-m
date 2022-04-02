<template>
  <div class="container">
    <!--下面导航栏-->
    <div class="nav_x offset-sm-2" style="margin-bottom: 2.5rem;">
      <ul class="row" style="padding: 0px;">
        <li>
          <router-link class="second_tags" to="/">首页</router-link>
        </li>

        <li>
          <router-link class="second_tags" to="/AlbumAll">专辑</router-link>
        </li>

        <li>
          <router-link class="second_tags" to="/SingerAll">歌手</router-link>
        </li>

        <li>
          <router-link class="second_tags" to="/RankListAll">排行榜</router-link>
        </li>

        <li>
          <router-link class="second_tags" to="/PlayListAll">分类歌单</router-link>
        </li>

        <li>
          <router-link class="second_tags" to="/MVAll">MV</router-link>
        </li>

        <li>
          <router-link class="second_tags" to="/NewMusicAll">最新音乐</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import '../../public/css/bootstrap.css'

export default {
  name: "SecondNavhead"
}
</script>

<style scoped>
.second_tags:checked{
  color: #36aa65;
}

a {
  color: black;
  text-decoration: none;
}

.nav_x {
  margin-left: 230px;
}

.song_q_zi ul li {
  /*去掉下划线*/
  text-decoration: none;
  /*去掉点点*/
  list-style: none;
  font-size: 15px;
  font-family: "微软雅黑";
  padding-bottom: 20px;
  /*padding-left: 20px;*/
}

.song_q_zi ul li a {
  color: black;
  margin-left: 35px;
  text-align: center;
}


.song_q_zi ul li {
  /*去掉下划线*/
  text-decoration: none;
  /*去掉点点*/
  list-style: none;
  font-size: 15px;
  font-family: "微软雅黑";
  padding-bottom: 20px;
  /*padding-left: 20px;*/
}

.song_q_zi ul li a {
  color: black;
  margin-left: 35px;
  text-align: center;
}

.nav_x {
  margin-left: 230px;
}

.nav_x ul li {
  list-style: none;
}

.nav_x ul li a {
  color: black;
  text-decoration: none;
  font-family: "微软雅黑";
  font-size: 15px;
  margin-left: 38px;
}

.nav_x ul li a:hover {
  color: #36aa65;
  font-family: "微软雅黑";
  font-size: 15px;
}
.nav_x ul li a:focus {
  color: #36aa65;
}

.btn:focus,
.btn:active:focus,
.btn.active:focus,
.btn.focus,
.btn:active.focus,
.btn.active.focus {
  box-shadow: none;
}

</style>
