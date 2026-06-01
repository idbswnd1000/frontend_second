// TodoList.jsx

import React, { useContext } from 'react'
import TodoListChild from './TodoListChild'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const TodoList = () => {
  const {todoList} = useSelector(state=>state.todo);
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