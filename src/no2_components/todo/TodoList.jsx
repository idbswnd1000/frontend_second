// TodoList.jsx

import React, { useEffect } from 'react'
import TodoListChild from './TodoListChild'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { todoAllGetSlice } from '../../no3_store/slices/todoSlice'

const TodoList = () => {
  const {todoList} = useSelector(state=>state.todo);
  const dispatch = useDispatch();
    useEffect (()=>{
      dispatch(todoAllGetSlice())
    },[dispatch, todoList])  
  return (
    <Container>
      {
        todoList?.map(item => (
          <TodoListChild
            key={item.id}
            item={item}
          />
        ))
      }
    </Container>
  )
}

export default TodoList

const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 14px;
`