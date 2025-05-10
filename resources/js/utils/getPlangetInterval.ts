export const getPlanInterval = (interval: string) => {
    switch (interval) {
      case 'week':
        return 'Week';
      case 'month':
        return 'Month';
      case 'semi_annual':
        return '6 Months';
      case 'year':
        return 'Year';
      default:
        return interval;
    }
  }