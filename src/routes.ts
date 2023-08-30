import { Router } from "express";
import { NewController } from "./controllers/NewControllers";
import { PacienteControllers } from "./controllers/PacienteControllers";
import { ProntuarioControllers } from "./controllers/ProntuarioControllers";
import { UserController } from "./controllers/UserControllers";
import authMiddleware  from "./middlewares/authMiddleware";
import { EventoControllers } from "./controllers/EventoControllers";



const routes = Router();
const uploadNoticia = require("./services/firebase");
const uploadExame = require("./services/firebase");
const multer = require("multer");


const Multer = multer({
    storage: multer.memoryStorage(),
    limits: 1024 * 1024,
});

//Rotas de Usuario
routes.post('/create-user', new UserController().create)
routes.post('/login', new UserController().sign)
routes.get('/contatos', authMiddleware, new UserController().contatos)
routes.delete('/delete-user/:id', authMiddleware, new UserController().delete)

//Rotas de Noticias
routes.post('/create-new', authMiddleware, Multer.single('img'), uploadNoticia, new NewController().create);
routes.get('/noticias', new NewController().noticias)
routes.get('/noticia/:id', authMiddleware, new NewController().noticiasId)
routes.patch('/alter-new/:id', authMiddleware, new NewController().alter)
routes.delete('/delete-new/:id', authMiddleware ,new NewController().delete)

//Rotas de Pacientes
routes.post('/create-paciente', authMiddleware, Multer.single('img'), uploadExame,new PacienteControllers().create)
routes.get('/pacientes',authMiddleware, new PacienteControllers().list)
routes.get('/paciente/:id',authMiddleware, new PacienteControllers().pacienteId)
routes.patch('/alter-paciente/:id', authMiddleware, new PacienteControllers().alter)
routes.delete('/delete-paciente/:id', authMiddleware, new PacienteControllers().delete)

//Rotas de Prontuario
routes.post('/create-prontuario', authMiddleware, new ProntuarioControllers().create)
routes.get('/prontuarios',authMiddleware, new ProntuarioControllers().list)
routes.patch('/alter-prontuario/:id', authMiddleware, new ProntuarioControllers().alter)
routes.delete('/delete-prontuario/:id',authMiddleware, new ProntuarioControllers().delete)
routes.get('/prontuarioId/:id', authMiddleware, new ProntuarioControllers().find)

//Rotas de Evento
routes.post('/create-evento', authMiddleware, new EventoControllers().create)
routes.get('/eventos/:id', authMiddleware, new EventoControllers().find)
routes.put('/alter-evento/:id', authMiddleware, new EventoControllers().alter)
routes.delete('/delete-evento/:id', authMiddleware, new EventoControllers().delete)



export default routes

