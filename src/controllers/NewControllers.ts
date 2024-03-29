import { Request, Response } from "express";
import { newRepositorie } from "../repositories/NewRepositorie"; 
interface UploadedFile extends Express.Multer.File {
    firebaseUrl?: string;
  }
  


export class NewController {

    async create(req: Request, res: Response) {
        const { titulo, desc_curta, desc_longa } = req.body
        const firebaseUrl = (req.file as UploadedFile)?.firebaseUrl ?? undefined;


        if (!titulo || !desc_curta || !desc_longa ) {
            return res.status(400).json({ message: "Os campos 'titulo', 'desc_curta' e 'desc_longa' são obrigatorio"})
        }

        try {
            const novaNoticias = newRepositorie.create({
                titulo: titulo,
                img: firebaseUrl,
                desc_curta: desc_curta,
                desc_longa: desc_longa
            })

            await newRepositorie.save(novaNoticias);
            return res.json({
                message: "Noticias cadastrada com sucesso !"
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
            const result = await newRepositorie.update(id, dadosParaAtualizar);

            if (result.affected === 0) {
            return res.status(404).json({ message: "Usuário não encontrado" });
            }

            if (imgT) {
                await newRepositorie.update(id, { img: imgT });
            }
    

            return res.json({ message: "Usuário atualizado com sucesso" });
        } catch (error){
            console.log(error);
            return res.status(500).json({
            message: "erro interno",
            });
        }
    }
    
    async noticias(req: Request, res: Response){
        
        try{
            const noticias = await newRepositorie.find();
            res.json({

                groups: noticias.map((noticia) => {
                    return {
                    ...noticia,
                    }
                }),
              
            })
        } catch(error) {
            console.log(error);
            return res.status(500).json({message: "Erro no servidor"})
            
        }
    }

    async noticiasId(req: Request, res: Response){
        const id  = parseInt(req.params.id, 10);
        const noticia = await newRepositorie.findOne({ where: { id: id } });
        if (noticia) {
            res.json(noticia);
        } else {
        
            res.status(404).json({ message: 'Notícia não encontrada' });
        } 
    }


    async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            const deleted = await newRepositorie.delete({ id:id })
            if (deleted.affected === 0) {
            return res.status(404).json({ message: "Noticia não encontrada" })
            }
            return res.json({ message: "Noticia deletada" })
        }
        catch (error) {
          console.log(error);
          return res.status(500).json({
            message: "erro interno",
          });
        }
      }
}