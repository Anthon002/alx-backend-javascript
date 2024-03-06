import {createUser, uploadPhoto} from './utils';

export default function handleProfileSignup() {
  return Promise
    .all([uploadPhoto(), createUser()])
    .then((reponse) => {
      console.log(`${reponse[0].body} ${reponse[1].firstName} ${reponse[1].lastName}`);
    })
    .catch(() => console.log('Signup system offline'));
}
