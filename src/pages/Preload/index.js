import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import Logo from '../../assets/barber.svg'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Container, Loading } from './styles'

const Preload = () => {

	const navigation = useNavigation()

	useEffect(() => {
		const checkToken = async () => {
			const token = await AsyncStorage.getItem('token')
			if (token) {

			} else {
				navigation.navigate('SignIn')
			}

		}

		checkToken()

	}, [])

	return (
		<Container>
			<Logo width='250' height='250' />
			<Loading size='large' color='#FFF' />
		</Container>
	);
}

export default Preload