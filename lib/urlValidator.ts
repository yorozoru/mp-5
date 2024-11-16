"use server";
export async function isUrlReachable(url: string): Promise<boolean> {
    try {
        const response = await fetch(url, {
            method: 'GET',
            redirect: 'follow',
        });
        return response.ok || response.status === 301 || response.status === 302; //take care of any redirects
    } catch (error) {
        return false;
    }
}