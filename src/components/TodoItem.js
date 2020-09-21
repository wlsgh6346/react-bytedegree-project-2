import React, {useState} from "react";
import styled, {css, ThemeProvider} from 'styled-components';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import Dialog from "./Dialog";
import {useTodoDispatch} from "../TodoContext";

const palette = {
    blue: '#228be6',
    gray: '#496057',
    pink: '#f06595',
};

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #495057;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  & + & {
    margin-left: 8px;
  }
`;

const Category = styled.div`
  width: auto;
  height: 20px;
  border-radius: 8px;
  border: none;
  font-size: 18px;
  padding: 12px;
  
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  ${props => props.category==='식사' &&
    css`
      background: #ffeaa7;
    `}
  ${props => props.category==='식료품' &&
    css`
      background: #55efc4;
    `}
  ${props => props.category==='교통' &&
    css`
      background: #fab1a0;
    `}
  ${props => props.category==='생활' &&
    css`
      background: #a29bfe;
    `}
  ${props => props.category==='의료' &&
    css`
      background: #74b9ff;
    `}
`;

const Text = styled.div`
  flex: 1;
  font-size: 18px;
  display: flex;
  color: #495057;
  font-weight: bold;
  text-align: left;
  
  b {
    flex: 1;
    color: red;
    text-align: right;
    margin-right: 24px;
  }
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 6px;
`;

function TodoItem({id, category, title, amount}) {
    const [titleInput, setTitleInput] = useState(title);
    const [amountInput, setAmountInput] = useState(amount);
    const [categoryInput, setCategoryInput] = useState(category);
    const onChangeTitle = (e) => setTitleInput(e.target.value);
    const onChangeAmount = (e) => setAmountInput(e.target.value);
    const onChangeCategory = (e) => setCategoryInput(e.target.value);
    const [removeOpen, setRemoveOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const dispatch = useTodoDispatch();

    const onEditToggle = () => {
        setEditOpen(!editOpen);
    };
    const onRemoveToggle = () => {
        setRemoveOpen(!removeOpen);
    };
    const onRemove = () => {
        dispatch({
            type: "REMOVE",
            id
        });
        setRemoveOpen(false);
    };
    const onEdit = e => {
        e.preventDefault();
        dispatch({
            type: 'EDIT',
            todo: {
                id: id,
                title: titleInput,
                category: categoryInput,
                amount: Number(amountInput),
                done: true,
            }
        });
        setEditOpen(false);
    };
    const onCancel = () => {
        setEditOpen(false);
        setRemoveOpen(false);
    };

    return (
        <>
            <TodoItemBlock>
                <Category category={category}>{category}</Category>
                <Text>{title}<b>-{amount}원</b></Text>
                <Icon onClick={onEditToggle}><MdModeEdit /></Icon>
                <Icon onClick={onRemoveToggle}><MdDelete /></Icon>
            </TodoItemBlock>
            <ThemeProvider theme={{
                palette
            }}>
                <Dialog title={"정말 삭제하시겠습니까?"}
                        confirmText={"삭제"}
                        cancelText={"취소"}
                        visible={removeOpen}
                        onConfirm={onRemove}
                        onCancel={onCancel}
                        config={'REMOVE'}/>
                <form>
                    <Dialog title={"지출 수정"}
                            id={id}
                            confirmText={"수정"}
                            cancelText={"취소"}
                            visible={editOpen}
                            onConfirm={onEdit}
                            onCancel={onCancel}
                            config={'EDIT'}>
                        <label>내용</label>
                        <input type="text" value={titleInput} onChange={onChangeTitle}/>
                        <label>금액</label>
                        <input type="number" value={amountInput} onChange={onChangeAmount}/>
                        <label>카테고리</label>
                        <select value={categoryInput} onChange={onChangeCategory}>
                            <option value="식사">식사</option>
                            <option value="식료품">식료품</option>
                            <option value="교통">교통</option>
                            <option value="생활">생활</option>
                            <option value="의료">의료</option>
                        </select>
                    </Dialog>
                </form>
            </ThemeProvider>
        </>
    );
}

export default TodoItem;