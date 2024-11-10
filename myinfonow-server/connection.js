import mongoose from 'mongoose';

const uri = process.env.ATLAS_URI || ""; 

async function connectToDatabase() {
  try {
    await mongoose.connect(uri, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
      dbName: "myinfonow"
    });
    console.log('Connected to MongoDB using Mongoose!');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

connectToDatabase();

export default mongoose.connection;
