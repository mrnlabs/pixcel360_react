import { Subscription } from '@/types';
import { format, formatDistanceToNow, isAfter, parseISO } from 'date-fns';
export const useSubscriptionStatus = (subscription: Subscription) => {
    const startDate = parseISO(subscription?.started_at);
    const expiryDate = parseISO(subscription?.expires_at);
    const today = new Date();
  
    return {
      isExpired: !isAfter(expiryDate, today),
      timeRemaining: formatDistanceToNow(expiryDate, { addSuffix: true }),
      formattedExpiryDate: format(expiryDate, 'd,MMMM yyyy'),
      formattedStartDate: format(startDate, 'd,MMMM yyyy')
    };
  }