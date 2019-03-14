import { Request, Response } from "express";
import { getManager } from "typeorm";
import { ListaLojas } from "../entity/ListaLojas";
import { MensagemPadrao } from "../models/MensagemPadrao"


export async function BuscaEmDuasCidades(request: Request, response: Response) {

    //Cria uma conexão com o banco
    const ListaLojasRepository = getManager().getRepository(ListaLojas);

    //Procurando no banco de dados e guardando dentro da variavel
    const loja = await ListaLojasRepository.find({
        where: [
            {estado: request.params.estado, cidade: request.params.cidadeA},
            {estado: request.params.estado, cidade: request.params.cidadeB}
        ]
    });

    //Se nenhuma loja for encontrada irá retornar o erro padrão ao usuário
    if (!loja.length) {
        response.status(404).json(new MensagemPadrao("204", "Nenhuma loja foi encontrada, verifique os dados e tente novamente.").erroRetorno());
        response.end();
        return;
    }

    // Retorna as lojas ao usuário
    response.send(loja);
}
