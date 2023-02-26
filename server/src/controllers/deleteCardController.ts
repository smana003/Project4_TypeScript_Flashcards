import {Request, Response} from "express";
import Deck from '../models/deck';

export async function deleteCardController(req: Request, res: Response) {
  const deckId = req.params.deckId;
  const index = req.params.index;
  const deck = await Deck.findById(deckId);

  if(!deck) {
    return res.status(400).send("No deck of this ID exists");
  }

  deck.cards.splice(parseInt(index), 1);
  await deck.save();
  res.json(deck);
}