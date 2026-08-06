export default interface SiteData {
    [key: string]: string | number | undefined,
    "time": string,
    "site": number,
    "i371"?: number,
    "iaqi"?: number,
    "m-h"?: number,
    "m-p"?: number,
    "m-t"?: number,
    "p-pm10"?: number,
    "p-pm2"?: number
}