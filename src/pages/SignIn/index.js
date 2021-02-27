import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Logo from '../../assets/barber.svg'
import EmailIcon from '../../assets/email.svg'
import LockIcon from '../../assets/lock.svg'
import Input from '../../components/Input'

import { UserContext } from '../../contexts/UserContext'
import Api from '../../services/Api'

import {
	Container, InputBox, Button, TextButton, Link, TextLink, TextLinkBold
} from './styles'

const SignIn = () => {

	const { dispatch: userDispatch } = useContext(UserContext)

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigation = useNavigation()

	const handleSignUp = () => {
		navigation.reset({
			routes: [{ name: 'SignUp' }]
		})
	}

	const handleSignIn = async () => {

		if (email && password) {

			let response = await Api.signIn(email, password)
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
				alert('E-mail ou senha errados!')
			}

		} else {
			alert('Preencha os campos!')
		}
	}


	return (
		<Container>
			<Logo width='80%' height='200' />

			<InputBox>
				<Input
					IconSvg={EmailIcon}
					placeholder='Digite seu e-mail'
					value={email}
					onChangeText={text => setEmail(text)}
				/>
				<Input
					IconSvg={LockIcon}
					placeholder='Digite sua senha'
					value={password}
					onChangeText={text => setPassword(text)}
					password={true}
				/>

				<Button onPress={handleSignIn}>
					<TextButton>Entrar</TextButton>
				</Button>

			</InputBox>

			<Link onPress={handleSignUp}>
				<TextLink>Ainda não possui uma conta? </TextLink>
				<TextLinkBold>Cadastre-se!</TextLinkBold>
			</Link>

		</Container>
	);
}

export default SignIn