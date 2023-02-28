const amq = require('amqplib');
const { mailNewUser } = require('./Mailings/mailer');


// const uri = 'amqp://rabbitMQ:5672'
const uri = 'amqp://localhost:5672'

// create my exchage
const setUpExchange = async()=>{
    try {
        const connection = await amq.connect(uri);
        const channel = await connection.createChannel();

        const exchangeName = 'emailExchange';

        await channel.assertExchange(exchangeName, 'topic', {
            durable: true,
        });

        await channel.close();
        await connection.close();
        consume()
    } catch (error) {
        console.log(error);
    }
}


const consume = async()=>{
    try {
        const connection = await amq.connect(uri);
        const channel = await connection.createChannel();

        const exchangeName = 'emailExchange';

        await channel.assertExchange(exchangeName, 'topic', {
            durable: true,
        });

        const k = await channel.assertQueue('',{exclusive: true})
        channel.bindQueue(k.queue,exchangeName,'email.*')

        console.log('Email service listenning ....');
        channel.consume(k.queue,msg=>{
            switch (msg.fields.routingKey) {
                case 'email.newUser':
                    let message = JSON.parse(msg.content.toString())
                    mailNewUser(message)
                    break;
        
                default:
                    break;
            }
        })

        
    } catch (error) {
        console.log(error);
    }
}


setUpExchange()
// const publish = async()=>{
//     const connection = await amq.connect(uri)
//     const channel = await connection.createChannel()

//     const exchangeName = 'emailExchange';
//     await channel.assertExchange(exchangeName, 'topic', {
//         durable: true,
//     });

//     channel.publish(exchangeName,'email.newUser',Buffer.from('mystrg'))
  
//      setTimeout(() => {
//         connection.close()
//      }, 500);   
   
     
// }



