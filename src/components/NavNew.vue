<template>
  <div class="nav" :style="{backgroundImage: 'url('+backgroundImage+')'}">
    <transition name="slide-fade" mode="out-in">
      <router-view v-if="isRouterAlive"></router-view>
    </transition>
    <div class="select_backgroundImage" :class="{select_backgroundImage_active: active}">
      <p>
        <a>更换壁纸</a>
        <span class="el-icon-close" @click="active=false"></span>
      </p>
      <div class="main">
        <ul>
          <li v-for="img in localImage" :key="img.id" @click="changeBackgroundImage(img.id)">
            <a :class="{a_selected:backgroundImage_index===img.id}">
              <img :src="img.url">
              <i class="el-icon-circle-check"></i>
            </a>
          </li>
        </ul>
      </div>
      <el-upload
          class="upload-demo"
          :on-success="upload_success"
          action="upload/lac">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
  </div>
</template>

<script>
// :on-success="upload_success"
export default {
  name: "NavNew",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      //require是获取项目本地文件所需，获取放在服务器的不用。
      backgroundImage_index: 0,
      isRouterAlive: true,
      //本地图片
      localImage: [
        {id: 0,url: require('../static/bg1.jpg')},
        {id: 1, url: require('../static/picture/pic_2.jpg')},
        {id: 2, url: require('../static/picture/pic_1.jpg')},
        {id: 3, url: require('../static/picture/pic_3.jpg')},
        {id: 4, url: require('../static/picture/pic_4.jpg')},
        {id: 5, url: require('../static/picture/pic_5.jpg')},
      ],
      active: false,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
    changeBackgroundImage(id){
      this.backgroundImage_index=id;
    },
    upload_success(response){
      let i=this.localImage.length;
      this.localImage.push({id: i,url: response.img})
    }
  },
  computed: {
    backgroundImage(){
      return this.localImage[this.backgroundImage_index].url;
    }
  },
  mounted() {
    this.$bus.$on('chargeBackgroundImage',()=>{
      this.active=true;
    });
  }
}
</script>

<style lang="less" scoped>
@import "../css/navNew.less";
</style>
