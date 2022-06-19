<template>
  <div class="musicPageRankingList">
    <h4>所有榜单</h4>
    <ul class="main">
      <li v-for="rang in rankingList" :key="rang.id" @click="toSheepDetail(rang.id)">
        <img slot="placeholder" :src="rang.coverImgUrl">
        <p>{{rang.name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import {getlead} from "@/request/api";

export default {
  name: "musicPageRankingList",
  data(){
    return {
      rankingList:[],
    }
  },
  methods:{
    getRankingList(){
      getlead().then(res=>{
        this.rankingList=res.data.list;
        // console.log(res.data.list);
      });
    },
    changeRouter(path){
      this.$router.push({
        name:path,
      });
    },
    //点击歌单路由跳转到详情页
    toSheepDetail(params){
      this.$router.push({
        name:'sheetDetail',
        query:{
          id:params,
        }
      });
    },
  },
  mounted() {
    this.getRankingList();
  }
}
</script>

<style scoped>
.musicPageRankingList{
  width: 100%;
}
.musicPageRankingList h4{
  padding: 0 10px;
  color: var(--main-color);
  border-left: 2px solid;
}
.main{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: wrap;
}
.main li{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  margin: 10px;
}
.main li img{
  width: 150px;
  height: 150px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 5px;
  transition: .4s;
  border: 5px solid rgba(255, 255, 255, 0.2);
}
.main li img:hover{
  border-color: rgba(0, 0, 0, 0.2);
}
.main li p{
  color: var(--main-color);
  font-size: 13px;
}
</style>
