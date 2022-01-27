export const fetchJSON: (arg0: { url: string, method?: string, body?: any }) => Promise<any> = async ({ url, method = 'GET', body }) => {
    try {
        const response = await fetch(url,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                method,
                body: JSON.stringify(body),
            });
        const isJson = (response.headers.get('content-type') || '').indexOf('application/json') !== -1;
        const responseBody = isJson ? await response.json() : await response.text();
        return { status: response.status, body: responseBody };
    } catch (e) {
        console.log('e', e);
        return {};
    }
};
