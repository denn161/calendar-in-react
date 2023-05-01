import { createDate } from './createDate'

export const getMothesNames = (locale?:string)=>{ 

	const monthes:{
		  monthLong:ReturnType<typeof createDate>['monthLong'],
			monthShort:ReturnType<typeof createDate>['monthShort'],
			monthIndex:ReturnType<typeof createDate>['monthIndex'],
			date:ReturnType<typeof createDate>['date']
	}[]=Array.from({length:12}) 
      
	const d = new Date()

	   monthes.forEach((_,index)=>{
			  const {monthLong,monthIndex,monthShort,date} =createDate({date:new Date(d.getFullYear(),index,1),locale})
				monthes[monthIndex]={monthLong,monthIndex,monthShort,date}
		 })

		 return monthes
	   
}