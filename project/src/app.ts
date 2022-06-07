// 라이브러리 로딩
// 라이브러리 들고오려면 라이브러리 설치해야함. 
// import 변수명 from '라이브러리 이름' 
// 변수, 함수 임포트 문법
// import {} from '파일 상대 경로';
// 라이브러리 호출 
// 라이브러리 내에 타입이 잘 정의된것
import axios, { AxiosResponse } from 'axios'
// 실제로 타입정의에 대해서 잘 정의가 되어 있지 않는 라이브러리 
import {Chart} from 'chart.js'
// 타입 모듈 
import {CovidSummaryResponse, CountrySummaryResponse, Country, CountrySummaryInfo} from './covid/index'

// utils
function $(selector: string ) {
  return document.querySelector(selector);
}
// Date type Date타입도 받을 수 있고 문자열 타입도 받을 수 있다.
function getUnixTimestamp(date: Date | string) {
  return new Date(date).getTime();
}

// DOM
// var a : Element | HTMLElement | HTMLParagraphElement
const confirmedTotal = $('.confirmed-total') as HTMLSpanElement;
const deathsTotal = $('.deaths')as HTMLSpanElement;
const recoveredTotal = $('.recovered') as HTMLSpanElement;
const lastUpdatedTime = $('.last-updated-time') as HTMLSpanElement;
const rankList = $('.rank-list') as HTMLSpanElement;
const deathsList = $('.deaths-list') as HTMLSpanElement;
const recoveredList = $('.recovered-list') as HTMLSpanElement;
const deathSpinner = createSpinnerElement('deaths-spinner') as HTMLSpanElement;
const recoveredSpinner = createSpinnerElement('recovered-spinner') as HTMLSpanElement;

function createSpinnerElement(id: any) {
  const wrapperDiv = document.createElement('div');
  wrapperDiv.setAttribute('id', id);
  wrapperDiv.setAttribute(
    'class',
    'spinner-wrapper flex justify-center align-center',
  );
  const spinnerDiv = document.createElement('div');
  spinnerDiv.setAttribute('class', 'ripple-spinner');
  spinnerDiv.appendChild(document.createElement('div'));
  spinnerDiv.appendChild(document.createElement('div'));
  wrapperDiv.appendChild(spinnerDiv);
  return wrapperDiv;
}

// state
let isDeathLoading = false;

// api
                              // promise안에 AxiosResponse type이 들어갔고 covidSummaryResponse 타입을 두번 넘기면서 자동으로 추론이된다. 
function fetchCovidSummary():  Promise<AxiosResponse<CovidSummaryResponse>>{
  const url = 'https://api.covid19api.com/summary';
  return axios.get(url);
}

enum  CovidStatus {
  Confirmed = ' confirmed',
  Recovered = 'recovered',
  Deaths = 'deaths'
}
function fetchCountryInfo(countryCode: string, status: CovidStatus): Promise<AxiosResponse<CountrySummaryResponse>> {
  // params: confirmed, recovered, deaths
  const url = `https://api.covid19api.com/country/${countryCode}/status/${status}`;
  return axios.get(url);
}

// methods
function startApp() {
  setupData();
  initEvents();
}

const a: Element 
const b:  HTMLElement
const c: HTMLDivElement

// events
function initEvents() {
  if (!rankList){
    return ;
  }
  rankList.addEventListener('click', handleListClick);
}

async function handleListClick(event: MouseEvent) {
  let selectedId;
  if (
    event.target instanceof HTMLParagraphElement ||
    event.target instanceof HTMLSpanElement
  ) {
    selectedId = event.target.parentElement.id;
  }
  if (event.target instanceof HTMLLIElement) {
    selectedId = event.target.id;
  }
  if (isDeathLoading) {
    return;
  }
  clearDeathList();
  clearRecoveredList();
  startLoadingAnimation();
  isDeathLoading = true;
  const { data: deathResponse } = await fetchCountryInfo(selectedId, CovidStatus.Deaths);
  const { data: recoveredResponse } = await fetchCountryInfo(
    selectedId,
    CovidStatus.Recovered
  );
  const { data: confirmedResponse } = await fetchCountryInfo(
    selectedId,
    CovidStatus.Confirmed
  );
  endLoadingAnimation();
  setDeathsList(deathResponse);
  setTotalDeathsByCountry(deathResponse);
  setRecoveredList(recoveredResponse);
  setTotalRecoveredByCountry(recoveredResponse);
  setChartData(confirmedResponse);
  isDeathLoading = false;
}

function setDeathsList(data: any) {
  const sorted = data.sort(
    (a: CountrySummaryInfo, b: CountrySummaryInfo) => getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date),
  );
  sorted.forEach((value: CountrySummaryInfo) => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-item-b flex align-center');
    const span = document.createElement('span');
    span.textContent = value.Cases.toString();
    span.setAttribute('class', 'deaths');
    const p = document.createElement('p');
    p.textContent = new Date(value.Date).toLocaleDateString().slice(0, -1);
    li.appendChild(span);
    li.appendChild(p);
    

    // 삼항연산자 이용 방법과 차이 이해 
    // 아래 방식은 num이 10이면 true이고 아니면 false이다를 의미 
    const a = num === 10 ? true : false; 
    // 물음표는 옵셔널 체이닝 오퍼레이터 이다 
    deathsList?.appendChild(li);
    //풀어서 설명  ? 의미가 아래 코드 의미이다. 
    if (recoveredList ===null || recoveredList === undefined){
      return;
    } else {
      recoveredList.appendChild(li)
    }
  });
}

