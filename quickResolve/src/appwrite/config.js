import conf from "../conf/conf";

import { Client, Databases  ,Storage, Query, ID, Role ,Permission } from "appwrite";

export class Service{
    client = new Client();
    database;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.database = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createTicket({title, description,  userId, agentId = "", attachmentid = "" ,priority = "medium" ,category = "general"}){
        try {
            return await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    description,
                    status: "open",
                    userId,
                    agentId,
                    attachmentid,
                    priority,
                    category,

                } ,
                    // [
                    //     // Creator can read/update their own ticket
                    //     Permission.read(Role.user(userId)),
                    //     Permission.update(Role.user(userId)),

                    //     // Admin can read/update all tickets
                    //     Permission.read(Role.role("admin")),
                    //     Permission.update(Role.role("admin")),
                    // ]
            )
            
        } catch (error) {
            console.log("Appwrite serive :: createTicket ::error" , error);
        }

    }

    async updateTicket({ ticketId, title , description , agentId , status , priority , category}){
        try {
            return await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                 ticketId,
                {
                    title , 
                    description , 
                    agentId , 
                    status , 
                    priority ,
                    category
                }
            )
            
        } catch (error) {
             console.log("Appwrite serive :: UpdateTicket ::error" , error);
        }
    }

    async getUserTicket({userId}){
        try {
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.equal("userId", userId)]
            )
        } catch (error) {
             console.log("Appwrite serive :: getUserTicket ::error" , error);
        }
    }

     async getAgentTicket({agentId}){
        try {

            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.equal("agentId", agentId)]
            )
        } catch (error) {
             console.log("Appwrite serive :: getAgentTicket ::error" , error);
        }
    }

    async assignAgent({ticketId , agentId}){
        try {
            return await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ticketId,{
                    agentId,
                    status:"in progress"
                },
                    // [
                    //     // Agent can now read/update their assigned ticket
                    //     Permission.read(Role.user(agentId)),
                    //     Permission.update(Role.user(agentId)),

                    //     // Admin still has full access
                    //     Permission.read(Role.role("admin")),
                    //     Permission.update(Role.role("admin")),
                    // ]
                
            )
        } catch (error) {
            console.log("Appwrite serive :: assigment error ::error" , error);
        }
    }

     async getAllTickets() {
    try {
      return await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId
      );
    } catch (error) {
      console.log("Appwrite service :: getAllTickets :: error", error);
    }
  }

  async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
            
        } catch (error) {
            console.log("Appwrite serive :: uploadeFile ::error" , error);
             return false
        }
    }

       async deleteFile(fileId){
        try {
             await this.bucket.createFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
            
        } catch (error) {
            console.log("Appwrite serive :: deleteFile ::error" , error);
             return false
        }
    }

     getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

}

const ticketSerive = new Service();

export default ticketSerive;