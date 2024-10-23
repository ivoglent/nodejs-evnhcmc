import {BaseApi} from "./base.api";
import {DailyData} from "./api.response";

export class DataApi extends BaseApi {
    DAILY_REPORT_URL: string = 'https://cskh.evnhcmc.vn/Tracuu/ajax_dienNangTieuThuTheoNgay';

    public async getDataRange(customerId: string, from: string, to: string): Promise<DailyData | undefined> {
        const data = {
            input_makh: customerId,
            input_tungay: from,
            input_denngay: to
        };
        const result = await this.post<DailyData>(this.DAILY_REPORT_URL, data);
        if (result && result.state === 'success') {
            return result.data;
        }
        if (result && result.state === 'error_login') {
            //Need re-login
        }
        return  undefined;
    }
}