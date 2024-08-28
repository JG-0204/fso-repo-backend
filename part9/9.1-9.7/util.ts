export const isNotANumber = (value: any): boolean => isNaN(Number(value));

export const getError = (error: unknown): string => {
  let errorMessage = 'Something went wrong, ';
  if (error instanceof Error) {
    errorMessage += 'Error: ' + error.message;
  }
  return errorMessage;
};
