/* <![CDATA[ */

//页面加载完成通过ajax向后台获取audio数据
$(document).ready(function() {
	// 1:获取当前网址
	var curPath = window.document.location.href;
	// alert(curPath);
	// 2:获得主机地址之后的目录
	var pathName = window.document.location.pathname;
	// alert(pathName);
	var pos = curPath.indexOf(pathName);
	// alert(pos);
	// 3:获得主机地址
	var localhostPath = curPath.substring(0, pos);
	// alert(localhostPath);
	// 4：拼接ajax的url需要写的值
	var url = localhostPath + "/audios";
	// alert(url);

	// 5:向后台请求audios集合数据
	$.ajax({
		async : "false",// async必须设为false，不然获取不到audios的Json集合数据
		url : url,
		type : "GET",
		dataType : "json",
		success : function(data) {
			// alert(data);
			// alert(data[0].src);
			// 6:设audios为全局变量，以便playNext()函数使用
			audios = data;
			// 7：开始播放
			playStart(audios);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			/* 弹出jqXHR对象的信息 */
			alert(jqXHR.responseText);
			alert(jqXHR.status);
			alert(jqXHR.readyState);
			alert(jqXHR.statusText);
			/* 弹出其他两个参数的信息 */
			alert(textStatus);
			alert(errorThrown);
		}
	});
	// bgColor();

});

// 部分手机在加载页面时，如果有音、视频需要用户与浏览器有个交互过程才能播放
// 于是采用下面的方式，当用户随便点击页面一次时(该函数只会执行一次)，实现自动播放
$('html').one('touchstart', function() {
	var audio = document.getElementsByClassName("audio")[0];
	audio.play();
	// alert("hello");
});

// 给播放器添加背景色
function bgColor() {
	// 获取audio对象
	var audio = document.getElementsByClassName("audio")[0];
	// 设置背景色
	// audio.style.backgroundColor("#444444");
	var color = audio.style.backgroundColor;
	alert("color");
	alert(color);
}

// 开始播放歌曲
function playStart(audios) {

	// 1:获得audios的Json对象集合中第一首audio的src
	var srcFirst = audios[0].src;
	// alert(srcFirst);

	// 2:获取audios的对象集合的长度.变量前面不写var表示全局
	audioslength = audios.length;

	// 3:将第一首audio的src赋予当前播放歌曲的src
	$("audio").attr("src", srcFirst);

	// 测试 audios集合的长度
	// alert(audiosObj.length);

}

// 自动播放下一首歌曲
function playNext() {
	// 测试
	// alert(audiosObj.length);

	// 1：获取当前播放完的歌曲id,下一首即将要播放的歌曲在audios的对象那个集合中的index由此id加1得出
	var indexNext = parseInt($("audio").attr("id")) + 1;
	// alert(indexNext);

	// 2:设置下一首播放歌曲的src
	if (indexNext >= audioslength) {// 如果下一首要播放的歌曲的index已经越界
		// 从头开始播放
		$("audio").attr("id", "0");
		var srcFirst = audios[0].src;
		$("audio").attr("src", srcFirst);
	} else {// indexNex没有越界
		// 将当前播放歌曲的id改为indexNext
		$("audio").attr("id", indexNext);
		var srcNext = audios[indexNext].src;
		$("audio").attr("src", srcNext);

	}

}

function isHidden() {
	// 1:获取music类的属性hidden
	var isHidden = $(".audio").attr("hidden");
	// alert(isHidden);
	if (isHidden != "hidden") {// 如果播放器没隐藏
		// 2:给audio的div添加hidden属性
		$(".audio").attr("hidden", "hidden");
		// 3:给preImg的div添加hidden属性
		$(".preImg").attr("hidden", "hidden");
		// 4:给nextImg的div添加hidden属性
		$(".nextImg").attr("hidden", "hidden");
		// 5:将背景图的改为白色
		// alert($(".bg-musc").attr("src"));
		$(".bg-musc").attr("src", "/user/img/music/hidden.png");
		$(".preImg").attr("src", "/user/img/music/hidden.png");
		$(".nextImg").attr("src", "/user/img/music/hidden.png");
	} else {// 如果播放器隐藏了
		// 将audio的div属性hidden删除
		$(".audio").removeAttr("hidden");
		$(".preImg").removeAttr("hidden");
		$(".nextImg").removeAttr("hidden");
		// 将背景图的改为播放器背景
		$(".bg-musc").attr("src", "/user/img/music/bg-musc.png");
		$(".preImg").attr("src", "/user/img/music/previous.png");
		$(".nextImg").attr("src", "/user/img/music/next.png");
	}

}

