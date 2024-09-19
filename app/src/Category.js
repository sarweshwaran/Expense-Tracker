import React, { Component } from 'react';
import AppNav from './AppNav';

class Category extends Component {
    state = {  
        isLoading: true,
        Categories: []
    } 
    async componentDidMount(){
        const response = await fetch('/api/categories');
        const body = await response.json();
        this.setState({Categories: body, isLoading: false});
    }
    render() {
        const {Categories, isLoading} = this.state;
        if(isLoading){
                return (
                    <div>Loading...</div>
                ) 
        }

        return (
            <div id="categories">
                <AppNav/>
                <h2>Categories</h2>
                {
                    Categories.map(category =>
                        <div key={category.id}>
                            {category.name}
                        </div>
                    )
                }
            </div>
        );
    }
}
 
export default Category;