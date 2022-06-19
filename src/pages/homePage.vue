<template>
  <div class="homePage">
    <div class="word">
      <p>{{time}}</p>
      <p>{{words.word}}</p>
      <p>{{words.translate}}</p>
    </div>
    <div class="bot">
      <div class="bot-btn">
        <span class="el-icon-picture" @click="chargeBackgroundImage"></span>
        <span :class="fullscreen" class="full" @click="fullScreen"></span>
      </div>
      <div class="bot-title">
        <p>每日一图由 bing 提供 | Copyright © 2021~2022 FENG.SITE</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "homePage",
  data(){
    return {
      words:{
        word: '',
        translate: '',
      },
      fullscreen:'el-icon-full-screen',
    }
  },
  methods: {
    getWords(){
      axios.get('word/weapps/dailyquote/quote/').then(
        response=>{
          this.words.word=response.data.content;
          this.words.translate='——'+response.data.translation;
        }
      )
    },
    fullScreen(){
      if(document.documentElement.webkitRequestFullScreen){
        document.documentElement.webkitRequestFullScreen();
      }
      if(document.webkitExitFullscreen){
        document.webkitExitFullscreen();
      }
      if(this.fullscreen==='el-icon-full-screen')
        this.fullscreen='el-icon-close';
      else this.fullscreen='el-icon-full-screen';
    },
    //点击背景图片设置按钮在nav处打开
    chargeBackgroundImage(){
      this.$bus.$emit('chargeBackgroundImage');
    }
  },
  computed: {
    time(){
      let myDate = new Date;
      let year = myDate.getFullYear(); //获取当前年
      let mon = myDate.getMonth() + 1; //获取当前月
      let date = myDate.getDate(); //获取当前日
      // let h = myDate.getHours();//获取当前小时数(0-23)
      // let m = myDate.getMinutes();//获取当前分钟数(0-59)
      // let s = myDate.getSeconds();//获取当前秒
      let week = myDate.getDay();
      let weeks = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      if(mon<10)mon='0'+mon;
      if(date<10)date='0'+date;
      return year + "-" + mon + "-" + date + "   " + weeks[week];
    },
  },
  mounted() {
    this.getWords();
  }
}
</script>

<style scoped>
  .homePage{
    width: 100%;
    height: 100%;
  }
  .homePage .word{
    position: absolute;
    top: 50%;
    left: 50%;
    color: var(--main-color);
    z-index: var(--second-zIndex);
    transform: translate(-50%,-50%);
  }
  .homePage .word>p{
    font-family: var(--main-font-family);
  }
  .homePage .word>p:first-child{
    text-align: center;
    margin-bottom: 20px;
    font-size: var(--word-size-small);
  }
  .homePage .word>p:nth-child(2){
    margin-bottom: 10px;
    font-size: var(--word-size-big);
  }
  .homePage .word>p:last-child{
    text-align: right;
    font-size: var(--word-size-middle);
  }
  .bot{
    position: fixed;
    bottom: 0;
    right: 0;
    padding: 15px 30px;
    color: var(--main-color);
    z-index: var(--first-zIndex);
  }
  .bot-btn{
    display: flex;
    justify-content: right;
    align-items: center;
    margin-bottom: 10px;
  }
  .bot-btn span{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    margin-left: 15px;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
    font-size: var(--word-size-big);
    border: 2px solid var(--main-color);
    transition: .4s;
  }
  .bot-title p{
    font-size: var(--word-size-small);
  }
  .bot-btn span:hover{
    color: var(--bottom-color);
    border-color: var(--bottom-color);
  }
  @media (max-width: 500px) {
    .bot .bot-btn .full{
      display: none;
    }
  }
</style>
