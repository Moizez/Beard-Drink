import React, { useState } from 'react';
import { Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { request, PERMISSIONS } from 'react-native-permissions'
import Geolocation from '@react-native-community/geolocation'

import SearchIcon from '../../assets/search.svg'
import LocationIcon from '../../assets/my_location.svg'

import {
    Container, Scroller, Header, HeaderTitle, SearchButton, LocationBox,
    LocationInput, LocationButton, LoadingIcon
} from './styles'

const Home = () => {

    const navigation = useNavigation()
    const [locationText, setLocationText] = useState('')
    const [coords, setCoords] = useState(null)
    const [loading, setLoading] = useState(false)
    const [barberList, setBarberList] = useState([])

    const handleLocation = async () => {
        setCoords(null)
        let result = await request(
            Platform.OS === 'ios' ?
                PERMISSIONS.IOS.LOCATION_WHEN_IN_USE :
                PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        )
        if (result === 'granted') {
            setLoading(true)
            setLocationText('')
            setBarberList([])

            Geolocation.getCurrentPosition((info) => {
                setCoords(info.coords)
                getBarbers()
            })
        }

    }

    const getBarbers = async () => {
        
    }

    return (
        <Container>
            <Scroller>
                <Header>
                    <HeaderTitle numberOfLines={2}>Encontre seu barbeiro favorito</HeaderTitle>
                    <SearchButton onPress={() => navigation.navigate('Search')}>
                        <SearchIcon width='26' height='26' fill='#FFF' />
                    </SearchButton>
                </Header>

                <LocationBox>
                    <LocationInput
                        placeholder='Onde você esta?'
                        placeholderTextColor='#FFF'
                        value={locationText}
                        onChangeText={text => setLocationText(text)}
                    />
                    <LocationButton onPress={handleLocation}>
                        <LocationIcon width='26' height='26' fill='#FFF' />
                    </LocationButton>
                </LocationBox>

                {loading &&
                    <LoadingIcon size='large' color='#FFF' />
                }
            </Scroller>
        </Container>
    );
}

export default Home