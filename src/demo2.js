import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { Items } from './common'

const DropBox = styled.div`
  display: flex;
  margin: 100px auto;
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
function Demo2() {
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
      <Droppable droppableId={'droppableId'} type="demo2" direction="horizontal">
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
                      {...provided.dragHandleProps}
                      isDragging={snapshot.isDragging}>
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

export default Demo2;
