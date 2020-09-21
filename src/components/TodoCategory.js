import React from "react";
import styled from 'styled-components';
import {useTodoDispatch} from "../TodoContext";

const TodoCategoryBlock = styled.div`
  margin-right: 32px;
  margin-left: 32px;
  padding-top: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #343a40;
  text-align: right;
  
  label {
    margin: 0;
    font-size: 20px;
    color: #343a40;
    font-weight: bold;
  }
  select {
    padding: 6px;
    margin-left: 10px;
    font-size: 16px;
  }
`;

function TodoCategory() {
    const dispatch = useTodoDispatch();
    const onFilter = e => dispatch({
        type: 'FILTER',
        category: e.target.value,
    });
    return (
        <TodoCategoryBlock>
            <label>
                카테고리별로 보기:
                <select onChange={onFilter}>
                    <option value="">전체</option>
                    <option value="식사">식사</option>
                    <option value="식료품">식료품</option>
                    <option value="교통">교통</option>
                    <option value="생활">생활</option>
                    <option value="의료">의료</option>
                </select>
            </label>
        </TodoCategoryBlock>
    );
}

export default TodoCategory;