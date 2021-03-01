import React from 'react';
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'

import CloseIcon from '../../assets/expand.svg'
import {
    Modal, Container, ModalBox, CloseButton, ModalItem, UserInfo, UserAvatar,
    UserName, ServiceInfo, ServiceName, ServicePrice, ConfirmButton, ConfirmButtonText
} from './styles'

const BarberModal = ({ show, setShow, user, service }) => {

    const navigation = useNavigation()

    const handleCloseModal = () => {
        setShow(false)
    }

    const handleConfirm = () =>{

    }

    return (
        <Modal
            transparent={true}
            visible={show}
            animationType='slide'
        >
            <Container>
                <ModalBox>
                    <CloseButton onPress={handleCloseModal}>
                        <CloseIcon width='40' height='40' fill='#FFF' />
                    </CloseButton>

                    <ModalItem>
                        <UserInfo>
                            <UserAvatar source={{ uri: user.avatar }} />
                            <UserName>{user.name}</UserName>
                        </UserInfo>
                    </ModalItem>

                    {service != null &&
                        <ModalItem>
                            <ServiceInfo>
                                <ServiceName>{user.services[service].name}</ServiceName>
                                <ServicePrice>R$ {user.services[service].price.toFixed(2)}</ServicePrice>
                            </ServiceInfo>
                        </ModalItem>
                    }

                    <ConfirmButton onPress={handleConfirm}>
                        <ConfirmButtonText>Finalizar Agendadmento</ConfirmButtonText>
                    </ConfirmButton>

                </ModalBox>
            </Container>

        </Modal>
    );
}

export default BarberModal