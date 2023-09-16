package com.project.bloomevents.Controller;

import com.project.bloomevents.DTO.CategoryDTO;
import com.project.bloomevents.Service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/category")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping("/get/allcategories")
    public ResponseEntity<?> getAllcategories(){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        List<CategoryDTO> categoryList = categoryService.getAllcategories();
        if (!categoryList.isEmpty()) {
            map.put("status", 1);
            map.put("data", categoryList);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Category list is not found");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @PostMapping("/addcategory")
    public ResponseEntity<?> addCategory(@RequestBody CategoryDTO categoryData){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        CategoryDTO addedCategory = categoryService.addCategory(categoryData);
        if (addedCategory!=null) {
            map.put("status", 1);
            map.put("data", addedCategory);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Category list is not found");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }
}
