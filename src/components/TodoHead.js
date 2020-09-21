import React from "react";
import styled from 'styled-components';
import {useTodoState} from "../TodoContext";

const TodoHeadBlock = styled.div`
  margin-right: 32px;
  margin-left: 32px;
  padding-top: 48px;
  padding-bottom: 24px;
  border-bottom: 1px solid #343a40;
  
  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
    font-weight: bold;
  }
  
  .day {
    color: #343a40;
    font-size: 20px;
    font-weight: bold;
    margin-top: 16px;
  }
  
  .tasks-left {
    color: #343a40;
    font-size: 20px;
    margin-top: 16px;
    font-weight: bold;
  }
  
  b {
    color: red;
  }
`;

function TodoHead() {
    const todos = useTodoState();
    let total_amount = 0;
    todos.forEach(function(value, index, array) {
        total_amount += value.amount
    });
    const today = new Date();
    const dateString = today.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    return (
        <TodoHeadBlock>
            <h1 >오늘의 지출</h1>
            <div className={'day'}>{dateString}</div>
            <div className={'tasks-left'}>총 지출: <b>-{total_amount}원</b></div>
        </TodoHeadBlock>
    );
}

export default TodoHead;