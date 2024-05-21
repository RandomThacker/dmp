import { NextRequest, NextResponse } from "next/server";
import { ChatGroq } from '@langchain/groq'
import { PromptTemplate } from '@langchain/core/prompts'
import {StringOutputParser} from '@langchain/core/output_parsers'
export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { userinput } = await req.json();
        console.log(userinput)
        const model = new ChatGroq({
            temperature: 0.9,
            apiKey: process.env.GROQ_API_KEY,
        });

        const prompt = `
            You are an expert in SQL. You are only going to give raw SQL queries and nothing else.
            Table name should be enclosed in " " (double quotes)
            GIVE ONLY RAW SQL QUERY , BECAUSE THIS WILL DIRECTLY BE FED TO SQL EXECUTION FUNCTION. do not give anything execpt for plain sql query . No text , nothing . 
            Here is the Prisma schema for reference:
            model Employee {{
                id         Int      @id @default(autoincrement())
                name       String
                email      String   @unique
                checkIn    DateTime
                checkOut   DateTime
            }}

            {userinput} . Convert.
        `;


        const sqlPrompt = PromptTemplate.fromTemplate(
             prompt
        );

        console.log(sqlPrompt)

        const parser = new StringOutputParser()
        const chain = sqlPrompt.pipe(model).pipe(parser);
        const response = await chain.invoke({userinput:userinput});
        console.log(response)
        const data = {
          "sqlQuery" :  response
        }


        const tableData = await fetch(`${process.env.Domain_name}/api/prix`,{
          method:"POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
        // Send the response back to the client
        const tableresponse = await tableData.json();
        return NextResponse.json(tableresponse);

    } catch (error) {
        // Handle errors
        console.error("Error:", error);
        return NextResponse.json({ error: "Internal Server Error" });
    }
}
