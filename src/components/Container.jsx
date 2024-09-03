import update from 'immutability-helper'
import { useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'
import { Box } from './Box.jsx'
import { ItemTypes } from './ItemTypes.jsx'
import { Card, CardBody, Stack, CardHeader, Heading, Text } from '@chakra-ui/react'

const styles = {
    width: '100vw',
    height: '100vh',
    //   border: '1px solid black',
    position: 'absolute',
    zIndex: 1,
}
export const Container = ({ hideSourceOnDrag }) => {
    const [boxes, setBoxes] = useState({
        a: { top: 40, left: 0, title: 'Dela Rosa' },
        b: { top: 80, left: 0, title: 'Kratos' },
        c: { top: 120, left: 0, title: 'Magdangal' },
        d: { top: 160, left: 0, title: 'Halili' },
        e: { top: 200, left: 0, title: 'Dominique' },
    })
    const moveBox = useCallback(
        (id, left, top) => {
            setBoxes(
                update(boxes, {
                    [id]: {
                        $merge: { left, top },
                    },
                }),
            )
        },
        [boxes, setBoxes],
    )
    const [, drop] = useDrop(
        () => ({
            accept: ItemTypes.BOX,
            drop(item, monitor) {
                const delta = monitor.getDifferenceFromInitialOffset()
                const left = Math.round(item.left + delta.x)
                const top = Math.round(item.top + delta.y)
                moveBox(item.id, left, top)
                return undefined
            },
        }),
        [moveBox],
    )
    return (
        <div ref={drop} style={styles}>
            <Card textAlign={'center'} right={50} top={12} position={'absolute'} width={'300px'} height={'inherit'}>
                <CardBody>
                    {Object.keys(boxes).map((key) => {
                        const { left, top, title } = boxes[key]
                        return (
                            <Box
                                key={key}
                                id={key}
                                left={left}
                                top={top}
                                hideSourceOnDrag={hideSourceOnDrag}
                                margin={'10'}
                            >
                                {title}
                            </Box>
                        )
                    })}
                </CardBody>
            </Card>
        </div>
    )
}
