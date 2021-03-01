import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'

import CloseIcon from '../../assets/expand.svg'
import PrevButtonIcon from '../../assets/nav_prev.svg'
import NextButtonIcon from '../../assets/nav_next.svg'
import Api from '../../services/Api'

import {
    Modal, Container, ModalBox, CloseButton, ModalItem, UserInfo, UserAvatar,
    UserName, ServiceInfo, ServiceName, ServicePrice, ConfirmButton, ConfirmButtonText,
    DateInfo, DateNextButton, DatePrevButton, DateTitleBox, DateTitle, ScrollDate,
    DateItem, DayItem, DayItemNumber, ScrollTime, TimeItem, TimeItemText
} from './styles'


const months = [
    'Janeiro', 'Fevereito', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
    'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

const days = [
    'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'
]

const BarberModal = ({ show, setShow, user, service }) => {

    const navigation = useNavigation()

    const [selectedYear, setSelectedYear] = useState(0)
    const [selectedMonth, setSelectedMonth] = useState(0)
    const [selectedDay, setSelectedDay] = useState(0)
    const [selectedHour, setSelectedHour] = useState(null)
    const [listDays, setListDays] = useState([])
    const [listHours, setListHours] = useState([])

    useEffect(() => {

        if (user.available && selectedDay > 0) {
            let d = new Date(selectedYear, selectedMonth, selectedDay)
            let year = d.getFullYear()
            let month = d.getMonth() + 1
            let day = d.getDate()

            month = month < 10 && '0' + month
            day = day < 10 && '0' + day
            let selectedDate = `${year}-${month}-${day}`

            let availability = user.available.filter(e => e.date === selectedDate)

            // A verificação "availability.lenght > 0" nunca entra nesse IF, por isso mudei
            if (availability) {
                setListHours(availability[0].hours)
            }

        }

        setSelectedHour(null)

    }, [user, selectedDay])

    useEffect(() => {
        if (user.available) {

            // Para saber quantos dias tem o mês
            let daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate()
            let newListDays = []

            for (let i = 1; i < daysInMonth; i++) {
                let d = new Date(selectedYear, selectedMonth, i)
                let year = d.getFullYear()
                let month = d.getMonth() + 1
                let day = d.getDate()

                month = month < 10 && '0' + month
                day = day < 10 && '0' + day
                let selectedDate = `${year}-${month}-${day}`

                let availability = user.available.filter(e => e.date === selectedDate)

                newListDays.push({
                    status: availability.lenght > 0 ? true : false,
                    weekday: days[d.getDay()],
                    number: i
                })
            }
            setListDays(newListDays)
            setSelectedDay(0)
            setSelectedHour(0)
            // Desativei o setListHours pois dá forma que a API está ficava sempre zerando o array
            //setListHours([])
        }
    }, [user, selectedMonth, selectedYear])

    useEffect(() => {
        let today = new Date();
        setSelectedYear(today.getFullYear())
        setSelectedMonth(today.getMonth())
        setSelectedDay(today.getDay())
    }, [])

    const handleCloseModal = () => {
        setShow(false)
    }

    const handlePrev = () => {
        let mountDate = new Date(selectedYear, selectedMonth, 1)
        mountDate.setMonth(mountDate.getMonth() - 1)
        setSelectedYear(mountDate.getFullYear())
        setSelectedMonth(mountDate.getMonth())
        setSelectedDay(0)
    }

    const handleNext = () => {
        let mountDate = new Date(selectedYear, selectedMonth, 1)
        mountDate.setMonth(mountDate.getMonth() + 1)
        setSelectedYear(mountDate.getFullYear())
        setSelectedMonth(mountDate.getMonth())
        setSelectedDay(0)
    }

    const handleConfirm = async () => {
        if (
            user.id &&
            service != null &&
            selectedYear > 0 &&
            selectedMonth > 0 &&
            selectedDay > 0 &&
            selectedHour != null
        ) {
            let response = await Api.setAppointment(
                user.id,
                service,
                selectedYear,
                selectedMonth,
                selectedDay,
                selectedHour
            )
            if (response.error === '') {
                setShow(false)
                navigation.navigate('Appointments')
            } else {
                alert(response.error)
            }

        } else {
            alert('Preencha todos os dados!')
        }
    }

    return (
        <Modal
            transparent={true}
            visible={show}
            animationType='slide'
        >
            <Container>
                <ModalBox>
                    <CloseButton onPress={handleCloseModal}>
                        <CloseIcon width='40' height='40' fill='#FFF' />
                    </CloseButton>

                    <ModalItem>
                        <UserInfo>
                            <UserAvatar source={{ uri: user.avatar }} />
                            <UserName>{user.name}</UserName>
                        </UserInfo>
                    </ModalItem>

                    {service != null &&
                        <ModalItem>
                            <ServiceInfo>
                                <ServiceName>{user.services[service].name}</ServiceName>
                                <ServicePrice>R$ {user.services[service].price.toFixed(2)}</ServicePrice>
                            </ServiceInfo>
                        </ModalItem>
                    }

                    <ModalItem>
                        <DateInfo>
                            <DatePrevButton onPress={handlePrev}>
                                <PrevButtonIcon width='35' height='35' fill='#000' />
                            </DatePrevButton>
                            <DateTitleBox>
                                <DateTitle>{months[selectedMonth]} {selectedYear}</DateTitle>
                            </DateTitleBox>
                            <DateNextButton onPress={handleNext}>
                                <NextButtonIcon width='35' height='35' fill='#000' />
                            </DateNextButton>
                        </DateInfo>

                        <ScrollDate horizontal={true} showsHorizontalScrollIndicator={false}>
                            {listDays.map((item, key) => (
                                <DateItem
                                    key={key}
                                    style={{
                                        opacity: item.status ? 1 : 0.5,
                                        backgroundColor: item.number === selectedDay ? '#268596' : '#FFF'
                                    }}
                                    onPress={() => item.status ? setSelectedDay(item.number) : null}
                                >
                                    <DayItem style={{
                                        color: item.number === selectedDay ? '#FFF' : '#000'
                                    }}>{item.weekday}</DayItem>

                                    <DayItemNumber style={{
                                        color: item.number === selectedDay ? '#FFF' : '#000'
                                    }}>{item.number}</DayItemNumber>
                                </DateItem>
                            ))}
                        </ScrollDate>
                    </ModalItem>

                    {selectedDay > 0 && listHours.length > 0 &&
                        <ModalItem>
                            <ScrollTime horizontal={true} showsHorizontalScrollIndicator={false}>
                                {listHours.map((item, key) => (
                                    <TimeItem
                                        key={key}
                                        onPress={() => setSelectedHour(item)}
                                        style={{
                                            backgroundColor: item === selectedHour ? '#268596' : '#FFF'
                                        }}
                                    >
                                        <TimeItemText
                                            style={{
                                                color: item === selectedHour ? '#FFF' : '#000'
                                            }}
                                        >{item}</TimeItemText>
                                    </TimeItem>
                                ))}

                            </ScrollTime>
                        </ModalItem>
                    }

                    <ConfirmButton onPress={handleConfirm}>
                        <ConfirmButtonText>Finalizar Agendadmento</ConfirmButtonText>
                    </ConfirmButton>

                </ModalBox>
            </Container>

        </Modal>
    );
}

export default BarberModal