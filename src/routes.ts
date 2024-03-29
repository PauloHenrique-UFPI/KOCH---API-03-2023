import { Router } from "express";
import { NewController } from "./controllers/NewControllers";
import { PacienteControllers } from "./controllers/PacienteControllers";
import { ProntuarioControllers } from "./controllers/ProntuarioControllers";
import { UserController } from "./controllers/UserControllers";
import authMiddleware  from "./middlewares/authMiddleware";
import { EventoControllers } from "./controllers/EventoControllers";
import { ExameControllers } from "./controllers/ExameControllers";



const routes = Router();
const uploadNoticia = require("./services/firebase");
const uploadExame = require("./services/firebase");
const multer = require("multer");


const Multer = multer({
    storage: multer.memoryStorage(),
    limits: 1024 * 1024,
});

//Rotas de Usuario
routes.post('/create-user', new UserController().create)//erro tremendo tem que autorizar !!!
routes.post('/login', new UserController().sign)
routes.post('/esqueci', new UserController().enviarEmailRedefinicao)
routes.post('/trocarSenha', new UserController().resetarSenha)
routes.get('/contatos', authMiddleware, new UserController().contatos)
routes.delete('/delete-user/:id', authMiddleware, new UserController().delete)

//Rotas de Noticias
routes.post('/create-new', authMiddleware, Multer.single('img'), uploadNoticia, new NewController().create);
routes.get('/noticias', new NewController().noticias)
routes.get('/noticia/:id', authMiddleware, new NewController().noticiasId)
routes.put('/alter-new/:id', authMiddleware, Multer.single('img'), uploadNoticia, new NewController().alter)
routes.delete('/delete-new/:id', authMiddleware ,new NewController().delete)

//Rotas de Pacientes
routes.post('/create-paciente', authMiddleware, Multer.single('img'), uploadExame,new PacienteControllers().create)
routes.get('/pacientes',authMiddleware, new PacienteControllers().list)
routes.get('/paciente/:id',authMiddleware, new PacienteControllers().pacienteId)
routes.put('/alter-paciente/:id', authMiddleware, Multer.single('img'), uploadExame,new PacienteControllers().alter)
routes.delete('/delete-paciente/:id', authMiddleware, new PacienteControllers().delete)

//Rotas de Prontuario
routes.post('/create-prontuario', authMiddleware, new ProntuarioControllers().create)
routes.get('/prontuarios',authMiddleware, new ProntuarioControllers().list)
routes.put('/alter-prontuario/:id', authMiddleware, new ProntuarioControllers().alter)
routes.delete('/delete-prontuario/:id',authMiddleware, new ProntuarioControllers().delete)
routes.get('/prontuarioId/:id', authMiddleware, new ProntuarioControllers().find)

//Rotas de Evento
routes.post('/create-evento', authMiddleware, new EventoControllers().create)
routes.get('/eventos/:id', authMiddleware, new EventoControllers().find)
routes.put('/alter-evento/:id', authMiddleware, new EventoControllers().alter)
routes.delete('/delete-evento/:id', authMiddleware, new EventoControllers().delete)

//Rotas de Exame
// routes.post('/envio', Multer.single('img'), new ExameControllers().realizar)
routes.post('/create-exame', authMiddleware, Multer.single('img'), uploadExame, new ExameControllers().create)
routes.get('/exame/:id', authMiddleware, new ExameControllers().find)
routes.put('/alter-exame/:id', authMiddleware, Multer.single('img'), uploadExame, new ExameControllers().alter)
routes.delete('/delete-exame/:id', authMiddleware, new ExameControllers().delete)


export default routes

