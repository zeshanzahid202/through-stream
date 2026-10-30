import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ExpenseCategory, Expense } from '../types';
import { AddExpenseModal } from '../components/AddExpenseModal';
import {
  DollarSign,
  Plus,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  PieChart,
  Calendar,
  CreditCard,
  TrendingDown,
  Sparkles
} from 'lucide-react';

const CATEGORIES: ExpenseCategory[] = [
  'Accommodation',
  'Transport',
  'Food',
  'Activities',
  'Shopping',
  'Other'
];

const CATEGORY_COLORS: Record<ExpenseCategory, string> = {
  Accommodation: '#0B1320',
  Transport: '#2563EB',
  Food: '#D8A84E',
  Activities: '#059669',
  Shopping: '#9333EA',
  Other: '#64748B'
};

export const BudgetPlannerPage: React.FC = () => {
  const { trips, selectedTripId, setSelectedTripId, expenses, deleteExpense, activeTrip } = useApp();

  const currentTrip = activeTrip || trips[0];
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');

  // Filter expenses for this trip
  const tripExpenses = expenses.filter(e => e.tripId === currentTrip?.id);
  const totalSpent = tripExpenses.reduce((acc, curr) => acc + curr.amount, 0);
  const totalPlanned = currentTrip ? currentTrip.totalBudget : 1500;
  const remainingBudget = totalPlanned - totalSpent;
  const percentSpent = Math.min(100, Math.round((totalSpent / (totalPlanned || 1)) * 100));

  // Category breakdowns
  const categoryTotals: Record<ExpenseCategory, number> = {
    Accommodation: 0,
    Transport: 0,
    Food: 0,
    Activities: 0,
    Shopping: 0,
    Other: 0
  };

  tripExpenses.forEach(exp => {
    categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
  });

  // Filtered expense list
  const filteredExpenses =
    selectedCategoryFilter === 'All'
      ? tripExpenses
      : tripExpenses.filter(e => e.category === selectedCategoryFilter);

  // Is budget alert triggered? (> 80%)
  const isBudgetWarning = percentSpent >= 80;

  return (
    <div className="min-h-screen bg-[#F5F3EE] pt-28 pb-24 text-[#111827]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Title & Trip Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#D8A84E] block mb-1">
              Financial Intelligence
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold font-editorial text-[#0B1320] tracking-tight">
              Trip Budget Planner
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#6B7280]">Select Trip:</span>
            <select
              value={selectedTripId}
              onChange={e => setSelectedTripId(e.target.value)}
              className="text-xs font-semibold text-[#0B1320] bg-white border border-[#0B1320]/15 rounded-xl px-3 py-2 focus:outline-hidden"
            >
              {trips.map(t => (
                <option key={t.id} value={t.id}>
                  {t.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Budget Alert Banner */}
        {isBudgetWarning ? (
          <div className="mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 flex items-start gap-3 animate-fadeIn">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                Budget Alert: {percentSpent}% Allocated
              </h4>
              <p className="text-xs text-amber-800 mt-0.5">
                Spending has reached or exceeded 80% of your ${totalPlanned.toLocaleString()} planned target. Consider reviewing discretionary activities.
              </p>
            </div>
          </div>
        ) : (
          <div className="mb-8 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-900 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Budget Health: Healthy. ${remainingBudget.toLocaleString()} buffer remaining for {currentTrip?.destinationName}.</span>
            </div>
            <span className="font-semibold text-emerald-800">{percentSpent}% used</span>
          </div>
        )}

        {/* 1. TOP KPI STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {/* Planned Budget */}
          <div className="bg-white rounded-2xl p-6 border border-[#0B1320]/10 shadow-xs">
            <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider block">
              Total Planned Budget
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-bold font-editorial text-[#0B1320] tabular-nums">
                ${totalPlanned.toLocaleString()}
              </span>
              <span className="text-xs text-[#6B7280]">USD</span>
            </div>
            <p className="mt-2 text-xs text-[#6B7280]">
              Target limit set for {currentTrip?.durationDays} days in {currentTrip?.destinationName}
            </p>
          </div>

          {/* Spent Budget */}
          <div className="bg-white rounded-2xl p-6 border border-[#0B1320]/10 shadow-xs">
            <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider block">
              Total Spent to Date
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-bold font-editorial text-[#0B1320] tabular-nums">
                ${totalSpent.toLocaleString()}
              </span>
              <span className="text-xs text-[#6B7280]">({percentSpent}%)</span>
            </div>
            {/* Progress Bar */}
            <div className="mt-3 w-full h-2 rounded-full bg-[#0B1320]/10 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isBudgetWarning ? 'bg-amber-500' : 'bg-[#0B1320]'
                }`}
                style={{ width: `${percentSpent}%` }}
              />
            </div>
          </div>

          {/* Remaining Budget */}
          <div className="bg-white rounded-2xl p-6 border border-[#0B1320]/10 shadow-xs">
            <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider block">
              Remaining Buffer
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span
                className={`text-3xl sm:text-4xl font-bold font-editorial tabular-nums ${
                  remainingBudget < 0 ? 'text-rose-600' : 'text-emerald-700'
                }`}
              >
                ${remainingBudget.toLocaleString()}
              </span>
              <span className="text-xs text-[#6B7280]">USD</span>
            </div>
            <p className="mt-2 text-xs text-[#6B7280]">
              {remainingBudget >= 0
                ? `~$${Math.round(remainingBudget / (currentTrip?.durationDays || 1))} / day remaining`
                : 'Deficit exceeds target limit'}
            </p>
          </div>
        </div>

        {/* 2. CATEGORY BREAKDOWN & CHART */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-start">
          {/* Left: Interactive Category Cards */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-[#0B1320]/10 shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-editorial text-xl font-bold text-[#0B1320]">
                Expense Breakdown by Category
              </h3>
              <span className="text-xs text-[#6B7280]">{tripExpenses.length} records</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {CATEGORIES.map(cat => {
                const amount = categoryTotals[cat] || 0;
                const pct = totalSpent > 0 ? Math.round((amount / totalSpent) * 100) : 0;
                return (
                  <div
                    key={cat}
                    onClick={() =>
                      setSelectedCategoryFilter(selectedCategoryFilter === cat ? 'All' : cat)
                    }
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      selectedCategoryFilter === cat
                        ? 'border-[#0B1320] bg-[#F5F3EE] shadow-xs'
                        : 'border-[#0B1320]/10 bg-white hover:border-[#0B1320]/25'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-[#0B1320]">{cat}</span>
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: CATEGORY_COLORS[cat] }}
                      />
                    </div>
                    <div className="text-xl font-bold font-editorial text-[#0B1320] tabular-nums">
                      ${amount.toLocaleString()}
                    </div>
                    <div className="mt-1 text-[11px] text-[#6B7280] tabular-nums">
                      {pct}% of expenditure
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Elegant SVG Chart & Velocity */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-[#0B1320]/10 shadow-xs flex flex-col items-center justify-center text-center">
            <h3 className="font-editorial text-base font-bold text-[#0B1320] mb-4">
              Allocation Distribution
            </h3>

            {/* Custom SVG Donut Chart */}
            <div className="relative w-44 h-44 mb-4">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {/* Background Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#F5F3EE"
                  strokeWidth="12"
                />

                {/* Slices calculation */}
                {totalSpent > 0 &&
                  (() => {
                    let cumulative = 0;
                    const circumference = 2 * Math.PI * 38; // ~238.76
                    return CATEGORIES.map(cat => {
                      const amount = categoryTotals[cat] || 0;
                      if (amount === 0) return null;
                      const fraction = amount / totalSpent;
                      const dashLength = fraction * circumference;
                      const offset = -cumulative * circumference;
                      cumulative += fraction;

                      return (
                        <circle
                          key={cat}
                          cx="50"
                          cy="50"
                          r="38"
                          fill="transparent"
                          stroke={CATEGORY_COLORS[cat]}
                          strokeWidth="12"
                          strokeDasharray={`${dashLength} ${circumference}`}
                          strokeDashoffset={offset}
                          className="transition-all duration-300 hover:opacity-80"
                        />
                      );
                    });
                  })()}
              </svg>

              {/* Center Donut Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[10px] text-[#6B7280] uppercase tracking-wider">Total</span>
                <span className="text-xl font-bold font-editorial text-[#0B1320] tabular-nums">
                  ${totalSpent}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#6B7280]">
              Accommodations & Dining comprise the majority of projected expenses.
            </p>
          </div>
        </div>

        {/* 3. EXPENSES TRANSACTION TABLE */}
        <div className="bg-white rounded-2xl border border-[#0B1320]/10 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-[#0B1320]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-editorial text-xl font-bold text-[#0B1320]">
                Logged Expenses
              </h3>
              <p className="text-xs text-[#6B7280] mt-0.5">
                Detailed transaction log for {currentTrip?.title}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Category Filter pills */}
              <div className="flex items-center gap-1 overflow-x-auto">
                {['All', ...CATEGORIES].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategoryFilter(cat)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                      selectedCategoryFilter === cat
                        ? 'bg-[#0B1320] text-white'
                        : 'text-[#6B7280] hover:text-[#0B1320] hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsAddExpenseOpen(true)}
                className="px-4 py-2 bg-[#0B1320] hover:bg-[#1E293B] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer shrink-0"
              >
                <Plus className="w-3.5 h-3.5 text-[#D8A84E]" />
                <span>Log Expense</span>
              </button>
            </div>
          </div>

          {/* Table */}
          {filteredExpenses.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F5F3EE] text-[#6B7280] uppercase tracking-wider text-[10px] font-semibold border-b border-[#0B1320]/10">
                  <tr>
                    <th className="py-3 px-6">Description</th>
                    <th className="py-3 px-6">Category</th>
                    <th className="py-3 px-6">Date</th>
                    <th className="py-3 px-6">Payment</th>
                    <th className="py-3 px-6 text-right">Amount</th>
                    <th className="py-3 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0B1320]/5">
                  {filteredExpenses.map(expense => (
                    <tr key={expense.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-6 font-medium text-[#0B1320]">
                        {expense.title}
                      </td>
                      <td className="py-3.5 px-6">
                        <span className="flex items-center gap-1.5 text-[#6B7280]">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: CATEGORY_COLORS[expense.category] }}
                          />
                          <span>{expense.category}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-6 text-[#6B7280] tabular-nums">
                        {expense.date}
                      </td>
                      <td className="py-3.5 px-6 text-[#6B7280]">
                        {expense.paymentMethod}
                      </td>
                      <td className="py-3.5 px-6 text-right font-bold text-[#0B1320] tabular-nums text-sm">
                        ${expense.amount}
                      </td>
                      <td className="py-3.5 px-6 text-right">
                        <button
                          onClick={() => deleteExpense(expense.id)}
                          aria-label="Delete expense"
                          className="p-1 text-[#6B7280] hover:text-rose-600 rounded transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <DollarSign className="w-8 h-8 text-[#6B7280] mx-auto mb-2" />
              <p className="text-xs text-[#6B7280]">No expenses logged in this view.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Expense Modal */}
      {currentTrip && (
        <AddExpenseModal
          isOpen={isAddExpenseOpen}
          onClose={() => setIsAddExpenseOpen(false)}
          tripId={currentTrip.id}
        />
      )}
    </div>
  );
};
