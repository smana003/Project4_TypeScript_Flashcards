import {Request, Response} from "express";
import Deck from '../models/deck';

export async function getDecksController (req: Request, res: Response) {
  const decks = await Deck.find();
  res.json(decks);
}