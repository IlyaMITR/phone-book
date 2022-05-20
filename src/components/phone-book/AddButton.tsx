import { useState } from "react"
import AddWindow from "../windows/AddWindow"

export default function AddButton() {

	const [visible, setVisible] = useState(false)

	return (
		<>
			<button className="add-button" onClick={() => setVisible(true)}/>
			{
				visible ? <AddWindow setVisible={() => setVisible(false)}/> : null
			}
		</>
	)
}