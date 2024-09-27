package com.expense.expense_app.repositories;

import com.expense.expense_app.models.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface ExpenseRepository extends JpaRepository<Expense, Integer> {
}
