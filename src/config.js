import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

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
export const storage = firebase.storage();

export const createStuDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.collection("students").doc(`${user.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email } = user;
    const { stuname, stunum, stulastname, stuparent, croom, nroom, cid } = additionalData;
    var sid;
    if (croom === "1") {
      sid = [
        "thai1",
        "english1",
        "math1",
        "science1",
        "computer1",
        "social1",
        "pe1",
        "art1",
        "career1",
        "guidance1",
      ];
    } else if (croom === "2") {
      sid = [
        "thai2",
        "english2",
        "math2",
        "science2",
        "computer2",
        "social2",
        "pe2",
        "art2",
        "career2",
        "guidance2",
      ];
    } else if (croom === "3") {
      sid = [
        "thai3",
        "english3",
        "math3",
        "science3",
        "computer3",
        "social3",
        "pe3",
        "art3",
        "career3",
        "guidance3",
      ];
    } else if (croom === "4") {
      sid = [
        "thai4",
        "english4",
        "math4",
        "science4",
        "computer4",
        "social4",
        "pe4",
        "art4",
        "career4",
        "guidance4",
      ];
    } else if (croom === "5") {
      sid = [
        "thai5",
        "english5",
        "math5",
        "science5",
        "computer5",
        "social5",
        "pe5",
        "art5",
        "career5",
        "guidance5",
      ];
    } else if (croom === "6") {
      sid = [
        "thai6",
        "english6",
        "math6",
        "science6",
        "computer6",
        "social6",
        "pe6",
        "art6",
        "career6",
        "guidance6",
      ];
    }
    try {
      await userRef.set({
        stuname,
        email,
        stunum,
        stulastname,
        stuparent,
        croom,
        nroom,
        cid,
        uid: user.uid,
        sid: sid,
      });
    } catch (error) {
      console.log("Error in creating students", error);
    }
  }
};

export const createTeaDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.collection("teachers").doc(`${user.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email } = user;
    const { teaname, tealastname, teanum, croom, nroom, cid, tel, room, sid } =
      additionalData;
    var sj;
    if (sid === "thai1") {
      sj = "thai";
    } else if (sid === "english1") {
      sj = "english";
    } else if (sid === "math1") {
      sj = "math";
    } else if (sid === "science1") {
      sj = "science";
    } else if (sid === "computer1") {
      sj = "computer";
    } else if (sid === "social1") {
      sj = "social";
    } else if (sid === "pe1") {
      sj = "pe";
    } else if (sid === "art1") {
      sj = "art";
    } else if (sid === "career1") {
      sj = "career";
    } else if (sid === "guidance1") {
      sj = "guidance";
    } else if (sid === "thai2") {
      sj = "thai";
    } else if (sid === "english2") {
      sj = "english";
    } else if (sid === "math2") {
      sj = "math";
    } else if (sid === "science2") {
      sj = "science";
    } else if (sid === "computer2") {
      sj = "computer";
    } else if (sid === "social2") {
      sj = "social";
    } else if (sid === "pe2") {
      sj = "pe";
    } else if (sid === "art2") {
      sj = "art";
    } else if (sid === "career2") {
      sj = "career";
    } else if (sid === "guidance2") {
      sj = "guidance";
    } else if (sid === "thai3") {
      sj = "thai";
    } else if (sid === "english3") {
      sj = "english";
    } else if (sid === "math3") {
      sj = "math";
    } else if (sid === "science3") {
      sj = "science";
    } else if (sid === "computer3") {
      sj = "computer";
    } else if (sid === "social3") {
      sj = "social";
    } else if (sid === "pe3") {
      sj = "pe";
    } else if (sid === "art3") {
      sj = "art";
    } else if (sid === "career3") {
      sj = "career";
    } else if (sid === "guidance3") {
      sj = "guidance";
    } else if (sid === "thai4") {
      sj = "thai";
    } else if (sid === "english4") {
      sj = "english";
    } else if (sid === "math4") {
      sj = "math";
    } else if (sid === "science4") {
      sj = "science";
    } else if (sid === "computer4") {
      sj = "computer";
    } else if (sid === "social4") {
      sj = "social";
    } else if (sid === "pe4") {
      sj = "pe";
    } else if (sid === "art4") {
      sj = "art";
    } else if (sid === "career4") {
      sj = "career";
    } else if (sid === "guidance4") {
      sj = "guidance";
    } else if (sid === "thai5") {
      sj = "thai";
    } else if (sid === "english5") {
      sj = "english";
    } else if (sid === "math5") {
      sj = "math";
    } else if (sid === "science5") {
      sj = "science";
    } else if (sid === "computer5") {
      sj = "computer";
    } else if (sid === "social5") {
      sj = "social";
    } else if (sid === "pe5") {
      sj = "pe";
    } else if (sid === "art5") {
      sj = "art";
    } else if (sid === "career5") {
      sj = "career";
    } else if (sid === "guidance5") {
      sj = "guidance";
    } else if (sid === "thai6") {
      sj = "thai";
    } else if (sid === "english6") {
      sj = "english";
    } else if (sid === "math6") {
      sj = "math";
    } else if (sid === "science6") {
      sj = "science";
    } else if (sid === "computer6") {
      sj = "computer";
    } else if (sid === "social6") {
      sj = "social";
    } else if (sid === "pe6") {
      sj = "pe";
    } else if (sid === "art6") {
      sj = "art";
    } else if (sid === "career6") {
      sj = "career";
    } else if (sid === "guidance6") {
      sj = "guidance";
    }

    try {
      await userRef.set({
        teaname,
        tealastname,
        email,
        teanum,
        croom,
        nroom,
        cid,
        tel,
        room,
        sid,
        uid: user.uid,
        sj: sj,
      });
    } catch (error) {
      console.log("Error in creating teacher", error);
    }
  }
};

export default firebaseConfig;
