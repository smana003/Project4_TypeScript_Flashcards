import { config } from "dotenv";
config();

import express, {Request, Response} from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import Deck from './models/deck';
import { getDecksController } from "./controllers/getDecksController";
import { createDeckController } from "./controllers/createDeckController";
import { deleteDeckController } from "./controllers/deleteDeckController";
import { getCardsController } from "./controllers/getCardsController";
import { createCardController } from "./controllers/createCardController";
import { deleteCardController } from "./controllers/deleteCardController";

const PORT = 5000;

const app = express();

app.use(cors({
  origin: '*',
}));
app.use(express.json());

app.get('/decks', getDecksController);
app.post("/decks", createDeckController);
app.delete('/decks/:deckId', deleteDeckController);
app.get('/decks/:deckId', getCardsController);
app.post("/decks/:deckId/cards", createCardController);
app.delete('/decks/:deckId/cards/:index', deleteCardController);

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL!).then(() => {
    console.log(`listening on port ${PORT}`);
    app.listen(PORT);
  });

