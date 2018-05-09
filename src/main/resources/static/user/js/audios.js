/* <![CDATA[ */

$(document).ready(function() {

	// 1:获取当前网址
	var curPath = window.document.location.href;
	// alert(curPath);
	// 2：拼接ajax的url需要写的值
	var url = curPath + "audios";
	// alert(url);
	// 3:向后台请求audios集合数据
	$.ajax({
		async : "false",// async必须设为false，不然获取不到audios的Json集合数据
		url : url,
		type : "GET",
		dataType : "json",
		success : function(data) {
			// alert(data);
			// alert(data[0].src);
			// 4:设audios为全局变量，以便playNext()函数使用
			audios = data;
			// 5：开始播放
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

});

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

// 播放下一首歌曲
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
	// 获取music类的属性hidden
	var isHidden = $(".audio").attr("hidden");
	// alert(isHidden);
	if (isHidden != "hidden") {// 如果播放器没隐藏
		// 将播放器隐藏 动态添加hidden属性
		// alert("test");
		// 给audio的div添加hidden属性
		$(".audio").attr("hidden", "hidden");
		// 将背景图的改为白色
		// alert($(".bg-musc").attr("src"));
		$(".bg-musc").attr("src", "/user/img/music//hidden.png");
	} else {// 如果播放器隐藏了
		// 将播放器隐藏了 动态删除hidden属性
		// 将audio的div属性hidden删除
		$(".audio").removeAttr("hidden");
		// //将背景图的改为播放器背景
		$(".bg-musc").attr("src", "/user/img/music//bg-musc.png");
	}

}
/* ]]> */
