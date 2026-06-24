import express from 'express';
import { isAuth } from '../middleware/isAuth.js';
import { clearDiagram, getDiagram, saveDiagram } from '../controllers/nodes.controller.js';

const nodeRouter = express.Router()


nodeRouter.get("/", isAuth, getDiagram);
nodeRouter.post("/save", isAuth, saveDiagram);
nodeRouter.delete("/delete", isAuth, clearDiagram);

export default nodeRouter