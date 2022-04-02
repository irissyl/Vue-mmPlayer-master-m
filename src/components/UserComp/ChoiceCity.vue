<template>
  <div>
    <i-input
      @on-focus="areaFocus"
      @on-blur="areaBlur"
      placeholder="请选择地址" v-model="formObj[formPropName]" @keyup.down.native="down" @keyup.up.native="up"  @keyup.enter.native="enter" @keyup.delete.native="update"></i-input>
    <ul class='ul-area-list' v-show="!(!showAreaList || !areaListObj[formPropName].dataList.length)" :id="formPropName" >
      <li @click="selectArea(v)" :key="v.code" v-for="v in areaListObj[formPropName].dataList">{{v.label}}</li>
    </ul>

  </div>
</template>

<script>
import provincesThree from '../../../public/js/city'

export default {
  name: 'ChoiceCity',
  data(){
    return{
      areaListObj: {},
      showAreaList: false,
      code:""//选择的区域
    }
  },
  props: {
    formObj:{//验证的参数所属的表单对象
      type: Object,
      required: true
    },
    formPropName:{//验证参数的名字
      type: String,
      required: true
    },
    formPropCode:{//验证参数的Code
      type: String,
      required: true
    }

  },
  computed: {
    validObjPropVal(){//watch无法监听this.areaListObj[this.formPropName]方括号的对象，所以用computed作一下中转
      return this.formObj[this.formPropName]
    }
  },
  created () {
    this.areaListObj[this.formPropName] = {
      dataList: [],
      arrowKeyDownIndex: -1
    };
  },
  watch: {
    validObjPropVal: {
      handler: function(val, oldVal) {
        let data = [];
        if ($.trim(val) != "") {
          provincesThree.map(v => {
            let d = this.isAreaData(v, val);
            if (d) {
              d.active = false;
              data.push(d);
            }
          });
        }
        if(data.length > 0) {
          $(`#${this.formPropName} li`).css({"background": "white"});
          data.sort((a, b) => {
            return a.level - b.level;
          });
          this.areaListObj[this.formPropName].dataList = data;
          // this.$emit('input', {code:this.code, area:val});
        }
      },
      deep: true
    },
  },
  methods: {
    down(){
      if (this.areaListObj[this.formPropName].arrowKeyDownIndex < this.areaListObj[this.formPropName].dataList.length - 1) {
        this.areaListObj[this.formPropName].arrowKeyDownIndex++;
        if (this.areaListObj[this.formPropName].dataList.length > 10 && this.areaListObj[this.formPropName].arrowKeyDownIndex > 9) {
          $(`#${this.formPropName}`).scrollTop((this.areaListObj[this.formPropName].arrowKeyDownIndex - 9) * 30);
        }
      }
      this.areaListObj[this.formPropName].dataList.map((v, index) => {
        if(index == this.areaListObj[this.formPropName].arrowKeyDownIndex) {
          $(`#${this.formPropName} li`).eq(index).css({"background": "#d8d6d6"});
        }else{
          $(`#${this.formPropName} li`).eq(index).css({"background": "white"});
        }
      });
    },
    up(){
      //上箭头
      if (this.areaListObj[this.formPropName].arrowKeyDownIndex > 0) {
        this.areaListObj[this.formPropName].arrowKeyDownIndex--;
        if ( this.areaListObj[this.formPropName].dataList.length > 10 && this.areaListObj[this.formPropName].arrowKeyDownIndex < this.areaListObj[this.formPropName].dataList.length - 10) {
          $(`#${this.formPropName}`).scrollTop((this.areaListObj[this.formPropName].arrowKeyDownIndex - 9) * 30);
        }
      }
      this.areaListObj[this.formPropName].dataList.map((v, index) => {
        if(index == this.areaListObj[this.formPropName].arrowKeyDownIndex) {
          $(`#${this.formPropName} li`).eq(index).css({"background": "#d8d6d6"});
        }else{
          $(`#${this.formPropName} li`).eq(index).css({"background": "white"});
        }
      });
    },
    enter(){
      if (this.areaListObj[this.formPropName].arrowKeyDownIndex != -1) {
        this.code = this.areaListObj[this.formPropName].dataList[this.areaListObj[this.formPropName].arrowKeyDownIndex].code;
        this.formObj[this.formPropCode] = this.areaListObj[this.formPropName].dataList[this.areaListObj[this.formPropName].arrowKeyDownIndex].code;
        this.formObj[this.formPropName] = this.areaListObj[this.formPropName].dataList[this.areaListObj[this.formPropName].arrowKeyDownIndex].label;
        this.areaListObj[this.formPropName].arrowKeyDownIndex = -1;
        this.showAreaList = false;
      }
    },
    update(){
      this.showAreaList = true;
    },
    //判断是否存在地址数据
    isAreaData(v1, v2) {
      if (v1.fullText.indexOf($.trim(v2).toLowerCase()) != -1) {
        return {
          label: v1.label,
          level: v1.level,
          parentCode: v1.parentCode,
          code: v1.code
        };
      }
      return false;
    },

    //地址文本框焦点失去
    areaBlur() {
      setTimeout(_ => {
        this.showAreaList = false;
      }, 200);
    },
    selectArea(v) {
      this.code = v.code;
      this.formObj[this.formPropCode] = v.code;
      this.formObj[this.formPropName] = v.label;
      this.showAreaList = false
    },
    areaFocus() {
      let val = this.formObj[this.formPropName];
      let data = [];
      if ($.trim(val) != "") {
        let fn = arr => {
          arr.map(item => {
            let d = this.isAreaData(item, val);
            if (d) {
              data.push(d);
            }
            if (item.children) {
              fn(item.children);
            }
          });
        };
        provincesThree.map(v => {
          let d = this.isAreaData(v, val);
          if (d) {
            d.active = false;
            data.push(d);
          }

        });
      }
      data.sort((a, b) => {
        return a.level - b.level;
      });
      this.areaListObj[this.formPropName].dataList = data;
      this.showAreaList = true;
    }
  }
}
</script>

<style scoped>
.ul-area-list{
  position: absolute;
  width: 100%;
  max-height: 300px;
  height: auto;
  left: 0;
  top: 36px;
  border: 1px solid #dddee1;
  background: #fff;
  overflow-y: scroll;
  z-index: 10;
}
.none{
  display: none
}
.ul-area-list li{
  list-style: none;
  padding-left: 10px;
  cursor: pointer;
  height: 30px;
  line-height: 30px;
}
</style>
