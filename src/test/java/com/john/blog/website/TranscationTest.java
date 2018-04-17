package com.john.blog.website;

import org.junit.Ignore;
import org.junit.runner.RunWith;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import com.john.blog.website.exception.TipException;
import com.john.blog.website.model.Vo.UserVo;
import com.john.blog.website.service.IOptionService;
import com.john.blog.website.service.IUserService;

import javax.annotation.Resource;

/**
 * 测试数据库事务
 * Created by john on 2018/4/17.
 */
@MapperScan("com.john.blog.website.dao")
@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional(rollbackFor = TipException.class)
public class TranscationTest {

    @Resource
    private IUserService userService;

    @Resource
    private IOptionService optionService;

    @org.junit.Test
    @Ignore
    public void test() {
        UserVo user = new UserVo();
        user.setUsername("wangqiang111");
        user.setPassword("123456");
        user.setEmail("8888");
        userService.insertUser(user);
        optionService.insertOption("site_keywords", "qwqwq");
    }
}
