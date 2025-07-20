import { computed, Injectable, Signal, signal } from '@angular/core';
import { InvestmentInput } from './investment-input.model';
import { AnnualResult } from './annual-result.model';

@Injectable({ providedIn: 'root' })
export class InvestmentService {
  private readonly resultsData = signal<AnnualResult[] | undefined>(undefined);

  calculateInvestmentResults(data: InvestmentInput) {
    const { initialInvestment, duration, expectedReturn, annualInvestment } =
      data;
    const annualData = [];
    let investmentValue = initialInvestment;

    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest =
        investmentValue - annualInvestment * year - initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
      });
    }
    this.resultsData.set(annualData);
  }

  get results(): Signal<AnnualResult[] | undefined> {
    return this.resultsData.asReadonly();
  }
}
