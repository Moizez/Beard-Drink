import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'


import Logo from '../../assets/barber.svg'
import EmailIcon from '../../assets/email.svg'
import LockIcon from '../../assets/lock.svg'
import PersonIcon from '../../assets/person.svg'
import Input from '../../components/Input'

import { UserContext } from '../../contexts/UserContext'
import Api from '../../services/Api';

import {
	Container, InputBox, Button, TextButton, Link, TextLink, TextLinkBold
} from './styles'

const SignIn = () => {

	const { dispatch: userDispatch } = useContext(UserContext)

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')

	const navigation = useNavigation()

	const handleSignUp = () => {
		navigation.reset({
			routes: [{ name: 'SignIn' }]
		})
	}

	const handleSignIn = async () => {

		if (name && email && password) {

			let response = await Api.signUp(name, email, password)
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
				alert('Erro: ' + response.error)
			}

		} else {
			alert('Preencha todos os campos!')
		}

	}


	return (
		<Container>
			<Logo width='80%' height='200' />

			<InputBox>
				<Input
					IconSvg={PersonIcon}
					placeholder='Digite seu nome'
					value={name}
					onChangeText={text => setName(text)}
				/>

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
					<TextButton>Cadastrar</TextButton>
				</Button>

			</InputBox>

			<Link onPress={handleSignUp}>
				<TextLink>Já possui uma conta? </TextLink>
				<TextLinkBold>Faça o login!</TextLinkBold>
			</Link>

		</Container>
	);
}

export default SignIn