function clearDeathList() {
  // 1. null 해결 방법 '' 빈닶넣기 null 말고
  // 2. null 아니다 체크하기 

  if (!deathsList){
    return ;
  }
  deathsList.innerHTML = '';
}

function setTotalDeathsByCountry(data: CountrySummaryResponse) {
  deathsTotal.innerText = data[0].Cases.toString();
}

function setRecoveredList(data: CountrySummaryResponse) {
  const sorted = data.sort(
    (a: CountrySummaryInfo, b: CountrySummaryInfo) => getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date),
  );
  sorted.forEach((value: CountrySummaryInfo) => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-item-b flex align-center');
    const span = document.createElement('span');
    span.textContent = value.Cases.toString();
    span.setAttribute('class', 'recovered');
    const p = document.createElement('p');
    p.textContent = new Date(value.Date).toLocaleDateString().slice(0, -1);
    li.appendChild(span);
    li.appendChild(p);
    recoveredList.appendChild(li);
  });
}

function clearRecoveredList() {
  recoveredList.innerHTML = null;
}

function setTotalRecoveredByCountry(data: CountrySummaryResponse) {
  recoveredTotal.innerText = data[0].Cases.toString();
}

function startLoadingAnimation() {
  deathsList.appendChild(deathSpinner);
  recoveredList.appendChild(recoveredSpinner);
}

function endLoadingAnimation() {
  deathsList.removeChild(deathSpinner);
  recoveredList.removeChild(recoveredSpinner);
}

async function setupData() {
  // {} --> 디스트럭처링이라고 함 받아온 값을 특정 속성에 바로 접근하는 법
  // 중요한건 fetchCovidSumamry 응답 결과가 any로 되어있는데
  // any에 어떤 데이터가 들어가있는지 알아야지
// 함수들에 대해서 그 데이터를 넘겨주고 구체적으로 타입핑해줄 수 있다. 
  const { data } = await fetchCovidSummary();
  setTotalConfirmedNumber(data);
  setTotalDeathsByWorld(data);
  setTotalRecoveredByWorld(data);
  setCountryRanksByConfirmedCases(data);
  setLastUpdatedTimestamp(data);
}

function renderChart(data: number[], labels: string[]) {

  const lineChart = $('#lineChart') as HTMLCanvasElement;
  var ctx = lineChart.getContext('2d');
  Chart.defaults.color = '#f5eaea';
  Chart.defaults.font.family = 'Exo 2';
  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Confirmed for the last two weeks',
          backgroundColor: '#feb72b',
          borderColor: '#feb72b',
          data,
        },
      ],
    },
    options: {},
  });
}

function setChartData(data: CountrySummaryResponse) {
  const chartData = data.slice(-14).map((value: CountrySummaryInfo) => value.Cases);
  const chartLabel = data
    .slice(-14)
    .map((value: CountrySummaryInfo) => new Date(value.Date).toLocaleDateString().slice(5, -1));
  renderChart(chartData, chartLabel);
}

// 누적확진자 수 합계
function setTotalConfirmedNumber(data: CovidSummaryResponse) {
  //[1, 2, 3] 내부 값들이 current 
  confirmedTotal.innerText = data.Countries.reduce(
    (total: number, current: Country) => (total += current.TotalConfirmed),
    0,
  ).toString();
}

function setTotalDeathsByWorld(data: CovidSummaryResponse) {
  deathsTotal.innerText = data.Countries.reduce(
    (total: number, current: Country) => (total += current.TotalDeaths),
    0,
  ).toString();
}

function setTotalRecoveredByWorld(data: CovidSummaryResponse) {
  recoveredTotal.innerText = data.Countries.reduce(
    (total: number, current: Country) => (total += current.TotalRecovered),
    0,
  ).toString();
}

function setCountryRanksByConfirmedCases(data: CovidSummaryResponse) {
  const sorted = data.Countries.sort(
    (a: Country, b: Country) => b.TotalConfirmed - a.TotalConfirmed,
  );
  sorted.forEach((value: any) => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-item flex align-center');
    li.setAttribute('id', value.Slug);
    const span = document.createElement('span');
    span.textContent = value.TotalConfirmed.toString();
    span.setAttribute('class', 'cases');
    const p = document.createElement('p');
    p.setAttribute('class', 'country');
    p.textContent = value.Country;
    li.appendChild(span);
    li.appendChild(p);
    rankList.appendChild(li);
  });
}

function setLastUpdatedTimestamp(data: CovidSummaryResponse) {
  lastUpdatedTime.innerText = new Date(data.Date).toLocaleString();
}

startApp();
