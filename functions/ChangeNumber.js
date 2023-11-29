export function convertToArabicNumeric(number) {
    const digitsMap = {
      0: '٠',
      1: '١',
      2: '٢',
      3: '٣',
      4: '٤',
      5: '٥',
      6: '٦',
      7: '٧',
      8: '٨',
      9: '٩',
    };
  
    return String(number).replace(/[0-9]/g, digit => digitsMap[digit]);
  }

  