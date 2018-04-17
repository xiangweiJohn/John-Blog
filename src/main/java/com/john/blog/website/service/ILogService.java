package com.john.blog.website.service;

import java.util.List;

import com.john.blog.website.model.Vo.LogVo;

/**
 * Created by john on 2018/4/17.
 */
public interface ILogService {

    /**
     * 保存操作日志
     *
     * @param logVo
     */
    void insertLog(LogVo logVo);

    /**
     *  保存
     * @param action
     * @param data
     * @param ip
     * @param authorId
     */
    void insertLog(String action, String data, String ip, Integer authorId);

    /**
     * 获取日志分页
     * @param page 当前页
     * @param limit 每页条数
     * @return 日志
     */
    List<LogVo> getLogs(int page,int limit);
}
