import { Request, Response } from "express";
import { prontuarioRepositorie } from "../repositories/ProntuarioRepositorie";
import { pacienteRepositorie } from "../repositories/PacienteRepositorie";

export class ProntuarioControllers {

    async create(req: Request, res: Response){

        const {tipo, popu_especifica, beneficiario, tipo_doenca, se_extrapulmonar, agravos,
        diagnostico, radiografia, hiv, terapia, data_ini, histopatologia, cultura, teste_sens,
        contatos_ident, paciente } = req.body
        
        try {
            const novoPaciente = prontuarioRepositorie.create({
                tipo: tipo, 
                popu_especifica: popu_especifica, 
                beneficiario: beneficiario, 
                tipo_doenca: tipo_doenca, 
                se_extrapulmonar: se_extrapulmonar, 
                agravos: agravos,
                diagnostico: diagnostico, 
                radiografia: radiografia, 
                hiv: hiv, 
                terapia: terapia, 
                data_ini: data_ini, 
                histopatologia: histopatologia, 
                cultura: cultura, 
                teste_sens: teste_sens,
                contatos_ident: contatos_ident, 
                paciente: paciente
            })

            await prontuarioRepositorie.save(novoPaciente);
            return res.json({
                message: "Prontuario cadastradado com sucesso !"
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
              message: "erro interno",
            });   
        }
    }

    async list(req: Request, res: Response){
        try{
            const itens = await prontuarioRepositorie.find();
            res.json({

                groups: itens.map((item) => {
                    return {
                    ...item,
                    paciente: undefined,
                    }
                }),
              
            })
        } catch(error) {
            console.log(error);
            return res.status(500).json({message: "Erro no servidor"})
            
        }
    }

    async find(req: Request, res: Response) {
        const id  = parseInt(req.params.id, 10);

        try{
            const prontExist = await prontuarioRepositorie.findOne({ where: {
                paciente: {
                    id: id
                }
            } });
    
            if (prontExist){
                return res.json({
                    ...prontExist,
                });
            }else{
                return res.status(404).json({ message: "Prontuario não encontrado" })
            }    
        } catch (error){
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
            const result = await prontuarioRepositorie.update(id, corpo );

            if (result.affected === 0) {
            return res.status(404).json({ message: "Prontuario não encontrado" });
            }

            return res.json({ message: "Prontuario atualizado com sucesso" });
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
            const deleted = await prontuarioRepositorie.delete({ id:id })
            if (deleted.affected === 0) {
            return res.status(404).json({ message: "Prontuario não encontrado" })
            }
            return res.json({ messoge: "Prontuario deletado" })
        }
        catch (error) {
          console.log(error);
          return res.status(500).json({
            message: "erro interno",
          });
        }
      } 

}