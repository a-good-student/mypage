<template>
  <div class="aboutPage clearfix">
    <div class="about_wap">
      <div class="about_left">
        <div class="left_top">
          <div class="about_left_head">
            <a></a>
          </div>
          <div class="about_left_nav">
            <p>个人姓名</p>
            <p>记录学习和生活</p>
          </div>
          <div class="about_left_foot">
            <a class="fa fa-qq"></a>
            <a class="fa fa-weixin"></a>
            <a class="fa fa-weibo"></a>
            <a class="fa fa-phone"></a>
          </div>
        </div>
        <div class="left_bot">
          <el-calendar class="date"
              v-model="value">
          </el-calendar>
        </div>
      </div>
      <div class="about_right">
        <div class="about_right_head">
          <h3>个人技能</h3>
          <div class="wap">
            <div class="sign">
              <i class="fa fa-html5"></i>
              <div class="title">
                <p>HTML5</p>
              </div>
            </div>
            <div class="sign">
              <i class="fa fa-css3"></i>
              <div class="title">
                <p>CSS3</p>
              </div>
            </div>
            <div class="sign">
              <i class="fa fa-code"></i>
              <div class="title">
                <p>JavaScript</p>
              </div>
            </div>
          </div>
        </div>
        <div class="about_right_nav">
          <h3>作品展示</h3>
          <div class="wap">
            <div v-for="lean in learning" :key="lean.name" class="wap_o">
              <img :src="lean.url" @click="showImg(lean.id)">
              <p>{{lean.name}}</p>
            </div>
          </div>
        </div>
        <div class="about_right_foot" @click="show_img='';pImg='';" :class="show_img">
          <img :src="about_right_foot" :class="pImg">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import scrollReveal from 'scrollreveal';
export default {
  name: "aboutPage",
  data(){
    return {
      learning: [
        {id: 0,url: require('../static/learning/3D遮罩效果.png'),name: '3D遮罩效果.png'},
        {id: 1,url: require('../static/learning/仿网易云轮播.png'),name: '仿网易云轮播.png'},
        {id: 2,url: require('../static/learning/加载手风琴.png'),name: '加载手风琴.png'},
        {id: 3,url: require('../static/learning/宿舍系统主页.png'),name: '宿舍系统主页.png'},
        {id: 4,url: require('../static/learning/流体菜单.png'),name: '流体菜单.png'},
        {id: 5,url: require('../static/learning/炫彩圆环.png'),name: '炫彩圆环.png'},
      ],
      scrollReveal:scrollReveal(),
      value: new Date(),
      about_right_foot: '',
      show_img: '',
      pImg: '',
    }
  },
  methods: {
    showImg(id){
      this.pImg='pImg';
      this.show_img='show_img';
      this.about_right_foot=this.learning[id].url;
    }
  },
  mounted() {
    // this.scrollReveal.reveal('.wap_o', {
    //   // delay: 500,
    //   // useDelay: 'onload',
    //   // scale: 0.85,
    //   // reset: true,
    //   reset: true, // 滚动鼠标时，动画开关
    //   origin: 'left', // 动画开始的方向
    //   duration: 500, // 动画持续时间
    //   delay: 50, // 延迟
    //   rotate: {x: 0, y: 0, z: 0}, // 过度到0的初始角度
    //   opacity: 0, // 初始透明度
    //   scale: 0.9, //缩放
    //   // interval: 50,//执行间隔
    //   useDelay: 'onload',//延时执行方式
    //   // distance: '10px',//执行距离
    //   easing: 'ease', // 缓动'ease', 'ease-in-out'，'linear'...
    // });
  }
}
</script>

<style lang="less" scoped>
@import "../css/aboutPage";
</style>
