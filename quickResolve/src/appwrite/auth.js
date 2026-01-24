import conf from "../conf/conf";

import { Client, Account, ID } from "appwrite";

export class AuthService {

    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password , name ,role= "user"}){
        try {
            const userAccount = await this.account.create(ID.unique() ,email,password,name );
            if (userAccount) {
                await this.login({ email, password });
                await this.account.updatePrefs({ role });
                return await this.getCurrentUser();
            }
            
            
        } catch (error) {
            throw error
            
        }
    }

    async login({email , password}){
        try {
           return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }

    }

    async getCurrentUser() {
    try {
            return await this.account.get();
        } catch {
            return null; // guest user → normal case
        }
    }

    async logout (){
        try {
            return await this.account.deleteSessions()
            
        } catch (error) {
            console.log("Appwrite serive :: logout ::error" , error);
        }
    }


}

const authService = new AuthService();

export default authService;