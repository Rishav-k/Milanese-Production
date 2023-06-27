const express = require('express');
const axios = require('axios');
const app = express();
const cookieParser = require('cookie-parser');
const { error } = require('console');
const dotenv = require('dotenv');

app.use(express.json());
app.use(cookieParser());


dotenv.config({path : './config.env'});

const admin = process.env.SECRET_ADMIN;
const storefront = process.env.SECRET_STOREFRONT;
// console.log(storefront);
app.get('/',(req,res)=>{
  res.send("Welcome to Server of Milanese Leather ");
})

app.post('/api/signup' , async (req,res)=>{
  console.log(req.body);
  // const data = req.body;
  const requestData = {
  
  "customer": {
    "name" : req.body.name,
    "email": req.body.email,
    "verified_email": true,
    "password": req.body.password,
    "password_confirmation": req.body.confirmPassword,
    "send_email_welcome": false
  }

}
  axios.post('https://estro-schuster-1.myshopify.com/admin/api/2023-04/customers.json', requestData, {
        headers: {
          'X-Shopify-Access-Token': admin,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        // Handle the response data
        // res.send("Registration Successfull")
        // console.log(response.data);
        res.send(response.data);
      })
      .catch((error) => {
        // Handle the error
        console.log(error.status);
        if(error.status==422){
          console.log("user Already Registered");
        }
        console.log("not Registered")
        res.send(error);
        // console.log(error);
      });
})


app.get('/api/authenticate' , async (req,res)=>{
  console.log("authenticate");
  // console.log(req.cookies.rishav);

const graphqlEndpoint = 'https://estro-schuster-1.myshopify.com/api/2023-04/graphql.json';
   const token = req.cookies.rishav; // Store the access token in the 'token' variable
  const query = {
    query: `query($token: String!) { 
      customer(customerAccessToken: $token) {
        id
        firstName
        lastName
        acceptsMarketing
        email
        phone
      }
    }`,
    variables: { token }, // Pass the token variable to the query variables
  };
 const headers = {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': storefront,
  };

  axios.post(graphqlEndpoint, query, { headers })
  .then(async (response) => {
    console.log(response.data.data.customer);
    if (!response.data.data.customer) {
        throw new Error('Customer not found'); // Throw an error
      }
      const customer = response.data.data.customer;
      const input = customer.id;
      const id = input.split('/').pop();
      console.log(id);
      const data = {
        "id" : id,
        "name" : customer.firstName + " " + customer.lastName,
        "email" : customer.email
      }
       res.send(data);
    // Handle the response data from the Shopify API
  })
  .catch((error) => {
    // console.log('Error:', error);
    console.log("authentication error")
    res.status(400).json("Unauthorised User")
    // Handle any errors that occurred during the request
  });
  
});

app.post('/api/get_auth_token' , async(req,res)=>{
  const {email , password}  = req.body;
  console.log(email ,password);
  try {
    const response = await axios.post(
      'https://estro-schuster-1.myshopify.com/api/2023-04/graphql.json',
      {
        query: `mutation customerAccessTokenCreate {
          customerAccessTokenCreate(input: {
            email: "${email}",
            password: "${password}"
          }) {
            customerAccessToken {
              accessToken
            }
            customerUserErrors {
              message
            }
          }
        }`,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': storefront,
        },
      }
    );
    console.log(response.data);
    const { customerAccessTokenCreate } = response.data.data;
    if (customerAccessTokenCreate.customerUserErrors.length > 0) {
      // Handle user errors
      console.log('User Errors:', customerAccessTokenCreate.customerUserErrors.length );
      res.status(400).json({ error: 'Invalid credentials' });
    } else {
      // Access the access token
      const { accessToken } = customerAccessTokenCreate.customerAccessToken;
      console.log('Access Token:', accessToken);
      res.cookie('rishav', accessToken, { 
        maxAge: 9000000,
        httpOnly: true,
        secure: true
      });
      res.json({ accessToken });
      
    }
  } catch (error) {
    console.log('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }


})



app.post('/api/get_Payment_Order_Session_ID' , async (req,res)=>{
  //  console.log(req.body);
  const data = await req.body;
  // console.log(data);
  const payload = data;
  const headers = {
    'Content-Type' : 'application/json',
    'x-api-version' : '2022-09-01',
    'x-client-id' : 'TEST387739db63524ad39d50dd8e80937783',
    'x-client-secret' : 'TEST9ed00193e6044bcd66d4f3819fee526ceac25bc0'
  }
  console.log("GEt Session ID ");
  console.log(payload);

  axios.post('https://sandbox.cashfree.com/pg/orders', payload, { headers })
  .then(response => {
    res.send(response.data);
    console.log('Response:');
  })
  .catch(error => {
    if(error.response.status === 409 ){
      console.log(error.response.status);
      res.status(409).send("Order Already Exists");
    }else{
        console.log(error.response.status);
        console.log(error.response.message);
    }
  });
});

app.post('/api/get_payload_for_paymnetOrder', async (req, res) => {
  try {
    const details = await req.body;
console.log(details);
    const headers = {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': admin
    };

    const response = await axios.post(
      'https://estro-schuster-1.myshopify.com/admin/api/2023-04/draft_orders.json',
      details,
      { headers }
    );
    const data = response.data.draft_order;
    // console.log(data.customer);
    
    const send_Data = {
      "order_id" : String(data.id),
      "order_amount" : String(data.line_items[0].price),
      "order_currency" : "INR",
      "order_note" : "Additional Info",
      "customer_details" : {
        "customer_id" : String(data.customer.id),
         "customer_name": data.customer.first_name + " " + data.customer.last_name,
         "customer_email": data.customer.email ? data.customer.email : data.shipping_address.email,
         "customer_phone": data.customer.phone ? data.customer.phone : data.shipping_address.phone, 
      }
    }
  console.log(send_Data);
    res.send(send_Data);

  } catch (error) {
    console.error('Error:', error.response.data);
    res.status(error.response.status || 500).send(error.response.data);
  }
});


app.get('/api/get_product_details' , async (req , res)=>{
     console.log(" get_product_details ");

    //  console.log(req.query.params);

     const product_id = await req.query.params;
     
     axios.get(`https://estro-schuster-1.myshopify.com/admin/api/2023-01/products/${product_id}.json` , {headers : {
      'X-Shopify-Access-Token' : admin
     }}).then(async response =>{
      // console.log(response.data);
      const product_data = await response.data.product;
      // console.log(product_data.title);
      const variants = product_data.variants.map(variant => {
  return {
    id: variant.id,
    title: variant.title
  };
});
// console.log(variants);
      const data_to_send = {
        title : product_data.title ,
        price : product_data.variants[0].price, 
        vendor : product_data.vendor ,
        variants : variants};
      // console.log(data_to_send);
      res.send(data_to_send);
     })
     .catch(err => {
      // console.log(err);
      res.send("Error in getting the product details");
      console.log("ERROR IN GETTING PRODUCT DETAILS");
     })
   


    //  res.send("HI this is your product id ");
});


app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
