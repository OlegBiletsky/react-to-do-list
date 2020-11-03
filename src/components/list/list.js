import React from 'react'
import ResetButton from './resetButton'
import AddButton from './addButton'
import InputField from './inputField'

class List extends React.Component {
    constructor() {
        super();
        this.state = {
            currentItem: {
                            text: "",
                            // id: "",
                            key:"",
                            completed: false,
                        },
            list: [],
        }
        this.handleInputChange = this.handleInputChange.bind(this) 
        this.handleAddItemToList = this.handleAddItemToList.bind(this) 
        this.handleResetList = this.handleResetList.bind(this) 
        this.handleDeleteItem = this.handleDeleteItem.bind(this) 
        // this.handleItemDone = this.handleItemDone.bind(this)
    }

    handleInputChange(e) {
            this.setState({
                    currentItem: {
                        text: e.target.value,
                        key: Date.now(),
                        completed: false,
                    }                    
            })
    }
    handleAddItemToList() {
        this.setState(
            state => {
                const newList = [...this.state.list, this.state.currentItem.text]
                return{
                    currentItem: {
                        text: "",
                        key:"",
                        completed: false,
                    },
                    list: newList,
                }
            }
        )
        
    }
    handleRenderList() {
        const visibleList = this.state.list.map( 
                (i,index) => {
                                <li key={index}>
                                {i} 
                                <button id={index} onClick={this.handleItemDone}>Зроблено</button> 
                                <button id={index} onClick={this.handleDeleteItem}>Видалити</button> 
                                </li>
                            }
                    )
        return(visibleList)
    }

    handleDeleteItem(e) {
        this.setState(
            state => {
            const newList = this.state.list.filter( (i,index) => index != e.target.id)
                return{
                    currentItem: {
                        text: e.target.value,
                        // id: "",
                        key:"",
                        completed: false,
                    },
                    list: newList,
                }
            }
        )
    }
    handleResetList() {
            this.setState({
                currentItem: {
                    text: "",
                    // id: "",
                    key:"",
                    completed: false,
                },
                list: [],
            })
    }
    


    render() {

        return(
            <>
                <ResetButton handleResetList={this.handleResetList} />   
                <InputField 
                    value={this.state.currentItem.text}
                    onChange={this.handleInputChange}
                />        
                <AddButton handleAddItemToList={this.handleAddItemToList} />

                {this.handleRenderList()}
            </>
        )
    }
}
export default List;