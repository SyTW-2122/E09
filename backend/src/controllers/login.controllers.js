const LoginCtrl = {}
const express = require('express')
const usuario = require('../models/usuario')
const jwt = require('jsonwebtoken')
LoginCtrl.register = (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const user = new usuario({username,email,password});
    user.save((err) => {
        if(err) {
            if(err.code == 11000) {
                res.status(500).send("El usuario/email proporcionado ya existe.")
            }
            else {
                res.status(500).send("Error al registrar el usuario")
            }
        }
        else {
            res.status(200).send("Usuario registrado")
        }
    });
    
}

LoginCtrl.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    usuario.findOne({"email": email}, (err,user) => {
        let nombre=user.username
        if(err){
            res.status(500).send("Error al autenticar al usuario");
        }
        else if(!user){
            res.status(500).send("El email no existe")
        }
        else {
            user.isCorrectPassword(password, (err,result) => {
                if(err){
                    res.status(500).send("Error al autenticar")
                }
                else if(result) {
                    const user={nombreUsuario:nombre}
                    const accesToken = generateAccesToken(user)
                    res.header('authorization', accesToken).json({
                        expiresIn: '300',
                        token: accesToken
                    })
                }
                else {
                    res.status(500).send("Usuario y/o contraseña incorrecta")
                }
            });
        }
    })
}

function generateAccesToken(user){
    return jwt.sign(user,"claveSecreta",{expiresIn:'300m'})
}

LoginCtrl.validateToken = function(req, res) {
    const accesToken = req.headers['authorization'] || req.query.accessToken;
    console.log(accesToken)
    if (!accesToken) res.status(500).send("Acces denied")
    else {
        jwt.verify(accesToken, 'claveSecreta', (err, user) => {
            if (err) {
                res.status(403).send('acces denied');
            }
            else {
                req.user = user;
                res.status(200).send("Acceso permitido")
            }
        })
    }
}

LoginCtrl.deleteUser = async function(req,res) {
    const userToDelete = req.body.username
    const userPassw = req.body.password
    usuario.findOne({"username": userToDelete}, (err, user) => {
        if(err){
            res.status(500).send("Error al autenticar al usuario");
        }
        else if(!user){
            res.status(500).send("El usuario no existe")
        }
        else {
            user.isCorrectPassword(userPassw, (err,result) => {
                if(err){
                    res.status(500).send("Error al autenticar")
                }
                else if(result) {
                    usuario.findOneAndDelete({"username": userToDelete}, (err) => {
                        if (err)
                            console.log(err)
                        else {
                            res.status(200).send(`El usuario ${userToDelete} ha sido eliminado correctamente`)
                        }
                    })
                }
                else {
                    res.status(500).send("Usuario y/o contraseña incorrecta")
                }
            });
        }
    })
}

module.exports = LoginCtrl

