import { Configuration, OpenAIApi } from "openai"
import { utils } from "./utils"

export class ChatGPT {
    configuration: Configuration
    openAi: OpenAIApi

    constructor() {
        this.configuration = new Configuration({
            apiKey: process.env.OPEN_API_KEY!
        })

        this.openAi = new OpenAIApi(this.configuration)
    }

    async askGPT(prompt: string) {

        console.log("prompt : ", prompt)
        try {
            const completion = await this.openAi.createCompletion({
                model: "text-davinci-003",
                prompt: prompt,
                temperature: 0.6,
                max_tokens: 500,
                stream: true,
            });

            const parsedResponse = utils.parseGPTResponse(JSON.parse(JSON.stringify(completion.data)))

            return parsedResponse
            // return "This  project  seeks  to  develop  a  smart  contract  bot  that  can  make  arbit rage  trades  between  Un is w ap ,  S ush is w ap ,  and  other  reliable  DE X s .  The  bot  should  be  able  to  detect  arbit rage  opportunities  and  quickly  execute  flash  loans  from  A ave  or  D yd x  to  make  trades  with  them .  It  should  be  able  to  determine  the  flash  loan  amount  ( coll ateral )  and  execute  the  loan  with  the  right  amount  of  gas  fee  to  avoid  being  front  run .  The  bot  should  be  able  to  repay  the  flash  loan  plus  the  gas  fees  and  the  profits  can  be  sent  manually  to  a  wallet .  It  is  preferred  that  the  person  has  experience  building  bots  before ."
        } catch (error: any) {

            if (error.response) {
                console.error("\nChatGPT Error", error.response.status, error.response.data);
            } else {
                console.error(`\nError with OpenAI API request: ${error.message}. For this prompt ${prompt}`);
            }
        }
    }
}
