<template>
  <div class="musicPageEveryday">
    <h4>每日推荐</h4>
    <div class="musicPageEveryday_head">
      <div class="music_wap">
        <div class="music_detail del">
          <span class="mde">歌名</span>
          <span class="mde">歌手</span>
          <span class="mde">时长</span>
          <span class="mde">操作</span>
        </div>
        <div class="music_detail" v-for="m in songSheetDetail" :key="m.id">
          <span class="mde">
            {{m.name}}
          </span>
          <span class="mde">{{m.ar[0].name}}</span>
          <span class="mde">{{m.dt}}</span>
          <div class="btn">
            <span class="el-icon-video-play" @click="play(m.id)"/>
            <span class="el-icon-download" @click="downLoadMusic(m.id)"/>
          </div>
        </div>
      </div>
    </div>
    <h4>热门歌单</h4>
    <div class="musicPageEveryday_nav">
      <ul class="songSheets">
        <li v-for="sheet in songSheets" :key="sheet.id">
          <a @click="toSheetDetail(sheet.id)">
            <img :src="sheet.picUrl">
            <span>{{sheet.name}}</span>
            <i class="el-icon-video-play"></i>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {downloadMusic, getdetailApi, getLyricApi, getPersonalized, getplaylist, playMusicApi} from "@/request/api";

export default {
  name: "musicPageEveryday",
  data() {
    return {
      //音乐相关
      //热门歌单
      songSheets:[],
      //获取其中一个歌单的详情
      songSheetDetail:[],
      //歌曲的url
      songUrl:null,
      //歌单总页数
      count:0,
      //当前页，初始值为1
      currentPage: 1,
      //歌词
      songlrc:'',
    }
  },
  methods:{
    //获取热门歌单的列表
    getSongSheets(){
      getPersonalized().then(res => {
        this.songSheets=res.data.result;
        //不需要每次都更新总页数total
        // this.count=res.data.total;
        // console.log(res.data);
      })
    },
    //获取歌单的详情,即歌单中所有的歌曲信息，但没有歌曲的url
    getSongList(params){
      getplaylist(params).then(res=>{
        this.songSheetDetail=res.data.playlist.tracks;
        //计算各个歌曲的长度
        for (let i = 0; i < this.songSheetDetail.length; i++) {
          let min = parseInt(this.songSheetDetail[i].dt / 1000 / 60);
          let sec = parseInt((this.songSheetDetail[i].dt / 1000) % 60);
          if (min < 10) min = '0' + min;
          if (sec < 10) sec = '0' + sec;
          this.songSheetDetail[i].dt = min + ":" + sec;
        }
        // this.getSongs({id:this.songSheetDetail[0].id});
      })
    },
    //同步获取音乐
    //获取歌单中的歌曲的详细信息，包含url
    async getSong(params){
      //获取歌词
      let res=await getLyricApi(params);
      this.songlrc = res.data.lrc.lyric;
      //获取歌曲url
      res=await playMusicApi(params);
      this.songUrl=res.data.data[0].url;
      //获取音乐详细信息，并添加到store的播放列表中
      res=await getdetailApi(params);
      if (this.songUrl !== null) {
        this.$store.commit("addSong", {
          name: res.data.songs[0].name,
          artist: res.data.songs[0].ar[0].name,
          url: this.songUrl,
          cover: res.data.songs[0].al.picUrl,
          lrc: this.songlrc,
          mv:res.data.songs[0].mv,
        });
        this.songUrl = null;
        this.songlrc = '';
        this.$bus.$emit('sendSinger',{
          id: res.data.songs[0].ar[0].id,
          name: res.data.songs[0].name,
          artist: res.data.songs[0].ar[0].name,
          pic: res.data.songs[0].al.picUrl}
        );
      }
      else{
        this.$message({
          showClose: true,
          message: res.data.songs[0].name+' 暂无版权，播放失败',
          type: 'error'
        });
      }
    },
    play(music){
      this.getSong({id:music});
    },
    //每日推荐
    getNewMusic(){
      this.getSongSheets();
      this.getSongList({id:'7044174061'});
    },
    //点击歌单路由跳转到详情页
    toSheetDetail(params){
      this.$router.push({
        name:'sheetDetail',
        query:{
          id:params,
        }
      });
    },
    async downLoadMusic(params){
      //获取URL
      let res=await playMusicApi({id:params});
      //获取歌名
      let date=await getdetailApi({id:params});
      await downloadMusic(res.data.data[0].url,date.data.songs[0].name);
    },
  },
  mounted() {
    //每日推荐
    this.getNewMusic();
  }
}
</script>

<style lang="less" scoped>
@import "../css/musicPageEveryday";
</style>
