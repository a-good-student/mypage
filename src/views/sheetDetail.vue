<template>
  <div class="sheetDetail">
    <h4>歌单详情</h4>
    <div class="sheetMain">
      <div class="sheetTopImg">
        <div class="sheetImg">
          <img :src="coverImgUrl">
        </div>
        <div class="sheetTitle">
          <p>{{sheetName}}</p>
          <p>
            <img :src="avatarUrl">
            {{nickname}}
          </p>
          <p>{{tags}}</p>
          <p class="description">{{description}}</p>
        </div>
      </div>
      <div class="sheetMusic">
        <p>
          <span>歌单</span>
          <span>播放次数：{{playCount}}</span>
        </p>
        <ul>
          <li class="del">
            <span class="mde">歌名</span>
            <span class="mde">歌手</span>
            <span class="mde">时长</span>
            <span class="mde">操作</span>
          </li>
          <li v-for="m in songSheetDetail" :key="m.id">
            <span class="mde">
<!--              <i class=""></i>-->
              {{m.name}}
              <i class="fa fa-caret-square-o-right" v-show="m.mv!==0" @click="goPlayMv(m.mv)"></i>
            </span>
            <span class="mde">{{m.ar[0].name}}</span>
            <span class="mde">{{m.dt}}</span>
            <div class="btn">
              <span class="el-icon-video-play" @click="play(m.id)"/>
              <span class="el-icon-download" @click="downLoadMusic(m.id)"/>
            </div>
          </li>
        </ul>
      </div>
      <div class="sheetComment">
        <p>歌单评论</p>
        <ul>
          <li v-for="com in sheetComments" :key="com.commentId">
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
           v-if="CommentCount!==0" @current-change="getPlaylistComment"
           :current-page.sync="CommentCurrent"
           layout="prev, pager, next, jumper"
           :page-size="24"
           :total="CommentCount">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {downloadMusic, getcomment, getdetailApi, getLyricApi, getplaylist, playMusicApi} from "@/request/api";
