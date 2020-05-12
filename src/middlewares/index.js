const admin = require('firebase-admin');

export function verifySession(access_token) {
  return new Promise(async (resolve, reject) => {
    try {
      if (access_token) {
        const user = await admin.auth().verifyIdToken(access_token);
        resolve(user.uid);
      } else {
        reject({ message: 'Falta enviar el token de la sesión' });
      }
    } catch (error) {
      console.log('error in verifySession', error.code);
      reject(error);
    }
  });
}
