package com.expense.expense_app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan("com.expense.expense_app.models")
public class ExpenseAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(ExpenseAppApplication.class, args);
	}

}