export default {
  name: "sheetDetail",
  data(){
    return {
      //获取其中一个歌单的详情
      songSheetDetail: [],
      //获取歌单songSheetDetail中的歌曲
      songList: [],
      //歌曲的url
      songUrl: null,
      //歌单名称
      sheetName:'',
      //歌单描述
      description: '',
      //歌单标签
      tags: '',
      //歌单照片的url
      coverImgUrl: '',
      //该歌单者的头像
      avatarUrl: '',
      //歌单者的昵称
      nickname: '',
      //歌单播放次数
      playCount: 0,
      sheetComments:[],
      CommentCurrent:1,
      CommentCount:0,
      songlrc:'',
    }
  },
  methods:{
    //this.$route.query.id 通过query参数id获取歌单的歌曲
    getNewMusic(){
      getplaylist({id: this.$route.query.id}).then(res=>{
        this.songSheetDetail=res.data.playlist.tracks;
        this.sheetName=res.data.playlist.name;
        this.description='简介：'+res.data.playlist.description;
        this.tags='标签：';
        res.data.playlist.tags.forEach((e)=>{
          this.tags+=' '+e;
        });
        this.coverImgUrl=res.data.playlist.coverImgUrl;
        this.avatarUrl=res.data.playlist.creator.avatarUrl;
        this.nickname=res.data.playlist.creator.nickname;
        this.playCount=res.data.playlist.playCount
        // console.log(res.data);
        //计算各个歌曲的长度
        for (let i = 0; i < this.songSheetDetail.length; i++) {
          let min = parseInt(this.songSheetDetail[i].dt / 1000 / 60);
          let sec = parseInt((this.songSheetDetail[i].dt / 1000) % 60);
          if (min < 10) min = '0' + min
          if (sec < 10) sec = '0' + sec
          this.songSheetDetail[i].dt = min + ":" + sec;
        }
      });
    },
    //获取歌单中的歌曲的详细信息，包含url
    async getSongs(params){
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
    //播放mv
    goPlayMv(id){
      this.$router.push({
        name:'playMV',
        query:{
          id:id,
          title:'MV',
        }
      });
    },
    play(music){
      this.getSongs({id:music});
    },
    //获取歌单评论
    getPlaylistComment(page){
      getcomment({id:this.$route.query.id,limit:24,offset:(page-1)*24}).then(res=>{
        this.sheetComments=res.data.comments;
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
  mounted() {
    //获取该歌单
    this.getNewMusic();
    //获取歌单评论
    this.getPlaylistComment(1);
  }
}
</script>

<style scoped>
.sheetDetail{
  width: 100%;
  height: 100%;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.65);
}
.sheetDetail h4{
  padding: 0 10px;
  color: var(--main-color);
  font-size: var(--word-size-big);
  border-left: 2px solid;
}
.sheetMain{
  width: 100%;
  /*height: 390px;*/
  /*overflow-y: scroll;*/
}
.sheetTopImg{
  width: 95%;
  margin: 10px auto;
  height: 150px;
  background-color: rgba(231, 228, 228, 0.1);
  display: flex;
  justify-content: left;
  align-items: center;
  border-radius: 8px;
}
.sheetTopImg .sheetImg{
  width: 140px;
  height: 144px;
  margin: 0 10px 0 5px;
  border-radius: 6px;
  overflow: hidden;
}
.sheetTopImg .sheetImg img{
  width: 100%;
  border-radius: 6px;
  /*height: 100%;*/
}
.sheetTopImg .sheetTitle{
  width: 60%;
  height: 138px;
  /*background-color: cornflowerblue;*/
}
.sheetTopImg .sheetTitle p{
  margin: 5px 0;
}
.sheetTopImg .sheetTitle p:nth-child(1){
  font-size: 14px;
  color: #fff;
}
.sheetTopImg .sheetTitle p:nth-child(2){
  display: flex;
  align-items: center;
}
.sheetTopImg .sheetTitle p img{
  width: 40px;
  /*height: 40px;*/
  margin-right: 5px;
  border-radius: 50%;
}
.sheetTopImg .sheetTitle p:last-child{
  height: 45px;
  padding: 5px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.3);
  overflow-y: scroll;
}
.sheetMusic{
  width: 95%;
  margin: 15px auto;
}
.sheetMusic p{
  display: flex;
  justify-content: space-between;
  color: var(--main-active-color);
  margin-bottom: 5px;
}
.sheetMusic ul{
  width: 100%;
  margin-top: 10px;
  /*background-color: rgba(51, 51, 51, 0.1);*/
  border-radius: 4px;
}
/*.Musicsheet*/
.sheetMusic ul li{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 10px;
  color: var(--main-color);
  /*background-color: white;*/
  border-radius: 5px;
  font-size: var(--word-size-small);
  transition: .4s;
}
.sheetMusic ul li .mde{
  display: block;
  height: 100%;
  overflow: hidden;
}
.sheetMusic ul li .mde{
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
.sheetMusic ul li .mde:nth-child(1){
  width: 150px;
  height: 20px;
}
.sheetMusic ul li .mde:nth-child(1) i{
  cursor: pointer;
  transition: .4s;
  color: var(--search-border-color);
}
.sheetMusic ul li .mde:nth-child(1) i:hover{
  color: var(--bottom-color);
}
.sheetMusic ul li .mde:nth-child(2){
  width: 100px;
  height: 20px;
}
.sheetMusic ul li .mde:nth-child(3){
  width: 40px;
  height: 20px;
}
.sheetMusic ul li .mde:nth-child(4){
  width: 40px;
  height: 20px;
  /*background-color: #F6b4a6;*/
}
.sheetMusic ul li .btn{
  width: 40px;
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: var(--word-size-big);
  /*background-color: #F6b4a6;*/
}
.sheetMusic ul li .btn span{
  transition: .4s;
  padding-right: 5px;
  cursor: pointer;
}
.sheetMusic ul li .btn span:hover{
  color: var(--bottom-color)
}
.sheetMusic ul li:not(:first-child):hover{
  background-color: rgba(0, 0, 0, 0.2);
}
.sheetMusic ul .del{
  background-color: transparent;
  color: var(--main-active-color);
  border: 0;
}

.sheetMain .sheetComment{
  width: 95%;
  margin: 0 auto;
}
.sheetMain .sheetComment>p{
  margin: 15px 0;
}
.sheetMain .sheetComment ul{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: wrap;
}
.sheetMain .sheetComment ul li{
  width: 185px;
  height: 100px;
  margin: 0 7px 15px 7px;
  border-radius: 5px;
  overflow-y: scroll;
  transition: all 0.5s;
  background-color: rgba(51, 51, 51, 0.3);
}
.sheetMain .sheetComment ul li .comhead img{
  width: 30px;
  margin: 5px 4px 0 5px;
  border-radius: 50%;
}
.sheetMain .sheetComment ul li .comhead{
  display: flex;
  align-items: center;
}
.sheetMain .sheetComment ul li .comhead span{
  color: #fff;
}
.sheetMain .sheetComment ul li>p{
  margin: 4px;
}
.sheetMain .sheetComment ul li .comfoot{
  display: flex;
  justify-content: space-between;
  margin: 5px;
}
.sheetMain .sheetComment ul li:hover{
  box-shadow: 0 0 10px #fff;
  background-color: rgba(51, 51, 51, 0.5);
}
.sheetMain .sheetComment .pageBtn{
  width: 100%;
  margin: 10px 5px;
  float: left;
  height: 35px;
  /*background-color: aqua;*/
}
.sheetTopImg .sheetTitle p:last-child::-webkit-scrollbar, .sheetMain .sheetComment ul li::-webkit-scrollbar {
  /*滚动条整体样式*/
  width : 0;  /*高宽分别对应横竖滚动条的尺寸*/
  height: 0;
  background: transparent;
}
@media (max-width: 1100px) {
  .sheetMain .sheetComment{
    display: none;
  }
}
@media (max-width: 900px) {
  .sheetTopImg .sheetTitle .description{
    display: none;
  }
}
</style>
