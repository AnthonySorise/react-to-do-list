import React, { useEffect, useRef, useState } from 'react';
import MessageBanner from './MessageBanner'
import ListItem from './ListItem'
import AddItem from './AddItem'
import '../Styles/_toDoList.css'

const ToDoList = props => {
    const [listItems, setListItems] = useState([]);
    const messageText = useRef("");

    useEffect(() => {
        if(localStorage.getItem("listItems")){
            setListItems(JSON.parse(localStorage.getItem("listItems")));
        }
    }, []);

    const handleAddItem = (newItem) => {
        messageText.current = "New task was successfully added!";
        let newListItems = [];
        for(let i = 0; i < listItems.length; i++){
            newListItems.push(listItems[i]);
        }
        newListItems.push(newItem);
        setListItems(newListItems);
        localStorage.setItem("listItems", JSON.stringify(newListItems));
    }
    const handleRemoveItem = (index) => {
        messageText.current = "Task was successfully removed!";
        let newListItems = [];
        for(let i = 0; i < listItems.length; i++){
            if(i != index){
                newListItems.push(listItems[i]);
            }
        }
        setListItems(newListItems);
        localStorage.setItem("listItems", JSON.stringify(newListItems));
    }

    return (
        <div className="toDoList">
            <MessageBanner text={messageText.current}></MessageBanner>
            <h1>To Do</h1>
            <table>
                <tbody>
                {listItems.map((item, i) =>
                    <ListItem key = {i} index = {i} text={item.text} dateTime={item.dateTime} handleRemoveItem={handleRemoveItem}/>
                )}
                </tbody>
            </table>
            <AddItem handleAddItem = {handleAddItem}></AddItem>
        </div>
    );
}
export default ToDoList;