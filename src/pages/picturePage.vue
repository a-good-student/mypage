<template>
  <div class="picturePage">
    <!--这个轮播是真难受-->
    <div class="picturePage_head">
      <ul :style="{width: head_ul_width+'px',transition: ul_transition+'s', left: head_left+'px'}" class="lunbo">
        <li v-for="img in head_img" :key="img.id" :style="{width: head_width+'px'}">
          <a>
            <img :src="img.url">
          </a>
        </li>
      </ul>
      <ul class="btn">
        <li v-for="l in head_img.length-2" :key="l" @click="jump(l)">
          <a :class="{a_active: l===head_img_index}"></a>
        </li>
      </ul>
      <div class="prev el-icon-arrow-left" @click="prev"></div>
      <div class="next el-icon-arrow-right" @click="next"></div>
    </div>
    <div class="picturePage_nav">
      <div class="myPic">
        <p>My Picture</p>
      </div>
      <ul>
        <li v-for="img in nav_img" :key="img.id" @click="showImg(img.id)">
          <a>
            <img :src="img.url">
          </a>
        </li>
      </ul>
      <div class="nav_cov" @click="show_img='';pImg='';" :class="show_img">
        <img :src="nav_cov" :class="pImg">
      </div>
    </div>
    <div class="picturePage_foot">
      <div class="contain">
        <h1>
          Welcome to my website!
        </h1>
        <p>如果有想法可以添加</p>
        <el-upload
            class="upload-demo"
            drag
            :on-success="upload_success"
            action="upload/lac"
            multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: "picturePage",
  data(){
    return {
      head_img:[
        {id: 0, url: require('../static/picture/pic_5.jpg')},//解决最后
        //中间的才是要展示的图1~5
        {id: 1, url: require('../static/picture/pic_2.jpg')},
        {id: 2, url: require('../static/picture/pic_1.jpg')},
        {id: 3, url: require('../static/picture/pic_3.jpg')},
        {id: 4, url: require('../static/picture/pic_4.jpg')},
        {id: 5, url: require('../static/picture/pic_5.jpg')},
        //解决开始
        {id: 6, url: require('../static/picture/pic_2.jpg')},
      ],
      //视口
      head_width: 0,
      head_img_index: 1,
      //整个轮播图的宽度
      head_ul_width: 0,
      //切图time
      head_timer: null,
      head_left: 0,
      //切图时图片运动的time
      head_run_timer: null,
      ul_transition: 0,
      nav_img: [
        {id: 0,url: require('../static/picture/play1.jpg')},
        {id: 1,url: require('../static/picture/play2.jpg')},
        {id: 2,url: require('../static/picture/play3.jpg')},
        {id: 3,url: require('../static/picture/play4.jpg')},
        {id: 4,url: require('../static/picture/play5.jpg')},
        {id: 5,url: require('../static/picture/play6.jpg')},
        {id: 6,url: require('../static/picture/play7.jpg')},
        {id: 7,url: require('../static/picture/play8.jpg')},
        {id: 8,url: require('../static/picture/play9.jpg')},
        {id: 9,url: require('../static/picture/play10.jpg')},
        {id: 10,url: require('../static/picture/play11.jpg')},
        {id: 11,url: require('../static/picture/play12.jpg')},
        {id: 12,url: require('../static/picture/play13.jpg')},
        {id: 13,url: require('../static/picture/play14.jpg')},
        {id: 14,url: require('../static/picture/play15.jpg')},
        {id: 15,url: require('../static/picture/play16.jpg')},
      ],
      nav_cov: '',
      show_img: '',
      pImg: '',
      //对prev和next操作进行上锁，防止出现连点造成bug
      prev_next: false,
    }
  },
  methods: {
    init(){
      //监听窗口变化，让轮播图适应
      $(window).resize(()=>{
        this.head_width = window.innerWidth;
      });
      //轮播运动
      this.move();
    },
    //切换图片index
    move(){
      clearInterval(this.head_timer);
      this.head_timer=setInterval(()=>{
        this.ul_transition=0;
        let oldValue=this.head_img_index;
        this.head_img_index++;
        this.head_img_index%=this.head_img.length;
        let newValue=this.head_img_index;
        this.dodo(newValue,oldValue);
        // console.log(this.head_img_index);
      },4000);
    },
    //切换后，图片运动
    dodo(newValue,oldValue){
      // console.log(newValue,oldValue);
      clearInterval(this.head_run_timer);
      this.ul_transition=0;
      let speed=(oldValue-newValue)*20;
      let end=-newValue*this.head_width;
      this.head_run_timer=setInterval(()=>{
        if((this.head_left>=end&&this.head_left+speed<=end)){
          this.head_left=end;
          if(newValue===this.head_img.length-1){
            this.head_left=-this.head_width;
            this.head_img_index=1;
          }
          clearInterval(this.head_run_timer);
          this.prev_next=false;
        }
        else if((this.head_left<=end&&this.head_left+speed>=end)){
          this.head_left=end;
          if(newValue===0){
            this.head_left=-this.head_width*(this.head_img.length-2);
            this.head_img_index=this.head_img.length-2;
          }
          clearInterval(this.head_run_timer);
          this.prev_next=false;
        }else this.head_left+=speed;
      },1);
    },
    //跳转
    jump(index){
      if(index===this.head_img_index)return ;
      clearInterval(this.head_timer);
      clearInterval(this.head_run_timer);
      // this.dodo(index,this.head_img_index);
      this.ul_transition=.5;
      this.head_left=-this.head_width*index;
      this.head_img_index=index;
      this.move();
    },
    //上一张
    prev(){
      if(this.prev_next)return;
      this.prev_next=true;
      clearInterval(this.head_timer);
      clearInterval(this.head_run_timer);
      let to=this.head_img_index-1;
      this.dodo(to,this.head_img_index);
      // console.log(to,this.head_img_index);
      this.head_img_index--;
      if(to<=0){
        this.head_img_index=this.head_img.length-2;
        this.head_left=-this.head_width;
      }
      this.move();
    },
    //下一张
    next(){
      if(this.prev_next)return;
      this.prev_next=true;
      clearInterval(this.head_timer);
      clearInterval(this.head_run_timer);
      let to=(this.head_img_index+1)%this.head_img.length;
      this.dodo(to,this.head_img_index);
      this.head_img_index=(this.head_img_index+1)%this.head_img.length;
      this.move();
    },
    showImg(id){
      this.pImg='pImg';
      this.show_img='show_img';
      this.nav_cov=this.nav_img[id].url;
    },
    upload_success(response){
      let i=this.nav_img.length;
      this.nav_img.push({id: i,url: response.img})
    },
  },
  watch: {
    //图片的大小
    head_width: {
      deep: true,
      immediate: true,
      handler(newValue){
        this.head_ul_width=this.head_img.length*newValue;
        this.head_left=-newValue;
      }
    },
    //ul的宽
    head_ul_width: {
      deep: true,
      immediate: true,
      handler(){
        this.head_width=window.innerWidth;
      }
    },
    //监听left，维护轮播图
    head_left: {
      deep: true,
      immediate: true,
      handler(newValue){
        if(Math.abs(newValue)>Math.abs(this.head_img.length*this.head_width)){
          console.log('asdasdasd');
          clearInterval(this.head_run_timer);
          clearInterval(this.head_timer);
          this.head_left=-this.head_width;
          this.head_img_index=1;
          this.move();
        }
      }
    }
  },
  created() {
    this.init();
  }
}
</script>

<style lang="less" scoped>
@import "../css/picturePage";
</style>
