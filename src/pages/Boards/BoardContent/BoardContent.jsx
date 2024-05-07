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
  closestCorners,
} from '@dnd-kit/core'
import { useState, useEffect } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import { ActivationState } from '@stomp/stompjs'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { CleaningServices } from '@mui/icons-material'
import { cloneDeep } from 'lodash'
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
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
  }

  //trigger trong quá trình kéo (drag) một phần tử
  const handleDragOver = (event) => {

    // Không làm gì thêm nếu đang kéo Column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    //Còn nếu kéo card thì xử lý thêm để có thể kéo card qua lại giữa các column
    //console.log('handleDragOver: ', event)
    const { active, over } = event
    //Cần đảm bảo nếu không tồn tại active hoặc over (khi kẻo a khỏi phạm vị containter thì không làm gì tránh crash trang)
    if (!active || !over) return

    //activeDraggingCard: là cái card đang được kéo
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    // overCard: là cái card đang tương tác trên hoặc dưới só với cái card được kéo ở trên
    const { id: overCardId } = over
    // Tìm 2 cái columns theo cardId

    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)
    // Nếu không tồn tại 1 trong 2 column thì không làm gì hết, tránh crash trang web
    if (!activeColumn || !overColumn) return
    // Xử lý logic ở đây chỉ khi kéo card qua 2 column khác nhau, nếu kéo card trong chính column ban đầu của nó thì không làm gì
    // Vì đây là đoạn xử lý lúc kéo (handleDragOver), còn xử lý lúc kéo xong xuôi thì nó lại là vấn đề khác ở (handleDragEnd)
    if (activeColumn._id !== overColumn._id) {
      setOrderedColumns(prevColumns => {
        // Tìm vị trí (index) của cái overCard trong column đích (nơi mà activeCard sắp được thả)
        const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)
        // Logic tính toán 'cardIndex mới' (trên hoặc dưới overCard)  lấy chuẩn ra từ code của thư viện
        let newCardIndex
        const isBelowOverItem = active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height
        const modifier = isBelowOverItem ? 1 : 0
        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1
        // Clone mảng OrderedColumnsState cũ ra một cái mới để xử lý data rồi return - cập nhật lại OrderedColumnsState mới
        const nextColumns = cloneDeep(prevColumns)
        const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
        const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

        //Column cũ
        if (nextActiveColumn) {
          // Xóa card ở cái column active (cũng có thể hiểu là column cũ, cái lúc mà kéo card ra khỏ nó để sang column khác)
          nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
          // Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
        }
        // Column mới
        if (nextOverColumn) {
          // Kiểm tra xem card đang kéo nó có tồn tại ở overColumn chưa, nếu có thì cần xóa nó trước
          nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
          // Tiếp theo là thêm cái card đang kéo vào overColumn theo vị trí index mới
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)
          // Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
        }
        console.log('nextColumns: ', nextColumns)
        return nextColumns
      })
    }

  }

  // trigger khi kết thúc hành động kéo drag một phần tử =>hành động thả drop
  const handleDragEnd = (event) => {
    console.log('handleDragEnd: ', event)

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      console.log('Hành động kéo thả card- tạm thời không phàm gì cả')
      return
    }
    const { active, over } = event
    //Cần đảm bảo nếu không tồn tại active hoặc over (khi kẻo a khỏi phạm vị containter thì không làm gì tránh trash trang)
    if (!active || !over) return
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
    sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } })
  }
  // console.log('activeDragItemId :', activeDragItemId)
  // console.log('activeDragItemType :', activeDragItemType)
  // console.log('activeDragItemData :', activeDragItemData)
  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])
  // Tìm columns theo card
  const findColumnByCardId = (cardId) => {
    // Đoạn này cần lưu ý, nên dùng c.cards thay vì c.cardOrderIds bời vì ở bước handleDragOver chúng ta sẽ làm dữ liệu cho cards hoàn chình trước rồi mới tạo ra cardOrderIds mới.
    return orderedColumns.find(column => column.cards.map(card => card._id)?.includes(cardId))
  }
  return (
    <DndContext
      sensors={mySensors}
      // Thuật toán phát hiện va chạm (nếu không có thì card với cover lớn sẽ không kéo qua Column được vì lúc này nó dang bị conflict giữa card và column), chúng ta sẽ dung closestCorners thay vì closestCenter
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
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
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box >
    </DndContext>
  )
}

export default BoardContent
