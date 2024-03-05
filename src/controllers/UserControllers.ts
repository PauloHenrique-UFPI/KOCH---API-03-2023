import { Request, Response } from "express";
import { userRepositorie } from "../repositories/UserRepositorie";
import * as bcrypt from "bcryptjs";
import * as crypto from "crypto";
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import 'dotenv/config'
import { getRepository } from "typeorm";
import { User } from "../entities/User";

const secret = process.env.SECRET as string 

const EMAIL_USER = process.env.EMAIL_USER as string; 
const EMAIL_PASS = process.env.EMAIL_PASS as string;

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
                idPaciente: id_paciente
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

    async enviarEmailRedefinicao(req: Request, res: Response) {
      try {
          const { email } = req.body;
          if (!email) {
              return res.status(400).json({
                  message: "O campo 'email' é obrigatório",
              });
          }

          const usuario = await userRepositorie.findOne({ where: { email } });

          if (!usuario) {
              return res.status(404).json({
                  message: "Usuário não encontrado",
              });
          }

          const token = jwt.sign({ userId: usuario.id }, secret, { expiresIn: '1h' });

          const transporter = nodemailer.createTransport({
            service: 'gmail',
              auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS,
              },
            });
          
          const info = await transporter.sendMail({
            from: '"TB-Koch" <tbkochufpi@gmail.com>', // sender address
            to: email, // list of receivers
            subject: 'Redefinição de Senha',
            text: `Clique no link a seguir para redefinir sua senha: site-eight-sigma-32.vercel.app/#/novaSenha/${token}`,
            }, (error, info) => {
              if(error){
                console.log(error)
                return res.status(500).json({ message: "Erro ao enviar e-mail" });
              }else{
                return res.status(200).json({ message: "Email Enviado" });
              }
            
            } );
      } catch (error) {
          console.log(error);
          return res.status(500).json({
              message: 'Erro interno',
          });
      }
  }

  async resetarSenha(req: Request, res: Response) {
    try {
        const { token, novaSenha } = req.body;

        if (!token || !novaSenha) {
            return res.status(400).json({
                message: "Os campos 'token' e 'novaSenha' são obrigatórios",
            });
        }

        const decodedToken: any = jwt.verify(token, secret);

        if (!decodedToken || !decodedToken.userId) {
            return res.status(400).json({
                message: "Token inválido",
            });
        }

        const usuario = await userRepositorie.findOne({ where: { id: decodedToken.userId } });

        if (!usuario) {
            return res.status(404).json({
                message: "Usuário não encontrado",
            });
        }

        const hashNovaSenha = await bcrypt.hash(novaSenha, 10);
        usuario.password = hashNovaSenha;
        await userRepositorie.save(usuario);

        return res.json({
            message: "Senha redefinida com sucesso",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Erro interno',
        });
    }
}

    // async esqueciSenha(req: Request, res: Response) {

    //     try {
    //         const { email } = req.body;
    //         if (!email) {
    //           return res.status(433).json({
    //             message: "email é obrigatório",
    //           });
    //         }

    //         const userExist = await userRepositorie.findOne({ where: {
    //             email: email,
    //         } });

    //         if (!userExist || "") {
    //             return res.status(404).json({
    //             message: "usuario não encontrado",
    //             });
    //         }

    //         const transporter = nodemailer.createTransport({
    //           service: 'gmail',
    //             auth: {
    //               user: EMAIL_USER,
    //               pass: EMAIL_PASS,
    //             },
    //           });

    //       const newPassword = crypto.randomBytes(4).toString('hex')

    //       transporter.sendMail({
    //         from: 'TB-Koch <tbkochufpi@gmail.com>',
    //         to: email,
    //         subject: 'Recuperação de Senha',
    //         text: `<p>Por motivos de segurança, sua nova senha será gerada aleatoriamente. Sua nova senha: ${newPassword}</p><br/><a href="site-eight-sigma-32.vercel.app">Entrar no Sistema</a>`
    //       }).then(
    //         async () => { 
    //                 const password = await bcrypt.hash(newPassword, 10);
    //                 try{
    //                     const result = await userRepositorie.update(userExist.id, { password });
    //                     return res.status(200).json({ message: "Email Enviado" });
    //                 }catch{
    //                     return res.status(404).json({ message: "Usuario Não encontrado" });
    //                 }    
    //             }
    //       )
    //     } catch (error) {
    //         console.log(error);
      
    //         return res.status(500).json({
    //           message: "Falha ao enviar email",
    //         });
    //     }
    // }

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