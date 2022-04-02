<template>
  <div>
    <Mainbanner/>
    <RecommendPlaylist/>
    <NewSongRecommend/>
    <Exclusive/>
    <RecommendAlbum/>
    <RankList/>
    <RecommendMv/>
  </div>
</template>

<script>
import Mainbanner from "../components/Mainbanner";
import RecommendPlaylist from "../components/RecommendPlaylist";
import NewSongRecommend from "../components/NewSongRecommend";
import Exclusive from "../components/Exclusive";
import RecommendAlbum from "../components/RecommendAlbum";
import RankList from "../components/RankList";
import RecommendMv from "../components/RecommendMv";
export default {
  name: "MainComp",
  components: {RecommendMv, RankList, RecommendAlbum, Exclusive, NewSongRecommend, RecommendPlaylist, Mainbanner}
}
</script>

<style scoped>

</style>
