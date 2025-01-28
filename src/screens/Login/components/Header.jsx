import { useState } from "react";
import styled from "styled-components";
import RegistroModal from "../../../modals/RegistroModal.jsx";
import LoginModal from "../../../modals/LoginModal.jsx";

const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    padding: 20px 40px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: calc(100% - 0px);
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    box-sizing: border-box;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 15px;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: rgba(255, 255, 255, 0.3);
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s, transform 0.2s;

    &:hover {
        background-color: rgba(255, 255, 255, 0.6);
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.95);
    }
`;

const Header = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isModalLoginOpen, setModalLoginOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const openModalLogin = () => setModalLoginOpen(true);
    const closeModalLogin = () => setModalLoginOpen(false);

    return (
        <>
            <HeaderContainer>
                <div>SP</div>
                <ButtonContainer>
                    <Button onClick={openModal}>Registro</Button>
                    <Button onClick={openModalLogin}>Ingreso</Button>
                </ButtonContainer>
            </HeaderContainer>
            <RegistroModal isOpen={isModalOpen} onClose={closeModal} />
            <LoginModal isOpen={isModalLoginOpen} onClose={closeModalLogin} />
        </>
    );
};

export default Header;