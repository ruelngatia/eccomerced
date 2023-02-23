const amq = require('amqplib');
const { mailNewUser } = require('./Mailings/mailer');



// create my exchage
const setUpExchange = async()=>{
    try {
        const connection = await amq.connect('amqp://localhost:5672');
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
        const connection = await amq.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();

        const exchangeName = 'emailExchange';

        await channel.assertExchange(exchangeName, 'topic', {
            durable: true,
        });

        const k = await channel.assertQueue('',{exclusive: true})
        channel.bindQueue(k.queue,exchangeName,'email.*')

        console.log('listenning ....');
        channel.consume(k.queue,msg=>{
            msg
            console.log( msg.content.toString());
            switch (msg.fields.routingKey) {
                case 'email.newUser':
                    mailNewUser(msg.content.toJSON())
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
//     const connection = await amq.connect('amqp://localhost:5672')
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



