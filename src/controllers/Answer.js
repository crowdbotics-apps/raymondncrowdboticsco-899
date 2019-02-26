import firebase from 'react-native-firebase';

const store = firebase.firestore();
const auth = firebase.auth();

const updateAnswers = async (campaignId, answers) => {
  const collection = store.collection('answers');
  let answerRef = collection.doc(`${campaignId}-${auth.currentUser.uid}`);
  let answerDoc = await answerRef.get();

  let data = {};
  answers.map((item, index) => {
    data[`${index}`] = item;
  });
  if (answerDoc.exists) {
    answerRef.update({
      answers: data
    });
  } else {
    answerRef.set({
      answers: data,
      reward: 0
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
