import axios from "axios";
import {ApiResponse} from "./api.response";
import {CookieManager} from "./cookie.manager";


export abstract class BaseApi {
    COOKIES: string[] | undefined = [];


    protected jsonToFormData(json: Record<string, any>): URLSearchParams {
        const formData = new URLSearchParams();
        for (const key in json) {
            if (json.hasOwnProperty(key)) {
                formData.append(key, json[key]);
            }
        }
        return formData;
    }

    protected getSpecificCookie(cookies: string[] | undefined, cookieName: string): string | undefined {
        if (cookies) {
            for (const cookie of cookies) {
                const [nameValue] = cookie.split(';');
                const [name, value] = nameValue.split('=');
                if (name.trim() === cookieName) {
                    return value;
                }
            }
        }
        return undefined;
    }

    protected async post<T>(url: string, data: any): Promise<ApiResponse<T> | undefined> {
        const formData = this.jsonToFormData(data);
        try {
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Cookie': CookieManager.getInstance().getCookiesString()
                },
            });
            CookieManager.getInstance().setCookies(response.headers['set-cookie']);
            return response.data;
        } catch (e) {
            console.error("Request error: ", e);
        }
        return undefined;
    }
}