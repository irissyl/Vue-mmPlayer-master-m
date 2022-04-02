<template>

  <div class="singer-q">
    <div class="mod_singer_push">
      <div class="section_inner">
        <h2 class="singer_push_tit">
          <span class="icon_txt">万千歌手，尽在眼前</span>
        </h2>
        <button class="singer_push_btn">
          <a href="javascript:;" class="denglu">畅享音乐</a>
          <span class="singer_push_btn_border"></span>
        </button>
      </div>
    </div>
    <div class="main">

      <!--中间字体-->
      <div class="mod_singer_tag">
        <div class="singer_tag_list_1">
          <ul class="singer_tag">
            <!--            -->
            <li v-for="(init,index) in SingerInitial" :key="index">
              <a href="javascript:;" class="tag_a" :class="{tag_as:index==taginitial}"
                 @click="getInitial(init.value,index)">{{ init.key }}</a>
            </li>
          </ul>
        </div>

        <br/>
        <div class="singer_tag_list_2">
          <ul class="singer_tag">
            <li v-for="(area,index) in SingerArea" :key="index">
              <a href="javascript:;" :class="{tag_as:index==tagarea}" class="tag_a" @click="getArea(area.value,index)">{{ area.key }}</a>
            </li>
          </ul>
        </div>

        <br/>
        <div class="singer_tag_list_3">
          <ul class="singer_tag">
            <li v-for="(type,index) in SingerType" :key="index">
              <a href="javascript:;" :class="{tag_as:index==tagtype}" class=" tag_a" @click="getType(type.value,index)">{{ type.key }}</a>
            </li>
          </ul>
        </div>

      </div>

      <div class="mod_singer_list" style="height: 100%;">
        <ul class="singer_list_list">
          <li class="singer_list_item" v-for="(item,index) in SingerList" :key="index">
            <div class="singer_list_item_box">
              <router-link :to="{path:/Singerdetail/+item.singer_id}" class="singer_list_cover" :title="item.singer_name">
                <el-image class="singer_list_pic" :src="item.singer_imgUrl" lazy></el-image>
              </router-link>
              <h3 class="singer_list_title">
                <i>{{ item.singer_id }}</i>
                <p class="singerName_style"><router-link :to="{path:/Singerdetail/+item.singer_id}">{{ item.singer_name }}</router-link></p>
              </h3>
            </div>
          </li>
        </ul>
      </div>

    </div>

  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "SingerAll",
  data() {
    return {
      SingerList: [],
      SingerInitial: [
        {
          key: '热门',
          value: -1
        },
        {
          key: 'A',
          value: 'A'
        },
        {
          key: 'B',
          value: 'B'
        },
        {
          key: 'C',
          value: 'C'
        },
        {
          key: 'D',
          value: 'D'
        },
        {
          key: 'E',
          value: 'E'
        },
        {
          key: 'F',
          value: 'F'
        },
        {
          key: 'G',
          value: 'G'
        },
        {
          key: 'H',
          value: 'H'
        },
        {
          key: 'I',
          value: 'I'
        },
        {
          key: 'J',
          value: 'J'
        },
        {
          key: 'K',
          value: 'K'
        },
        {
          key: 'L',
          value: 'L'
        },
        {
          key: 'M',
          value: 'M'
        },
        {
          key: 'N',
          value: 'N'
        },
        {
          key: 'O',
          value: 'O'
        },
        {
          key: 'P',
          value: 'P'
        },
        {
          key: 'Q',
          value: 'Q'
        },
        {
          key: 'R',
          value: 'R'
        },
        {
          key: 'S',
          value: 'S'
        },
        {
          key: 'T',
          value: 'T'
        },
        {
          key: 'U',
          value: 'U'
        },
        {
          key: 'V',
          value: 'V'
        },
        {
          key: 'W',
          value: 'W'
        },
        {
          key: 'X',
          value: 'X'
        },
        {
          key: 'Y',
          value: 'Y'
        },
        {
          key: 'Z',
          value: 'Z'
        },
        {
          key: '#',
          value: 0
        }
      ],
      SingerArea: [
        {
          key: '全部',
          value: -1
        },
        {
          key: '华语',
          value: 7
        },
        {
          key: '欧美',
          value: 96
        },
        {
          key: '日本',
          value: 8
        },
        {
          key: '韩国',
          value: 16
        },
        {
          key: '其他',
          value: 0
        }
      ],
      SingerType: [
        {
          key: '全部',
          value: -1
        },
        {
          key: '男歌手',
          value: 1
        },
        {
          key: '女歌手',
          value: 2
        },
        {
          key: '乐队组合',
          value: 3
        }
      ],
      type: '-1',
      area: '-1',
      initial: '-1',
      offset: '0',
      tagtype: 0,
      tagarea: 0,
      taginitial: 0,
    }
  },
  methods: {
    getType(type,index) {
      this.type = type;
      this.tagtype = index;
      this.GetSingerData();
    },
    getArea(area,index) {
      this.area = area;
      this.tagarea = index;
      this.GetSingerData();
    },
    getInitial(initial,index) {
      this.initial = initial;
      this.taginitial = index;
      this.GetSingerData();
    },
    getOffset(offset) {
      this.offset = offset;
      this.GetSingerData();
    },
    async GetSingerData() {
      await axios.get("http://localhost:8081/singer/SingerList/" + this.offset + "/" + this.type + "/" + this.area + "/" + this.initial).then((res) => {
        this.SingerList = res.data
      })
    },
    async initSingerAllData(){
     await axios.get("http://localhost:8081/singer/SingerList/" + this.offset + "/" + this.type + "/" + this.area + "/" + this.initial).then((res) => {
        this.SingerList = res.data
      })
    }
  },
  created() {
    this.initSingerAllData()
  }
}
</script>

