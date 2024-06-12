export async function POST(req: Request, res: Response,) {
    const body = await req.json();
    console.log(body);
  
    try {
        const response = await fetch(`http://localhost:3001/org3/addnew`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
          // If the response from the fetch request is not OK, throw an error
          throw new Error('Network response was not ok');
        }
    
        // Extract the JSON from the response
        const data = await response.json();
        return res.json()
    } catch (error) {
        // If an error occurred, log it to the console
        return res.json()
    }
}
