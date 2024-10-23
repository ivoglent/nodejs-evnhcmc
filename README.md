# EVN (HCMC) data crawler
Simple library support fetch data from EVN Hochiminh city to get user data report

## Installation
``` 
npm install @ivoglent/nodejs-evnhcmc --save
```

## Usage
``` 
const crawler = new EVNCrawler("customerId", "username", "password");
```

### Schedule report
Supported: 
``` 
export enum RunType{
    ONE_MIN ==> each 1 minute
    FIVE_MIN ==> each 5 minutes
    TEN_MIN ==> each ten menutes
    THIRTY_MIN  ==> each 30 minutes
    ONE_HOUR  ==> each 1 hour
    ONE_DAY  ==> each day
}
```



For example, 1 minute report:
``` 
crawler.scheduleReport(RunType.ONE_MIN, (data) => {
    console.log("Minute report: ", data)
})
```

exmaple with typescript:
``` 
import {BaseVirtualSensor} from "./base.virtual.sensor";
import {EVNCrawler, RunType} from "@ivoglent/nodejs-evnhcmc";

export class EvnSensor extends BaseVirtualSensor{
    crawler: EVNCrawler;
    constructor() {
        super();
        this.crawler = new EVNCrawler("", "" ,"");
    }
    start(): void {
        this.crawler.scheduleReport(RunType.FIVE_MIN, (data) => {
            //Process data
        });
    }

}
```

### Data
Example data structure:
``` 
{
  soNgay: 31,
  tieude: 'Từ 23/09/2024 đến 23/10/2024',
  sanluong_tungngay: [
    {
      ngay: '21/10',
      ngayFull: '21/10/2024',
      TD: 0,
      BT: 20.07,
      CD: 0,
      Tong: 20.07,
      sanluong_TD: '0.00',
      sanluong_BT: '20.07',
      sanluong_CD: '0.00',
      sanluong_tong: '20.07',
      hsn: 1,
      p_giao_bt: '23,346.78',
      p_giao_td: '0.00',
      p_giao_cd: '0.00',
      tong_p_giao: '23,346.78',
      tong_q_giao: '0.00',
      thoidiemdo: '21/10/2024',
      isChotHoaDon: 0
    },
    {
      ngay: '22/10',
      ngayFull: '22/10/2024',
      TD: 0,
      BT: 19.8,
      CD: 0,
      Tong: 19.8,
      sanluong_TD: '0.00',
      sanluong_BT: '19.80',
      sanluong_CD: '0.00',
      sanluong_tong: '19.80',
      hsn: 1,
      p_giao_bt: '23,366.85',
      p_giao_td: '0.00',
      p_giao_cd: '0.00',
      tong_p_giao: '23,366.85',
      tong_q_giao: '0.00',
      thoidiemdo: '22/10/2024',
      isChotHoaDon: 0
    },
    {
      ngay: '23/10',
      ngayFull: '23/10/2024',
      TD: 0,
      BT: 0,
      CD: 0,
      Tong: 0,
      sanluong_TD: '0.00',
      sanluong_BT: '0.00',
      sanluong_CD: '0.00',
      sanluong_tong: '0.00',
      hsn: 1,
      p_giao_bt: '23,386.65',
      p_giao_td: '0.00',
      p_giao_cd: '0.00',
      tong_p_giao: '23,386.65',
      tong_q_giao: '0.00',
      thoidiemdo: '23/10/2024',
      isChotHoaDon: 0
    }
  ],
  sanluong_tong: {
    TD: 0,
    BT: 546.01,
    CD: 0,
    Tong: 546.01,
    TD_format: '0.00',
    BT_format: '546.01',
    CD_format: '0.00',
    Tong_format: '546.01'
  }
}
```