export interface CompanyOfficer {
  name?: string;
  title?: string;
  age?: number;
  yearBorn?: number;
  totalPay?: number;
  exercisedValue?: number;
  unexercisedValue?: number;
}

export interface StockInfoResponse {
  /** Basic company info */
  symbol: string;
  shortName?: string;
  longName?: string;
  industry?: string;
  sector?: string;
  website?: string;
  longBusinessSummary?: string;

  /** Financial position */
  enterpriseValue?: number;
  ebitda?: number;
  totalCash?: number;
  totalCashPerShare?: number;
  totalDebt?: number;
  debtToEquity?: number;
  quickRatio?: number;
  currentRatio?: number;

  /** Address & contact */
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  phone?: string;
  fullTimeEmployees?: number;

  /** Employees & management */
  companyOfficers?: CompanyOfficer[];

  /** Revenue */
  totalRevenue?: number;
  revenuePerShare?: number;
  revenueGrowth?: number;

  /** Margins */
  grossMargins?: number;
  ebitdaMargins?: number;
  operatingMargins?: number;

  /** Returns */
  returnOnAssets?: number;
  returnOnEquity?: number;

  /** Stock / trading info */
  currency?: string;
  exchange?: string;
  quoteType?: string;
  market?: string;
  marketCap?: number;
  sharesOutstanding?: number;
  floatShares?: number;
  beta?: number;
  volume?: number;
  averageVolume?: number;
  averageVolume10days?: number;
  bid?: number;
  ask?: number;
  exchangeTimezoneName?: string;
  exchangeTimezoneShortName?: string;
  gmtOffSetMilliseconds?: number;

  /** Governance / risk info */
  auditRisk?: number;
  boardRisk?: number;
  compensationRisk?: number;
  shareHolderRightsRisk?: number;
  overallRisk?: number;
  governanceEpochDate?: number;
  compensationAsOfEpochDate?: number;

  /** Prices info */
  currentPrice?: number;
  previousClose?: number;
  priceHint?: number;
  open?: number;
  dayLow?: number;
  dayHigh?: number;
  allTimeHigh?: number;
  allTimeLow?: number;
  fiftyTwoWeekLow?: number;
  fiftyTwoWeekHigh?: number;
  fiftyDayAverage?: number;
  twoHundredDayAverage?: number;
  regularMarketOpen?: number;
  regularMarketDayLow?: number;
  regularMarketDayHigh?: number;

  /** Earnings & valuation */
  earningsDate?: number[]; // epoch timestamps
  earningsAverage?: number;
  earningsLow?: number;
  earningsHigh?: number;
  revenueAverage?: number;
  revenueLow?: number;
  revenueHigh?: number;

  /** Dividends */
  dividendRate?: number;
  dividendYield?: number;
  payoutRatio?: number;
  trailingAnnualDividendRate?: number;
  trailingAnnualDividendYield?: number;
  bookValue?: number;
  priceToBook?: number;

  /** Targets & recommendations */
  targetHighPrice?: number;
  targetLowPrice?: number;
  targetMeanPrice?: number;
  targetMedianPrice?: number;
  recommendationKey?: string;
  numberOfAnalystOpinions?: number;

  /** Timestamps */
  lastFiscalYearEnd?: number;
  nextFiscalYearEnd?: number;
  mostRecentQuarter?: number;
}
