import React from 'react';
import styled from 'styled-components/native'

import StarFull from '../../assets/star.svg'
import StarHalf from '../../assets/star_half.svg'
import StarEmpty from '../../assets/star_empty.svg'

const Container = styled.View`
    flex-direction: row;
`;

const StarBox = styled.View`

`;

const StarText = styled.Text`
    font-size: 12px;
    font-weight: bold;
    margin-left: 5px;
    color: #737373;
`;

const StarsRated = ({ stars, showNumber }) => {

    let star = [0, 0, 0, 0, 0]
    let floor = Math.floor(stars)
    let left = stars - floor

    for (var i = 0; i < floor; i++) {
        star[i] = 2
    }
    if (left > 0) {
        star[i] = 1
    }

    return (
        <Container>
            {star.map((item, key) => (
                <StarBox key={key}>
                    {item === 0 && <StarEmpty width='18' height='18' fill='#ff9200' />}
                    {item === 1 && <StarHalf width='18' height='18' fill='#ff9200' />}
                    {item === 2 && <StarFull width='18' height='18' fill='#ff9200' />}
                </StarBox>
            ))}
            {showNumber && <StarText>{stars}</StarText>}
        </Container>
    );
}

export default StarsRated