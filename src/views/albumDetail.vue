<template>
  <div class="albumDetail">
    <h4>专辑详情</h4>
    <div class="albumDetailTopImg">
      <div class="albumDetailImg">
        <img :src="albumPic">
      </div>
      <div class="albumDetailTitle">
        <p>{{albumName}}</p>
        <p>
          <a :style="{backgroundImage: 'url('+songerPic+')'}"></a>
          {{songer}}
        </p>
        <p>专辑ID: {{albumId}}</p>
        <p class="description">简介：{{albumDescription}}</p>
      </div>
    </div>
    <div class="albumDetailMusic">
      <p>
        <span>专辑</span>
        <span>播放次数：{{playCount}}</span>
      </p>
      <ul>
        <li class="del">
          <span class="mde">歌名</span>
          <span class="mde">歌手</span>
          <span class="mde">时长</span>
          <span class="mde">操作</span>
        </li>
        <li v-for="m in songList" :key="m.id">
          <span class="mde">
            {{m.name}}
             <i class="fa fa-caret-square-o-right" v-show="m.mv!==0" @click="playMv(m.mv)"></i>
          </span>
          <span class="mde">{{m.artist}}</span>
          <span class="mde">{{m.songTime}}</span>
          <div class="btn">
            <span class="el-icon-video-play" @click="toPlayMusic({id:m.id})"/>
            <span class="el-icon-download" @click="downLoadMusic(m.id)"/>
          </div>
        </li>
      </ul>
    </div>
    <div class="albumDetailComment">
      <p>歌单评论</p>
      <ul>
        <li v-for="com in AlbumComments" :key="com.commentId">
          <div class="comhead">
            <img :src="com.user.avatarUrl" alt="图片">
            <span>{{com.user.nickname}}</span>
          </div>
          <p>{{com.content}}</p>
          <div class="comfoot">
            <span>♡ {{com.likedCount}}</span>
            <span>{{com.timeStr}}</span>
          </div>
        </li>
      </ul>
      <!--分页按钮-->
      <div class="pageBtn">
        <el-pagination background
         v-if="CommentCount!==0" @current-change="getComment"
         :current-page.sync="CommentCurrent"
         layout="prev, pager, next, jumper"
         :page-size="24"
         :total="CommentCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {downloadMusic, geAlbumDetail, getAlbumComment, getdetailApi, getLyricApi, playMusicApi} from "@/request/api";

export default {
  name: "albumDetail",
  data(){
    return {
      //歌曲和简介
      albumDescription:'',
      albumName:'',
      albumPic:'',
      albumId:'',
      playCount:0,
      songer:'',
      songerPic:'',
      songList:[],
      songlrc:'',
      songUrl:null,
      //评论
      AlbumComments:'',
      CommentCount:0,
      CommentCurrent:1,
    }
  },
  methods:{
    getAlbumDetail(){
      geAlbumDetail(this.$route.query.id).then(res=>{
        let album=res.data.album;
        let song=res.data.songs[0];
        this.albumDescription=album.description;
        this.albumName=album.name;
        this.albumPic=album.picUrl;
        this.albumId=album.id;
        this.playCount=song.dt;
        this.songer=album.artist.name;
        this.songerPic=album.artist.picUrl;
        let songs=res.data.songs;
        for(let i=0;i<songs.length;i++){
          this.getAlbumSongDetail({id:songs[i].id});
        }
      });
    },
    //获取歌曲详情
    getAlbumSongDetail(params){
      getdetailApi(params).then(res=>{
        let min = parseInt(this.playCount / 1000 / 60);
        let sec = parseInt((this.playCount / 1000) % 60);
        if (min < 10) min = '0' + min;
        if (sec < 10) sec = '0' + sec;
        let songTime = min + ":" + sec;
        this.songList.push({
          name: res.data.songs[0].name,
          artist: res.data.songs[0].ar[0].name,
          id:params.id,
          songTime:songTime,
          mv:res.data.songs[0].mv,
        });
      })
    },
    //播放音乐
    //同步获取，保证歌词和url在取到之后才添加为播放。
    async toPlayMusic(params){
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
    playMv(id){
      this.$router.push({
        name:'playMV',
        query:{
          id:id,
        }
      });
    },
    //获取评论
    getComment(page){
      getAlbumComment({id:this.$route.query.id,limit:24,offset:(page-1)*24}).then(res=>{
        this.AlbumComments=res.data.comments;
        this.CommentCount=res.data.total;
      })
    },
    async downLoadMusic(params){
      //获取URL
      let res=await playMusicApi({id:params});
      //获取歌名
      let date=await getdetailApi({id:params});
      await downloadMusic(res.data.data[0].url,date.data.songs[0].name);
    },
  },
  created() {
    this.getAlbumDetail();
    this.getComment(1);
  }
}
</script>

<style lang="less" scoped>
@import "../css/albumDetail";
</style>
