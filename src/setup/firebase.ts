import { initializeApp, ServiceAccount } from 'firebase-admin/app';
import { credential } from "firebase-admin";
const firebasCofig = () => {
    const serviceAccount = JSON.parse(
        process.env.GOOGLE_APPLICATION_CREDENTIALS!
    );
    initializeApp({
        credential: credential.cert(serviceAccount as ServiceAccount),
    });
}
export default firebasCofig;