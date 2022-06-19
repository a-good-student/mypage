<template>
  <div class="sheetPage">
    <h4>所有歌单</h4>
    <div class="sheetTop">
      <el-button type="primary" size="mini" round @click="getSheetList(1,'华语')">华语</el-button>
      <el-button type="primary" size="mini" round @click="getSheetList(1,'古风')">古风</el-button>
      <el-button type="primary" size="mini" round @click="getSheetList(1,'欧美')">欧美</el-button>
      <el-button type="primary" size="mini" round @click="getSheetList(1,'流行')">流行</el-button>
    </div>
    <ul>
      <li v-for="sheet in sheetList" :key="sheet.id" @click="toSheetDetail(sheet.id)">
        <a>
          <img :src="sheet.coverImgUrl">
          <span>{{sheet.name}}</span>
          <i class="el-icon-video-play"></i>
        </a>
      </li>
    </ul>
    <!--分页按钮-->
    <div class="pageBtn">
      <el-pagination small background
       v-if="count!==0" @current-change="handleCurrentChange"
       :current-page.sync="currentPage"
       layout="prev, pager, next"
       :page-size="30"
       :total="count">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {getSheetList} from "@/request/api";

export default {
  name: "sheetPage",
  data(){
    return {
      sheetList: [],
      count: 0,
      currentPage: 1,
      type: '华语',
    }
  },
  methods: {
    getSheetList(page=1,type='华语'){
      this.type=type;
      getSheetList({limit:30,offset:(page-1)*30,order:'hot',cat: this.type}).then(res=>{
        this.sheetList=res.data.playlists;
        //因为limit是20,所以需要除以2
        this.count=res.data.total/3;
      });
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
    //分页
    handleCurrentChange: function (currentPage) {
      // console.log(`当前页: ${currentPage}`);
      this.currentPage = currentPage;
      // console.log(this.currentPage)
      this.getSheetList(currentPage,this.type);
    },
  },
  mounted() {
    this.getSheetList();
  }
}
</script>

<style scoped>
.sheetPage{
  width: 100%;
  font-size: var(--word-size-small);
  color: var(--main-color);
}
.sheetPage h4{
   padding: 0 10px;
   font-size: var(--word-size-big);
   border-left: 2px solid;
}
.sheetPage .sheetTop{
  margin: 10px 5px;
}
.sheetPage>ul{
  width: 95%;
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  flex-flow: wrap;
}
.sheetPage>ul li a{
  position: relative;
  transition: .4s;
  display: block;
  width: 150px;
  height: 150px;
  margin: 8px;
  cursor: pointer;
  overflow: hidden;
  border-radius: 5px;
}
.sheetPage>ul li a img{
  transition: .4s;
  border-radius: 5px;
  width: 100%;
}
.sheetPage>ul li a span{
  display: block;
  transition: 0.4s;
  position: absolute;
  top: 5px;
  left: 5px;
  width: 80%;
  font-size: var(--word-size-middle);
  color: rgba(255, 255, 255, 0);
  z-index: 999;
}
.sheetPage>ul li a i{
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  font-size: 35px;
  color: var(--main-color);
  transition: .4s;
  opacity: 0;
  transform: translate(-50%,-50%);
}
.sheetPage>ul li a:hover img{
  transform: scale(1.1);
}
.sheetPage>ul li a:hover span{
  color: var(--main-color);
}
.sheetPage>ul li a:hover i{
  opacity: 1;
}
.sheetPage>ul li a i:hover{
  color: var(--bottom-color);
}
.sheetPage .pageBtn{
  width: 100%;
  margin: 10px 5px;
  float: left;
  height: 35px;
  /*background-color: aqua;*/
}
@media (max-width: 500px) {

  .sheetPage .pageBtn{
    margin: 10px 0;
  }
}
</style>
