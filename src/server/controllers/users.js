import passport from 'passport'
import jwt from 'jsonwebtoken'
import { User } from '../../models/index.js'

const JWT_SECRET = '#45657ghdfd/we45vdf!!5dfg,gdr456SAEDsvSD##@@Evsd34gf34d!@%^**scs'

export async function createUser({
    fullname,
    username,
    password
}){
    return await User.create({
        fullname,
        username,
        password
    })
}

export async function getUser({username}){
    return await User.findOne({ where: { username }})
}

function returnCreatedUser(req, res){
    res.status(201).send(`User "${req.user.fullname}" has been created`)
}

function returnAuthInfo(req, res){
    if(!req.user){
        res.status(401).send('Invalid username or password')
    }

    const { id, username} = req.user
    const payload = {
        user: { id, username}
    }
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: 30}) ;

    res.json({
        token
    })
}

export const signup = [
    passport.authenticate('signup', {session: false}),
    returnCreatedUser
]

export const login = [
    passport.authenticate('login', { session: false }),
    returnAuthInfo,
]