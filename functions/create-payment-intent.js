// domain/.netlify/functions/create-payment-intent

exports.handler = async function (event, context) {
  // console.log(event); un objeto string con los elementos que se envían en post cart, shipping_fee, total_amount, se debe convertir a JSON
  if (event.body) {
    const { cart, shipping_fee, total_amount } = JSON.parse(event.body);
    // console.log(cart) un JSON de cart
    return {
      statusCode: 200,
      body: JSON.stringify(cart),
    };
  }
  return {
    statusCode: 200,
    body: 'Create Payment Intent',
  };
};