function previous() {
	// alert("pre");
	// 1:获得audio元素对象 通过jquery获取的某些元素对象无法实现元素对象的某些方法 比如audio
	var audio = $(".audio");
	// alert(audio.attr("autoplay"));
	// 2:获得audio的id属性值，即为当前歌曲在audios集合中所属对象的index
	var indexCur = audio.attr("id");
	// alert(indexCur);
	// 3:播放上一首歌曲
	if (indexCur != 0) {// 当前歌曲不是第一首歌
		// alert("test")
		var indexPre = parseInt(indexCur) - 1;
		// alert(indexPre);
		// 1:获得上一首歌的src
		var srcPre = audios[indexPre].src;
		// alert(srcPre);
		// 2:暂停当前歌曲播放
		var audio = document.getElementsByClassName("audio")[0];
		audio.pause();
		// 3:将当前歌曲id改为上一首的
		var idPre = indexPre;
		audio.setAttribute("id", idPre);
		// 4:将当前src为上一首歌的src
		audio.setAttribute("src", srcPre);
		// 5:启动播放
		audio.play();
	} else {// 当前歌曲是第一首歌
		// alert("test");
		// 当前歌曲重新开始播放
		// 1：暂停当前歌曲播放
		// audio的某些方法与jQuery存在不兼容的现象。表现为利用jQuery的获取的Media类型元素无法执行这些方法，
		// 它们必须在用js原生的元素选择器方法(如document.getElementsByClassName())获取元素执行
		var audio = document.getElementsByClassName("audio")[0];
		// 2:将当前时间设为0
		audio.currentTime = 0;
		// 3:重新播放
		audio.play();
	}

}

function next() {
	// alert("next");
	// 1:获得audio元素对象 通过jquery获取的某些元素对象无法实现元素对象的某些方法 比如audio
	var audio = $(".audio");
	// alert(audio.attr("autoplay"));
	// 2:获得audio的id属性值，即为当前歌曲在audios集合中所属对象的index
	var indexCur = audio.attr("id");
	// alert(indexCur);
	// alert(audioslength);
	// 3:播放下一首歌曲
	if (indexCur < audioslength - 1) {// 当前歌曲不是最后首歌
		// alert("test")
		var indexNext = parseInt(indexCur) + 1;
		// alert(indexNext);
		// 1:获得下一首歌的src
		var srcNext = audios[indexNext].src;
		// alert(srcNext);
		// 2:暂停当前歌曲播放
		var audio = document.getElementsByClassName("audio")[0];
		audio.pause();
		// 3:将当前歌曲id改为下一首的
		var idNext = indexNext;
		audio.setAttribute("id", idNext);
		// 4：将当前src为下一首歌的src
		audio.setAttribute("src", srcNext);
		// 5：启动播放
		audio.play();
	} else {// 当前歌曲是最后一首歌
		// alert("test");
		// 当前歌曲重新开始播放
		// 1：暂停当前歌曲播放
		// audio的某些方法与jQuery存在不兼容的现象。表现为利用jQuery的获取的Media类型元素无法执行这些方法，
		// 它们必须在用js原生的元素选择器方法(如document.getElementsByClassName())获取元素执行
		var audio = document.getElementsByClassName("audio")[0];
		// 2:将当前时间设为0
		audio.currentTime = 0;
		// 3:重新播放
		audio.play();
	}

}

/* ]]> */
