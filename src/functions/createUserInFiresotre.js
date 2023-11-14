import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const createUserInFirestore = async (user) => {
  try {
    const { uid, email, userName, skinType } = user;
    await setDoc(doc(db, "Users", uid), {
      uid: uid,
      email: email,
      userName: userName,
      skinType: skinType,
    });
    console.log("User data added to Firestore.");
  } catch (error) {
    console.error("Error adding user data to Firestore: ", error);
  }
};

export default createUserInFirestore;
