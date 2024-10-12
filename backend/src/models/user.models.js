import { model, Schema } from 'mongoose';

const schemaUsers = new Schema({
        email: {
            type: String,
            required: true,
            unique: true
        },
        userName: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
    sales: {
        quantity:{
            type: Number,
            default: 0
        },
        products: [{
            name: {
                type: String,
            },
            price:{
                type: Number,
            }
        }]
    }
});

export const UserModel = model('User', schemaUsers);