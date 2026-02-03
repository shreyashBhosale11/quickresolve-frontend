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

    async createTicket({title, description,  userId, agentId = "", attachmentid = "" ,priority = "medium" }){
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

   async updateTicket(ticketId, data) {
  try {
    return await this.database.updateDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      ticketId, // must be the document ID
      data
    );
  } catch (error) {
    console.log("Appwrite service :: UpdateTicket ::error", error);
    throw error; // rethrow to catch in component
  }
}


    async getUserTicket({userId}){
        try {
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.equal("userId",[ userId])]
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
                [Query.equal("agentId", [agentId])]
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

  async uploadFile(file) {
        try {
            const response = await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
            );
            console.log("Uploaded file response:", response);
            return response; // this should have $id
        } catch (error) {
            console.error("Appwrite service :: uploadFile error:", error);
            return null; // safer fallback
        }
        }


       async deleteFile(fileId){
        try {
             await this.bucket.deleteFile(
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

    getFileUrl(fileId){
        if (!fileId) return null;
        return this.bucket.getFileView(
            conf.appwriteBucketId,
             fileId);
    }

}

const ticketSerive = new Service();

export default ticketSerive;