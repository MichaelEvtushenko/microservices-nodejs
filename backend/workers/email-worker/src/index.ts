import * as amqplib from 'amqplib';
import { notifyAboutNewComment } from './utils';

(async () => {
  try {
    const conn = await amqplib.connect('amqp://localhost:5672');
    const channel = await conn.createChannel();

    await channel.assertExchange('notify', 'topic', { durable: true });
    await channel.assertQueue('sendEmail', { durable: true });
    await channel.bindQueue('sendEmail', 'notify', 'email.#');

    await channel.consume('sendEmail', msg => {
      const unparsedStr = msg?.content.toString();

      if (!unparsedStr) {
        // todo: publish the message to a dead letter queue
        console.error('Could not process the message:', msg);
        return;
      }

      const payload = JSON.parse(unparsedStr) as { email: string, event: string };

      if (payload.event === 'new_comment') {
        notifyAboutNewComment(payload.email).then(() => {
          console.log(`Successfully sent an email to ${payload.email}`);
        }).catch(err => {
          console.error(`Failed to send an email to ${payload.email}:`, err);
        });
      }
    });
  } catch (err) {
    console.error('RabbitMQ error:', err);
    process.exit(1);
  }
})();
