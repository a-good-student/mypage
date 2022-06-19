<template>
  <div class="musicPageStore">
    <div v-for="store in stores" :key="store.id" :class="store.className" @click="routeJump(store.routeName)">
      <span>
        {{store.title}}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "musicPageStore",
  data(){
    return {
      stores: [
        {id: 0, title: '排行榜', routeName: 'musicPageRankingList',className: 'phb'},
        {id: 1, title: '歌手', routeName: 'musicPageSingerList',className: 'gs'},
        {id: 2, title: '分类', routeName: '',className: 'fl'},
      ],
    }
  },
  methods: {
    routeJump(name){
      this.$router.push({
        name: name,
      })
    },
  }
}
</script>

<style scoped>
.musicPageStore{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: wrap;
}
.musicPageStore>div{
  position: relative;
  border-radius: 10px;
  cursor: pointer;
  transition: .4s;
}
.musicPageStore>div:hover{
  transform: translateY(-10px);
}
.musicPageStore .phb{
  width: 400px;
  height: 200px;
  background: url("../static/phb.jpg") center center;
  background-size: cover;
}
.musicPageStore .gs{
  width: 200px;
  height: 200px;
  margin: 0 15px;
  background: url("../static/gs.jpg") center center;
  background-size: cover;
}
.musicPageStore .fl{
  width: 200px;
  height: 200px;
  background: url("../static/fl.jpg") center center;
  background-size: cover;
}
.musicPageStore>div>span{
  padding: 10px;
  color: orange;
  font-size: 24px;
  font-weight: bold;
}
@media (max-width: 1200px) {
  .musicPageStore{
    justify-content: space-between;
  }
  .musicPageStore .phb{
    width: 100%;
    margin-bottom: 10px;
  }
  .musicPageStore .gs, .musicPageStore .fl{
    width: 48%;
    margin: 0;
  }
}
</style>
