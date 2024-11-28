import mongoose from "mongoose";


const urlConnection =  'mongodb+srv://Elkin:12345@cluster0.zgghc.mongodb.net/permisos'

export async function connectionDBMongoose(){
    try {
        await mongoose.connect(urlConnection);
        console.log('conected to db');
    } catch (error) {
        console.log(error);
    }
}
