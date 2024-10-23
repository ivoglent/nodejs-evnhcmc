export interface ApiResponse<T> {
    state: string,
    alert: string;
    data: T
}

export interface DailyData {
    sanluong_tong: TotalReport;
    sanluong_tungngay: DailyReport[];
    soNgay: number;
    tieude: string;
}

export interface DailyReport {
    BT: number;
    CD: number;
    TD: number;
    Tong: number;
    hsn: number;
    isChotHoaDon: boolean;
    ngay: string;
    ngayFull: string;
    p_giao_bt: string;
    p_giao_cd: string;
    p_giao_td: string;
    sanluong_BT: string;
    sanluong_CD: string;
    sanluong_TD: string;
    sanluong_tong: string;
    thoidiemdo: string;
    tong_p_giao: string;
    tong_q_giao: string;
}

export interface TotalReport {
    BT: number;
    BT_format: string;
    CD: number;
    CD_format: string;
    TD: number;
    TD_format: string;
    Tong: number;
    Tong_format: string;
}
