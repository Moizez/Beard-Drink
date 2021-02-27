import React, { useState, useEffect } from 'react';
import { Platform, RefreshControl } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { request, PERMISSIONS } from 'react-native-permissions'
import Geolocation from '@react-native-community/geolocation'

import SearchIcon from '../../assets/search.svg'
import LocationIcon from '../../assets/my_location.svg'
import BarberList from '../../components/BarberList'
import Api from '../../services/Api'

import {
    Container, Scroller, Header, HeaderTitle, SearchButton, LocationBox,
    LocationInput, LocationButton, LoadingIcon, ListBox
} from './styles'

const Home = () => {

    const navigation = useNavigation()
    const [locationText, setLocationText] = useState('')
    const [coords, setCoords] = useState(null)
    const [loading, setLoading] = useState(false)
    const [barberList, setBarberList] = useState([])
    const [refreshing, setRefreshing] = useState(false)


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
        setLoading(true)
        setBarberList([])

        let lat = null
        let lng = null
        if (coords) {
            lat = coords.latitude
            lng = coords.longitude
        }

        let response = await Api.getBarbers(lat, lng, locationText)
        if (response.error == '') {
            if (response.loc) {
                setLocationText(response.loc)
            }

            setBarberList(response.data)

        } else {
            alert('Erro: ' + response.error)
        }

        setLoading(false)
    }

    useEffect(() => {
        getBarbers()
    }, [])

    const onRefresh = () => {
        setRefreshing(false)
        getBarbers()
    }

    const handleLocationSearch = () => {
        setCoords({})
        getBarbers()
    }

    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
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
                        onEndEditing={handleLocationSearch}
                    />
                    <LocationButton onPress={handleLocation}>
                        <LocationIcon width='26' height='26' fill='#FFF' />
                    </LocationButton>
                </LocationBox>

                <ListBox>
                    {barberList.map((item, key) => (
                        <BarberList key={key} data={item} />
                    ))}
                </ListBox>

                {loading &&
                    <LoadingIcon size='large' color='#FFF' />
                }
            </Scroller>
        </Container>
    );
}

export default Home