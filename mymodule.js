const filepath = "https://fridmanj0n.github.io/cubedb.txt";

export async function write(cubedata) {
    try {
        const response = await fetch(filepath, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cubedata }),
        });

        if (!response.ok) {
            throw new Error(`Failed to write data. Status: ${response.status}`);
        }

        console.log('Data was written to the file');
        return response.text();
    } catch (error) {
        console.error(`Error writing data: ${error.message}`);
        return null;
    }
}

export async function read(sn) {
    try {
        const response = await fetch(filepath, {
            method: 'GET',
            headers: {
                accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to read data. Status: ${response.status}`);
        }

        const data = await response.text();
        console.log('Data read from the file:', data);

        // Split the data into lines
        const lines = data.split('\n');

        // Filter lines that start with the specified sn
        const filteredLines = lines.filter(line => line.startsWith(sn));

        // Combine filtered lines into a single variable
        const result = filteredLines.join('\n');

        return result;
    } catch (error) {
        console.error(`Error reading data: ${error.message}`);
        return null;
    }
}
