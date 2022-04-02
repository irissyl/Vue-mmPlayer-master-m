import $ from 'jquery'

let lyricArea = $("#lyrics"); // 歌词显示容器
let strlyric;
let strlastLyric;

// 在歌词区显示提示语（如歌词加载中、无歌词等）
function lyricTip(str) {
    lyricArea.html("<li class='lyric-tip'>" + str + "</li>"); // 显示内容
}

function lyricCallback(str) {
    // if (id !== musicList[rem.playlist].item[rem.playid].id) return; // 返回的歌词不是当前这首歌的，跳过

    strlyric = parseLyric(str); // 解析获取到的歌词

    if (strlyric === '') {
        lyricTip('没有歌词');
        return false;
    }

    lyricArea.html(''); // 清空歌词区域的内容
    lyricArea.scrollTop(0); // 滚动到顶部

    strlastLyric = -1;

    // 显示全部歌词
    let i = 0;

    for (let k in strlyric) {
        let txt = strlyric[k];
        if (!txt) txt = "&nbsp;";
        let li = $("<li data-no='" + i + "' class='lrc-item'>" + txt + "</li>");
        lyricArea.append(li);
        i++;
    }
}

// 强制刷新当前时间点的歌词
// 参数：当前播放时间（单位：秒）
function refreshLyric(time) {
    if (strlyric === '') return false;

    time = parseInt(time); // 时间取整
    let i = 0;
    for (let k in strlyric) {
        if (k >= time) break;
        i = k; // 记录上一句的
    }

    scrollLyric(i);
}

// 滚动歌词到指定句
// 参数：当前播放时间（单位：秒）
function scrollLyric(time) {
    if (strlyric === '') return false;

    time = parseInt(time); // 时间取整

    if (strlyric === undefined || strlyric[time] === undefined) return false; // 当前时间点没有歌词

    if (strlastLyric == time) return true; // 歌词没发生改变

    let i = 0; // 获取当前歌词是在第几行
    for (let k in strlyric) {
        if (k == time) break;
        i++;
    }
    strlastLyric = time; // 记录方便下次使用
    $(".lplaying").removeClass("lplaying"); // 移除其余句子的正在播放样式
    $(".lrc-item[data-no='" + i + "']").addClass("lplaying"); // 加上正在播放样式

    let scroll = (lyricArea.children().height() * i) - ($(".lyric").height() / 2);
    lyricArea.stop().animate({
        scrollTop: scroll
    }, 1000); // 平滑滚动到当前歌词位置(更改这个数值可以改变歌词滚动速度，单位：毫秒)

}

function parseLyric(lrc) {
    if (lrc === '') return '';
    let lyrics = lrc.split("\n");
    let lrcObj = {};
    for (let i = 0; i < lyrics.length; i++) {
        let lyric = decodeURIComponent(lyrics[i]);
        let timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
        let timeRegExpArr = lyric.match(timeReg);
        if (!timeRegExpArr) continue;
        let clause = lyric.replace(timeReg, '');
        for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
            let t = timeRegExpArr[k];
            let min = Number(String(t.match(/\[\d*/i)).slice(1)),
                sec = Number(String(t.match(/\:\d*/i)).slice(1));
            let time = min * 60 + sec;
            lrcObj[time] = clause;
        }
    }
    return lrcObj;
}
export default 'lyric'