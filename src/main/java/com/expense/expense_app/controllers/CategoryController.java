package com.expense.expense_app.controllers;

import com.expense.expense_app.models.Category;
import com.expense.expense_app.repositories.CategoryRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api")
public class CategoryController {

    private final CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @PostMapping(path = "/categories")
    public ResponseEntity<Category> createCategory(@RequestBody Category category){
        return new ResponseEntity<>(categoryRepository.save(category), HttpStatus.CREATED);
    }

    @GetMapping(path = "/categories")
    public Iterable<Category> getAllCategories(){
        return categoryRepository.findAll();
    }


    @DeleteMapping(path = "/categories/{id}")
    public void deleteCategory(@PathVariable Integer id){
        categoryRepository.deleteById(id);
    }
}
