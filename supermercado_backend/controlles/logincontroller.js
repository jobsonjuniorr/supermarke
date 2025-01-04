import bcrytp from 'bcryptjs'
import {createUser, findUserByEmail} from '../models/login.js'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

export const regiters  = async (req, res) =>{
    const {email,password} = req.body
    try{
        const existingUser = await findUserByEmail(email)
        if(existingUser){
            res.status(400).json({message:'Email já está cadastrado'})
        }
        const hashedPassword = await bcrytp.hash(password,10)

        const idUser =  await createUser(email, hashedPassword)
        res.status(201).json({message:'Usuário registrado com sucesso',idUser})
    }catch(err){
        console.error('Erro ao registrar usuário:', err);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
}
export const login = async (req,res) =>{
    const {email, password} = req.body
    try{
        const user = await findUserByEmail(email)
        if(!user){
            res.status(404).json({message:'Usuário não encontrado'})
        }
        const isPasswordValid = await bcrytp.compare(password, user.senha)
        if(!isPasswordValid){
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }
        const token = jwt.sign({id:user.id, email: user.email}, process.env.SECRET_KEY,{expiresIn: '1h'})
        res.status(200).json({ message: 'Login bem-sucedido.', token });
    }catch(err){
        console.error('Erro ao fazer o login do usuário:', err);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
}
