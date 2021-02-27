import React, { useContext } from 'react';
import styled from 'styled-components/native'

import HomeIcon from '../../assets/home.svg'
import SearchIcon from '../../assets/search.svg'
import TodayIcon from '../../assets/today.svg'
import FavoriteIcon from '../../assets/favorite.svg'
import ProfileIcon from '../../assets/account.svg'

import { UserContext } from '../../contexts/UserContext'

const TabBox = styled.View`
    height: 60px;
    background-color: #6e0d25;
    flex-direction: row;
`;

const TabItem = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const TabCenter = styled.TouchableOpacity`
    width: 70px;
    height: 70px;
    border-radius: 35px;
    justify-content: center;
    align-items: center;
    border: 3px solid #6e0d25;
    background-color: #FFF;
    margin-top: -20px;
`;

const Avatar = styled.Image`
    width: 25px;
    height: 25px;
    border-radius: 12.5px;
`;

const CustomTabBar = ({ state, navigation }) => {

    const { state: user } = useContext(UserContext)

    const goTo = (page) => {
        navigation.navigate(page)
    }

    return (
        <TabBox>
            <TabItem onPress={() => goTo('Home')}>
                <HomeIcon style={{ opacity: state.index === 0 ? 1 : 0.5 }} width='25' height='25' fill='#FFF' />
            </TabItem>
            <TabItem onPress={() => goTo('Search')}>
                <SearchIcon style={{ opacity: state.index === 1 ? 1 : 0.5 }} width='25' height='25' fill='#FFF' />
            </TabItem>
            <TabCenter onPress={() => goTo('Appointments')}>
                <TodayIcon width='33' height='33' fill='#6e0d25' />
            </TabCenter>
            <TabItem onPress={() => goTo('Favorites')}>
                <FavoriteIcon style={{ opacity: state.index === 3 ? 1 : 0.5 }} width='25' height='25' fill='#FFF' />
            </TabItem>
            <TabItem onPress={() => goTo('Profile')}>
                {user.avatar ?
                    <Avatar source={{ uri: user.avatar }} /> :
                    <ProfileIcon style={{ opacity: state.index === 4 ? 1 : 0.5 }} width='25' height='25' fill='#FFF' />
                }
            </TabItem>
        </TabBox>
    );
}

export default CustomTabBar