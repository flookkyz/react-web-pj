import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyDfLVowRODd_-LtNrrEPEofm-2Gb2kf_F0",
  authDomain: "pj-time.firebaseapp.com",
  projectId: "pj-time",
  storageBucket: "pj-time.appspot.com",
  messagingSenderId: "548881226627",
  appId: "1:548881226627:web:a4e0e327cc4a3793eaf4b6",
  measurementId: "G-5K375YQ0DJ",
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createStuDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.collection('students').doc(`${user.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email } = user;
    const { stuname, stunum, croom, nroom, cid } = additionalData;

    try {
      await userRef.set({
        stuname,
        email,
        stunum,
        croom,
        nroom,
        cid,
      });
    } catch (error) {
      console.log("Error in creating students", error);
    }
  }
};

export const createTeaDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.collection('teachers').doc(`${user.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email } = user;
    const { teaname, teanum, croom, nroom, cid } = additionalData;

    try {
      await userRef.set({
        teaname,
        email,
        teanum,
        croom,
        nroom,
        cid,
      });
    } catch (error) {
      console.log("Error in creating teacher", error);
    }
  }
};
export default firebaseConfig;
