// Grid Trading P&L Calculation Types

// Base Types
export interface Price {
    value: number;
    timestamp: Date;
}

export interface Volume {
    amount: number;
    currency: string;
}

export interface Trade {
    id: string;
    type: 'BUY' | 'SELL';
    price: Price;
    volume: Volume;
    fee: number;
    timestamp: Date;
}

export interface Position {
    symbol: string;
    side: 'LONG' | 'SHORT';
    size: number;
    entryPrice: number;
    currentPrice: number;
    unrealizedPnl: number;
    timestamp: Date;
}

// Grid Configuration
export interface GridConfig {
    symbol: string;
    priceRange: {
        upper: number;
        lower: number;
    };
    gridLevels: number;
    gridSpacing: number;
    baseOrderSize: number;
    maxPositions: number;
}

// Cost Components
export interface TradingCosts {
    buyFees: number;
    sellFees: number;
    spreadCost: number;
    slippageCost: number;
    fundingCost: number; // For leveraged positions
}

export interface InfrastructureCosts {
    vpsCost: number;
    apiCost: number;
    softwareLicenses: number;
    networkCosts: number;
}

export interface OpportunityCosts {
    riskFreeRate: number; // Annual percentage
    alternativeInvestmentReturn: number;
    timeValue: number; // Cost of time spent managing
}

export interface RiskCosts {
    drawdownImpact: number;
    volatilityPenalty: number;
    correlationRisk: number;
    liquidityRisk: number;
}

export interface HiddenCosts {
    rebalancingCost: number;
    gapRisk: number;
    liquidityCost: number;
    taxImplications: number;
}

// Profit Components
export interface GridProfit {
    realizedProfit: number;
    unrealizedPnl: number;
    totalTrades: number;
    successfulCycles: number;
    timestamp: Date;
}

export interface TotalCosts {
    trading: TradingCosts;
    infrastructure: InfrastructureCosts;
    opportunity: OpportunityCosts;
    risk: RiskCosts;
    hidden: HiddenCosts;
    totalAmount: number;
}

// Performance Metrics
export interface ReturnMetrics {
    sharpeRatio: number;
    sortinoRatio: number;
    calmarRatio: number;
    annualReturn: number;
    volatility: number;
}

export interface RiskMetrics {
    maximumDrawdown: number;
    valueAtRisk: number; // VaR
    winRate: number;
    averageWinLossRatio: number;
    recoveryTime: number; // Days to recover from drawdown
}

export interface EfficiencyMetrics {
    profitFactor: number;
    recoveryFactor: number;
    tradesPerDay: number;
    averageProfitPerTrade: number;
    gridEfficiency: number;
}

// Grid Specific Metrics
export interface GridMetrics {
    gridEfficiency: number;
    capitalUtilization: number;
    cycleCompletionRate: number;
    averageGridSpacing: number;
    maxCapitalAtRisk: number;
}

// Final P&L Calculation
export interface PnLCalculation {
    gridProfit: GridProfit;
    totalCosts: TotalCosts;
    netProfit: number;
    riskAdjustedReturn: number;
    finalPnl: number;
    calculationDate: Date;
}

export interface PerformanceReport {
    pnl: PnLCalculation;
    returnMetrics: ReturnMetrics;
    riskMetrics: RiskMetrics;
    efficiencyMetrics: EfficiencyMetrics;
    gridMetrics: GridMetrics;
    period: {
        start: Date;
        end: Date;
    };
}

// Utility Functions Types
export type PnLCalculator = (
    trades: Trade[],
    positions: Position[],
    config: GridConfig,
    costs: TotalCosts,
    timeframe: { start: Date; end: Date }
) => PnLCalculation;

export type RiskCalculator = (
    returns: number[],
    riskFreeRate: number
) => RiskMetrics;

export type EfficiencyCalculator = (
    trades: Trade[],
    pnl: PnLCalculation,
    timeframe: { start: Date; end: Date }
) => EfficiencyMetrics;

// Grid Trading Strategy Interface
export interface GridTradingStrategy {
    config: GridConfig;
    currentPositions: Position[];
    tradeHistory: Trade[];
    performance: PerformanceReport;

    calculatePnL(): PnLCalculation;
    updateGrid(newConfig: Partial<GridConfig>): void;
    getPerformanceReport(period: { start: Date; end: Date }): PerformanceReport;
    getTotalCosts(): TotalCosts;
    getRiskMetrics(): RiskMetrics;
}

// Constants for calculations
export const CALCULATION_CONSTANTS = {
    DAYS_PER_YEAR: 365,
    TRADING_DAYS_PER_YEAR: 252,
    HOURS_PER_DAY: 24,
    MINUTES_PER_HOUR: 60,
    SECONDS_PER_MINUTE: 60,

    // Risk-free rates (example values)
    DEFAULT_RISK_FREE_RATE: 0.02, // 2% annual

    // Fee structures (example values)
    DEFAULT_MAKER_FEE: 0.001, // 0.1%
    DEFAULT_TAKER_FEE: 0.0015, // 0.15%

    // Risk parameters
    DEFAULT_VAR_CONFIDENCE: 0.95, // 95% confidence level
    DEFAULT_MAX_DRAWDOWN_LIMIT: 0.2, // 20% max drawdown
} as const;