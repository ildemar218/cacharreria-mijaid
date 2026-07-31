import bcrypt from "bcrypt";
import {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  cambiarEstadoUsuario,
  buscarUsuarioPorCorreo,
} from "../models/usuarioModel.js";

/**
 * Listar todos los usuarios
 */
export async function listarUsuarios(req, res) {
  try {
    const usuarios = await obtenerUsuarios();

    res.json(usuarios);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los usuarios.",
      error: error.message,
    });
  }
}

/**
 * Obtener un usuario por ID
 */
export async function obtenerUsuario(req, res) {
  try {
    const usuario = await obtenerUsuarioPorId(req.params.id);

    if (!usuario) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado.",
      });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener el usuario.",
      error: error.message,
    });
  }
}

/**
 * Crear usuario
 */
export async function registrarUsuario(req, res) {
  try {
    const { nombre, apellido, correo, password, rol } = req.body;

    if (!nombre || !apellido || !correo || !password || !rol) {
      return res.status(400).json({
        mensaje: "Todos los campos son obligatorios.",
      });
    }

    const existe = await buscarUsuarioPorCorreo(correo);

    if (existe) {
      return res.status(409).json({
        mensaje: "El correo ya está registrado.",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const id = await crearUsuario({
      nombre,
      apellido,
      correo,
      password: passwordHash,
      rol,
    });

    res.status(201).json({
      mensaje: "Usuario creado correctamente.",
      id_usuario: id,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear el usuario.",
      error: error.message,
    });
  }
}

/**
 * Actualizar usuario
 */
export async function editarUsuario(req, res) {
  try {
    const filas = await actualizarUsuario(req.params.id, req.body);

    if (filas === 0) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado.",
      });
    }

    res.json({
      mensaje: "Usuario actualizado correctamente.",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar el usuario.",
      error: error.message,
    });
  }
}

/**
 * Activar / Desactivar usuario
 */
export async function cambiarEstado(req, res) {
  try {
    const { estado } = req.body;

    const filas = await cambiarEstadoUsuario(req.params.id, estado);

    if (filas === 0) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado.",
      });
    }

    res.json({
      mensaje: "Estado actualizado correctamente.",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar el estado.",
      error: error.message,
    });
  }
}