<template>
  <div class="blogPage clearfix">
    <ul>
      <li v-for="li in ul_li" :key="li.id">
        <a :href="li.href" target="_blank">
          <span>{{li.title}}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: "blogPage",
  data(){
    return {
      ul_li: [
        {id: 0, title: 'python安装', href: 'http://t.csdn.cn/V5qGk'},
      ],
    }
  },
  methods: {

  },
  mounted() {

  }
}
</script>

<style scoped>
.blogPage{
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
ul{
  margin-top: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: wrap;
}
a{
  position: relative;
  display: block;
  width: 200px;
  height: 100px;
  margin: 10px;
  text-decoration: none;
  color: var(--main-color);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 1px 1px 5px rgba(0, 0, 0, .5);
}
span{
  display: block;
  margin: 10px;
}
</style>
