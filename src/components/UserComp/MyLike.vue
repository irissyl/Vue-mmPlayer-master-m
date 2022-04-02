<template>
  <div class="container">
    <!--中间内容-->
    <div id="main">
      <div class="">
					<span class="main_f1">
				关注(<span>121</span>)
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
              <el-table-column prop="fans_name" label="用户名" width="120">
                <a style="color: black;" class="fansa" href="">小花</a>
              </el-table-column>
              <el-table-column prop="fans_num" label="粉丝数" width="100">
                <a style="color: gray;" href="">13</a>
              </el-table-column>
              <el-table-column prop="fans_concern" label="关注人数" width="100">
                <a style="color: gray;" href="">33</a>
              </el-table-column>
              <el-table-column class="fans_sign" prop="sign" label="个性签名" width="300">
                <p style="color: gray;font-size: 15px;width: 200px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;display: block;" href="">你愿意与我为友吗 哪怕我不善言辞不苟言笑无利可图</p>
              </el-table-column>
              <el-table-column prop="relationship" label="关系" width="120">
                <a style="color: black;" class="fansa" href=""><i class="el-icon-check"></i>已关注</a>
              </el-table-column>
            </el-table>
            <el-pagination style="width: 950px;margin: 0 auto;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 20, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="userList.length">
            </el-pagination>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'MyLike'
}
</script>

<style scoped>

</style>
