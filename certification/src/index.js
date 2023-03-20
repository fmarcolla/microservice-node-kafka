import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'certificate',
    brokers: ['localhost:9092'],
});

const topic = 'issue-certificate';
const consumer = kafka.consumer({ groupId: 'certificate-group' });

async function run(){
    await consumer.connect();
    await consumer.subscribe({ topic });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const prefix = `Topic: ${topic}, Partition: ${partition}`;
          console.log(`${prefix} Message: ${message.key}#${message.value}`)
        },
    })
}

run().catch(console.error)