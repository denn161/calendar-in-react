import { createDate } from './createDate'
import { getNumberDaysOfMonth } from './getNumberDaysOfMonth'

interface ICreateMonth {
	locale?: string
	date?: Date
}

export const createMonth = (params?: ICreateMonth) => {
	const locale = params?.locale ?? 'default'
	const date = params?.date ?? new Date()

	const { monthLong, monthIndex, year, monthNumber } = createDate({
		date,
		locale
	})
	const getDay = (index: number) => {
		return createDate({ date: new Date(year, monthIndex, index + 1), locale })
	}

	const getDaysInMonth = () => {
		const days = []

		for (let i = 0; i <= getNumberDaysOfMonth(year, monthIndex) - 1; i++) {
			days[i] = getDay(i)
		}

		return days
	}

	return {
		monthLong,
		monthIndex,
		getDaysInMonth,
		monthNumber,
		year,
		getDay
	}
}
