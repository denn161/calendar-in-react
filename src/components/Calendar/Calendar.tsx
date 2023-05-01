import cn from 'classnames'

import { checkDateIsEqual } from '../../utils/helpers/date/checkDateIsEqual'
import { checkIsToday } from '../../utils/helpers/date/checkisToday'
import { formatDate } from '../../utils/helpers/date/formatDate'

import styles from './Calendar.module.scss'
import useCalendar from './useCalendar'

interface ICalendar {
	locale?: string
	selectedDate?: Date
	selectDate: (date: Date) => void
	firstWeekDayNumber?: number
}
const Calendar = ({
	selectDate,
	selectedDate,
	locale = 'default',
	firstWeekDayNumber = 1
}: ICalendar) => {
	const { state, actions } = useCalendar({
		currentDate: selectedDate,
		locale,
		firstWeekDayNumber
	})
	return (
		<>
			<div className={styles.calendar__date}>
				{formatDate(selectedDate as Date, 'DD MM YYYY')}
			</div>
			<div className={styles.calendar}>
				<div className={styles.calendar__header}>
					<div
						onClick={() => actions.clickArrow('left')}
						className={styles.arrow__left}
					></div>
					{state.mode === 'days' && (
						<div onClick={() => actions.setMode('monthes')}>
							{state.monthesNames[state.selectedMonths.monthIndex].monthLong}{' '}
							{state.selectedYear}
						</div>
					)}
					{state.mode === 'monthes' && (
						<div onClick={() => actions.setMode('years')}>
							{state.selectedYear}
						</div>
					)}
					{state.mode === 'years' && (
						<div>
							{state.selectedYearsInterval[0]}-{' '}
							{
								state.selectedYearsInterval[
									state.selectedYearsInterval.length - 1
								]
							}
						</div>
					)}
					<div
						onClick={() => actions.clickArrow('right')}
						className={styles.arrow__right}
					></div>
				</div>
				<div className={styles.calendar__body}>
					<>
						{state.mode === 'days' && (
							<>
								<div className={styles.calendar__weeknames}>
									{state.daysNames.map((day, index) => (
										<div key={index}>{day.dayShort}</div>
									))}
								</div>
								<div className={styles.calendar__days}>
									{state.selectAllDays.map(day => {
										const today = checkIsToday(day.date)
										const isSelectedDay = checkDateIsEqual(
											day.date,
											state.selectedDate.date
										)
									 
										const isAdditionalDay =
											day.monthIndex !== state.selectedDate.monthIndex
										return (
											<div
												aria-hidden
												onClick={() => {
													actions.setSelectedDate(day)
													selectDate(day.date)
												}}
												key={`${day.dayNumber}-${day.monthIndex}`}
												className={cn(styles.calendar__day, {
													[styles.calendar__today]: today,
													[styles.additional__day]: isAdditionalDay,
													[styles.calendar__selectedday]: isSelectedDay
												})}
											>
												{day.dayNumber}
											</div>
										)
									})}
								</div>
							</>
						)}
					</>
					{state.mode==='monthes'&& <div className={styles.calendar__monthes}>
           <>
					  {state.monthesNames.map((item,index)=>
						 <div onClick={()=>{
							 actions.setMode('days') 
							 actions.setSelectedMonthsByIndex(item.monthIndex)
						 }} className={cn(styles.calendar__month,{
							[styles.currentmonth]:new Date().getMonth()===item.monthIndex&&new Date().getFullYear()===state.selectedYear,
							[styles.selected]:item.monthIndex===state.selectedMonths.monthIndex
						 })} key={index}>{item.monthLong}</div>
						)}
					 </>
					</div> }
					{state.mode==='years'&&<div className={styles.calendar__years}> 
					 <div className={cn(styles.calendar__year,styles.calendar__prevyear)}>
						 {state.selectedYearsInterval[0]-1}
						</div>   
						 
						 {state.selectedYearsInterval.map((year,index)=>
						  <div onClick={()=>{
								 actions.setMode('monthes') 
								 actions.setSelectedYear(year)

							}} className={cn(styles.calendar__year,{
							 [styles.calendar__active]:new Date().getFullYear()===year, 
							 [styles.selected__year]:year===state.selectedYear
							})} key={index}>{year}</div>
						 )}
						<div className={cn(styles.calendar__year,styles.calendar__nextyear)}>
						 {state.selectedYearsInterval[state.selectedYearsInterval.length-1]+1}
						</div>   
						</div>}
				</div>
			</div>
		</>
	)
}

export default Calendar
