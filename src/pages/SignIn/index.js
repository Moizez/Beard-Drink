import React from 'react';

import Logo from '../../assets/barber.svg'
import EmailIcon from '../../assets/email.svg'
import LockIcon from '../../assets/lock.svg'
import Input from '../../components/Input'

import {
	Container, InputBox, Button, TextButton, Link, TextLink, TextLinkBold
} from './styles'

const SignIn = () => {
	return (
		<Container>
			<Logo width='80%' height='200' />

			<InputBox>

				<Input IconSvg={EmailIcon} />
				<Input IconSvg={LockIcon} />

				<Button>
					<TextButton>Entrar</TextButton>
				</Button>

			</InputBox>

			<Link>
				<TextLink>Ainda não possui uma conta? </TextLink>
				<TextLinkBold>Cadastre-se!</TextLinkBold>
			</Link>

		</Container>
	);
}

export default SignIn