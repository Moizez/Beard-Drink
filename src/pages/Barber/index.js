import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native'
import Swiper from 'react-native-swiper'

import Api from '../../services/Api'
import Stars from '../../components/StarsRated'
import FavoriteIcon from '../../assets/favorite.svg'
import FavoriteFullIcon from '../../assets/favorite_full.svg'
import BackIcon from '../../assets/back.svg'
import PrevButtonIcon from '../../assets/nav_prev.svg'
import NextButtonIcon from '../../assets/nav_next.svg'
import BarberModal from '../../components/BarberModal'

import {
    Container, Scroller, FakeSwiper, PageBox, UserInfoBox, ServiceBox, CommentBox, SwipeDot,
    SwipeDotActive, SwipeItem, SwipeImage, UserAvatar, UserInfo, UserInfoName, UserFavButton,
    BackButton, LoadingIcon, ServiceInfo, ServiceItem, ServiceName, ServiceTitle, ServicePrice,
    ServiceButton, ServiceButtonText, CommentItem, CommentInfo, CommentName, CommentBody
} from './styles'

const Barber = () => {

    const navigation = useNavigation()
    const route = useRoute()

    const [loading, setLoading] = useState(false)
    const [favorited, setFavorited] = useState(false)
    const [selectedService, setSelectedService] = useState(null)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        setLoading(true)
        const getBarberInfo = async () => {
            let response = await Api.getBarber(userInfo.id)
            if (!response.error) {
                setUserInfo(response.data)
                setFavorited(response.data.favorited)
            } else {
                alert('Error: ' + response.error)
            }

            setLoading(false)
        }

        getBarberInfo()
    }, [])

    const [userInfo, setUserInfo] = useState({
        id: route.params.id,
        avatar: route.params.avatar,
        name: route.params.name,
        stars: route.params.stars
    })

    const handleBackButton = () => {
        navigation.goBack()
    }

    const habdleFavorite = () => {
        setFavorited(!favorited)
        Api.setFavorite(userInfo.id)
    }

    const handleService = (key) => {
        setSelectedService(key)
        setShowModal(true)
    }

    return (
        <Container>
            <Scroller>
                {userInfo.photos && userInfo.photos.length > 0 ?
                    <Swiper
                        style={{ height: 240 }}
                        dot={<SwipeDot />}
                        activeDot={<SwipeDotActive />}
                        paginationStyle={{ top: 15, right: 15, bottom: null, left: null }}
                        autoplay={true}
                    >
                        {userInfo.photos.map((item, key) => (
                            <SwipeItem key={key}>
                                <SwipeImage source={{ uri: item.url }} resizeMode='cover' />
                            </SwipeItem>
                        ))}
                    </Swiper>
                    :
                    <FakeSwiper />
                }

                <PageBox>
                    <UserInfoBox>
                        <UserAvatar source={{ uri: userInfo.avatar }} />
                        <UserInfo>
                            <UserInfoName>{userInfo.name}</UserInfoName>
                            <Stars stars={userInfo.stars} showNumber={true} />
                        </UserInfo>
                        <UserFavButton onPress={habdleFavorite}>
                            {favorited ?
                                <FavoriteFullIcon width='24' height='24' fill='red' /> :
                                <FavoriteIcon width='24' height='24' fill='red' />
                            }
                        </UserFavButton>
                    </UserInfoBox>

                    {loading &&
                        <LoadingIcon size='large' color='#FFF' />
                    }

                    <ServiceBox>
                        <ServiceTitle>Lista de Serviços</ServiceTitle>
                        {userInfo.services?.map((item, key) => (
                            <ServiceItem key={key}>
                                <ServiceInfo>
                                    <ServiceName>{item.name}</ServiceName>
                                    <ServicePrice>R$ {item.price.toFixed(2)}</ServicePrice>
                                </ServiceInfo>
                                <ServiceButton onPress={() => handleService(key)}>
                                    <ServiceButtonText>Agendar</ServiceButtonText>
                                </ServiceButton>
                            </ServiceItem>
                        ))}
                    </ServiceBox>
                    {userInfo.testimonials && userInfo.testimonials.length > 0 &&
                        <CommentBox>
                            <Swiper
                                style={{ height: 110, }}
                                showsPagination={false}
                                showsButtons={true}
                                prevButton={<PrevButtonIcon width='35' height='35' fill='#FFF' />}
                                nextButton={<NextButtonIcon width='35' height='35' fill='#FFF' />}
                            >
                                {userInfo.testimonials.map((item, key) => (
                                    <CommentItem key={key}>
                                        <CommentInfo>
                                            <CommentName>{item.name}</CommentName>
                                            <Stars stars={item.rate} showNumber={false} />
                                        </CommentInfo>
                                        <CommentBody>{item.body}</CommentBody>
                                    </CommentItem>
                                ))}
                            </Swiper>
                        </CommentBox>
                    }

                </PageBox>

            </Scroller>
            <BackButton onPress={handleBackButton}>
                <BackIcon width='44' height='44' fill='#FFF' />
            </BackButton>

            <BarberModal
                show={showModal}
                setShow={setShowModal}
                user={userInfo}
                service={selectedService}
            />
        </Container>
    );
}

export default Barber