import {AuthApi} from "./api/auth.api";
import {DataApi} from "./api/data.api";
import {DailyData, DailyReport} from "./api/api.response";
import cron from 'node-cron';

export enum RunType{
    ONE_MIN = "* * * * *",
    FIVE_MIN = "*/5 * * * *",
    TEN_MIN = "*/10 * * * *",
    THIRTY_MIN = "*/30 * * * *",
    ONE_HOUR = "0 * * * *",
    ONE_DAY = "0 0 * * *"
}
type ProcessCallback = (params: DailyData) => void;

export class EVNCrawler {
    authApi = new AuthApi();
    dataApi = new DataApi();
    dayRange: number = 30;
    isLogged: boolean = false;
    constructor(private customerId: string, private username: string, protected password: string) {
    }

    private formatDate(date: Date): string {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    public setDefaultDayRange(days: number) {
        if (days <= 31) {
            this.dayRange = days;
        }
    }

    public async authenticate() {
        return new Promise<boolean>((resolve, reject) => {
            this.authApi.login(this.username, this.password).then((result) => {
                if (result) {
                    console.log("Login success!");
                    this.isLogged = true;
                    resolve(true);
                } else {
                    console.log("Login failed! Please try again later.");
                    this.isLogged = false;
                    reject("Login failed.");
                }
            }).catch(reject)
        })
    }

    public scheduleReport(type: RunType, callback: ProcessCallback) {
        cron.schedule(type.toString(), () => {
            console.log('Running task: Fetching data from API...');
            this.authenticate().then(result => {
                if (result) {
                    const currentDate = new Date();
                    const previousDate = new Date();
                    previousDate.setDate(currentDate.getDate() - this.dayRange);
                    this.dataApi.getDataRange(this.customerId, this.formatDate(previousDate), this.formatDate(currentDate)).then((result) => {
                        if (result) {
                            callback(result);
                        } else {
                            console.log("Can not get data from server")
                        }
                    });
                } else {
                    console.log("Cam not login!");
                }
            })
        });
    }

    public async getData(from: string, to: string): Promise<DailyData> {
        if (this.isLogged) {
            return new Promise<DailyData>((resolve, reject) => {
                this.dataApi.getDataRange(this.customerId, from, to).then((result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        console.log("Can not get data from server")
                        reject("Can not get data from server");
                    }
                });
            })
        } else {
            throw new Error("Please call authenticate method first");
        }
    }
}

