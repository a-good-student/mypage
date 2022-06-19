<template>
  <div class="musicPage clearfix">
    <div class="music">
      <div class="music_head">
        <div class="music_head_left">
          <div class="top">
            <a></a>
            <p>锋 的音乐空间</p>
          </div>
          <div class="middle">
            <div>
              <span>喜欢</span>
              <span>10</span>
            </div>
            <div>
              <span>数量</span>
              <span>21</span>
            </div>
            <div>
              <span>关注</span>
              <span>07</span>
            </div>
          </div>
          <div class="bottom">
            <button>
              <a></a>
              Follow Me 网易云音乐
            </button>
            <div>
              <a class="fa fa-github"></a>
              <a class="fa fa-qq"></a>
              <a class="fa fa-weixin"></a>
              <a class="fa"></a>
            </div>
          </div>
        </div>
        <div class="music_head_middle">
          <div v-for="img in imgs" class="musicImg" :key="img.id" :class="img.show">
            <a :style="{backgroundImage: 'url('+img.url+')'}" @mouseover="isStop(true)"
               @mouseleave="isStop(false)"></a>
          </div>
          <div class="btn">
            <a v-for="l in 5" :key="l" @click="nop(l-1)" :class="{pk:l-1===currentIndex}"></a>
          </div>
          <div class="prev el-icon-arrow-left" @click="prev"></div>
          <div class="next el-icon-arrow-right" @click="next"></div>
        </div>
        <div class="music_head_right" :style="{backgroundImage: 'url('+music_head_right+')'}">
          <div class="wops">
            <img :src="normal" :class="{img_rotateZ}">
          </div>
          <div class="bots">
            {{text}}
          </div>
        </div>
      </div>
      <div class="music_nav">
        <div class="music_nav_left">
          <h2>music with me</h2>
          <ul>
            <li v-for="li in music_with_me" :key="li.id" @click="routeJump(li.routeName,-1)">
              <a :class="li.class">
                {{li.title}}
              </a>
              <i class="el-icon-arrow-right"/>
            </li>
          </ul>
        </div>
        <div class="music_nav_middle">
          <div class="music_nav_middle_top">
            <ul>
              <li v-for="li in music_top" :key="li.id" @click="routeJump(li.routeName,li.id)">
                <a :class="li.className">{{li.title}}</a>
              </li>
            </ul>
            <div class="btn" :style="{left:btn_left}"></div>
          </div>
          <div class="music_nav_middle_nav">
            <router-view></router-view>
          </div>
        </div>
        <div class="music_nav_right"></div>
      </div>
      <div class="music_foot"></div>
    </div>
    <APlayer></APlayer>
  </div>
</template>

<script>

import APlayer from "@/pages/APlayer";
import {getSingerDetail} from "@/request/api";
// import $ from 'jquery';
export default {
  name: "musicPage",
  components: {APlayer},
  data(){
    return {
      img_rotateZ: false,
      currentIndex :0,//当前所在图片下标
      timer:null,//定时轮询
      imgs:[
        {id: 0,url:require('../static/music_play/play1.jpg'),show: 'show'},
        {id: 1,url:require('../static/music_play/play2.jpg'),show: ''},
        {id: 2,url:require('../static/music_play/play3.jpg'),show: ''},
        {id: 3,url:require('../static/music_play/play4.jpg'),show: ''},
        {id: 4,url:require('../static/music_play/play5.jpg'),show: ''},
      ],
      music_head_right: require('../static/Music.png'),
      normal: require('../static/logo.png'),
      text: '暂无音乐~~',
      dazi: null,
      music_top_index: 0,
      music_with_me: [
        {id: 0,title: '每日推荐',class:'el-icon-star-off',routeName:'musicPageEveryday'},
        {id: 1,title: '最近播放',class:'el-icon-time',routeName:''},
        {id: 2,title: '我的收藏',class:'fa fa-heart-o',routeName:''},
        {id: 3,title: '我的电台',class:'el-icon-wallet',routeName:''},
        {id: 4,title: '本地与下载',class:'fa fa-download',routeName:''},
        {id: 5,title: '默认列表',class:'el-icon-tickets',routeName:''},
      ],
      music_top: [
        {id: 0,title: '乐库', routeName: 'musicPageStore',className:'active',left:'48px'},
        {id: 1,title: '歌单', routeName: 'sheetPage',className:'',left:'110px'},
        {id: 2,title: 'MV', routeName: 'musicPageMV',className:'',left:'172px'},
        {id: 3,title: '电台', routeName: '',className:'',left:'227px'},
        {id: 4,title: '直播', routeName: '',className:'',left:'289px'},
      ],
    }
  },
  methods: {
    //开启定时器
    startInterval(){
      // 事件里定时器应该先清除在设置，防止多次点击直接生成多个定时器
      clearInterval(this.timer);
      this.timer = setInterval(()=>{
        // this.imgs[this.currentIndex].show='';
        this.currentIndex++;
        if(this.currentIndex > this.imgs.length-1){
          this.currentIndex = 0
        }
        // this.imgs[this.currentIndex].show='show';
      },5000);
    },
    next(){
      clearInterval(this.timer);
      this.currentIndex++;
      if(this.currentIndex > this.imgs.length-1){
        this.currentIndex = 0;
      }
      this.startInterval();
    },
    prev(){
      clearInterval(this.timer);
      this.currentIndex--;
      if(this.currentIndex < 0){
        this.currentIndex = 4;
      }
      this.startInterval();
    },
    nop(index){
      clearInterval(this.timer);
      this.currentIndex=index;
      this.startInterval();
    },
    isStop(bool){
      if(bool){
        clearInterval(this.timer);
      }
      else{
        this.startInterval();
      }
    },
    routeJump(name,index){
      if(index>=0) this.music_top_index=index;
      this.$router.push({
        name: name,
        query:{
          realName: 'musicPage',
        }
      })
    },
    getSinger(id){
      getSingerDetail(id).then(res=>{
        this.music_head_right=res.data.data.artist.cover;
      });
      this.img_rotateZ=true;
    },
  },
  computed:{
    btn_left(){
      return this.music_top[this.music_top_index].left;
    }
  },
  watch:{
    currentIndex:{
      // immediate:true,
      deep:true,
      handler(newValue,oldValue){
        this.imgs[oldValue].show='';
        this.imgs[newValue].show='show';
      }
    },
    music_top_index:{
      // immediate:true,
      deep:true,
      handler(newValue,oldValue){
        this.music_top[oldValue].className='';
        this.music_top[newValue].className='active';
      }
    },
    $route:{
      handler(val){
        this.music_top.forEach((e)=>{
          if(e.routeName===val.name){
            this.music_top_index=e.id;
          }
        });
      },
      deep:true,
    },
  },
  mounted() {
    this.startInterval();
    this.routeJump('musicPageEveryday',-1);
    //全局事件总线接收其他页面传递的歌手id
    this.$bus.$on('sendSinger',(data)=>{
      this.getSinger(data.id);
      this.text='正在播放：'+data.artist+'-'+data.name;
      this.normal=data.pic;
    });
  }
}
</script>

<style lang="less" scoped>
@import "../css/musicPage";
</style>
