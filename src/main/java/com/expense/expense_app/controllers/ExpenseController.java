package com.expense.expense_app.controllers;

import com.expense.expense_app.models.Expense;
import com.expense.expense_app.models.User;
import com.expense.expense_app.repositories.ExpenseRepository;
import com.expense.expense_app.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Iterator;
import java.util.List;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping(path = "/api")
public class ExpenseController {

    private final ExpenseRepository expenseRepository;

    public ExpenseController(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    @PostMapping(path = "/expenses")
    public ResponseEntity<Expense> createUser(@RequestBody Expense expense){
        Expense result = expenseRepository.save(expense);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @PutMapping(path = "/expenses/{id}")
    public ResponseEntity<Expense> updateUser(@PathVariable Integer id, @RequestBody Expense expense){
        if(expenseRepository.findById(id).isPresent()){
            expense.setId(id);
            return new ResponseEntity<>(expenseRepository.save(expense),HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(path = "/expenses")
    public Iterable<Expense> getAllExpense(){
        return expenseRepository.findAll();
    }

    @DeleteMapping(path = "/expenses/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Integer id){
        expenseRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
