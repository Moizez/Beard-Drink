import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #6e0d25;
    opacity: 0.9;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
    padding: 20px;
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const HeaderTitle = styled.Text`
    font-size: 24px;
    color: #FFF;
    font-weight: bold;
    width: 250px;
`;

export const SearchButton = styled.TouchableOpacity`
    width: 26px;
    height: 26px;
`;

export const LocationBox = styled.View`
    background-color: #4eadbe;
    height: 60px;
    border-radius: 30px;
    flex-direction: row;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 30px;
`;

export const LocationInput = styled.TextInput`
    flex: 1;
    font-size: 16px;
    color: #FFF;
`;


export const LocationButton = styled.TouchableOpacity`
    width: 26px;
    height: 26px;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
`;


export const ListBox = styled.View`
margin-top: 30px;
margin-bottom: 30px;
`