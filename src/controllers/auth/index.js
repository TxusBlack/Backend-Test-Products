import firebase from "firebase/app";
import "firebase/auth";

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
    const user = {
      uid: resFirebase.user.uid,
      email: resFirebase.user.email,
      accessToken: await resFirebase.user.getIdToken()
    }
    return res.status(200).json({
      status: true,
      message: '¡Usuario creado exitosamente!',
      user
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
      message
    });
  }
}

export async function loginEmail(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      status: false,
      message: 'No se enviaron los parametros completos'
    });
    return next();
  }

  try {
    const resFirebase = await firebase.auth().signInWithEmailAndPassword(email, password);
    const user = {
      uid: resFirebase.user.uid,
      email: resFirebase.user.email,
      accessToken: await resFirebase.user.getIdToken()
    }
    return res.status(200).json({
      status: true,
      message: '¡Login exitoso!',
      user
    });
  } catch (error) {
    let message = 'Ocurrió un error inesperado, por favor contacte al soporte técnico.';
    switch (error.code) {
      case 'auth/invalid-email':
        message = 'Correo no válido.';
        break;
      case 'auth/user-disabled':
        message = 'Esta cuenta ha sido deshabilitada.';
        break;
      case 'auth/user-not-found':
        message = 'Usuario no encontrado.';
        break;
      case 'auth/wrong-password':
        message = 'Contraseña incorrecta.';
        break;
      default:
        message = 'Ocurrió un error inesperado, por favor contacte al soporte técnico.';
    }
    res.status(401).json({
      status: false,
      message
    });
  }
}
