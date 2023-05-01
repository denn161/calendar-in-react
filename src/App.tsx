import { useState } from 'react'

import Calendar from './components/Calendar/Calendar'


function App() {
	const [currentDate, setCurrentDate] = useState(new Date())
    
	return (
		<div className='app-container'>

			<Calendar  selectedDate={currentDate} selectDate={setCurrentDate} locale='default'/>
		</div>
	)
}

export default App
