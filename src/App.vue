<template>
  <div id="app">
    <HeadNew></HeadNew>
    <nav-new></nav-new>
    <FootNew></FootNew>
  </div>
</template>

<script>

import HeadNew from "@/components/HeadNew";
import NavNew from "@/components/NavNew";
import FootNew from "@/components/FootNew";
export default {
  name: 'App',
  components: {FootNew, NavNew, HeadNew},
}
</script>

<style>
/*所有默认设置*/
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style-type: none;
}
/*css全局变量*/
:root{
  --main-font-family: Comic Sans MS,PingFang SC,STHeitiSC-Light,Helvetica-Light,arial,sans-serif,serif;
  --main-color: #fff;
  --main-active-color: #CCC;
  --bottom-color: #F6b4a6;
  --background-color: #000;
  --search-border-color: #70ACC2;
  --search-word-color: #DC8C6B;
  --main-font-size: 14px;
  --first-zIndex: 999;
  --second-zIndex: 888;
  --third-zIndex: 1;
  --fourth-zIndex: 0;
  --word-size-small: 12px;
  --word-size-middle: 14px;
  --word-size-big: 18px;
  --main-weight: 800;
  --thin-weight: 200px;
}
body,html{
  width: 100%;
  height: 100vh;
  user-select: none;
  font-weight: 400;
  background-color: var(--background-color);
  font-family: var(--main-font-family);
  /*overflow-y: scroll;*/
}
/*解决外边距重叠和高度塌陷问题*/
.clearfix::before,
.clearfix::after{
  content: '';
  display: table;
  clear: both;
}
/*滚动条样式*/
::-webkit-scrollbar {
  width:.6rem;
  height: .6rem;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #1b2437
}
::-webkit-scrollbar:horizontal {
  border-radius: 0 0 .5rem .5rem
}
::-webkit-scrollbar-thumb {
  border-radius: .5rem;
  background-color: #374051;
  box-shadow: inset 0 0 0 1px #49556c;
  border: .1rem solid #1b2437
}
::-webkit-scrollbar-thumb:hover {
  background-color: #465267
}
@media (max-width: 500px) {
  ::-webkit-scrollbar{
    width: .1rem;
  }
}
</style>
