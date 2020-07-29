import React from 'react'

const NoteCard = (props) => {
const {item, index} = props
console.log(item)
console.log(index)

    return (
        <p>{index + 1}) {item}</p>
    )
}

export default NoteCard