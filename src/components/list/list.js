import React from 'react'
import ResetButton from './resetButton'
import AddButton from './addButton'
import InputField from './inputField'

class List extends React.Component {
    constructor() {
        super();
        this.state = {
            inputValue: "write some text",
            initialList: ["Vita", "Oleg", "Zirka", "Sasha"],
            doneList: [],
        }
        this.handleInputChange = this.handleInputChange.bind(this) 
        this.handleAddItemToList = this.handleAddItemToList.bind(this) 
        this.handleResetList = this.handleResetList.bind(this) 
        this.handleDeleteItem = this.handleDeleteItem.bind(this) 
        this.handleItemDone = this.handleItemDone.bind(this)
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
                    inputValue: "",
                    initialList: newList,
                }
            }
        )
        
    }
    handleRenderList() {
        
        console.log(this.state.initialList)
        console.log(this.state.doneList)
        const list = this.state.initialList.map( 
                (i,index) =>  this.state.doneList.includes(i) ? (
                    <li key={index}>
                        {i} 
                        <button id={index} onClick={this.handleItemDone}>Продовжити</button> 
                        <button id={index} onClick={this.handleDeleteItem}>Видалити</button> 
                        </li>
                    ) : (
                        <li key={index}>
                        {i} 
                        <button id={index} onClick={this.handleItemDone}>Зроблено</button> 
                        <button id={index} onClick={this.handleDeleteItem}>Видалити</button> 
                        </li>
                    )
        );
        return(list)
    }
    handleItemDone(e) {
        this.setState(
            state => {
                const done = this.state.initialList.filter( (i,index) => index == e.target.id)
                console.log(done, 'done');
                
            return{doneList:done}
            }
        )
    }
    handleDeleteItem(e) {
        this.setState(
            state => {
            const newList = this.state.initialList.filter( (i,index) => index != e.target.id)
                return{
                    inputValue: this.state.inputValue,
                    initialList: newList,
                }
            }
        )
    }
    handleResetList() {
            this.setState({
                initialList: [],
                inputValue: "",
            })
    }
    


    render() {

        return(
            <>
                <ResetButton handleResetList={this.handleResetList} />   
                <InputField 
                    value={this.state.inputValue}
                    onChange={this.handleInputChange}
                />        
                
                <AddButton handleAddItemToList={this.handleAddItemToList} />
                {this.handleRenderList()}
            </>
        )
    }
}
export default List;