import { Request, Response } from "express";
import { userRepositorie } from "../repositories/UserRepositorie";
import * as bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const secret = process.env.SECRET as string 

export class UserController {


    async create(req: Request, res: Response){
        //cria user

        const { name, email, password, number, rule, id_paciente } = req.body;

        if (!name || !email || !password ){
            return res.status(400).json({ message: "Os campos 'nome', 'email' e 'password' são obrigatorio"})
        }

        const userFind = await userRepositorie.findOne( { where: {
            email: email,
        } } ); 

        if (userFind) {
            return res.status(403).json({
            message: "Email já cadastrado",
            });
        }

        try {
            
            const hashP = await bcrypt.hash(password, 10);
            const newUser = userRepositorie.create({
                name: name, 
                email: email, 
                password: hashP,
                number: number,
                rule: rule,
                id_paciente: id_paciente
            })

            await userRepositorie.save(newUser);
            return res.json({
                message: "usuário criado",
              });
            

        } catch (error) {
            console.log(error);
            return res.status(500).json({
              message: "erro interno",
            });
          }
      
    }


    async sign(req: Request, res: Response) {

        try {
            const { email, password } = req.body;
            if (!email || !password) {
              return res.status(433).json({
                message: "email e password são campos obrigatórios",
              });
            }

            const userExist = await userRepositorie.findOne({ where: {
                email: email,
            } });

            if (!userExist || "") {
                return res.status(404).json({
                message: "usuario não encontrado",
                });
            }

            const authorization = await bcrypt.compare(
                password,
                userExist.password
              );

            if (authorization) {
                const date = Date();
        
                const token = jwt.sign(
                    {
                    ...userExist,
                    password: undefined,
                    date: date,
                    },
                    secret,
                );
                return res.json({
                    message: "login efetuado",
                    ...userExist,
                    password: undefined,
                    token,
                });
                } else {
                return res.status(403).json({
                    message: "senha inválida",
                });
                }


        } catch (error) {
            console.log(error);
      
            return res.status(500).json({
              message: "erro interno",
            });
        }
    }

    async contatos(req: Request, res: Response){
        try{
            const contatos = await userRepositorie.find();
            res.json({
             
              groups: contatos.map((contato) => {
                return {
                  ...contato,
                  password: undefined,
                  valid_sign: undefined,
                  created_at: undefined
                }
              }),
            })
        } catch(error) {
            console.log(error);
            return res.status(500).json({message: "Erro no servidor"})
            
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            const deleted = await userRepositorie.delete({ id:id })
            if (deleted.affected === 0) {
            return res.status(404).json({ message: "Usuario não encontrado" })
            }
            return res.json({ message: "Usuario deletado" })
        }
        catch (error) {
          console.log(error);
          return res.status(500).json({
            message: "erro interno",
          });
        }
      }
      
}