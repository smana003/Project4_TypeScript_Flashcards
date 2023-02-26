import {Request, Response} from "express";
import Deck from '../models/deck';

export async function getCardsController (req: Request, res: Response) {
  const {deckId} = req.params;
  const deck = await Deck.findById(deckId);
  res.json(deck);
}