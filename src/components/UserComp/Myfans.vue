<template>
  <!--头部下面-->
  <div id="content">
    <!--中间内容-->
    <div id="main">
      <div class="">
					<span class="main_f1">
						粉丝(<span>23</span>)
					</span>
        <hr style="height: 1px;width:940px;background-color: #F0F0F0;" />
      </div>
      <div class="deit">
        <div class="crumbs">
          <div class="cantainer">
            <el-table style="width: 940px;margin: 0 auto;" :data="userList.slice((currentPage-1)*pagesize,currentPage*pagesize)">
              <el-table-column type="index" width="50" label="序号">
              </el-table-column>
              <el-table-column prop="fans_img" width="100" label="头像">
                <template slot-scope="scope">
                  <a href="Dynamics.html">
                    <el-image src="img/img1/img1.jpg" min-width="100" height="100" lazy>
                    </el-image>
                  </a>
                </template>
              </el-table-column>
              <el-table-column prop="fans_name" label="用户名" width="130">
                <a style="color: black;" class="fansa" href="">小花</a>
              </el-table-column>
              <el-table-column prop="fans_num" label="粉丝数" width="120">
                <a style="color: gray;" href="">13</a>
              </el-table-column>
              <el-table-column prop="fans_concern" label="关注人数" width="140">
                <a style="color: gray;" href="">33</a>
              </el-table-column>
              <el-table-column class="fans_sign" prop="sign" label="个性签名" width="400">
                <p style="color: gray;font-size: 15px;width: 200px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;display: block;" href="">你愿意与我为友吗 哪怕我不善言辞不苟言笑无利可图</p>
              </el-table-column>
            </el-table>
            <el-pagination style="width: 950px;margin: 0 auto;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="userList.length">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <br /><br /><br />
  </div>
</template>

<script>
export default {
  name: 'Myfans',
  data(){
    return{
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      userList: [{
        fans_name: '',
        fans_num: ' ',
        fans_img: '',
        fans_concern: '',
        fans_sign: ''
      }]
    }
  },
  created() {
    this.handleUserList()
  },
  methods: {
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size;
      console.log(this.pagesize) //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage) //点击第几页
    },
    handleUserList() {

    }
  }
}
</script>

<style scoped>
#content {
  width: 1200px;
  height: 1200px;
  font-family: arial;
  border: none;
  background: white;
  margin: 0 auto;
}

</style>