<style scoped>
i {
  display: none;
}

.singerName_style {
  width: 115px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #31c27c;
  color: #fff;
}

::v-deep .el-pagination.is-background .el-pager li:not(.disabled):hover {
  background-color: #31c27c;
  color: #fff;
}

body {
  margin: 0;
  padding: 0;
}

.main, .section_inner {
  height: auto;
  max-width: 1200px;
  margin: 0 auto;
}

.singer-q {
  background-color: #fbfbfd;
}

/*上面的*/
.mod_singer_push {
  position: relative;
  width: 100%;
  height: 376px;
  background: url(../assets/bg_singer.0ba4a7af.jpg) 50% 0 repeat-x;
  overflow: hidden;
}

.section_inner {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  text-align: center;
}

.singer_push_tit {
  color: #FFFFFF;
  font-size: 70px;
  font-family: "微软雅黑";
  padding-top: 80px;
}


/*按钮的*/
.singer_push_btn {
  position: relative;
  display: block;
  margin: 20px auto 0;
  font-size: 18px;
  text-align: center;
  color: #fff;
  line-height: 48px;
  width: 174px;
  background-color: transparent;
  border: 0;
}

.singer_push_btn_border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 2px;
  border: 1px solid #fff;
  opacity: .2;
  /*filter: alpha(opacity=20);*/
  transition-property: opacity;
  transition-duration: .3s;
}

.singer_push_btn:hover .singer_push_btn_border {
  opacity: 1;
  /*filter: alpha(opacity=100);*/
  transition-duration: .3s;
}

.denglu {
  color: #FFFFFF;
  /*去掉下划线*/
  text-decoration: none;
}

/*中间的字体*/
.mod_singer_tag {
  width: 100%;
  height: 230px;
  background-color: #fbfbfd;
  padding: 34px 0 17px 40px;
  margin: 30px 0 20px;
}

.singer_tag_list_1 ul li {
  float: left;
  /*去掉点点*/
  list-style: none;
  margin-left: 27px;
}

.singer_tag_list_1 ul li a {
  font-family: "微软雅黑";
  padding: 3px;
  color: #000000;
  font-size: 15px;
  /*去掉下划线*/
  text-decoration: none;
  text-align: center;
}

.tag_a:hover {
  color: #36aa65;
  /*去掉下划线*/
  text-decoration: none;
}

/*.tag_a:focus {*/
/*  background-color: #31c27c;*/
/*  color: #fff;*/
/*}*/

.tag_as {
  background-color: #31c27c !important;
  color: #fff !important;
}

.singer_tag_list_2 ul li {
  float: left;
  /*去掉点点*/
  list-style: none;
  margin-left: 27px;

}

.singer_tag_list_2 ul li a {
  font-family: "微软雅黑";
  padding: 3px;
  color: #000000;
  font-size: 15px;
  /*去掉下划线*/
  text-decoration: none;
  text-align: center;
}

.singer_tag_list_3 ul li {
  float: left;
  /*去掉点点*/
  list-style: none;
  margin-left: 27px;
}

.singer_tag_list_3 ul li a {
  font-family: "微软雅黑";
  padding: 3px;
  color: #000000;
  font-size: 15px;
  /*去掉下划线*/
  text-decoration: none;
  text-align: center;
}

.singer_tag_list_4 ul li {
  float: left;
  /*去掉点点*/
  list-style: none;
  margin-left: 27px;
}

.singer_tag_list_4 ul li a {
  /*去掉下划线*/
  text-decoration: none;
  font-family: "微软雅黑";
  color: #000000;
  font-size: 15px;
  padding: 3px;
  text-align: center;
}

/*中间图片*/
.mod_singer_list {
  width: 100%;
  height: 100%;
  background-color: #FBFBFD;
  overflow: hidden;
}

.mod_singer_list ul li {
  margin-left: 20px;
  float: left;
  list-style: none;

}

/*图片大小*/
.singer_list_pic {
  width: 172px;
  height: 172px;
  border-radius: 50%;
}

.singer_list_item_box {
  position: relative;
  margin-right: 35px;
  /*background-color: red;*/
  min-height: 195px;
  padding: 25px 0;
  overflow: hidden;
}

.singer_list_title {
  font-family: "微软雅黑";
  font-size: 18px;
  text-align: center;
  font-weight: 400;
  /*zoom: 1;*/
  margin: 20px 30px 4px;

}

.singer_list_title a {
  color: black;
}

.singer_list_title a:hover {
  color: #36AA65;
  /*去掉下划线*/
  text-decoration: none;
}

.singer_tag {
  width: 1300px;
  height: 5px;
}

</style>
