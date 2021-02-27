import React from 'react';
import styled from 'styled-components/native'

import StarsRated from '../../components/StarsRated'

const Container = styled.TouchableOpacity`
     background-color: #FFF;
     margin-bottom: 20px;
     border-radius: 10px;
     padding: 15px;
     flex-direction: row;
`;

const Avatar = styled.Image`
    width: 88px;
    height: 88px;
    border-radius: 10px;
`;

const InfoBox = styled.View`
    margin-left: 20px;
    justify-content: space-between;
`;

const UserName = styled.Text`
    font-size: 17px;
    font-weight: bold;
`;

const ProfileButton = styled.View`
    width: 85px;
    height: 26px;
    border: 1px solid #6e0d25;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;

const ProfileButtonText = styled.Text`
    font-size: 13px;
    color: #6e0d25;
`;

const BarberList = ({ data }) => {
    return (
        <Container>
            <Avatar source={{ uri: data.avatar }} />
            <InfoBox>
                <UserName>{data.name}</UserName>

                <StarsRated stars={data.stars} showNumber={true}/>

                <ProfileButton>
                    <ProfileButtonText>Ver perfil</ProfileButtonText>
                </ProfileButton>

            </InfoBox>
        </Container>
    );
}

export default BarberList