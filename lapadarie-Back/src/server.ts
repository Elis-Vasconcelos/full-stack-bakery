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

  await prisma.cliente.create({
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

  res.status(200).json({ message: 'Usuário adicionado a fila com sucesso!' });
});

// Removendo user da fila para o histórico
app.post('/userSairFila', async (req, res) => {
  const { id } = req.body;

  // Recupere os dados do cliente antes da exclusão
  const cliente = await prisma.cliente.findUnique({
    where: { id },
  });

  // Se o cliente existir, prossiga com as operações
  if (cliente) {
    // Crie um registro no histórico com os dados do cliente
    await prisma.historico.create({
      data: {
        nome: cliente.nome,
        totalPao: cliente.totalPao,
        totalPagar: cliente.totalPagar,
      },
    });

    // Delete o cliente da fila
    await prisma.cliente.delete({
      where: { id },
    });

    // Atualize as estatísticas decrementando o tamanho da fila
    await prisma.estatisticas.update({
      where: { id: 1 },
      data: {
        tamanhoFila: { decrement: 1 },
      },
    });

    // Envie uma resposta de sucesso
    res.status(200).json({ message: 'Usuário removido da fila e adicionado ao histórico.' });
  } else {
    // Envie uma resposta de erro se o cliente não existir
    res.status(404).json({ message: 'Cliente não encontrado.' });
  }
});


// Get estatisticas
app.get('/getEstatisticas', async (req: Request, res: Response) => {
  const estatisticas = await prisma.estatisticas.findFirst({
    where: { id: 1 },
  });

  res.status(200).json(estatisticas);
});

// Get clientes na fila
app.get('/getFila', async (req: Request, res: Response) => {
  const clientes = await prisma.cliente.findMany();

  res.status(200).json(clientes);
});

// Get historico
app.get('/getHistorico', async (req: Request, res: Response) => {
  const historico = await prisma.historico.findMany();

  res.status(200).json(historico);
});

// deletar da fila
app.delete('/deleteUserFila', async (req: Request, res: Response) => {
  try {
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

app.put('/updateUser', async (req: Request, res: Response) => {
  const { id, nome, totalPao, totalPagar } = req.body;

  // Obtenha os valores atuais de totalPao e totalPagar do usuário
  const currentData = await prisma.cliente.findUnique({
    where: { id: id },
    select: { totalPao: true, totalPagar: true }
  });

  // Atualize o cliente com os novos dados
  await prisma.cliente.update({
    where: { id: id },
    data: {
      nome,
      totalPao,
      totalPagar,
    },
  });

  // Calcule as diferenças entre os novos valores e os antigos
  const differencePao = totalPao - (currentData ? currentData.totalPao : 0);
  const differencePagar = totalPagar - (currentData ? currentData.totalPagar : 0);

  // Atualize as estatísticas com base nas diferenças calculadas
  await prisma.estatisticas.update({
    where: { id: 1 },
    data: {
      totalPao: differencePao > 0 ? { increment: differencePao } : differencePao < 0 ? { decrement: -differencePao } : undefined,
      totalPagar: differencePagar > 0 ? { increment: differencePagar } : differencePagar < 0 ? { decrement: -differencePagar } : undefined,
    },
  });

  res.status(200).json({ message: 'Usuário atualizado com sucesso.' });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
