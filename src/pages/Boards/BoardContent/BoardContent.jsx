import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core'
import { useState, useEffect } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import { ActivationState } from '@stomp/stompjs'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}
function BoardContent({ board }) {
  // Yêu cầu chuột di chuyển 10px thì mới kích hoạt event, fix trường hợp click bị gọi event
  const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  //
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  // Nhẫn giữ 250ms và dung sai của cảm ứng thì mới kích hoạt event
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })
  //Ưu tiên sử dụng kết hợp 2 loại sensors là mouse và touch để có trải nghiệm trên mobile tốt nhất, không bị bug
  const mySensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
 //trigger khi bắt đầu kéo (drag) một phần tử
  const handleDragStart = (event) => {
    console.log('handleDragStart: ', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN )
    setActiveDragItemData(event?.active?.data?.current)
  }
   // trigger khi kết thúc hành động kéo drag một phần tử =>hành động thả drop
  const handleDragEnd = (event) => {
    console.log('handleDragEnd: ', event)
    const { active, over } = event
    //Kiểm tra nếu không tồn tại over (kéo linh tinh ra ngoài thì return luôn tránh lỗi)
    if (!over) return
    // Nếu vị trí sau khi kéo thả khác vị trí ban đầu
    if (active.id !== over.id) {
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
      const newIndex = orderedColumns.findIndex(c => c._id === over.id)
      // Dùng arrayMove của dnd-kit để sắp xếp lại mảng columns ban đầu.
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
      // Cập nhật lại state columns ban đầu sau khi đã kéo thả
      setOrderedColumns(dndOrderedColumns)
    }
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }

  const customeAnimation = {
    sideEffects: defaultDropAnimationSideEffects({styles:{active:{opacity:'0.5'}}})
  }
  console.log('activeDragItemId :', activeDragItemId);
  console.log('activeDragItemType :', activeDragItemType);
  console.log('activeDragItemData :', activeDragItemData);
  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])
  return (
    <DndContext
      sensors={mySensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd} >
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        p: '10px 0'
      }}>
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={customeAnimation}>
          {(!activeDragItemType) && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column ={activeDragItemData}/>}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card ={activeDragItemData}/>}
        </DragOverlay>
      </Box >
    </DndContext>
  )
}

export default BoardContent
