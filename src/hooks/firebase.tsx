/// <reference types="vite/client" />
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, type Unsubscribe } from 'firebase/auth';
import { signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import Cookies from 'js-cookie';
import { routing } from '../types/web-routing';
import { toast } from './toast';

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

const FirebaseHook = {
    watchAuthState() {
        unwatchAuthState = onAuthStateChanged(auth, user => {
            if (!user) {
                // console.log('User is not authenticated');
                Cookies.remove('authToken');
                window.location.href = routing.home;
            } else {
                // console.log('User is authenticated');
                console.log(Cookies.get('authToken'))
            }
        })
        if (!unwatchAuthState) {
            console.log("problems watching auth state")
        }
    },
    
    async login(email: string, password: string) {
        let errorMessage: string;

        await signInWithEmailAndPassword(auth, email, password).then((res) => {
            res.user.getIdToken(true).then((token) => {
                Cookies.set('authToken', token);
                window.location.href = routing.dashboard;
            })
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
        })
    },

    async recover(email: string) {              
        return await sendPasswordResetEmail(auth, email).then(() => {
            return true;
        }).catch(function() {
            setTimeout(() => toast('error', "Wrong email"), 2000);            
        })
    },

    async logout(){
        await signOut(auth).then(() => {
            // Sign-out successful.
            Cookies.remove('authToken');

            window.location.href = routing.home;
        }).catch((error) => {
            console.log(error)
        });
    },

    // async signup(email: string, password: string){
    //     var errorMessage = null;
    //     const toast      = useToast();

    //     return await createUserWithEmailAndPassword(auth, email, password).then(() => {
    //         toast.success('User created correctly');
            
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
    //         toast.error(errorMessage);
            
    //         return false;
    //     })
    // }
}

export default FirebaseHook;