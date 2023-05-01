import { createDate } from './createDate'
import { createMonth } from './createMonth'

interface ICreateYear {
	locale?: string
	year?: number
	monthIndex?: number
}

export const createYear = (params?: ICreateYear) => {

	const locale = params?.locale ?? 'default'

	const today = createDate()

	const monthCount = 12

	const year = params?.year ?? today.year

	const monthIndex = params?.monthIndex ?? today.monthIndex

	const month = createMonth({ date: new Date(year, monthIndex), locale })

	 const creteYearMonthes = ()=>{
		const monthes = []
		for (let i = 0; i <= monthCount - 1; i++) {
			const days = createMonth({
				date: new Date(year, i),
				locale
			}).getDaysInMonth()
			const month = createMonth({ date: new Date(year, i), locale })
			monthes[i] = { month, days }
		}
		 return monthes
	 }

	return {
		year,
		month,
	  creteYearMonthes
	}
}
