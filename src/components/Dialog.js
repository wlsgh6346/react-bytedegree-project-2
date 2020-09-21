import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from 'styled-components';
import Button from "./Button";

const fadeIn = keyframes`
from {
opacity: 0;
}
to {
opacity: 1;
}
`;

const fadeOut = keyframes`
from {
opacity: 1;
}
to {
opacity: 0;
}
`;

const slidUp = keyframes`
from {
transform: translateY(200px);
}
to {
transform: translateY(0px);
}
`;

const slidDown = keyframes`
from {
transform: translateY(0px);
}
to {
transform: translateY(200px);
}
`;

const DarkBackground = styled.div`

    background: rgba(0, 0, 0, 0.7);
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    animation-duration: 0.25s;
    animation-timing-function: ease-out;
    animation-name: ${fadeIn};
    animation-fill-mode: forwards;
    
    ${props => props.disappear && css`
      animation-name: ${fadeOut};
    `}
`;

const DialogBlock = styled.div`
    position: absolute;
    width: 360px;
    height: auto;
    padding: 1.5rem;
    background: white;
    border-radius: 2px;
    
    label {
    margin: 10px;
    font-size: 20px;
    color: #343a40;
    font-weight: bold;
    }
    
    input {
      margin-left: 10px;
      width: 90%;
      height: 1.5rem;
      margin-bottom: 20px;
    }
    
    select {
      margin-left: 10px;
      width: 90%;
      height: 2rem;
      margin-bottom: 20px;
    }
    
    h3 {
      margin: 0;
      font-size: 1.5rem;
    }
    
    p {
      font-size: 1.125rem;
    }
    
    animation-duration: 0.25s;
    animation-timing-function: ease-out;
    animation-name: ${slidUp};
    animation-fill-mode: forwards;
    
    ${props => props.disappear && css`
      animation-name: ${slidDown};
    `}
    
`;

const ButtonGroup = styled.div`
margin-top: 3rem;
display: flex;
justify-content: flex-end;
`;

const ShortMarginButton = styled(Button)`
    & + & {
      margin-left: 0.5rem;
    }
`;

function Dialog({
                    title,
                    children,
                    confirmText,
                    cancelText,
                    visible,
                    onConfirm,
                    onCancel,
                    config
                }) {
    const [animate, setAnimate] = useState(false);
    const [localVisible, setLocalVisible] = useState(visible);

    useEffect(() => {
        // visible true -> false
        if (localVisible && !visible) {
            setAnimate(true);
            setTimeout(() => setAnimate(false), 250)
        }
        setLocalVisible(visible);
    },[localVisible, visible])
    if (!localVisible && !animate) return null;
    return (
        <DarkBackground disappear={!visible}>
            <DialogBlock disappear={!visible}>
                <h3>{title}</h3>
                <p>{children}</p>
                {config==='REMOVE' && (
                    <ButtonGroup>
                        <ShortMarginButton color={'gray'} onClick={onCancel}>{cancelText}</ShortMarginButton>
                        <ShortMarginButton color={'pink'} onClick={onConfirm}>{confirmText}</ShortMarginButton>
                    </ButtonGroup>
                )}
                {config==='CREATE' && (
                    <ButtonGroup>
                        <ShortMarginButton color={'gray'} onClick={onCancel}>{cancelText}</ShortMarginButton>
                        <ShortMarginButton color={'blue'} onClick={onConfirm}>{confirmText}</ShortMarginButton>
                    </ButtonGroup>
                )}
                {config==='EDIT' && (
                    <>
                        <ButtonGroup>
                            <ShortMarginButton color={'gray'} onClick={onCancel}>{cancelText}</ShortMarginButton>
                            <ShortMarginButton color={'blue'} onClick={onConfirm}>{confirmText}</ShortMarginButton>
                        </ButtonGroup>
                    </>
                )}
            </DialogBlock>
        </DarkBackground>
    )
}

Dialog.defaultProps = {
    cancelText: '취소',
    confirmText: '등록'
}

export default Dialog;