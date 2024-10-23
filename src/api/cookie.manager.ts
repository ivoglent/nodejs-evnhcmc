export class CookieManager {
    private static instance: CookieManager | null = null;
    private cookies: string[] = [];

    public setCookies(cookies: string[] | undefined): void {
        if (cookies) {
            this.cookies = cookies;
        } else {
            this.cookies = [];
        }
    }

    public getCookiesString(): string {
        if (this.cookies) {
            return this.cookies.join('; ');
        }
        return '';
    }

    public static getInstance(): CookieManager {
        if (CookieManager.instance === null) {
            CookieManager.instance = new CookieManager();
        }
        return CookieManager.instance;
    }

    public addCookie(cookie: string): void {
        this.cookies.push(cookie);
    }
}