import { createUser, uploadPhoto } from './utils';

async function asyncUploadUser() {
  let reponse = {};

  try {
    const photo = await uploadPhoto();
    const user = await createUser();
    reponse = { photo, user };
  } catch (err) {
    reponse = { photo: null, user: null };
  }
  return reponse;
}
export default asyncUploadUser
