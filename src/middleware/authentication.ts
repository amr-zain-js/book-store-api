import { NextFunction, Response } from 'express';
import { auth, firestore } from 'firebase-admin';

const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers['authorization'];
    if (!token || !token.startsWith('Bearer ')) {
        return next();
    }
    token = token.split(' ')[1];
    try {
        const decoded = await auth().verifyIdToken(token);
        const userSnapshot = await firestore()
            .collection('users')
            .where('id', '==', decoded.uid)  
            .limit(1)
            .get();

        if (userSnapshot.empty) {
            console.log(`No user document found with UID: ${decoded.uid}`);
        }
        const userDoc = userSnapshot.docs[0];

        req['user'] = {...userDoc.data()};
        next();
    } catch (error) {
        console.error('Token is invalid:', error);
        next();
    }

};


export default authenticateUser;
