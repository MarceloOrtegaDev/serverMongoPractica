import { model, Schema } from 'mongoose';

const schemaUsers = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    userName: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
});

export const UserModel = model('User', schemaUsers);