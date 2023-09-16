package com.project.bloomevents.Service;

import com.project.bloomevents.DTO.CategoryDTO;

import java.util.List;

public interface CategoryService {
    List<CategoryDTO> getAllcategories();

    CategoryDTO addCategory(CategoryDTO categoryData);
}
