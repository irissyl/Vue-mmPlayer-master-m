<template>
  <div>
    <el-container>
      <el-header>
        <div class="container">
          <el-page-header content="音乐排行榜">
          </el-page-header>
        </div>
      </el-header>
      <el-main>
          <el-tabs class="container" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="歌手榜" name="first">
                <router-view></router-view>
            </el-tab-pane>
            <el-tab-pane label="官方榜" name="second">
                <router-view></router-view>
            </el-tab-pane>
            <el-tab-pane label="全球榜" name="third">
                <router-view></router-view>
            </el-tab-pane>
          </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'RankListAll',
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
     handleClick(tab) {
      switch (tab.name) {
        case 'first': {
          this.activeName = tab.name
          this.$router.push('/SingerRank')
        }
          break
        case 'second': {
          this.activeName = tab.name
          this.$router.push('/SongRank')
        }
          break
        case 'third': {
          this.activeName = tab.name
          this.$router.push('/SongWorldRank')
        }
          break
      }
    }
  }
}
</script>

<style>
.el-tabs__item:hover {
  color: #46b370;
  cursor: pointer;
}
.el-tabs__item.is-active {
  color: #46b370;
}
.el-tabs__active-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background-color: #46b370;
  z-index: 1;
  -webkit-transition: -webkit-transform .3s cubic-bezier(.645,.045,.355,1);
  transition: -webkit-transform .3s cubic-bezier(.645,.045,.355,1);
  transition: transform .3s cubic-bezier(.645,.045,.355,1);
  transition: transform .3s cubic-bezier(.645,.045,.355,1), -webkit-transform .3s cubic-bezier(.645,.045,.355,1);
  transition: transform .3s cubic-bezier(.645,.045,.355,1),-webkit-transform .3s cubic-bezier(.645,.045,.355,1);
  list-style: none;
}
.el-tabs__item {
  padding: 0 20px;
  height: 40px;
  -webkit-box-sizing: border-box;
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
