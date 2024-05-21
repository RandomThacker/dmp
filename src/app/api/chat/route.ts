import { NextRequest, NextResponse } from "next/server";
import { ChatGroq } from '@langchain/groq';
import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import axios from 'axios';

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { userinput } = await req.json();
        console.log(userinput);

        const model = new ChatGroq({
            temperature: 0.9,
            apiKey: process.env.GROQ_API_KEY,
        });

        const prompt = `
        You specialize in PostgreSQL queries. Your responses should be pure SQL queries.
        Table names should be enclosed in double quotes.
        For time-related queries, always apply ISO8061 conversion.
        When users ask for time ranges, use advanced methods to calculate.
        Ensure correct field names, they are case-sensitive.
        
        Example:
        User: "Tell me which employees were online between 11 AM and 4 PM."
        Correct Solution: 
        SELECT id, name FROM "Employee" WHERE EXTRACT(HOUR FROM "checkIn") >= 11 AND EXTRACT(HOUR FROM "checkOut") <= 16;
        
        Remember: ensure accurate time ranges for check-in and check-out.
        Provide only raw SQL queries for direct execution. NO TEXT ANYTHING . YOUR RESPONSE WILL BE SENT DIRECTLY FOR EXECUTION . ANY ADDITIOAL TEXT WILL BREAK THE SYSTEM .
        Prisma schema for reference:
        model Employee {{
            id         Int      @id @default(autoincrement())
            name       String
            email      String   @unique
            checkIn    DateTime
            checkOut   DateTime
        }}
        
        {userinput} . Convert.
        `;
        

        const sqlPrompt = PromptTemplate.fromTemplate(prompt);

        const parser = new StringOutputParser();
        const chain = sqlPrompt.pipe(model).pipe(parser);
        const response = await chain.invoke({ userinput: userinput });
        console.log(response);
        const data = {
            "sqlQuery": response
        };

        const tableData = await axios.post(`${process.env.Domain_name}/api/prix`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log(tableData.data);
        return NextResponse.json(tableData.data);

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
