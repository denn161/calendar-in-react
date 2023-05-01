import { createDate } from './createDate'

export const getWeekDays = (firstDay:number=1,locale?:string)=>{ 

	const days:{
		  dayLong:ReturnType<typeof createDate>['dayLong'],
			dayShort:ReturnType<typeof createDate>['dayShort']			
	}[]=Array.from({length:7}) 
      
	const d = new Date()

	   days.forEach((_,index)=>{
			  const {dayInWeek,dayLong,dayShort} =createDate({date:new Date(d.getFullYear(),d.getMonth(),index+1),locale})
				days[dayInWeek]={dayLong,dayShort}
		 })

		 return [...days.slice(firstDay,days.length),...days.slice(0,firstDay)]
	   
}