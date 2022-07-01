// domain/.netlify/functions/create-payment-intent
require('dotenv').config();

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {
  // console.log(event); un objeto string con los elementos que se envían en post cart, shipping_fee, total_amount, se debe convertir a JSON
  if (event.body) {
    const { cart, shipping_fee, total_amount } = JSON.parse(event.body);
    // console.log(cart) un JSON de cart

    const calculateOrderAmount = () => {
      // deberías recuperar valores desde backend de la api de los productos para constrastar valores en vez de calcular el total de la compra directamente con los valores de frontend, aca se hace directamente porque es solo para propósitos de prueba
      return shipping_fee + total_amount;
    };

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: 'usd',
      });
      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: error.message }),
      };
    }
  }
  return {
    statusCode: 200,
    body: 'Create Payment Intent',
  };
};
