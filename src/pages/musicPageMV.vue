<template>
  <div class="MV">
    <h4>最新MV</h4>
    <div class="mvContain">
      <ul>
        <li v-for="mv in mvList" :key="mv.id" @click="goToPlay(mv.id)">
          <img :src="mv.cover">
          <p>{{mv.name}}</p>
        </li>
      </ul>
      <!--分页按钮-->
      <div class="pageBtn">
        <el-pagination small background
         v-if="count!==0" @current-change="handleCurrentChange"
         :current-page.sync="currentPage"
         layout="prev, pager, next"
         :page-size="24"
         :total="count">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {getAllMv} from "@/request/api";
export default {
  name: "musicPageMV",
  data(){
    return {
      count:0,
      currentPage:1,
      mvList:[],
    }
  },
  methods:{
    getMv(page){
      getAllMv({limit:24,offset:(page-1)*24}).then(res=>{
        this.count=res.data.count/24;
        this.mvList=res.data.data;
        // console.log(res.data);
      });
    },
    //分页
    handleCurrentChange: function (currentPage) {
      // console.log(`当前页: ${currentPage}`);
      this.currentPage = currentPage;
      // console.log(this.currentPage)
      this.getMv(currentPage);
    },
    goToPlay(id){
      this.$router.push({
        name:'playMV',
        query:{
          id:id,
        }
      });
    }
  },
  mounted() {
    this.getMv(1);
  }
}
</script>

<style scoped>
.MV{
  width: 100%;
  height: 100%;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.65);
}
.MV h4{
  padding: 0 10px;
  font-size: var(--word-size-big);
  border-left: 2px solid;
}
.mvContain{
  width: 100%;
  height: 390px;
}
.mvContain ul{
  width: 95%;
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: wrap;
}
.mvContain ul li{
  width: 185px;
  height: 105px;
  margin: 15px 10px;
  border-radius: 5px;
  transition: .4s;
}
.mvContain ul li img{
  transition: all 0.3s;
  width: 100%;
  height: 100%;
  margin-bottom: 3px;
  border-radius: 3px;
  flex-shrink: 0;
  object-fit: cover;
  border: 4px solid rgba(255, 255, 255, 0.2);
}
.mvContain ul li p{
  text-align: center;
}
.mvContain ul li img:hover{
  transform: scale(1.03);
  border-color: rgba(120, 117, 117, 0.2);
}
.pageBtn{
  width: 100%;
  margin: 10px 10px;
  float: left;
  height: 35px;
  /*background-color: aqua;*/
}
@media (max-width: 500px) {
  .mvContain ul{
    width: 100%;
  }
  .mvContain ul li{
    margin: 15px 5px;
    width: 150px;
    height: 85px;
  }
  .pageBtn{
    margin: 10px 0;
  }
}
</style>
