[源文档](https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/droppable.md)

[源码](https://github.com/atlassian/react-beautiful-dnd)

React-beautifuld-dnd是一个React工具包，实现拖拽功能

支持：垂直列表、水平列表，列表间的移动，鼠标、键盘、和触摸拖拽

使用

react-beautiful-dnd

只有3个API：DragDropContext、Droppable、Draggable

<DragDropContext

   onDragEnd={()=>{}}

   onDragStart={()=>{}}

   onDragUpdate={()=>{}}

   onBeforeDragStart={()=>{}}

\>

   <Droppable droppableId={'droppableId'}>

​     {(provided, snapshot) => (

​       <div

​         ref={provided.innerRef}

​       \>

​         <Draggable

​           draggableId={‘draggableId'}

​           index={index}>

​             {(provided, snapshot) => (

​               <div

​                 ref={provided.innerRef}

​                 {...provided.draggableProps}

​                 {...provided.dragHandleProps}>

​               </div>

​             )}

​         </Draggable>

​         {provided.placeholder}

​       </div>

​     )}

  </Droppable>

</DragDropContext>

DragDropContext：

拖拽组件的根元素，Draggable和Droppable都需要包裹在DragDropContext内部

4个事件

onDragEnd(DropResult)-拖拽完成，一般在这里做数据排序处理

onDragStart(DragStart)-开始拖拽

onDragUpdate(DragUpdate)-更新

onBeforeDragStart(DragStart)-开始拖拽前

Droppable：

存放可拖拽的组件的区域

draggableId：string 必传

direction：vertical/horizontal 允许拖拽的方向

type：string 指定type后相同type的区域可互相拖拽存放，不相同则不允许拖拽存放

isDropDisabled：禁止放置

provided对象

provided.innerRef指向ReactElement中可能的最高DOM节点。这样做是为了避免使用ReactDOM来查找DOM节点。

provided.placeholder 不放这个属性会导致Droppable区域跟随元素个数变更

snapshot对象携带拖拽状态属性，可根据isDraggingOver改变可放置区域的样式

Draggable：

拖拽元素，必须包含在Droppable元素内部

draggableId：string必传

Index：number 必传，在Droppable列表内的排序

isDragDisabled：禁止拖拽

provided对象

provided.draggableProps可拖拽属性

provided.dragHandleProps指定可拖拽区域

snapshot对象携带拖拽状态属性，可根据isDragging改变被拖拽元素的样式