 
 export const getNumberWeek=(date:Date)=>{
	 const firstDayInYear = new Date(date.getFullYear(),0,1) 

	 const numberOfDays = (date.getTime() - firstDayInYear.getTime())/86400000 

	 return Math.ceil((numberOfDays)/7) 
 }
