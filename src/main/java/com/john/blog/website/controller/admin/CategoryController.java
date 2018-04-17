package com.john.blog.website.controller.admin;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.john.blog.website.constant.WebConst;
import com.john.blog.website.controller.BaseController;
import com.john.blog.website.dto.MetaDto;
import com.john.blog.website.dto.Types;
import com.john.blog.website.model.Bo.RestResponseBo;
import com.john.blog.website.service.IMetaService;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by john on 2018/4/17.
 */
@Controller
@RequestMapping("admin/category")
public class CategoryController extends BaseController {

    private static final Logger LOGGER = LoggerFactory.getLogger(CategoryController.class);

    @Resource
    private IMetaService metasService;

    @GetMapping(value = "")
    public String index(HttpServletRequest request) {
        List<MetaDto> categories = metasService.getMetaList(Types.CATEGORY.getType(), null, WebConst.MAX_POSTS);
        List<MetaDto> tags = metasService.getMetaList(Types.TAG.getType(), null, WebConst.MAX_POSTS);
        request.setAttribute("categories", categories);
        request.setAttribute("tags", tags);
        return "admin/category";
    }

    @PostMapping(value = "save")
    @ResponseBody
    public RestResponseBo saveCategory(@RequestParam String cname, @RequestParam Integer mid) {
        try {
            metasService.saveMeta(Types.CATEGORY.getType(), cname, mid);
        } catch (Exception e) {
            String msg = "分类保存失败";
            LOGGER.error(msg, e);
            return RestResponseBo.fail(msg);
        }
        return RestResponseBo.ok();
    }

    @RequestMapping(value = "delete")
    @ResponseBody
    public RestResponseBo delete(@RequestParam int mid) {
        try {
            metasService.delete(mid);
        } catch (Exception e) {
            String msg = "删除失败";
            LOGGER.error(msg, e);
            return RestResponseBo.fail(msg);
        }
        return RestResponseBo.ok();
    }

}
