import React from 'react';
import { Button } from 'react-native'
import { Container } from './styles'
import { useNavigation } from '@react-navigation/native'

import Api from '../../services/Api'

const Profile = () => {

    const navigation = useNavigation()

    const handleLogOut = async () => {
        await Api.logOut()
        navigation.reset({
            routes: [{ name: 'SignIn' }]
        })
    }

    return (
        <Container>
            <Button title='Sair' onPress={handleLogOut} />
        </Container>
    );
}

export default Profile