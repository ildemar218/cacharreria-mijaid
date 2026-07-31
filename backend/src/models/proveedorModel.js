import pool from "../config/database.js";

export async function obtenerProveedores() {

    const [rows] = await pool.execute(
        "SELECT * FROM proveedores ORDER BY id_proveedor DESC"
    );

    return rows;

}

export async function obtenerProveedor(id) {

    const [rows] = await pool.execute(
        "SELECT * FROM proveedores WHERE id_proveedor=?",
        [id]
    );

    return rows[0];

}

export async function crearProveedor(proveedor) {

    const {
        nombre_empresa,
        contacto,
        telefono,
        correo,
        direccion
    } = proveedor;

    const [resultado] = await pool.execute(

        `INSERT INTO proveedores
        (
            nombre_empresa,
            contacto,
            telefono,
            correo,
            direccion
        )
        VALUES(?,?,?,?,?)`,

        [
            nombre_empresa,
            contacto,
            telefono,
            correo,
            direccion
        ]

    );

    return resultado.insertId;

}

export async function actualizarProveedor(id, proveedor){

    const {
        nombre_empresa,
        contacto,
        telefono,
        correo,
        direccion
    } = proveedor;

    const [resultado] = await pool.execute(

        `UPDATE proveedores
        SET
        nombre_empresa=?,
        contacto=?,
        telefono=?,
        correo=?,
        direccion=?
        WHERE id_proveedor=?`,

        [
            nombre_empresa,
            contacto,
            telefono,
            correo,
            direccion,
            id
        ]

    );

    return resultado.affectedRows;

}

export async function cambiarEstadoProveedor(id, estado){

    const [resultado] = await pool.execute(

        `UPDATE proveedores
        SET estado=?
        WHERE id_proveedor=?`,

        [
            estado,
            id
        ]

    );

    return resultado.affectedRows;

}