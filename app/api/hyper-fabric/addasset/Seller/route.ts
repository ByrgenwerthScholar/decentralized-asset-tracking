import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest, res: NextResponse,) {
    console.log(req.body)
    try {
        const response = await fetch(`http://localhost:3001/org1/addnew`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });
        if (!response.ok) {
          // If the response from the fetch request is not OK, throw an error
          throw new Error('Network response was not ok');
        }
    
        // Extract the JSON from the response
        const data = await response.json();
        return NextResponse.json(data, { status: 500 })
    } catch (error) {
        // If an error occurred, log it to the console
        return NextResponse.json(error, { status: 500 })
    }
}
