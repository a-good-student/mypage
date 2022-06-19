<template>
  <div class="musicPageSingerList">
    <h4>所有歌手</h4>
    <div class="conTop">
      <el-button type="primary" size="mini" round @click="getSingerList({type:1})">华语</el-button>
      <el-button type="primary" size="mini" round @click="getSingerList({type:2})">欧美</el-button>
      <el-button type="primary" size="mini" round @click="getSingerList({type:4})">日本</el-button>
      <el-button type="primary" size="mini" round @click="getSingerList({type:3})">韩国</el-button>
    </div>
    <ul class="main">
      <li v-for="singer in singerList" :key="singer.id">
        <a @click="singerDetail(singer.id)">
          <span :style="{backgroundImage: 'url('+singer.picUrl+')'}"></span>
        </a>
        <p>{{singer.name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import {getsingerlis} from "@/request/api";

export default {
  name: "musicPageSingerList",
  data(){
    return {
      singerList:[],
    }
  },
  methods:{
    getSingerList(params){
      getsingerlis(params).then(res=>{
        this.singerList=res.data.list.artists;
        // console.log(res.data.list.artists);
      });
    },
    singerDetail(id){
      this.$router.push({
        name:'singerDetail',
        query:{
          id:id,
        }
      });
    },
    changeRouter(name){
      this.$router.push({
        name:name,
      });
    },
  },
  mounted() {
    this.getSingerList({type:1});
  }
}
</script>

<style scoped>
.musicPageSingerList{
  width: 100%;
}
.musicPageSingerList h4{
  padding: 0 10px;
  color: var(--main-color);
  border-left: 2px solid;
}
.musicPageSingerList .conTop{
  margin: 10px 5px;
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
.main li span{
  display: block;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  cursor: pointer;
  margin-bottom: 5px;
  transition: .4s;
  background-repeat: no-repeat;
  background-size: 150px;
  background-position: center center;
  border: 5px solid rgba(255, 255, 255, 0.2);
}
.main li span:hover{
  border-color: rgba(0, 0, 0, 0.2);
}
.main li p{
  color: var(--main-color);
  font-size: 13px;
}
</style>
