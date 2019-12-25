import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { Items, Columns } from './common'

const ContainerBox = styled.div`
    display: flex;
`
const DropBoxOut = styled.div`
    display: flex;
    border: 1px solid red;
`;
const DropBox = styled.div`
  min-width: 400px;
  margin: 10px;
  min-height:100px;
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
const TitleStyle = styled.div`
    font-size:16px;
    font-weight: bold;
    padding:10px;
`;
function Demo3() {
    const ColumnsData = Object.values(Columns)
    const onDragEnd = (result) => {
        if(!result.destination) return
        console.log(result)
        if(result.type === 'demo3_board'){
            let sIndex = result.source.index
            let dIndex = result.destination.index
            let [remove] = ColumnsData.splice(sIndex, 1)
            ColumnsData.splice(dIndex, 0, remove)
        } else if(result.type === 'demo3'){
            let [remove] = Columns[result.source.droppableId].items.splice(result.source.index, 1)
            Columns[result.destination.droppableId].items.splice(result.destination.index, 0, remove)
        }
    }
    return (
        <ContainerBox>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId={'demo3_board'} type="demo3_board" direction="horizontal">
                    {(provided, snapshot) => (
                        <DropBoxOut ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
                            {
                                ColumnsData.map((v, i) => (
                                    <Draggable
                                        key={v.key}
                                        draggableId={v.key}
                                        index={i}
                                    >
                                        {(provided, snapshot) => (
                                            <DragItem
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                isDragging={snapshot.isDragging}>
                                                <Droppable droppableId={v.key} type="demo3">
                                                    {(provided, snapshot) => (
                                                        <DropBox ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
                                                            <TitleStyle>{v.key}</TitleStyle>
                                                            {
                                                                v.items.map((itemKey, index) => (
                                                                    <Draggable
                                                                        key={itemKey}
                                                                        draggableId={itemKey}
                                                                        index={index}
                                                                    >
                                                                        {(provided, snapshot) => (
                                                                            <DragItem
                                                                                ref={provided.innerRef}
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}
                                                                                isDragging={snapshot.isDragging}>
                                                                                {Items[itemKey].content}
                                                                            </DragItem>
                                                                        )}
                                                                    </Draggable>
                                                                ))
                                                            }
                                                            {provided.placeholder}
                                                        </DropBox>
                                                    )}
                                                </Droppable>
                                            </DragItem>
                                        )}
                                    </Draggable>
                                ))
                            }
                            {provided.placeholder}
                        </DropBoxOut>
                    )}
                </Droppable>
                {/* {
                    ColumnsData.map(v => (
                        <Droppable droppableId={v.key} key={v.key} type="demo3">
                            {(provided, snapshot) => (
                                <DropBox
                                    ref={provided.innerRef}
                                    isDraggingOver={snapshot.isDraggingOver}>
                                    <TitleStyle>{v.key}</TitleStyle>
                                    {
                                        v.items.map((itemKey, index) => (
                                            <Draggable
                                                key={itemKey}
                                                draggableId={itemKey}
                                                index={index}
                                            >
                                                {(provided, snapshot) => (
                                                    <DragItem
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        isDragging={snapshot.isDragging}>
                                                        {Items[itemKey].content}
                                                    </DragItem>
                                                )}
                                            </Draggable>
                                        ))
                                    }
                                    {provided.placeholder}
                                </DropBox>
                            )}
                        </Droppable>
                    ))
                } */}
            </DragDropContext>
        </ContainerBox>
    );
}

export default Demo3;
