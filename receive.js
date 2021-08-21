var amqp = require('amqplib');
const { put_object } = require('./s3.utils');

require('dotenv').config();

const queueName = process.env.QUEUE_NAME;
const url = process.env.QUEUE_URL;
const queue = amqp.connect(url);

async function receive() {    
    const channel = (await queue).createChannel();
    (await channel).assertQueue(queueName, { durable: true });
    (await channel).consume(queueName, async function (message) {        
        try {
            console.log('received');            
            (await channel).ack(message);
            await put_object(message.content, message.properties.headers.filename);            
        } catch (error) {
            console.log(error);            
            (await channel).close();
        } finally {
            console.log('process done');            
            (await channel).close();
        }
    }, { noAck: false });     
}

receive();
