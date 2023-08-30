import { Request, Response } from "express";
import { pacienteRepositorie } from "../repositories/PacienteRepositorie"; 
interface UploadedFile extends Express.Multer.File {
    firebaseUrl?: string;
  }
  

export class PacienteControllers {

    async create(req: Request, res: Response){

        const {nome, data_nasc, naturalidade, profissao, nome_mae, forma, cartao_sus, endereco, 
        municipio, ponto_ref, telefone, n_sinan, unidade_tratamento, unidade_cad} = req.body
        const firebaseUrl = (req.file as UploadedFile)?.firebaseUrl ?? undefined;

        
        if (!nome || !data_nasc || !naturalidade || !profissao || !nome_mae
            || !forma || !cartao_sus || !endereco || !municipio || !ponto_ref
            || !n_sinan || !unidade_cad || !unidade_tratamento){
            return res.status(400).json({ message: "Todos os campos são obrigatorios"})
        }

        try {
            const novoPaciente = pacienteRepositorie.create({
                nome: nome, 
                data_nasc: data_nasc, 
                naturalidade: naturalidade, 
                profissao: profissao, 
                nome_mae: nome_mae, 
                forma: forma, 
                cartao_sus: cartao_sus, 
                endereco: endereco, 
                municipio: municipio, 
                ponto_ref: ponto_ref, 
                telefone: telefone, 
                n_sinan: n_sinan, 
                unidade_tratamento: unidade_tratamento, 
                unidade_cad: unidade_cad, 
                img_trat: firebaseUrl
            })

            await pacienteRepositorie.save(novoPaciente);
            return res.json({
                message: "Paciente cadastrada com sucesso !"
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
            const result = await pacienteRepositorie.update(id, corpo );

            if (result.affected === 0) {
            return res.status(404).json({ message: "Paciente não encontrado" });
            }

            return res.json({ message: "Paciente atualizado com sucesso" });
        } catch (error){
            console.log(error);
            return res.status(500).json({
              message: "erro interno",
            });
        }
        
    }

    async list(req: Request, res: Response){
        try{
            const itens = await pacienteRepositorie.find();
            res.json({

                groups: itens.map((item) => {
                    return {
                    ...item,
                    }
                }),
              
            })
        } catch(error) {
            console.log(error);
            return res.status(500).json({message: "Erro no servidor"})
            
        }
    }

    async pacienteId(req: Request, res: Response){
        const id  = parseInt(req.params.id, 10);
        const paciente = await pacienteRepositorie.findOne({ where: { id: id } });
        if (paciente) {
            res.json(paciente);
        } else {
        
            res.status(404).json({ message: 'Paciente não encontrado' });
        }
    }

    async delete(req: Request, res: Response){
        try {
            const id = parseInt(req.params.id, 10);
            const deleted = await pacienteRepositorie.delete({ id:id })
            if (deleted.affected === 0) {
            return res.status(404).json({ message: "Paciente não encontrada" })
            }
            return res.json({ message: "Paciente deletada" })
        }
        catch (error) {
          console.log(error);
          return res.status(500).json({
            message: "erro interno",
          });
        }
      } 
}

