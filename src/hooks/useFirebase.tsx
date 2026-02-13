/// <reference types="vite/client" />
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, type Unsubscribe } from 'firebase/auth';
import { signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { routing } from '@/types/web-routing';
import { commonFunctions } from '@/hooks/useCommonFunctions.tsx';

const firebaseConfig = {
    apiKey            : import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain        : import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId         : import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket     : import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId : import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId             : import.meta.env.VITE_FIREBASE_APP_ID
};

//initialize the firebase app
initializeApp(firebaseConfig)

//initialize firebase auth
const auth = getAuth()
let unwatchAuthState: Unsubscribe = () => {}

const { toast } = commonFunctions;

const FirebaseHook = {
    watchAuthState() {
        unwatchAuthState = onAuthStateChanged(auth, user => {
            if (!user) {
                // console.log('User is not authenticated');
                window.location.href = routing.home;
            } 
            // else {
                // console.log('User is authenticated');
            // }
        })
        if (!unwatchAuthState) {
            console.log("problems watching auth state")
        }
    },
    
    async firebaseLogin(email: string, password: string): Promise<any> {
        let errorMessage: string;

        return await signInWithEmailAndPassword(auth, email, password).then((res) => {
            return res.user.getIdToken(true)
        }).catch(function(error) {
            switch (error.code) {
                case 'auth/invalid-email':
                    errorMessage = 'Wrong Email';
                    break;
                case 'auth/user-not-found':
                    errorMessage = 'Wrong User';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Wrong password';
                    break;
                default:
                    errorMessage = 'Too many attempts, try in 1 hour';
                    break;
            }

            setTimeout(() => toast('error', errorMessage), 2000);

            return null;
        })
    },

    async recover(email: string) {
        return await sendPasswordResetEmail(auth, email).then(() => {
            return true;
        }).catch(function() {
            setTimeout(() => toast('error', "Wrong email"), 2000);            
        })
    },

    async firebaseLogout(logout: Function, destroyAuthToken: Function){
        await signOut(auth).then(() => {
            logout();
            destroyAuthToken();
            window.location.href = routing.home;
        }).catch((error) => {
            console.log(error);
        });
    },

    // async signup(email: string, password: string){
    //     var errorMessage = null;

    //     return await createUserWithEmailAndPassword(auth, email, password).then(() => {
    //         toast('success', 'User created correctly');
            
    //         return true;
    //     }).catch(function(error) {
    //         switch (error.code) {
    //             case 'auth/invalid-email':
    //                 errorMessage = 'Wrong Email'
    //                 break;
    //             case 'auth/email-already-in-use':
    //                 errorMessage = 'User already exists';
    //                 break;
    //             default:
    //                 errorMessage = 'System error';
    //                 break;
    //         }
    //         toast('error', errorMessage);
            
    //         return false;
    //     })
    // }
}

export default FirebaseHook;