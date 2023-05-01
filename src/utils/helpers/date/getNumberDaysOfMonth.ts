
/**
 * Функция возвращает колличество дней в месяце
 * @param year {Number} 
 * @param month {Number}
 * @returns number
 */
export const getNumberDaysOfMonth = (
	year: number = new Date().getFullYear(),
	monthIndex: number
) =>  
	new Date(year, monthIndex+1, 0).getDate()

