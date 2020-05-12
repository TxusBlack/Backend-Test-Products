import * as admin from 'firebase-admin';

export function verifySession(access_token) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await admin.auth().verifyIdToken(access_token);
      resolve(user.uid);
    } catch (error) {
      console.log('error in verifySession', error.code);
      reject(error.message);
    }
  });
}
