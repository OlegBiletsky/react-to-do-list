import React from 'react';

// {this.state.list.map((item) => (//для кожного айтема з ліста малюємо наступне
//     <ListItem
//         key={item.id}
//         data={item}
//         handleComplete={this.handleItemDone}
//         handleSave={this.handleEditItem}
//         handleDelete={this.handleDeleteItem}
//     />
// ))}
class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            text: props.data.text,
        };
    }

    render() {
        const {
            data: { id, completed, text },
            handleComplete:handleComplete,
            handleSave:handleSave,
            handleDelete:handleDelete
        } = this.props;

        const onEdit = () => {
            if (this.state.editing) {
                handleSave(id, this.state.text);
                this.setState({ editing: false });
                return;
            } else {
                this.setState({ editing: true });
            }
            
        };
      
        return (
            <li>
                {this.state.editing ? 
                    (<input
                    value={this.state.text}
                    onChange={(e) => this.setState({ text: e.target.value })}
                    />) 
                : 
                completed ? 
                (<strike>{text}</strike>) : 
                (text)}

                <button onClick={() => handleComplete(id)}>
                {completed ? "Ще виконую" : "Зроблено"}
                </button>

                <button onClick={() => handleDelete(id)}>Видалити</button>

                <button onClick={() => onEdit()}>
                {this.state.editing ? "Зберегти" : "Редагувати"}
                </button>
            </li>
        );
    }

}
export default ListItem;