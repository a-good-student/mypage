<template>
  <aplayer :audio="audio" :lrcType="1" fixed ref="aplayer" @listAdd="handleEvent"></aplayer>
</template>

<script>
import Vue from 'vue';
import APlayer from '@moefe/vue-aplayer'
import {mapState} from 'vuex'
Vue.use(APlayer);
export default {
  name: "APlayer",
  computed:{
    ...mapState(['audio']),
  },
  methods: {
    handleEvent() {
      const aplayerApp = this.$refs.aplayer;
      const counson = this.$store.state.audio.length - 1;
      aplayerApp.switch(counson);
      aplayerApp.play();
    },
  },
  mounted() {
    //绑定最近播放的歌单的点击事件
    this.$bus.$on('ply',(data)=>{
      this.$refs.aplayer.switch(data);
      this.$refs.aplayer.play();
    })
  }
}
</script>

<style scoped>

</style>
