export default (req, res) => {
  // handle the TTN webhook here
  // you can access the webhook data in the `req.body` object
  console.log(req.body);

  // send a response to TTN to acknowledge receipt of the webhook
  res.status(200).send('Webhook received');
}