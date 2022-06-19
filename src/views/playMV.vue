<template>
  <div class="playMv">
    <div class="mvContain">
      <p>正在播放mv:</p>
      <video style="width:100%; height:100%;object-fit: fill;" controls autoplay :src="mvUrl"></video>
      <p :class="{isError:iserror}" style="color: lime">抱歉该视频由于版权原因，无法播放！</p>
      <div class="detail">
        <p>简介：{{mvDetail}}</p>
      </div>
    </div>
    <div class="comment">
      <p>MV评论</p>
      <ul>
        <li v-for="com in comments" :key="com.commentId">
          <div class="comhead">
            <img :src="com.user.avatarUrl">
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
         v-if="mvCount!==0" @current-change="getMvComment"
         :current-page.sync="mvCurrentPage"
         layout="prev, pager, next, jumper"
         :page-size="24"
         :total="mvCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {geAlbumDetail, getcommentMV, getMVApi, getMvDetail} from "@/request/api";

export default {
  name: "playMV",
  data(){
    return {
      //mv详情
      mvDetail:'好像什么也没有呢~',
      //mv播放次数
      dt:'',
      //mv播放url
      mvUrl:'',
      //mv评论
      mvId:'',
      mvCount: 0,
      mvCurrentPage: 1,
      comments:[],
      iserror:true,
    }
  },
  methods:{
    getMvDetail(){
      //接收路由跳转所传递的query参数id，这是这个专辑的详细信息的id
      geAlbumDetail(this.$route.query.id).then(res=>{
        this.mvDetail=res.data.album.description;
        this.dt=res.data.songs[0].dt;
        this.mvId=res.data.songs[0].mv;
        // console.log(res.data)
        //将其中得到的信息中的mv的id（res.data.songs[0].mv）传递给获取url的方法getMVApi
        this.getMVpi({id:(this.mvId)});
      });
    },
    //获取MV
    getMVpi(params){
      getMVApi(params).then(res=>{
        //获取到url
        // console.log(res.data);
        this.mvUrl=res.data.data.url;
        if(this.mvUrl===null){
          this.iserror=false;
        }else{//如果mv的url不为空，就获取详细信息并放入最近播放
          //再次判定，区别已经加入最近播放的
          if(this.$route.query.in===undefined){
            getMvDetail(params).then(res=>{
              // console.log(res.data);
              this.$store.commit("addMV", {
                name: res.data.data.name,
                artist: res.data.data.artistName,
                url: this.mvUrl,
                cover: res.data.data.cover,
                mv:params.id,
              });
            })
          }
        }
      });
      //获取评论
      this.getMvComment(1);
    },
    getMvComment(page){
      this.mvId=this.$route.query.id;
      getcommentMV({id:this.mvId,limit:24,offset:(page-1)*24}).then(res=>{
        this.comments=res.data.comments;
        if(page===1)this.mvCount=res.data.total;
        // console.log(res.data.comments);
      });
    }
  },
  mounted() {
    this.getMVpi({id:this.$route.query.id});
  },
}
</script>

<style scoped>
.playMv{
  width: 100%;
  height: 100%;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.65);
  /*overflow-y: scroll;*/
}
.playMv .mvContain{
  width: 95%;
  margin: 0 auto;
}
.playMv .mvContain p{
  margin-bottom: 10px;
}
.playMv .mvContain video{
  position: relative;
  margin-bottom: 20px;
  width: 600px;
  height: 337px;
  z-index: 998;
  border-radius: 5px;
  /*background-color: white;*/
}
.playMv .mvContain .detail{
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  background-color: rgba(121, 121, 121, 0.2);
}
.playMv .comment{
  width: 95%;
  margin: 0 auto;
}
.playMv .comment>p{
  margin: 15px 0;
}
.playMv .comment ul{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: wrap;
}
.playMv .comment ul li{
  width: 185px;
  height: 100px;
  margin: 0 7px 15px 7px;
  border-radius: 5px;
  overflow-y: scroll;
  transition: all 0.5s;
  background-color: rgba(0, 0, 0, 0.2);
}
.playMv .comment ul li .comhead img{
  width: 30px;
  margin: 5px 4px 0 5px;
  border-radius: 50%;
}
.playMv .comment ul li .comhead{
  display: flex;
  align-items: center;
}
.playMv .comment ul li .comhead span{
  color: #fff;
}
.playMv .comment ul li>p{
  margin: 4px;
}
.playMv .comment ul li .comfoot{
  display: flex;
  justify-content: space-between;
  margin: 5px;
}
.playMv .comment ul li:hover{
  box-shadow: 0 0 10px #fff;
  background-color: rgba(51, 51, 51, 0.5);
}
.playMv .comment ul li::-webkit-scrollbar{
  width : 0;  /*高宽分别对应横竖滚动条的尺寸*/
  height: 0;
  background: transparent;
}
.isError{
  position: absolute;
  display: none;
}
.playMv .comment .pageBtn{
  width: 100%;
  margin: 10px 5px;
  float: left;
  height: 35px;
  /*background-color: aqua;*/
}
video{
  width: 100%;
}
@media (max-width: 700px) {

}
</style>
