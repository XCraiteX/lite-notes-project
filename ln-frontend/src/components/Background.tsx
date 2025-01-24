'use client'
import { useEffect, useState } from 'react'

export default function Background() {
	const [link, setLink] = useState<null | string>(null)
	useEffect(() => {
		fetch('https://redlite.ru/api/get_background').then(async res =>
			setLink(await res.json())
		)
	}, [])
	return (
		<>
			<div
				className='w-full h-full fixed -z-20 rk_background'
				style={{
					backgroundImage: `url('${link}')`,
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center center',
					backgroundAttachment: 'fixed',
					backgroundSize: 'cover',
				}}
			></div>

			<div className='w-full h-full fixed -z-[9] backs'></div>
		</>
	)
}
