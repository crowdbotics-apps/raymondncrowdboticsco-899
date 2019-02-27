import firebase from 'react-native-firebase';

const store = firebase.firestore();
const auth = firebase.auth();

const updateAnswers = async (campaignId, answers, reward, complete) => {
  const collection = store.collection('answers');
  let answerRef = collection.doc(`${campaignId}-${auth.currentUser.uid}`);
  let answerDoc = await answerRef.get();

  if (answerDoc.exists) {
    answerRef.update({
      answers,
      reward,
      complete
    });
  } else {
    answerRef.set({
      answers,
      reward,
      complete
    });
  }
};

const getAnswerByUserCampaign = async campaignId => {
  const collection = store.collection('answers');
  try {
    let answerRef = collection.doc(`${campaignId}-${auth.currentUser.uid}`);
    let answerDoc = await answerRef.get();
    if (answerDoc.exists) {
      return answerDoc.data();
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export default {
  updateAnswers,
  getAnswerByUserCampaign
};
