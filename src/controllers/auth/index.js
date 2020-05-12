// Firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export async function registerEmail(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      status: false,
      message: 'No se enviaron los parametros completos'
    });
    return next();
  }
  if (password.length < 8) {
    res.status(400).json({
      status: false,
      message: 'La contraseña debe tener al menos 8 caracteres'
    });
    return next();
  }
  try {
    const resFirebase = await firebase.auth().createUserWithEmailAndPassword(email, password);
    return res.status(201).json({
      status: true,
      message: '¡Usuario creado exitosamente!',
      user: resFirebase.user
    });
  } catch (error) {
    let message = 'Ocurrió un error inesperado, por favor contacte al soporte técnico.';
    if (error.code) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          message = 'Correo ya registrado.';
          break;
        case 'auth/invalid-email':
          message = 'Correo no válido.';
          break;
        case 'auth/operation-not-allowed':
          message = 'Operación no permitida, por favor contacte al soporte técnico.';
          break;
        case 'auth/weak-password':
          message = 'La contraseña es muy débil.';
          break;
        default:
          message = 'Ocurrió un error inesperado, por favor contacte al soporte técnico.';
      }
    }
    return res.status(401).json({
      status: false,
      message: message
    });
  }
}
