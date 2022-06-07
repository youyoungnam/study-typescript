// type들을 모아놓은 데이터 종류 타입선언 

// export를 해주면 interface만 꺼내겠다는 의미 
// export interface CovidSummaryResponse {
//     Countries: any[];
//     Date: string;
//     Global: any;
//     Message: string;
//   }

// Countries 내부 구체적으로 타입선언하기 
export interface Country {
    Country: string;
    CountryCode: string;
    Date: string;
    NewConfirmed: string;
    NewDeaths: number;
    NewRecovered: number;
    Premium: any;
    Slug: string;
    TotalConfirmed: number;
    TotalDeaths: number;
    TotalRecovered: number;

}

// Global 내부 구체적으로 타입 선언하기 
interface Global {
    NewConfiremed: number;
    NewDeaths: number;
    NewRecovered: number;
    TotalConfirmed: number;
    TotalDeaths: number;
    TotalRecovered: number; 
}



export interface CovidSummaryResponse {
    Countries: Country[];
    Date: string;
    Global: Global;
    Message: string;
  }


export interface CountrySummaryInfo {
    Cases: number;
    City: string;
    CityCode: string;
    Country: string;
    CountryCode: string;
    Date: string;
    Lat: string;
    Lon: string;
    Province: string;
    Status: string;  
}
// interface로 선언할까 했더니, 0 ~ 100 바로 배열형태면 타입으로 정의해야함 
// 각각의 데이터들을 interface를 선언해줘야함 
// CountrySummaryInfo를 배열로 갖는 게 response
export type CountrySummaryResponse = CountrySummaryInfo[];