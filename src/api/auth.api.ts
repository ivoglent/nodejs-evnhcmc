import {BaseApi} from "./base.api";

export class AuthApi extends BaseApi{
    URL = "https://cskh.evnhcmc.vn/Dangnhap/checkLG";

    public async login(username: string, password: string): Promise<boolean> {
        const data = {
            u: username,
            p: password,
            remember: 1,
            token: ''
        };
        const result = await this.post(this.URL, data);
        console.log('Login result:', result);
        if (result && result.state === 'error') {
            return false;
        }
        return true;
    }
}