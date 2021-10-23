import { Request, Response } from 'express';

const statusMessage = {
  "200": "OK",
  "201": "Creado",
  "301": "Movido permanentemente",
  "304": "No modificado",
  "400": "Error en la consulta",
  "401": "Sin autorizacion",
  "403": "Prohibido",
  "404": "No encontrado",
  "500": "Error del servidor"
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const ResponseHandler = (req: Request, res: Response, status = 200, result: any): void => {

  res.status(status).json({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    status: statusMessage[status as string],
    body: result
  })

};

export default ResponseHandler;
