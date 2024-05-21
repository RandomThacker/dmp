# Prisa Llama

## Techstack 
 Langchain , GroqCloud , Nextjs , Prisma , NeonDB (Serverless postgres)

It takes prisma schema , user text , and converts it to raw sql query . 

The sql query is execute and user is presented with a table .

# Challenges 
 Execution with Date and Time in postgres is tough . We need to train the model better . Lastly , it is very expensive to run this model on premise without adequate capex . For the most part , providers like groq can solve this . 

# Improvements  


For date and time queries : Make a better interface for inputing time , being able to convert date time queries must be easier . I would suggest using a command bar in chat . 

/date : (write your date) [Notion style]
/time : (write your time) [Notion style]

We can avoid training cost and save costs . UI validation will make the job much easier .

We can also use openAI provider alone . Since we will not be sending personal data anymore . Just the schema instead . It will be dirt cheap as compared to hosting LLM on premise .




