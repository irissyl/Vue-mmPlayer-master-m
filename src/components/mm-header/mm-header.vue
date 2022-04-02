<template>
  <!--头部-->
  <header class="mm-header">
    <h1 class="header">
      <a href="javascript:;" onclick="window.history.back()"><i class="el-icon-arrow-left" style="font-size: 25px;text-align: center;color:white;position: absolute;left: 10px;top: 20px;"><i class="lead" style="font-size: 20px;vertical-align: 2px;">返回</i></i></a>
      <a style="color: white;text-decoration: none;">
        深藏blue音乐吧
      </a>
      <router-link to="/sHomepage"><i class="el-icon-s-home" style="font-size: 25px;text-align: center;color:white;position: absolute;right: 30px;top: 20px;"><i class="lead" style="font-size: 20px;vertical-align: 2px;">主页</i></i></router-link>
    </h1>
  </header>
</template>

<script>
import MmDialog from '../../base/mm-dialog/mm-dialog'

export default {
  name: 'MmHeader',
  components: {
    MmDialog
  }
}
</script>

<style lang="less">
//a{
//  color: #333333;
//  text-decoration: none;
//}
//a:hover{
//  color: #46b370;
//  text-decoration: none;
//}
.mm-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  @media (max-width: 768px) {
    background: @header_bg_color;
  }
  .header {
    text-align: center;
    line-height: 60px;
    color: @text_color_active;
    font-size: 24px;
    @media (max-width: 768px) {
      padding-left: 15px;
      text-align: left;
    }
  }
  .user {
    position: absolute;
    top: 50%;
    right: 15px;
    line-height: 30px;
    text-align: right;
    transform: translateY(-50%);
    &-info {
      float: left;
      margin-right: 15px;
      cursor: pointer;
      .avatar {
        width: 30px;
        height: 30px;
        border-radius: 90px;
        vertical-align: middle;
      }
      span {
        margin-left: 10px;
        color: @text_color_active;
      }
    }
    &-btn {
      float: left;
      cursor: pointer;
      &:hover {
        color: @text_color_active;
      }
    }
    @media (max-width: 768px) {
      &-info {
        margin-right: 10px;
        span {
          display: none;
        }
      }
    }
  }
}
.mm-dialog-text {
  text-align: left;
  .mm-dialog-input {
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    padding: 0 15px;
    border: 1px solid @btn_color;
    outline: 0;
    background: transparent;
    color: @text_color_active;
    font-size: @font_size_medium;
    box-shadow: 0 0 1px 0 #fff inset;
    &::placeholder {
      color: @text_color;
    }
  }
  a:hover {
    color: #d43c33;
  }
}
</style>
