import React, {useState} from "react";
import styled, { ThemeProvider } from 'styled-components';
import { MdAdd } from 'react-icons/md';
import Dialog from "./Dialog";
import {useTodoDispatch, useTodoNextId} from "../TodoContext";

const palette = {
    blue: '#228be6',
    gray: '#496057',
    pink: '#f06595',
};

const CircleButton = styled.button`
  background: #009688;
  &:hover {
    background: #63e6be;
  }
  &:active {
    background: #20c997;
  }
  
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  position: absolute;
  left: 100%;
  bottom: 0px;
  transform: translate(-120%, -20%);

  font-size: 60px;
  color: white;
  border-radius: 40px;
  
  border: none;
  outline: none;
  transition: 0.125s all ease-in;
`;

function TodoCreate() {
    const [dialog, setDialog] = useState(false);
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('식사');
    const dispatch = useTodoDispatch();
    const nextId = useTodoNextId();
    const onChangeTitle = (e) => setTitle(e.target.value);
    const onChangeAmount = (e) => setAmount(e.target.value);
    const onChangeCategory = (e) => setCategory(e.target.value);
    const onClick =  () => {
        setDialog(true);
    };
    const onSubmit = e => {
        e.preventDefault();
        dispatch({
            type: 'CREATE',
            todo: {
                id: nextId.current,
                title: title,
                category: category,
                amount: Number(amount),
                done: true,
            }
        });
        setTitle('');
        setAmount(0);
        setCategory('식사')
        nextId.current += 1;
        setDialog(false);
    }

    const onCancel = () => {
        setDialog(false);
    };
    return (
        <>
            <CircleButton onClick={onClick}>
                <MdAdd />
            </CircleButton>
            <form>
                <ThemeProvider theme={{
                    palette
                }}>
                    <Dialog title={"지출 등록"}
                            confirmText={"등록"}
                            cancelText={"취소"}
                            visible={dialog}
                            onConfirm={onSubmit}
                            onCancel={onCancel}
                            config={'CREATE'}
                    >
                        <label>내용</label>
                        <input type="text" value={title} onChange={onChangeTitle}/>
                        <label>금액</label>
                        <input type="text" value={amount} onChange={onChangeAmount}/>
                        <label>카테고리</label>
                        <select value={category} onChange={onChangeCategory}>
                            <option value="식사">식사</option>
                            <option value="식료품">식료품</option>
                            <option value="교통">교통</option>
                            <option value="생활">생활</option>
                            <option value="의료">의료</option>
                        </select>
                    </Dialog>
                </ThemeProvider>
            </form>
        </>
    );
}

export default TodoCreate;