export const getColor = (status: string): string => {
  switch (status) {
    case 'Y':
      return 'green lighten-1';
    case 'N':
      return 'red lighten-1';
    case 'APPROVAL':
      return 'green lighten-1';
    case 'REFUSED':
      return 'red lighten-1';
    case 'B2B_F_NEW_REG':
      return 'yellow lighten-1';
    case 'B2B_F_CONTRACT_COMPLETE':
      return 'green lighten-1';
    case 'B2B_F_CANCELLED':
      return 'red lighten-1';
    case 'B2B_F_IN_PROGRESS':
      return 'lime lighten-1';
    case 'F_DIST_COMPLETE':
      return 'orange lighten-1';
    default:
      return 'grey lighten-1';
  }
};
