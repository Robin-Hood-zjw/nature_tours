// /* eslint-disable import/newline-after-import */
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const app = require('./app');

// dotenv.config({ path: './conflg.env' });

// const DB = process.env.DATABASE.replace(
//   '<PASSWORD',
//   process.env.DATABASE_PASSWORD,
// );

// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
//   .then((con) => {
//     console.log(con.connections);
//     console.log('DB connections successfull');
//   });

// const port = process.env.PORT || 8000;
// app.listen(port, () => console.log(`App running port ${port}...`));

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://jiawenz:01491721Zjw@cluster0.vstyrml.mongodb.net/natours?retryWrites=true&w=majority';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!',
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
