import React from 'react'

class List extends React.Component {
    constructor() {
        super();
        this.state = {
            inputValue: "write some text",
            initialList: ["Vita", "Oleg", "Zirka", "Sasha"],
        }
        this.handleInputChange = this.handleInputChange.bind(this) 
        this.handleAddItemToList = this.handleAddItemToList.bind(this) 
        this.handleResetList = this.handleResetList.bind(this) 
        this.handleDeleteItem = this.handleDeleteItem.bind(this) 
    }



    handleInputChange(e) {
        return(
            this.setState({
                inputValue: e.target.value,
            })
        )
    }
    handleAddItemToList() {
        this.setState(
            state => {
                const newList = [...this.state.initialList, this.state.inputValue]
                return{
                    inputValue: "new",
                    initialList: newList,
                }
            }
        )
        
    }
    handleRenderList() {
        const list = this.state.initialList.map( 
                (i,index) => (
                    <li key={index}>
                        {i} 
                        <button id={index} onClick={this.handleDeleteItem}>Видалити</button> 
                    </li>
                )
        );
        return(
            list
        )
    }
    handleDeleteItem(e) {
        console.log(e.target.id);
        console.log(this.state.initialList);
        
        this.setState(
                state => {
                const newList = this.state.initialList.filter( (i,index) => index != e.target.id)
                console.log(newList);
                return{
                    inputValue: "hei",
                    initialList: newList,
                }
            }
        )
        
        
        
    }

    handleResetList() {
        this.setState({
            initialList: []
        })
    }


    render() {

        return(
            <>
                <button onClick={this.handleResetList}>Очистити все</button>            
                <input 
                    type='text'
                    value={this.state.inputValue}
                    onChange={this.handleInputChange}
                />
                <button onClick={this.handleAddItemToList}>Додати</button>
                {this.handleRenderList()}
            </>
        )
    }
}
export default List;