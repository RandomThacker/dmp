import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/db";

export async function POST(req: NextRequest) {
  try {
    // Extract SQL query from request body
    const { sqlQuery } = await req.json();
    console.log("SQL : ", sqlQuery)
    // Execute SQL query using Prisma Client
    const result = await prisma.$queryRawUnsafe(sqlQuery);
    // console.log(result)
    return NextResponse.json({"result":result});
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
