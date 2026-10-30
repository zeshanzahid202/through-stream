import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ExpenseCategory } from '../types';
import { X, DollarSign, Calendar, CreditCard, Tag } from 'lucide-react';

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripId: string;
}

const CATEGORIES: ExpenseCategory[] = [
  'Accommodation',
  'Transport',
  'Food',
  'Activities',
  'Shopping',
  'Other'
];

export const AddExpenseModal: React.FC<AddExpenseModalProps> = ({ isOpen, onClose, tripId }) => {
  const { addExpense, showToast } = useApp();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(65);
  const [category, setCategory] = useState<ExpenseCategory>('Food');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || amount <= 0) {
      showToast('Please enter a valid title and positive amount', 'error');
      return;
    }

    addExpense({
      tripId,
      title: title.trim(),
      amount,
      category,
      date,
      paymentMethod
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden border border-[#0B1320]/15 shadow-2xl animate-scaleUp">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#0B1320]/10 flex items-center justify-between bg-[#F5F3EE]">
          <h3 className="font-editorial text-lg font-bold text-[#0B1320]">
            Record Trip Expense
          </h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1 text-[#6B7280] hover:text-[#0B1320] rounded-lg hover:bg-black/5 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#0B1320] mb-1.5">
              Expense Description
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Traditional Kaiseki Dinner in Gion"
              className="w-full text-xs px-3.5 py-2.5 bg-[#F5F3EE] border border-[#0B1320]/15 rounded-xl text-[#0B1320] focus:outline-hidden focus:border-[#0B1320]"
              required
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#0B1320] mb-1.5">
                Amount (USD)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-[#6B7280]" />
                <input
                  type="number"
                  min={1}
                  step={1}
                  value={amount}
                  onChange={e => setAmount(Number(e.target.value))}
                  className="w-full text-xs pl-9 pr-3.5 py-2.5 bg-[#F5F3EE] border border-[#0B1320]/15 rounded-xl text-[#0B1320] focus:outline-hidden focus:border-[#0B1320]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0B1320] mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as ExpenseCategory)}
                className="w-full text-xs px-3 py-2.5 bg-[#F5F3EE] border border-[#0B1320]/15 rounded-xl text-[#0B1320] focus:outline-hidden focus:border-[#0B1320]"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#0B1320] mb-1.5">
                Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-[#6B7280]" />
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#F5F3EE] border border-[#0B1320]/15 rounded-xl text-[#0B1320] focus:outline-hidden focus:border-[#0B1320]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0B1320] mb-1.5">
                Payment Method
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-2.5 w-4 h-4 text-[#6B7280]" />
                <select
                  value={paymentMethod}
                  onChange={e => setPaymentMethod(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#F5F3EE] border border-[#0B1320]/15 rounded-xl text-[#0B1320] focus:outline-hidden focus:border-[#0B1320]"
                >
                  <option value="Credit Card">Credit Card</option>
                  <option value="Cash">Cash</option>
                  <option value="Apple Pay">Apple Pay</option>
                  <option value="Debit Card">Debit Card</option>
                </select>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-[#0B1320]/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#6B7280] hover:text-[#0B1320] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#0B1320] text-white hover:bg-[#1E293B] rounded-xl text-xs font-semibold shadow-sm cursor-pointer"
            >
              Log Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
