import { Router } from "express";
import { NewController } from "./controllers/NewControllers";
import { PacienteControllers } from "./controllers/PacienteControllers";
import { ProntuarioControllers } from "./controllers/ProntuarioControllers";
import { UserController } from "./controllers/UserControllers";
import authMiddleware  from "./middlewares/authMiddleware";


const routes = Router()

//Rotas de Usuario
routes.post('/create-user', new UserController().create)
routes.post('/login', new UserController().sign)
routes.get('/contatos', authMiddleware, new UserController().contatos)
routes.delete('/delete-user/:id', authMiddleware, new UserController().delete)

//Rotas de Noticias
routes.post('/create-new', new NewController().create)
routes.get('/noticias', authMiddleware, new NewController().noticias)
routes.patch('/alter-new/:id', authMiddleware, new NewController().alter)
routes.delete('/delete-new/:id', authMiddleware ,new NewController().delete)

//Rotas de Pacientes
routes.post('/create-paciente', authMiddleware,new PacienteControllers().create)
routes.get('/pacientes',authMiddleware, new PacienteControllers().list)
routes.patch('/alter-paciente/:id', authMiddleware, new PacienteControllers().alter)
routes.delete('/delete-paciente/:id', authMiddleware, new PacienteControllers().delete)

//Rotas de Prontuario
routes.post('/create-prontuario', authMiddleware, new ProntuarioControllers().create)
routes.get('/prontuarios',authMiddleware, new ProntuarioControllers().list)
routes.patch('/alter-prontuario/:id', authMiddleware, new ProntuarioControllers().alter)
routes.delete('/delete-prontuario/:id',authMiddleware, new ProntuarioControllers().delete)

//Rotas de Exame



export default routes

