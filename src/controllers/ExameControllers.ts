import { Request, Response } from "express";
import { exameRepositorie } from "../repositories/ExameRepositories";
import { api } from "../boot/axios";
import { Paciente } from "../entities/Paciente";
import { Exame } from "../entities/Exame";
const FormData = require('form-data');

interface UploadedFile extends Express.Multer.File {
    firebaseUrl?: string;
  }

export class ExameControllers {

    async realizar (req: Request, res: Response) {
        if (!req.file) {
          return res.status(500).json({ error: 'Erro ao processar a solicitação' });
        }
      
        const image = req.file;
        const formData = new FormData();
        formData.append('file', image.buffer, { filename: image.originalname });
      
        try {
          console.log(formData);
          const resp = await api.post("http://154.56.41.138:5000/upload", formData, {
            headers: {
              ...formData.getHeaders(),
            },
          });
      
        
          return resp.data;
        } catch (erro) {
          console.error(erro);
          return res.status(500).json({ error: 'Erro ao processar a solicitação' });
        }
      }

    async create (req: Request, res: Response){
        const { nome, date, paciente} = req.body
        const firebaseUrl = (req.file as UploadedFile)?.firebaseUrl ?? undefined;

        console.log(firebaseUrl)

        if (!nome || !date || !paciente || !firebaseUrl) {
            return res.status(400).json({ message: "Todos os campos são obrigatorio"})
        }

        try {
            const novo = exameRepositorie.create({
                nome: nome,
                img: firebaseUrl,
                date: date,
                paciente: paciente
            })

            await exameRepositorie.save(novo);
            return res.json({
                message: "Exame cadastrado com sucesso !"
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
        const { img, ...dadosParaAtualizar } = corpo;
    
        const imgT = (req.file as UploadedFile)?.firebaseUrl ?? undefined;
        
        try{
            const result = await exameRepositorie.update(id, dadosParaAtualizar);

            if (result.affected === 0) {
            return res.status(404).json({ message: "Exame não encontrado" });
            }

            if (imgT) {
                await exameRepositorie.update(id, { img: imgT });
            }
    

            return res.json({ message: "Exame atualizado com sucesso" });
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
            const lista = await exameRepositorie.find({ where: {
                paciente: {
                    id: id
                }
            } });
    
            if (lista){
                return res.json({
                    groups: lista.map((item: Exame) => {
                        return {
                        ...item,
                        paciente: undefined,
                        }
                    }),
                });
            }else{
                return res.status(404).json({ message: "Exame não encontrado" })
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
            const deleted = await exameRepositorie.delete({ id:id })
            if (deleted.affected === 0) {
            return res.status(404).json({ message: "Exame não encontrado" })
            }
            return res.json({ messoge: "Exame deletado" })
        }
        catch (error) {
          console.log(error);
          return res.status(500).json({
            message: "erro interno",
          });
        }
      } 


}
