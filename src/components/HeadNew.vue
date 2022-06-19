<template>
  <div class="head">
    <div class="head-wap">
      <div class="small">
        <div class="small_title" :style="{visibility:vis ,opacity:op}">
          <a v-for="list in small_lists" :class="list.className" :key="list.cd" @click="routeJump(list.routeName,list.cd)">
            <i :class="list.i_class"></i>
            {{list.title}}
          </a>
        </div>
        <a :class="bar" @click="small_tog"></a>
      </div>
      <div class="small-logo">
        <img src="../static/logo.png" alt="Feng">
      </div>
      <div class="wap-left">
        <div id="logo">
          <img src="../static/logo.png" alt="Feng">
        </div>
        <a v-for="list in lists" :class="list.className" :key="list.cd" @click="routeJump(list.routeName,list.cd)">
          <i :class="list.i_class"></i>
            {{list.title}}
        </a>
        <div class="btn" :style="{left:btn_left}"></div>
      </div>
      <div class="wap-right">
        <a class="fa fa-github" href="https://github.com/"></a>
        <a class="fa el-icon-setting"></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeadNew",
  data(){
    return {
      bar:'fa fa-bars',
      list_index: 0,
      btn_left: '',
      lists: [
        {cd:0, className: ['list'], routeName: 'homePage', i_class: 'el-icon-s-home', title: '首页', left: '75px'},
        {cd:1, className: ['list'], routeName: 'blogPage', i_class: 'el-icon-copy-document', title: '博客', left: '149px'},
        {cd:2, className: ['list'], routeName: 'searchPage', i_class: 'el-icon-search', title: '搜索', left: '223px'},
        {cd:3, className: ['list'], routeName: 'musicPage', i_class: 'el-icon-headset', title: '音乐', left: '296.7px'},
        {cd:4, className: ['list'], routeName: 'picturePage', i_class: 'el-icon-picture-outline-round', title: '图片', left: '370.6px'},
        {cd:5, className: ['list'], routeName: 'aboutPage', i_class: 'el-icon-chat-line-round', title: '关于', left: '444.5px'},
      ],
      small_lists: [
        {cd:0, className: ['small_list'], routeName: 'homePage', i_class: 'el-icon-s-home', title: '首页'},
        {cd:1, className: ['small_list'], routeName: 'blogPage', i_class: 'el-icon-copy-document', title: '博客'},
        {cd:2, className: ['small_list'], routeName: 'searchPage', i_class: 'el-icon-search', title: '搜索'},
        {cd:3, className: ['small_list'], routeName: 'musicPage', i_class: 'el-icon-headset', title: '音乐'},
        {cd:4, className: ['small_list'], routeName: 'picturePage', i_class: 'el-icon-picture-outline-round', title: '图片'},
        {cd:5, className: ['small_list'], routeName: 'aboutPage', i_class: 'el-icon-chat-line-round', title: '关于'},
      ]
    }
  },
  methods:{
    init(){
      //保证index始终于当前页面的路由一致
      this.lists.forEach((e)=>{
        if(e.routeName===this.$route.name){
          this.list_index=e.cd;
        }
      })
    },
    small_tog(){
      if(this.bar==='fa fa-xing'){
        this.bar='fa fa-bars';
      }else {
        this.bar='fa fa-xing';
      }
    },
    routeJump(name,index){
      this.list_index=index;
      this.$router.push({
        name: name,
      })
    },
  },
  computed:{
    op(){
      if(this.bar==='fa fa-bars'){
        return 0;
      }
      else return 1;
    },
    vis(){
      if(this.bar==='fa fa-bars'){
        return 'hidden';
      }
      else return 'visible';
    }
  },
  watch: {
    list_index: {
      immediate:true,
      handler(newValue,oldValue){
        this.lists[newValue]['className']='list list-active';
        this.small_lists[newValue]['className']='small_list small-list-active';
        this.btn_left=this.lists[newValue]['left'];
        if(oldValue!==undefined){
          this.lists[oldValue]['className']='list';
          this.small_lists[oldValue]['className']='small_list';
        }
      }
    },
    $route:{
      immediate:true,
      handler(val){
        // console.log(val);
        this.lists.forEach((e)=>{
          if(e.routeName===val.name||e.routeName===val.query.realName){
            this.list_index=e.cd;
          }
        });
      },
      deep:true,
    },
  },
  mounted() {
    this.init();
  }
}
</script>

<style lang="less" scoped>
@import "../css/headNew";
</style>
