import { getNumberWeek } from './getWeekNumber'

interface ICreateDate {
	locale?: string
	date?: Date
}
export const createDate = (params?: ICreateDate) => {
	const locale = params?.locale ?? 'default'
	const date = params?.date ?? new Date()
	const dayLong = date.toLocaleDateString(locale, { weekday: 'long' })
	const dayShort = date.toLocaleDateString(locale, { weekday: 'short' })
	const dayNumber = date.getDate()

	const dayInWeek = date.getDay()

	const year = date.getFullYear()

	const yearShort = date.toLocaleDateString(locale, { year: '2-digit' })

	const monthLong = date.toLocaleDateString(locale, { month: 'long' })
	const monthShort = date.toLocaleDateString(locale, { month: 'short' })
	const monthIndex = date.getMonth()

	const monthNumber = date.getMonth() + 1

	const timestamp = date.getTime()

	const numberWeek = getNumberWeek(date)

	return {
		date,
		dayInWeek,
		dayLong,
		dayNumber,
		dayShort,
		year,
		yearShort,
		monthIndex,
		monthNumber,
		monthLong,
		monthShort,
		timestamp,
		numberWeek
	}
}
