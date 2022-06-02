import { useState } from 'react'
import { Box } from '@mui/material'

interface Props {
    count: number
}

const defaultProps: Props = {
    count: 1
}

function Paragraph({ count }: Props = defaultProps) {
    const [selected, setSelected] = useState(false)

    return (
        <Box
            style={{cursor: "pointer", display: 'inline-block'}}
            sx={{
                filter: selected ? 'blur( 5px )' : '',
                height: '100%',
            }}
        >
            <p 
                onMouseOver={() => !selected && setSelected(true)}
                onMouseOut={() => selected && setSelected(false)}
            >Paragraph {count + 1}</p>
        </Box>
    )
}

export default Paragraph