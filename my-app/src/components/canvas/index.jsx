import React, { useState } from 'react';
import './style.css';
import Post from '../postit';

const Canvas = () => {
    const [post, setPost] = useState([]);
    let lastPostId = 0;
    const listItem = post.map((value) => <ListItem key={value.id} value={value}/>);
    function ListItem(props) {
        return <Post id={props.value.id} handleBlur ={(id,value) => change(id,value)} handleClick={(id) => lastPostId = id} value={props.value.defaultValue}/>;
    }
    const add = () => {
        setPost(state => [...state, {id:state.length, handleClick:(id) => lastPostId = id,defaultValue:""}])
    }
    const change = (id,value) => {
        if(value != post[id].defaultValue)
        setPost(state => {
            let array = [...state];
            array[id] = {...state[id],defaultValue:value}
            return array;
        })
    }
    const remove = () => {
        setPost((previous) => previous.filter(x => x.id !== lastPostId));
    }
    return (
        <div className='Canvas'>
            <button onClick={add}>Add</button>
            <button onClick={remove}>Remove</button>
            <ul id='List'>
                {listItem}
            </ul>
        </div>
    )
}


export default Canvas;