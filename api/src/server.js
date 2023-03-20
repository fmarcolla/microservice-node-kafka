import express from 'express';
import { Kafka } from 'kafkajs';
import routes from './routes';

const app = express();

const kafka = new Kafka({
  clientId: 'api',
  brokers: ['localhost:9092'],
  retry: {
    initialRetryTime: 300,
    retires: 10
  }
});

const producer = kafka.producer();

/** 
 * Disponibiliza o producer para todas as rotas
*/

app.use((req, res, next) => {
    req.producer = producer;

    return next();
});

/** 
 * Cadastra as rodas da aplicação
*/
app.use(routes);

async function run(){
    await producer.connect();

    app.listen(3333);
}

run().catch(console.error);
