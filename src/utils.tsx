export const fetchJSON: (arg0: { url: string }) => Promise<any> = async ({ url }) => {
    const response = await fetch(url);
    const jsonResult = await response.json();
    return { status: response.status, body: jsonResult };
};
