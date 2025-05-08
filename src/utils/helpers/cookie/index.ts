import Cookies from "js-cookie"

export const CookiesService = {
    get: (key: any) => {
        const cookie = Cookies.get(key);
        return cookie;
    },
    set: (key: string, value: any) => {
        // let dataJson = JSON.stringify(userInfo);
        Cookies.set(key, value, { expires: 1 });
    },
    remove: (key: string) => {
        Cookies.remove(key);
    }
}