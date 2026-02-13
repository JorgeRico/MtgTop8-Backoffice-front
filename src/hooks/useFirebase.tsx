/// <reference types="vite/client" />
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, type Unsubscribe } from 'firebase/auth';
import { signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { routing } from '@/types/web-routing';
import { firebaseConfig } from '@/types/firebase-config';
import { commonFunctions } from '@/hooks/useCommonFunctions.tsx';

const { toast } = commonFunctions;
//initialize the firebase app
initializeApp(firebaseConfig)
//initialize firebase auth
const auth = getAuth()
let unwatchAuthState: Unsubscribe = () => {}

const FirebaseHook = {
    watchAuthState() {
        unwatchAuthState = onAuthStateChanged(auth, user => {
            if (!user) {
                // console.log('User is not authenticated');
                window.location.href = routing.home;
            }
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