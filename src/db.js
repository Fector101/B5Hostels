const mongoose = require('mongoose')

let cachedDB = null;
const uri = process.env.MONGODB_URI
if (!uri){
    throw new Error('Please add URI to env vars')
}

async function connectToDatabase() {
    if(cachedDB){
        console.log('Using Cache DB connection')
        return cachedDB
    }
    console.log('Creating new DB connection')
    const client = await mongoose.connect( uri )
    cachedDB = client
    
    return cachedDB
}


module.exports = connectToDatabase
