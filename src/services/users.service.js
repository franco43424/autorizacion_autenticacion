import { prisma } from '../prismaLunar.js';

export const guardarUsuario = async (usuarioAGuardar) => {
    try {
        // 1) REVISAR QUE EL RUT NO ESTE REGISTRADO
        var personaBuscada = await prisma.user.findUnique(
            {
                where: { "rut": usuarioAGuardar.rut }
            }
        )

        if (personaBuscada == null) {
            // 1.B) SI NO ESTA, LO GUARDO
            const nuevoUsuario = await prisma.user.create({
                data: usuarioAGuardar
            });
            return nuevoUsuario;
        } else {
            // 1.A) SI ESTA, DEVUELVO ERROR CON MENSAJE DE QUE YA EXISTE
            console.log('Nos moricimos porque ya existe');
            return { Estado: 500, mensaje: 'Nos moricimos porque ya existe' };
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const eliminarUsuario = async (rutAEliminar) => {
    try {
        // 1) REVISAR QUE EL RUT NO ESTE REGISTRADO
        var personaBuscada = await prisma.user.findUnique({ where: { "rut": rutAEliminar } })
        if (personaBuscada == null) {
            // 1.A) SI ESTA, DEVUELVO ERROR CON MENSAJE DE QUE NO EXISTE
            console.log('El rut a eliminar no existe');
            return { Estado: 404, mensaje: 'El rut a eliminar no existe' };
        } else {
            // 1.B) SI ESTA, LO ELIMINO
            const usuarioEliminado = await prisma.user.delete({
                where: {
                    rut: rutAEliminar
                }
            });
            return usuarioEliminado;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const actualizarUsuario = async (usuarioActualizando, rut) => {
    try {
        // 1) REVISAR QUE EL RUT ESTE REGISTRADO
        var personaBuscada = await prisma.user.findUnique({ where: { "rut": rut } })
        if (personaBuscada == null) {
            // 1.A) SI NO ESTA, DEVUELVO ERROR CON MENSAJE DE QUE NO EXISTE
            console.log('No hay uno que actualizar');
            return { Estado: 404, mensaje: 'No existe rut a actualizar' };
        } else {
            // 1.B) SI ESTA, LO ACTUALIZAO
            const updatedUsuario = await prisma.user.update({
                data: usuarioActualizando,
                where: { rut }
            });
            return updatedUsuario;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};


export const obtenerTodosUsuarios = async () => {
    return await prisma.user.findMany();
};
export const obtenerUnoPorRut = async (rut) => {
    return await prisma.user.findUnique({
        where: {
            rut
        }
    });
};

export const loginUsuario = async (dataEntrante) => {
    try {
        if (dataEntrante.rut === "" && dataEntrante.password === "") {
            return {
                status: 400,
                message: "Debe ingresar rut y contraseña"
            };
        }

        const usuarioEncontrado = await prisma.user.findFirst({
            select: {
                rut: true,
                name: true,
                fSurname: true,
                mSurname: true,
                userType: true
            },
            where: {
                AND: [
                    {
                        rut: dataEntrante.rut
                    },
                    {
                        password: dataEntrante.password
                    }
                ]
            },
        });

        if (usuarioEncontrado === null) {
            return {
                status: 404,
                message: "Usuario o Contraseña incorrectas"
            };
        }

        return {
            status: 200,
            usuario: usuarioEncontrado
        };
    } catch (error) {
        console.log('error en login', error.message);
        return {
            status: 500,
            message: "El servidor falló"
        };
    }
}