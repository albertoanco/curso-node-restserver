const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query; /* los query aun se envien numeros se reciben como string */
    const query = { estado : true };

    /*const usuarios = await Usuario.find(query)
                            .skip(Number(desde))
                            .limit(Number(limite));

    const total = await Usuario.countDocuments(query); */

    // Promise.all devuelve un arreglo de promesas
    const [ total, usuarios ] = await Promise.all([
                            Usuario.countDocuments(query),
                            Usuario.find(query)
                                    .skip(Number(desde))
                                    .limit(Number(limite))
                        ])

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async (req = request, res) => {

    const { nombre, correo, password, rol } = req.body; // { google, .. resto }

    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(); /* nro de vueltas para hacer mas complicado la encriptacion */
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en BD
    await usuario.save();

    res.json(usuario);
}

const usuariosPut = async (req = request, res) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body

    // TODO validar contra la base de datos
    if (password) {
        const salt = bcryptjs.genSaltSync(); 
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}

const usuariosDelete = async (req = request, res) => {

    const { id } = req.params;

    // Fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, { estado : false });

    res.json(usuario);
}

module.exports = {
    usuariosGet
    , usuariosPost
    , usuariosPut
    , usuariosDelete
}