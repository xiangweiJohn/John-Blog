package com.john.blog.website;

import com.john.blog.website.model.Vo.UserVo;
import com.john.blog.website.utils.TaleUtils;

/**
 * Created by john on 2018/4/17.
 */
public class Pwdtest {
    public static void main(String args[]){
        UserVo user = new UserVo();
        user.setUsername("admin");
        user.setPassword("J9lew2irojE23");
        String encodePwd = TaleUtils.MD5encode(user.getUsername() + user.getPassword());
        System.out.println(encodePwd);
    }
}
