import axios from 'axios';
import { useState } from 'react';

export function DrawHand() {
    const [firstCard, setFirstCard] = useState('');
    const [secondCard, setSecondCard] = useState('');

    const handleClick = () => {
        axios.get('/api/hand').then((response: any) => {
            const hand = response.data.cards;

            function titleFix(hand: any) {
                switch (hand) {
                    case 'A':
                        return 'Ace';
                    case 'J':
                        return 'Jack';
                    case 'Q':
                        return 'Queen';
                    case 'K':
                        return 'King';
                    default:
                        return hand;
                }
            }

            const card1 = `Card 1: ${titleFix(hand[0].card)} of ${
                hand[0].suit
            }`;
            const card2 = `Card 2: ${titleFix(hand[1].card)} of ${
                hand[1].suit
            }`;
            setFirstCard(card1);
            setSecondCard(card2);
        });
    };

    return (
        <div>
            <p>{firstCard}</p>
            <p>{secondCard}</p>
            <button onClick={handleClick}>Draw Hand</button>
        </div>
    );
}
