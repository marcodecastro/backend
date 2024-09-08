import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import membroRoutes from './routes/membroRoutes.js';
import filhosRoutes from './routes/filhosRoutes.js';
import esposaRoutes from './routes/esposaRoutes.js';
import presencasRoutes from './routes/presencasRoutes.js';
import eventsRoutes from './routes/eventsRoutes.js';
import simbolicosRoutes from './routes/simbolicosRoutes.js';
import filosoficosRoutes from './routes/filosoficosRoutes.js';
import adicionaisRoutes from './routes/adicionaisRoutes.js';
import apostoladoRoutes from './routes/apostoladoRoutes.js';
import capitulorealarcoRoutes from './routes/capitulorealarcoRoutes.js';
import casamentoRoutes from './routes/casamentoRoutes.js';
import comanderiaRoutes from './routes/comanderiaRoutes.js';
import instalacaoRoutes from './routes/instalacaoRoutes.js';
import reassuncaoRoutes from './routes/reassuncaoRoutes.js';
import comemoracoesRoutes from './routes/comemoracoesRoutes.js';
import profileRoutes from './routes/profileRoutes.js';

dotenv.config();

const app = express();

const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'https://frontend-epj9.onrender.com', // URL do frontend 
    optionsSuccessStatus: 200,
  };
  
  app.use(cors(corsOptions));

//app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/membro', membroRoutes);
app.use('/api/filhos', filhosRoutes);
app.use('/api/esposa', esposaRoutes);
app.use('/api/presencas', presencasRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/simbolicos', simbolicosRoutes);
app.use('/api/filosoficos', filosoficosRoutes);
app.use('/api/adicionais', adicionaisRoutes);
app.use('/api/apostolado', apostoladoRoutes);
app.use('/api/capitulorealarco', capitulorealarcoRoutes);
app.use('/api/casamento', casamentoRoutes);
app.use('/api/comanderia', comanderiaRoutes);
app.use('/api/instalacao', instalacaoRoutes);
app.use('/api/reassuncao', reassuncaoRoutes);
app.use('/api/comemoracoes', comemoracoesRoutes);
app.use('/api/comemoracoes-semana', comemoracoesRoutes);
app.use('/api/comemoracoes-brasil', comemoracoesRoutes);
app.use('/api', profileRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Modo de execução: ${process.env.NODE_ENV || 'development'}`);
});


