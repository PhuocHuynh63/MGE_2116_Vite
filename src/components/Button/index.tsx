import { useEffect, useState } from "react";
import styled from "styled-components";

interface IButton {
    timeDelay: number;
    type?: "button" | "submit" | "reset";
    onClick: () => void;
    style?: React.CSSProperties;
}

const ButtonContainer = styled.button`
    padding: 0px 20px;
    width: 90%;
    height: 50px;
    font-size: 20px;
    font-weight: bold;
    background-color: #23A744;
    border: 1px solid #f5f5f5;
    border-radius: 5px;
    color: #ffffff;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
        background-color: rgb(37, 185, 74);
        color: #fff;
    }

    &:disabled {
        background-color: #ccc;
        color: #666;
        cursor: not-allowed;
    }
`
export const Button = ({ children, timeDelay, onClick, ...props }: IButton & { children: React.ReactNode }) => {

    /**
     * Disabled button after click
     */
    const [disabled, setDisabled] = useState<boolean>(false);
    useEffect(() => {
        if (disabled) {
            const timeout = setTimeout(() => {
                setDisabled(false);
            }, timeDelay);
            return () => clearTimeout(timeout);
        }
    }, [disabled, timeDelay]);

    const handleDisabled = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setDisabled(true);
        onClick();
    };
    //----------------------End----------------------//

    return (
        <ButtonContainer type={props.type} onClick={handleDisabled} disabled={disabled} {...props}>
            {children}
        </ButtonContainer>
    )
}
