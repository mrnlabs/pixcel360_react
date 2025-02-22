import { Subscription } from '@/types';
import { addDays, format } from 'date-fns';

export const getNextPaymentDate = (subscription: Subscription): string => {
  const startDate = new Date(subscription.started_at);
  const nextPayment = addDays(startDate, subscription.plan?.duration_in_days ?? 0);
  
  return format(nextPayment, 'MMM dd, yyyy'); // Returns like "Feb 22, 2025"
};

export const getSubscriptionDates = (subscription: Subscription) => {
  const startDate = new Date(subscription.started_at);
  const nextPaymentDate = addDays(startDate, subscription.plan?.duration_in_days ?? 0);
  
  return {
    nextPayment: {
      full: format(nextPaymentDate, 'MMMM dd, yyyy'),
      short: format(nextPaymentDate, 'MMM dd, yyyy'),
      relative: format(nextPaymentDate, 'PPP'), // More human-readable format
    },
    daysRemaining: Math.ceil(
      (nextPaymentDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    )
  };
};