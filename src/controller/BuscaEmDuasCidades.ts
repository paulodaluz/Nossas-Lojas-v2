import { Request, Response } from "express";
import { getManager } from "typeorm";
import { ListaLojas } from "../entity/ListaLojas"


export async function BuscaEmDuasCidades(request: Request, response: Response) {

    // get a post repository to perform operations with post
    const ListaLojasRepository = getManager().getRepository(ListaLojas);

    // load a post by a given post id
    const loja = await ListaLojasRepository.find({
        where: [
            {estado: request.params.estado, cidade: request.params.cidadeA},
            {estado: request.params.estado, cidade: request.params.cidadeB}
        ]
    });

    const erroPadrao = [{
        "errorCode": "400",
        "msg": "Erro na requisição, lojas inexistentes, verifique os dados e tente novamente."
    }]
    //Se nenhuma loja for encontrada irá retornar o erro padrão ao usuário
    if (loja.length == 0) {
        response.status(404).json(erroPadrao);
        response.end();
        return;
    }

    // Retorna as lojas ao usuário
    response.send(loja);
}
