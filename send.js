const amqp = require('amqplib');

async function send() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queue = 'task_queue';

  await channel.assertQueue(queue, {
    durable: true,
  });

  for (let i = 0; i < 10; i++) {
    const message = `Task ${i + 1}`;
    channel.sendToQueue(queue, Buffer.from(message), {
      persistent: true,
    });
    console.log(" [x] Sent '%s'", message);
  }

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
}

send().catch(console.error);
