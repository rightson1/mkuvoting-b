import adminl from "firebase-admin";
import serviceAccount from "./ServiceAccount.json";

if (!adminl.apps.length) {
    try {
        adminl.initializeApp({
            credential: adminl.credential.cert(serviceAccount),
            secondaryApp: true,
        });
    } catch (error) {
        console.log("Firebase adminl initialization error", error.stack);
    }
}
export default adminl.firestore();