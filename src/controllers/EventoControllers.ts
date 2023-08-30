import { Request, Response } from "express";
import { eventoRepositorie } from "../repositories/EventoRepositories";

export class EventoControllers {

    async create(req: Request, res: Response){
        const {tittle,  data, paciente} = req.body

        if (!tittle || !data || !paciente) {
            return res.status(400).json({ message: "Os campos 'titulo', 'data', 'id_paciente' são obrigatorio"})
        }

        try {
            const novo = eventoRepositorie.create({
               tittle: tittle,
               date: data,
               paciente: paciente
            })

            await eventoRepositorie.save(novo);
            return res.json({
                message: "Evento cadastrado com sucesso !"
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
              message: "erro interno",
            });   
        }
    }

    async alter(req: Request, res: Response){
        const id  = parseInt(req.params.id, 10);
        const corpo = req.body
        
        try{
            const result = await eventoRepositorie.update(id, corpo );

            if (result.affected === 0) {
            return res.status(404).json({ message: "Evento não encontrado" });
            }

            return res.json({ message: "Evento atualizado com sucesso" });
        } catch (error){
            console.log(error);
            return res.status(500).json({
              message: "erro interno",
            });
        }
        
    }

    async find(req: Request, res: Response) {
        const id  = parseInt(req.params.id, 10);

        try{
            const lista = await eventoRepositorie.find({ where: {
                paciente: {
                    id: id
                }
            } });
    
            if (lista){
                return res.json({
                    groups: lista.map((item) => {
                        return {
                        ...item,
                        paciente: undefined,
                        }
                    }),
                });
            }else{
                return res.status(404).json({ message: "Evento(s) não encontrado(s)" })
            }    
        } catch (error){
            console.log(error);
            return res.status(500).json({
              message: "erro interno",
            });
        }
    }

    async delete(req: Request, res: Response){
        try {
            const id = parseInt(req.params.id, 10);
            const deleted = await eventoRepositorie.delete({ id:id })
            if (deleted.affected === 0) {
            return res.status(404).json({ message: "Evento não encontrado" })
            }
            return res.json({ messoge: "Evento deletado" })
        }
        catch (error) {
          console.log(error);
          return res.status(500).json({
            message: "erro interno",
          });
        }
      } 











}