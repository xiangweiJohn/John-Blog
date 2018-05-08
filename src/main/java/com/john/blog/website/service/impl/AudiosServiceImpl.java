package com.john.blog.website.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.john.blog.website.dao.AudiosVoMapper;
import com.john.blog.website.model.Vo.AudiosVo;
import com.john.blog.website.model.Vo.AudiosVoExample;
import com.john.blog.website.service.IAudioService;

@Service
public class AudiosServiceImpl implements IAudioService {
	//日志
	private static final Logger LOGGER = LoggerFactory.getLogger(AudiosServiceImpl.class);
	
	@Resource
	 private AudiosVoMapper audioDao;
	
	@Override
	public List<AudiosVo> getAudios() {
		//获取全部歌曲
		AudiosVoExample audiosVoExample = new AudiosVoExample();
		//audiosVoExample.setOrderByClause("uid desc");
        List<AudiosVo> audios = audioDao.selectByExample(audiosVoExample);
		return audios;
	}

}
