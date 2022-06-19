<template>
  <div class="searchPage">
    <div class="search_main">
      <h1 class="search_time">{{ time }}</h1>
      <div class="search_bar">
        <input type="text" v-model="search_words" @keyup.enter="search"/>
        <span class="fa fa-search" @click="search"/>
      </div>
    </div>
    <div class="search_foot">
      <span class="fa fa-maxcdn mcn" :class="mcn" @click="isBrowser='isBrowser'; mcn='mcn-active';"></span>
      <div class="browser" :class="isBrowser">
        <div class="browser-title" >
          <span>搜索引擎</span>
          <span class="el-icon-close" @click="isBrowser='';mcn='';"></span>
        </div>
        <div class="bow-wap">
          <div class="bow" v-for="browser in browsers" :key="browser.cd" @click="charge_browser(browser.cd)" :style="{backgroundImage:'url('+browser.img+')'}">
            {{browser.name}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchPage",
  data(){
    return {
      search_words:'',
      browsers:[
        {cd: 0,url: 'https://cn.bing.com/search?q=',name: '必应',img: require('../static/bing.jpg')},
        {cd: 1,url: 'https://www.baidu.com/s?wd=',name: '百度',img: require('../static/baidu.jpg')},
        {cd: 2,url: 'https://www.sogou.com/web?query=',name: '搜狗',img: require('../static/sougou.jpg')},
      ],
      browsers_index: 0,
      isBrowser: '',
      mcn: '',
    }
  },
  methods:{
    search(){
      //href可以跳转并打开新的页签
      window.open(this.browsers[this.browsers_index].url+this.search_words,'_blank');
    },
    charge_browser(index){
      if(this.browsers_index===index)return;
      this.browsers_index=index;
      //调用element-ui的弹窗提示，真的好用
      this.$message({
        showClose: true,
        message: `成功切换为 ${this.browsers[index].name}`,
        type: 'success'
      });
      setTimeout(()=>{
        this.isBrowser='';
        this.mcn='';
      },800)
    },
  },
  computed: {
    time(){
      let myDate = new Date;
      // let year = myDate.getFullYear(); //获取当前年
      // let mon = myDate.getMonth() + 1; //获取当前月
      // let date = myDate.getDate(); //获取当前日
      let h = myDate.getHours();//获取当前小时数(0-23)
      let m = myDate.getMinutes();//获取当前分钟数(0-59)
      // let s = myDate.getSeconds();//获取当前秒
      // let week = myDate.getDay();
      // let weeks = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      if(h<10)h='0'+h;
      if(m<10)m='0'+m;
      return h + " : " + m;
    },
  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
@import "../css/searchPage.less";
</style>
