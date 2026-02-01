import conf from "../conf/conf";

import { Client, Databases  ,Storage, Query, ID, Role ,Permission } from "appwrite";

export class ReplyService{
    client = new Client();
    database;
    

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.database = new Databases(this.client);
       
    }

    async createReplies ({ ticketId, message, sendersId, sendersRole }){
        try {
            return await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriterReliesCollectionId,
                ID.unique(),
                {
                    ticketId,
                    message,
                    sendersId,
                    sendersRole,
                   
                    
                    

                },
                //  [
                //     Permission.read(Role.any()),
                //     Permission.update(Role.user(senderId)),
                //     Permission.delete(Role.user(senderId)),
                // ]
            )
        } 
            catch(error){
                console.log("reply creation error" ,error)

            }

            
    }
    async getRepliesByTicketId(ticketId) {
    try {
        return await this.database.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriterReliesCollectionId,
            [
                Query.equal("ticketId", ticketId),
                Query.orderAsc("$createdAt"),
            ]
        );
    } catch (error) {
        console.error("Fetch replies error:", error);
        throw error;
    }
}
}

const replyService = new ReplyService();
export default replyService

