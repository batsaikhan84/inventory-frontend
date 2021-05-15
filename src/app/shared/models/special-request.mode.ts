export interface ISpecialRequest {
    ID?: number;
    Item_ID: number | undefined;
    Item: string;
    Quantity: number;
    User_Name: string;
    Recent_CN: string;
    Department: string;
    Status?: string;
    Time_Requested?: string;
    Time_Updated?: string;
}