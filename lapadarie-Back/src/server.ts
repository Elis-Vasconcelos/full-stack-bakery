import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { configDotenv } from 'dotenv';
import cors from 'cors';

configDotenv();

const app = express();
const port = 3000;

const prisma = new PrismaClient();

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true,
}));

app.use(express.json());

// Inicializar Estatisticas se nao exitir
async function inicializarEstatisticas() {
  const estatisticas = await prisma.estatisticas.findFirst({
    where: { id: 1 },
  });

  if (!estatisticas) {
    await prisma.estatisticas.create({
      data: {
        totalPao: 0,
        totalPagar: 0,
        tamanhoFila: 0,
      },
    });
  }
}

// Chamar inicializacao quando o server iniciar
inicializarEstatisticas().catch((e) => {
  console.error('Falha ao inicializar Estatisticas:', e);
});

// Criando usuário e adicionando a fila
app.post('/user', async (req: Request, res: Response) => {
  const { nome, totalPao, totalPagar } = req.body;

  const user = await prisma.cliente.create({
    data: {
      nome,
      totalPao,
      totalPagar,
    },
  });

  await prisma.estatisticas.update({
    where: { id: 1 },
    data: {
      totalPao: { increment: totalPao },
      totalPagar: { increment: totalPagar },
      tamanhoFila: { increment: 1 },
    },
  });

  res.status(201).json({ message: 'Usuário adicionado a fila com sucesso!' });
});

// Removendo user da fila para o histórico
app.post('/userSairFila', async (req: Request, res: Response) => {
  const { id } = req.body;

  const cliente = await prisma.cliente.update({
    where: { id },
    data: { isActive: false },
  });

  await prisma.historico.create({
    data: {
      nome: cliente.nome,
      totalPao: cliente.totalPao,
      totalPagar: cliente.totalPagar,
    },
  });

  await prisma.cliente.delete({
    where: { id },
  });

  await prisma.estatisticas.update({
    where: { id: 1 },
    data: {
      tamanhoFila: { decrement: 1 },
    },
  });

  res.status(200).json({ message: 'Usuário removido da fila e adicionado ao histórico.' });
});

// Get estatisticas
app.get('/getEstatisticas', async (req: Request, res: Response) => {
  const estatisticas = await prisma.estatisticas.findFirst({
    where: { id: 1 },
  });

  res.status(200).json(estatisticas);
});

// Get historico
app.get('/getHistorico', async (req: Request, res: Response) => {
  const historico = await prisma.historico.findMany();

  res.status(200).json(historico);
});

// deletar da fila
app.delete('/deleteUserFila', async (req: Request, res: Response) => {
  const { id } = req.body;

  await prisma.cliente.delete({
    where: { id: Number(id) },
  });

    res.status(200).json({ message: 'Usuário removido da fila.' });
  } catch (error) {
    console.error('Erro ao remover usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});




app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
