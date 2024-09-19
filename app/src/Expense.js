import React, { Component } from 'react';
import AppNav from './AppNav';
import './App.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Container, Form, FormGroup, Input, Label, Table} from 'reactstrap';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

// babel engine convert jsx(javascript xml) to js



class Expense extends Component {

    emptyList = {
        id: '4',
        description: '',
        location: '',
        time: new Date(),
        amount: '',
        category: {id: 1, name:'Travel'}
    }

    constructor(props){
        super(props);
        this.state = { 
            date : new Date(),
            isLoading : true,
            Expenses:[],
            Categories: [],
            item: this.emptyList
         }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
    }

    async componentDidMount(){
        const categoryResponse = await fetch("/api/categories");
        const categoryBody = await categoryResponse.json();
        this.setState({Categories: categoryBody});

        const expenseResponse = await fetch("/api/expenses");
        const expenseBody = await expenseResponse.json();
        this.setState({Expenses: expenseBody, isLoading: false});
     }

     async remove(id){
        await fetch(`/api/expenses/${id}`, {
            method : 'DELETE',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        ).then(() =>{

            let updatedExpense = [...this.state.Expenses].filter(i => i.id !== id);
            this.setState({Expenses:updatedExpense});
        }
        );

     }


     async handleSubmit(event){
        const item = this.state.item;
        await fetch(`/api/expenses`, {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(item)
        });

        event.preventDefault();
        this.props.histroy.push('/expenses');
     }

     handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        console.log(value);
        console.log(name);
        item[name] = value;
        this.setState({item});
     }

     handleTimeChange(date){
        let item = {...this.state.item};
        item.time = date;
        this.setState({item});
     }

     handleCategoryChange(event){
        const target = event.target;
        const value = target.value;
        let item = {...this.state.item};
        console.log(value);
        item.category = JSON.parse(value)
        this.setState({item});
        console.log(item);
     }

    render() { 
        const title = <h2>Add Expense</h2>;
        const {Categories} = this.state;
        const {Expenses, isLoading} = this.state;
        if(isLoading)
            return <div>Loading...</div>

        let optionList = Categories.map(category => 
            <option value={JSON.stringify(category)} key={category.id} >
                {category.name}
            </option>
        )
        

        let expenseList = Expenses.map(expense => 
            <tr key={expense.id}>
                <td>{expense.description}</td>
                <td><Moment date={expense.time} format="DD/MM/YYYY"></Moment></td>
                <td>{expense.category.name}</td>
                <td>{expense.amount}</td>
                <td>{expense.location}</td>
                <td><Button color='danger' onClick={() => this.remove(expense.id)}>Delete</Button></td>
            </tr>
        )


        return (
        <div>
            <AppNav/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for='description'>Description</Label>
                        <Input type='description' name='description' id='description' onChange={this.handleChange}/>
                    </FormGroup>

                    <FormGroup>
                        <Label for='category'>Category</Label>
                        <select name="category" onChange={this.handleCategoryChange}>
                            {optionList}
                        </select>
                    </FormGroup>

                    <FormGroup>
                        <Label for='amount'>Amount</Label>
                        <Input type='number' name='amount' id='amount' onChange={this.handleChange}/>
                    </FormGroup>

                    <FormGroup>
                        <Label for='expenseDate'>Expense Date</Label>
                        <DatePicker selected={this.state.item.time} onChange={this.handleTimeChange}/>
                    </FormGroup>
                    
                    <div id="row">
                        <FormGroup className="col-md-3 mb-3">
                            <Label for='location'>Location</Label>
                            <Input type='text' name='location' id='location' onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                    <FormGroup>
                        <Button color='primary' type='submit'>Save</Button>{' '}
                        <Button color='secondary' tag={Link} to="/expenses">Cancel</Button>
                    </FormGroup>

                </Form>
            </Container>

            {' '}
            <Container>
                <h2>Expense List</h2>
                <Table className='mt-3'>
                    <thead>
                        <tr>
                            <th width="30%">Description</th>
                            <th width="20%">Date</th>
                            <th width="10%">Category</th>
                            <th width="10%">Amount</th>
                            <th width="15%">Location</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenseList}
                    </tbody>
                </Table>

            </Container>

            
        </div>
    );
    }
}
 
export default Expense;