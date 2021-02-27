import React, { useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native'
import Logo from '../../assets/barber.svg'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Container, Loading } from './styles'
import Api from '../../services/Api'
import { UserContext } from '../../contexts/UserContext'

const Preload = () => {

	const { dispatch: userDispatch } = useContext(UserContext)
	const navigation = useNavigation()

	useEffect(() => {
		const checkToken = async () => {
			const token = await AsyncStorage.getItem('token')

			if (token) {

				let response = await Api.checkToken(token)
				if (response.token) {

					await AsyncStorage.setItem('token', response.token)

					userDispatch({
						type: 'setAvatar',
						payload: {
							avatar: response.data.avatar
						}
					})

					navigation.reset({
						routes: [{ name: 'MainTab' }]
					})


				} else {
					navigation.navigate('SignIn')
				}

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