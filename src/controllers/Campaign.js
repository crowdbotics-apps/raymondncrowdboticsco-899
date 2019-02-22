import firebase from 'react-native-firebase';

const auth = firebase.auth();
const store = firebase.firestore();

const getCampaignById = async campaignId =>
  new Promise((resolve, reject) => {
    let collection = store.collection('campaigns');
    let campaignDoc = collection.doc(campaignId);
    campaignDoc.onSnapshot(async snapshot => {
      let campaignData = snapshot.data();

      let participantDoc = store
        .collection('participant_groups')
        .doc(campaignData.participant_group_id);
      participantDoc.onSnapshot(group_snapshot => {
        let participant_group_data = group_snapshot.data();
        campaignData.participant_group = participant_group_data;
        resolve(campaignData);
      });
    });
  });

const getCampaigns = async () => {
  try {
    let collection = store.collection('campaigns');
    let snapshot = await collection.get();
    let tasks = snapshot.docs.map(campaignDoc => getCampaignById(campaignDoc.id));
    let campaigns = await Promise.all(tasks);
    campaigns = campaigns.filter(campaign => {
      let index = campaign.participant_group.participant_list.findIndex(
        item => item.email === auth.currentUser.email
      );
      let from = new Date(campaign.from),
        to = new Date(campaign.to);
      let today = new Date();
      if (today < from) {
        return false;
      }
      if (today > to) {
        return false;
      }
      return index > -1;
    });
    return campaigns;
  } catch (error) {
    throw error;
  }
};

export default {
  getCampaignById,
  getCampaigns
};
