import request, {getBlob} from './request'
import Vue from 'vue'

// 获取搜索内容信息
export const getMusicInfoApi = (params) => request.get(`cloudsearch?keywords=${params.keywords}&limit=${params.limit}&offset=${params.offset}&type=${params.type}`);
//获取音乐连接
export const playMusicApi = (params) => request.get(`song/url?id=${params.id}`);
//获取歌词
export const getLyricApi = (params) => request.get(`lyric?id=${params.id}`);
//获取歌曲信息
export const getdetailApi = (params) => request.get(`song/detail?ids=${params.id}`);
//获取热门评论
export const getcommentApi = (params) => request.get(`comment/hot?type=0&id=${params.id}`);
//MV
export const getMVApi = (params) => request.get(`mv/url?id=${params.id}`);
//获取歌单 ( 网友精选碟 )
export const getSheetList = (params) => request.get(`top/playlist?limit=${params.limit}&offset=${params.offset}&order=${params.order}&cat=${params.cat}`);
// 获取MV评论
export const getcommentMV = (params) => request.get(`/comment/mv?id=${params.id}&limit=${params.limit}&offset=${params.offset}`)
//推荐新音乐
export const getnewmusic = () => request.get(`/personalized/newsong`);
// 最新mv
export const getnewMV = () => request.get(`/mv/first`);
//热门电台
export const getradio = (params) => request.get(`/dj/hot?limit=${params.limit}&offset=${params.offset}`);
//电台节目详情
export const getRadioDetail = (params) => request.get(`/dj/program?rid=${params.id}&limit=${params.limit}&offset=${params.offset}&asc=${params.asc}`);
//下载歌曲
export const getsongurl = (params) => request.get(`/song/download/url?id=${params.id}`);
//歌单详情
export const getplaylist = (params) => request.get(`/playlist/detail?id=${params.id}`);
//歌单评论
export const getcomment = (params) => request.get(`/comment/playlist?id=${params.id}&limit=${params.limit}&offset=${params.offset}`)
//榜单
export const getlead = () => request.get("/toplist");
//歌手榜单
export const getsingerlis = (params) => request.get(`/toplist/artist?type=${params.type}`)
//获取歌手专辑
export const getsingerapi = (params)=>request.get(`artist/album?id=${params.id}&limit=${params.limit}&offset=${params.offset}`)
//获取全部mv
export const getAllMv= (params)=>request.get(`/mv/all?limit=${params.limit}&offset=${params.offset}`)
//获取最新专辑
export const getNewAlbum=()=>request.get(`/album/newest`)
//获取专辑中的详细信息
export const geAlbumDetail=(params)=>request.get(`/album?id=${params}`)
//获取mv详细内容
export const getMvDetail=(params)=>request.get(`/mv/detail?mvid=${params.id}`)
//获取歌手专辑评论
export const getAlbumComment=(params)=>request.get(`/comment/album?id=${params.id}&limit=${params.limit}&offset=${params.offset}`)
//推荐歌单
export const getPersonalized=()=>request.get(`/personalized?limit=20`)
//歌手详细信息
export const getSingerDetail=(params)=>request.get(`/artist/detail?id=${params}`)

export const lg=(params)=>request.get(`/login/cellphone?phone=${params.username}&password=${params.password}`);
/* 下载 */
export const downloadMusic = (musicUrl, fileName) => {

    getBlob(musicUrl)
        .then((res) => {
            let blob = res;
            let href = URL.createObjectURL(blob);
            // console.log(href);
            let a = document.createElement("a");
            a.href = href;
            a.download = fileName
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            Vue.prototype.$message.success(`${fileName} 创建下载成功`)
        })
        .catch((err) => {
            console.log(err);
            Vue.prototype.$message.$message.error('下载失败,请稍后重试!')
        });

}
