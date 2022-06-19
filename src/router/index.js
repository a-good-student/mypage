import VueRouter from 'vue-router'
import homePage from "@/pages/homePage";
import searchPage from "@/pages/searchPage";
import aboutPage from "@/pages/aboutPage";
import musicPage from "@/pages/musicPage";
import musicPageStore from "@/pages/musicPageStore";
import musicPageEveryday from "@/pages/musicPageEveryday";
import sheetDetail from "@/views/sheetDetail";
import musicPageRankingList from "@/pages/musicPageRankingList";
import musicPageSingerList from "@/pages/musicPageSingerList";
import playMV from "@/views/playMV";
import singerDetail from "@/views/singerDetail";
import albumDetail from "@/views/albumDetail";
import sheetPage from "@/pages/sheetPage";
import musicPageMV from "@/pages/musicPageMV";
import blogPage from "@/pages/blogPage";
import picturePage from "@/pages/picturePage";

//创建并暴露一个路由
export default new VueRouter({
    routes:[
        {//主页
            name: 'homePage',
            path: '/',
            component: homePage,
        },
        {//搜索
            name: 'searchPage',
            path: '/searchPage',
            component: searchPage,
        },
        {//关于
            name: 'aboutPage',
            path: '/aboutPage',
            component: aboutPage,
        },
        {//音乐
            name: 'musicPage',
            path: '/musicPage',
            component: musicPage,
            children: [
                {//每日推荐
                    name: 'musicPageEveryday',
                    path: 'musicPageEveryday',
                    component: musicPageEveryday,
                },
                {//乐库
                    name: 'musicPageStore',
                    path: 'musicPageStore',
                    component: musicPageStore,
                },
                {//歌单详情
                    name: 'sheetDetail',
                    path: 'sheetDetail',
                    component: sheetDetail,
                },
                {//排行榜
                    name: 'musicPageRankingList',
                    path: 'musicPageRankingList',
                    component: musicPageRankingList,
                },
                {//歌手列表
                    name: 'musicPageSingerList',
                    path: 'musicPageSingerList',
                    component: musicPageSingerList,
                },
                {//播放mv
                    name: 'playMV',
                    path: 'playMV',
                    component: playMV,
                },
                {//歌手详情
                    name: 'singerDetail',
                    path: 'singerDetail',
                    component: singerDetail,
                },
                {//专辑详情
                    name: 'albumDetail',
                    path: 'albumDetail',
                    component: albumDetail,
                },
                {//歌单
                    name: 'sheetPage',
                    path: 'sheetPage',
                    component: sheetPage,
                },
                {//最新MV
                    name: 'musicPageMV',
                    path: 'musicPageMV',
                    component: musicPageMV,
                }
            ],
        },
        {//博客
            name: 'blogPage',
            path: '/blogPage',
            component: blogPage,
        },
        {//图片
            name: 'picturePage',
            path: '/picturePage',
            component: picturePage,
        }
    ]
});
