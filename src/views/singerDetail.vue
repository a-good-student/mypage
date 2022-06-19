<template>
  <div class="singerDetail">
    <h4>歌手详情</h4>
    <div class="singerDetailTop">
      <div class="singerDetailImg">
        <img :src="singer.picUrl">
      </div>
      <div class="singerDetailTitle">
        <p>{{singer.name}}</p>
        <p>
          <a :style="{backgroundImage: 'url('+singer.picUrl+')'}"></a>
          {{singer.name}}
        </p>
        <p>歌手ID：{{singer.id}}</p>
        <p class="description">简介：{{description}}</p>
      </div>
    </div>
    <div class="singerDetailBot">
      <p>专辑列表</p>
      <ul>
        <li v-for="al in albumList" :key="al.id" @click="goToDetail(al.id)">
          <img :src="al.picUrl">
          <p>{{al.name}}</p>
        </li>
      </ul>
      <div class="singerPageBtn">
        <a @click="changeSingerPage(-1)">上一页</a>
        <a @click="changeSingerPage(1)">下一页</a>
        <span>当前：{{albumCurrentPage}}/{{albumCount}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {getsingerapi} from "@/request/api";

export default {
  name: "singerDetail",
  data(){
    return {
      //歌曲的集合
      albumList:[],
      singer:'',
      currentPage:1,
      description:'',
      albumCount:0,
      albumCurrentPage:1,
    }
  },
  methods:{
    getSongMvList(page){
      //获取歌手的专辑，params中的参数是id,limit,offset
      getsingerapi({id:this.$route.query.id,limit:16,offset:(page-1)*16}).then(res=>{
        this.singer=res.data.artist;
        this.albumCount=parseInt(this.singer.albumSize/16);
        this.description=this.singer.alias[0];
        this.albumList=res.data.hotAlbums;
        //picUrl
      });
    },
    //改变当前歌曲的页数
    changeSingerPage(count){
      let p=this.albumCurrentPage+count;
      if(p>=1&&p<=this.albumCount){
        this.getSongMvList(p);
        this.albumCurrentPage+=count;
      }
    },
    goToDetail(id){
      this.$router.push({
        name:'albumDetail',
        query:{
          id:id,
        }
      });
    }
  },
  mounted() {
    this.getSongMvList(1);
  }
}
</script>

<style lang="less" scoped>
@import "../css/singerDetail";
</style>
