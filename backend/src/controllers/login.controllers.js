const LoginCtrl = {}

const usuario = require('../models/usuario')
const jwt = require('jsonwebtoken')
LoginCtrl.register = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = new usuario({username,password});

    user.save((err) => {
        if(err) {
            res.status(500).send("Error al registrar usuario")
        }   
        else {
            res.status(200).send("Usuario registrado")
        }
    });
}

LoginCtrl.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    usuario.findOne({username}, (err,user) => {
        if(err){
            res.status(500).send("Error al autenticar al usuario");
        }
        else if(!user){
            res.status(500).send("El usuario no existe")
        }
        else {
            user.isCorrectPassword(password, (err,result) => {
                if(err){
                    res.status(500).send("Error al autenticar")
                }
                else if(result) {
                    res.status(200).send("Has iniciado sesión correctamente")
                    const user={username:username}
                    const accesToken = generateAccesToken(user)
                    res.header('authorization', accesToken).json({
                        message: 'Usuario autenticado',
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
    return jwt.sign(user,"claveSecreta",{expiresIn:'3m'})

}
function validateToken(req, res, next){
    const accesToken = req.headers['authorization'];
    if (!accesToken) {
        jwt.verify(accesToken,'claveSecreta',(err,user) => {
            if (err) {
                res.send('acces denied');
            }
            else {
                req.user=user;
                next();
            }
        })
    }
}
module.exports = LoginCtrl

