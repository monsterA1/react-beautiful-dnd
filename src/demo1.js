import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { Items } from './common'

const DropBox = styled.div`
  width: 400px;
  margin: auto;
  border: 1px solid lightgray;
  ${({ isDraggingOver }) => (isDraggingOver ? 'background:lightblue;' : '')}
`
const DragItem = styled.div`
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 5px;
  margin: 5px;
  background: ${({ isDragging }) => (isDragging ? 'lightgreen' : 'white')};
`
const DragIcon = styled.span`
  display:inline-block;
  height:18px;
  width: 18px;
  margin-right: 15px;
  background: orange;
  border-radius: 2px;
`
function Demo1() {
  const Data = Object.values(Items)
  const onDragEnd = (result) => {
    if (!(result.source && result.destination)) return
    let sIndex = result.source.index
    let dIndex = result.destination.index
    let [remove] = Data.splice(sIndex, 1)
    Data.splice(dIndex, 0, remove)
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={'droppableId'} type="demo1">
        {(provided, snapshot) => (
          <DropBox
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}>
            {
              Data.map((d, index) => (
                <Draggable
                  key={d.key}
                  draggableId={d.key}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <DragItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      isDragging={snapshot.isDragging}>
                      <DragIcon {...provided.dragHandleProps} />
                      {d.content}
                    </DragItem>
                  )}
                </Draggable>
              ))
            }
            {provided.placeholder}
          </DropBox>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Demo1;
