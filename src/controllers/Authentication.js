import firebase from 'react-native-firebase';

const auth = firebase.auth();
const store = firebase.firestore();

const currentUser = auth.currentUser;

const signup = async payload => {
  try {
    let user = await auth.createUserWithEmailAndPassword(payload.email, payload.password);
    user.user.sendEmailVerification();
    await user.user.updateProfile({
      displayName: payload.name
    });
    let ref = store.collection('users').doc(user.user.uid);
    await store.runTransaction(async transaction => {
      const doc = await transaction.get(ref);

      if (!doc.exists) {
        transaction.set(ref, {
          id: user.user.uid,
          ...payload
        });
      }
      return user;
    });
    return user;
  } catch (error) {
    throw error;
  }
};

const login = async payload => {
  try {
    let { email, password } = payload;
    let user = await auth.signInWithEmailAndPassword(email, password);
    return user;
  } catch (error) {
    throw error;
  }
};

export default { currentUser, signup, login };
