"use client";
import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function SQLTable({responseData}:{
    responseData:any
}) {
    const [tableData, setTableData] = useState([]);
    const [tableHeads, setTableHeads] = useState<string[]>([]);
    const [query, setQuery] = useState("A table for showing all the record");

    useEffect(() => {
        const fitData = async () => {
            try {
                setTableHeads(Object.keys(responseData[0]));
                setTableData(responseData);
            } catch (error) {
                console.error('There was a problem fetching the data:', error);
            }
        };

        fitData(); 
    }, [responseData]);

    return (
        <Table>
            <TableCaption>{query}</TableCaption>
            <TableHeader>
                <TableRow>
                    {tableHeads.map((head, index) => (
                        <TableHead key={index} className="w-[100px]">{head}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {tableData.map((dataLine, index) => (
                    <TableRow key={index}>
                        {Object.values(dataLine).map((data, index) => (
                            <TableCell key={index}>{data as string}</TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
