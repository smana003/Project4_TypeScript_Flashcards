import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { createCard } from './api/createCard';
import { deleteCard } from './api/deleteCard';
import { getCards } from './api/getCards';
import { TDeck } from './api/getDecks';
import './Deck.css'

function Deck() {
  const [deck, setDeck] = useState<TDeck | undefined>();
  const [cards, setCards] = useState<string[]>([]);
  const [text, setText] = useState('');
  let {deckId} = useParams();

  async function handleCreateCard(e: React.FormEvent) {
    e.preventDefault();
    const {cards: serverCards} = await createCard(deckId!, text);
    setCards(serverCards);
    setText('');
  }

  async function handleDeleteCard(index: number) {
    if(!deckId) {
      return;
    }
    const newCards = await deleteCard(deckId, index);
    setCards(newCards.cards);
  }

  useEffect(() => {
    async function fetchCards() {
      if(!deckId) {
        return;
      }
      const newDeck = await getCards(deckId);
      setDeck(newDeck);
      setCards(newDeck.cards);
    }
    fetchCards();
  }, [deckId]);

  return (
    <div className="Deck">
      <ul className="cards">
        {cards.map((card, index) => (
            <li key={index}>
              <button onClick={() => handleDeleteCard(index)}>X</button>
              {card}
            </li>
          ))}
      </ul>
      <form onSubmit={handleCreateCard}>
        <label htmlFor='card-text'>Card Text</label>
        <input 
          id='card-text'
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            {
              setText(e.target.value);
            }
          }
        />
        <button>Create Card</button>
      </form>
    </div>
  )
}

export default Deck;