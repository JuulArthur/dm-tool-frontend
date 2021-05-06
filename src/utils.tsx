export const fetchJSON: (arg0: { url: string, method?: string, body?: any }) => Promise<any> = async ({ url, method = 'GET', body }) => {
    const response = await fetch(`http://localhost:3001${url}`,
        {
            method, headers: {
                'Content-Type': 'application/json'
            }, body
        });
    const jsonResult = await response.json();
    return { status: response.status, body: jsonResult };
};
