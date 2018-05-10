package com.john.blog.website.service;

import java.util.List;

import com.john.blog.website.model.Vo.AudiosVo;

/*
 * 
 * Created by john on 2018/5/7.
 */

public interface IAudioService {
	/*
	 * 音频获取接口
	 */
	List<AudiosVo> getAudios();
}
