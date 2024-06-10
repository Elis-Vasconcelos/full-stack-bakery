import express, { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client';
import { configDotenv } from 'dotenv';

configDotenv();

const app = express()
const port = 3000

const prisma = new PrismaClient();

app.use(express.json());

//criando o usuário para pôr na fila
app.post('/user', async (req: Request, res: Response) => {
  const { nome, totalPao, totalPagar} = req.body;
  const user = await prisma.user.create({
    data: {
      nome,
      totalPao,
      totalPagar
    }
    
});

res.status(201).json({ //padrão para mensagem de sucesso
    message: 'Usuário adicionado a fila com sucesso!'});
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})