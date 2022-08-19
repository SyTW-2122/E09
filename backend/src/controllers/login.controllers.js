const LoginCtrl = {}

const usuario = require('../models/usuario')

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
                }
                else {
                    res.status(500).send("Usuario y/o contraseña incorrecta")
                }
            });
        }
    })
}


module.exports = LoginCtrl