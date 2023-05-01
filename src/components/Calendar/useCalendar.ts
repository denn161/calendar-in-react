import { useMemo, useState } from 'react'

import { createDate } from '../../utils/helpers/date/createDate'
import { createMonth } from '../../utils/helpers/date/createMonth'
import { getMothesNames } from '../../utils/helpers/date/getMonthsNames'
import { getNumberDaysOfMonth } from '../../utils/helpers/date/getNumberDaysOfMonth'
import { getWeekDays } from '../../utils/helpers/date/getWeekDays'

interface IUseCalendar {
	locale?: string
	currentDate?: Date
	firstWeekDayNumber: number
}
type TMods = 'days' | 'monthes' | 'years'

const getYearsInterval = (yaer: number) => {
	const startYear = Math.floor(yaer / 10) * 10
	return [...Array(10)].map((_, index) => startYear + index)
}
 


const useCalendar = ({
	locale,
	currentDate: date,
	firstWeekDayNumber = 1
}: IUseCalendar) => {
	const [mode, setMode] = useState<TMods>('days')
	const [selectedDate, setSelectedDate] = useState(createDate({ date,locale }))
	const [selectedMonths, setSelectedMonths] = useState(
		createMonth({
			date: new Date(selectedDate.year, selectedDate.monthIndex),
			locale
		})
	)
	const [selectedYear, setSelectedYear] = useState(selectedDate.year)
	const [selectedYearsInterval, setSelectedYearsInterval] = useState(
		getYearsInterval(selectedDate.year)
	)

	const monthesNames = useMemo(() => getMothesNames(locale), [])

	const daysNames = useMemo(
		() => getWeekDays(firstWeekDayNumber,locale),
		[]
	)

	const days = useMemo(
		() => selectedMonths.getDaysInMonth(),
		[selectedMonths, selectedYear]
	)

	const selectAllDays = useMemo(() => {
		const daysNumber = getNumberDaysOfMonth(
			selectedYear,
			selectedMonths.monthIndex
		)
		const prevMonthDays = createMonth({
			date: new Date(selectedYear, selectedMonths.monthIndex - 1),
			locale
		}).getDaysInMonth()

		const nextMonthDays = createMonth({
			date: new Date(selectedYear, selectedMonths.monthIndex + 1),
			locale
		}).getDaysInMonth()

		const firstDay = days[0]
		// const lastDay = days[daysNumber - 1]
	

		const shiftIndex = firstWeekDayNumber
		const numberOfPrevDays =
			firstDay.dayInWeek - shiftIndex < 0
				? 7 - (firstWeekDayNumber - firstDay.dayInWeek)
				: firstDay.dayInWeek - shiftIndex

		const totalCalendarDays = 42

		const numberOfNextDays = totalCalendarDays - daysNumber - numberOfPrevDays

		const result = []

		for (let i = 0; i < numberOfPrevDays; i++) {
			const inverted = numberOfPrevDays - i
			result[i] = prevMonthDays[prevMonthDays.length - inverted]
		}
		for (
			let i = numberOfPrevDays;
			i < totalCalendarDays - numberOfNextDays;
			i++
		) {
			result[i] = days[i - numberOfPrevDays]
		}
		for (
			let i = totalCalendarDays - numberOfNextDays;
			i < totalCalendarDays;
			i++
		) {
			result[i] = nextMonthDays[i - totalCalendarDays + numberOfNextDays]
		}
		return result
	}, [selectedMonths.year, selectedMonths.monthIndex, selectedYear])

	const clickArrow = (direction: 'right' | 'left') => {
		if (mode === 'years' && direction === 'left') {
			setSelectedYearsInterval(getYearsInterval(selectedYearsInterval[0] - 10))
		}
		if (mode === 'years' && direction === 'right') {
			setSelectedYearsInterval(getYearsInterval(selectedYearsInterval[0] + 10))
		}
		if (mode === 'monthes' && direction === 'left') {
			const year = selectedYear - 1
			if (!selectedYearsInterval.includes(year))
				setSelectedYearsInterval(getYearsInterval(year))
			setSelectedYear(year)
		}
		if (mode === 'monthes' && direction === 'right') {
			const year = selectedYear + 1
			if (!selectedYearsInterval.includes(year))
				setSelectedYearsInterval(getYearsInterval(year))
			setSelectedYear(year)
		}

		if (mode === 'days') {
			const monthIndex =
				direction === 'right'
					? selectedMonths.monthIndex + 1
					: selectedMonths.monthIndex - 1
         
					if(monthIndex===-1){
						const year =selectedYear-1 
						setSelectedYear(year) 
						if(!selectedYearsInterval.includes(year)) setSelectedYearsInterval(getYearsInterval(year))
						setSelectedMonths(createMonth({date:new Date(selectedYear-1,11),locale}))
					}

					if(monthIndex===12){
						 const year =selectedYear+1 
						 setSelectedYear(year) 
						 if(!selectedYearsInterval.includes(year)) setSelectedYearsInterval(getYearsInterval(year)) 
						 setSelectedMonths(createMonth({date:new Date(selectedYear+1,0),locale}))
					}

			setSelectedMonths(
				createMonth({ date: new Date(selectedYear, monthIndex), locale })
			)
		}
	}

	 const setSelectedMonthsByIndex = (index:number)=>{
		   setSelectedMonths(createMonth({date:new Date(selectedYear,index),locale}))
	 }

	return {
		state: {
			mode,
			daysNames,
			days,
			monthesNames,
			selectedDate,
			selectedMonths,
			selectedYear,
			selectAllDays,
			selectedYearsInterval
		},
		actions: {
			setMode,
			setSelectedDate,
			setSelectedMonths,
			setSelectedYear,
			setSelectedYearsInterval,
			clickArrow,
			setSelectedMonthsByIndex
		}
	}
}

export default useCalendar
