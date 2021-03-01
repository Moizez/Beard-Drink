import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #6e0d25;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
`;

export const SwipeDot = styled.View`
    width: 10px;
    height: 10px;
    background-color: #FFF;
    border-radius: 5px;
    margin: 3px;
`;

export const SwipeDotActive = styled.View`
    width: 10px;
    height: 10px;
    background-color: #6e0d25;
    border-radius: 5px;
    margin: 3px;
`;

export const SwipeItem = styled.View`
    flex: 1;
    background-color: #FFF;
`;

export const SwipeImage = styled.Image`
    width: 100%;
    height: 240px;
`;

export const FakeSwiper = styled.View`
    width: 100%;
    height: 100px;
    background-color: #FFF;
`;

export const PageBox = styled.View`
    background-color: #6e0d25;
    border-top-left-radius: 50px;
    margin-top: -50px;
    min-height: 400px;
`;

export const UserInfoBox = styled.View`
    flex-direction: row;
    margin-top: -30px;
`;

export const UserAvatar = styled.Image`
    width: 110px;
    height: 110px;
    margin-left: 30px;
    margin-right: 20px;
    border-radius: 20px;
    border-width: 4px;
    border-color: #FFF;

`;

export const UserInfo = styled.View`
    flex: 1;
    justify-content: flex-end;
`;

export const UserInfoName = styled.Text`
    color: #FFF;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
`;

export const UserFavButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    background-color: #FFF;
    border: 2px solid #6e0d25;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    margin-left: 20px;
    margin-top: 15px;
`;

export const BackButton = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
`;

export const ServiceBox = styled.View`
    margin-top: 30px;
`;

export const ServiceInfo = styled.View`
    flex: 1;
`;
export const ServiceItem = styled.View`
    flex-direction: row;
    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 20px;
    padding: 10px 10px;
    border-radius: 10px;
    background-color: rgba(0,0,0,0.1);
`;

export const ServiceName = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #FFF;
`;

export const ServiceTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    margin-left: 30px;
    margin-bottom:20px;
    color: #FFF;
`;

export const ServicePrice = styled.Text`
    font-size: 14px;
    color: #FFF;
`;
export const ServiceButton = styled.TouchableOpacity`
    background-color: #FFF;
    border-radius: 10px;
    padding: 10px 15px;
`;

export const ServiceButtonText = styled.Text`
    font-size: 14px;
    color: #6e0d25;
`;

export const CommentBox = styled.View`
    margin-top: 30px;
    margin-bottom: 50px;
`;

export const CommentItem = styled.View`
    background-color: #FFF;
    padding: 15px;
    border-radius: 10px;
    height: 110px;
    justify-content: center;
    margin-left: 50px;
    margin-right: 50px;
`;

export const CommentInfo = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 5px;
`;

export const CommentName = styled.Text`
    color: #000;
    font-size: 14px;
    font-weight: bold;
`;

export const CommentBody = styled.Text`
    color: #000;
    font-size: 13px;
`;

