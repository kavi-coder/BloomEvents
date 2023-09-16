package com.project.bloomevents.ServiceImpl;

import com.project.bloomevents.DTO.CategoryDTO;
import com.project.bloomevents.Model.Category;
import com.project.bloomevents.Repository.CategoryRepository;
import com.project.bloomevents.Service.CategoryService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<CategoryDTO> getAllcategories() {
        try{
            List<Category> list = categoryRepository.findAll();
            return modelMapper.map(list, new TypeToken<List<CategoryDTO>>() {
            }.getType());
        }
        catch(Exception e){
            System.out.println(e.toString());
            return null;
        }
    }

    @Override
    public CategoryDTO addCategory(CategoryDTO categoryData) {
        try{
            Category c=modelMapper.map(categoryData,Category.class);
            Category savedCategory=categoryRepository.save(c);
            return modelMapper.map(savedCategory, new TypeToken<CategoryDTO>() {
            }.getType());
        }
        catch(Exception e){
            System.out.println(e.toString());
            return null;
        }
    }
}
