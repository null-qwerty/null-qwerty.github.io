---
title: TestPage
date: 2024-01-12 00:28:25
tags:
sticky: -1
excerpt: 功能测试页面
---
## 音乐播放器

<script data-swup-reload-script type="text/javascript">
var meting_api='https://api.null-qwerty.work/Meting?server=:server&type=:type&id=:id&r=:r';
</script>
<meting-js
	server="netease"
	type="playlist"
	id="9138278379"
	list-folded=true>
</meting-js>

使用`APlayerJS`和`MetingJS`，需要对`APlayer`插件进行修改，使其支持夜间模式。  
笔者改的非常简单，修改颜色的 `alpha 值`，使其透明。  
另外把自建的`Meting API`放在这：[https://api.null-qwerty.work/Meting](https://api.null-qwerty.work/Meting)

## 视频播放器

### onedrive

<video controls width="100%">
    <source src="https://hdueducn-my.sharepoint.com/personal/22060817_hdu_edu_cn/_layouts/52/download.aspx?share=EXmk8SShiIBIriDJ_HT7b5gBW5FcTJ-AcwwcjHeDk8VWnw" type="video/mp4">
</video>

使用 `onedrive` 作为视频存储，获取直链后用`video`标签进行播放。

### github 视频床

<video id="video" controls loop="false" width="100%"></video>

<script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
<script data-swup-reload-script type="text/javascript">
  var video = document.getElementById('video');
  if(Hls.isSupported()) {
  var hls = new Hls();
  hls.loadSource('https://cdn.jsdelivr.net/gh/null-qwerty/videos@main/test/index.m3u8');
  hls.attachMedia(video);
} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
  video.src = 'https://cdn.jsdelivr.net/gh/null-qwerty/videos@main/test/index.m3u8';
}
</script>

使用`ffmpeg`将视频切片，每个片段最好不超过 20M。画质可能会有所下降，跟所设码率有关。  
使用`github`作为视频存储。  
使用`hls.js`播放`m3u8`格式的视频。  
~~cloudflare workers 要骂娘，请求次数巨高~~  
~~不仅白嫖`github`，还白嫖`cloudflare`，真香~~

