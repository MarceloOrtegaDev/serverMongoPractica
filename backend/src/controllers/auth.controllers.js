
import { UserModel } from '../models/user.models.js'
import { hash, compare } from 'bcrypt'
import { createJwt } from '../helpers/createJwt.js'

export const registerUser = async (req, res) => {
try {
   const {email, userName, password} = req.body
   
   const newUser = new UserModel({email, userName,  password   
})

newUser.password = await hash(password, 10)

   await newUser.save()
   return res.status(201).json({msg: "Usuario registrado exitosamente"})
} catch (error) {
    console.log(error)
}}

export const sales = async (req, res) => {
    try {
        const { quantity, name, price } = req.body;
        const userId = req.user // Asegúrate de pasar el ID del usuario en la URL

        // Buscar al usuario por ID
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Actualizar las ventas del usuario
        user.sales.quantity += quantity; // Incrementar la cantidad de ventas
        user.sales.products.push({ name, price }); // Agregar el nuevo producto a la lista

        await user.save(); // Guardar los cambios en el usuario

        return res.status(200).json("Ventas actualizadas exitosamente");
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
};


export const loginUser = async (req, res) => {
try {
    const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        console.log(user)
        if (!user) return res.status(404).json({ message: "User not found" });

        const validPassword = await compare(password, user.password);

        if (!validPassword) {
            throw new Error("La contraseña es incorrecta")
        }
        
        const token = await createJwt(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600000
        })

        res.status(200).json({ message: "Login successful" });
        return user
} catch (error) {
    console.log(error)
}}

export const Logout = (_req, res) => {
try {
    res.clearCookie("token")
    res.status(200).json('Deslogueado correctamente')
} catch (error) {
    console.log(error)
}}

export const getUserById = (req, res) => {
try {
} catch (error) {
}}

export const getSession = async (req, res) => {
    try {
        res.status(200).json({message: "Session Activa", user: req.user})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
};
