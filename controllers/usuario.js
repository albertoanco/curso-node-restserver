const { request, response } = require('express');

const usuariosGet = (req = request, res = response) => {

    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query

    res.json({
        ok: true,
        msg: 'get API - controlador',
        q, 
        nombre,
        apikey,
        page,
        limit
    });
}

const usuariosPost = (req = request, res) => {

    const { nombre, edad } = req.body;

    res.json({
        ok: true,
        msg: 'post API - controlador',
        nombre,
        edad
    });
}

const usuariosPut = (req, res) => {

    const id = req.params.id;

    res.json({
        ok: true,
        msg: 'put API - controlador',
        id
    });
}

const usuariosDelete = (req, res) => {
    res.json({
        ok: true,
        msg: 'delete API - controlador'
    });
}

module.exports = {
    usuariosGet
    , usuariosPost
    , usuariosPut
    , usuariosDelete
}