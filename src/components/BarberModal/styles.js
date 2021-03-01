import styled from 'styled-components/native';

export const Modal = styled.Modal``;

export const Container = styled.View`
    flex: 1;
    background-color: rgba(0,0,0,0.5);
    justify-content: flex-end;
`;

export const ModalBox = styled.View`
    background-color: #6e0d25;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: 10px 20px 40px 20px;
`;

export const CloseButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
`;

export const ModalItem = styled.View`
    background-color: #FFF;
    border-radius: 10px;
    margin-bottom: 15px;
    padding: 10px;
`;

export const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const UserAvatar = styled.Image`
    width: 55px;
    height: 55px;
    border-radius: 20px;
    margin-right: 15px;
`;

export const UserName = styled.Text`
    color: #000;
    font-size: 18px;
    font-weight: bold;
`;

export const ServiceInfo = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const ServiceName = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

export const ServicePrice = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

export const ConfirmButton = styled.TouchableOpacity`
    background-color: #268596;
    height: 60px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;

export const ConfirmButtonText = styled.Text`
    color: #FFF;
    font-size: 18px;
    font-weight: bold;
`;