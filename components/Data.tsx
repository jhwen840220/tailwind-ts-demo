import { useState } from 'react'
import TableCell from '@mui/material/TableCell';

const Data = ({ id, name, phone, onRemove, onEdit }) => {
  const [nameVal, setNameVal] = useState(name)
  const [phoneVal, setPhoneVal] = useState(phone)
  const [isEditing, setIsEditing] = useState(false)
  const handleToggleIsEditing = val => {
    setIsEditing(val)
  }

  const handleRemove = id => {
    onRemove && onRemove(id)
  }

  const handleEdit = id => {
    onEdit({ id, name: nameVal, phone: phoneVal })
    handleToggleIsEditing(false)
  }

  const handleCancelEdit = () => {
    handleToggleIsEditing(false)
    setNameVal(name)
    setPhoneVal(phone)
  }
  return (
    <>
      <TableCell component="th" scope="row">
        {isEditing
          ? <input type="text" value={nameVal} onChange={e => { setNameVal(e.target.value) }} />
          : name}
      </TableCell>
      <TableCell align="right">
        {isEditing
          ? <input type="text" value={phoneVal} onChange={e => { setPhoneVal(e.target.value) }} />
          : phone}

      </TableCell>
      <TableCell>
        {isEditing
          ? <>
            <button className="bg-sky-500 rounded py-1 px-2 hover:bg-sky-800" onClick={() => { handleEdit(id) }}>確認</button>
            <button className="ml-3 bg-sky-500 rounded py-1 px-2 hover:bg-sky-800" onClick={handleCancelEdit}>取消</button>
          </>
          : <>
            <button className="bg-sky-500 rounded py-1 px-2 hover:bg-sky-800" onClick={() => { handleRemove(id) }}>刪除</button>
            <button className="ml-3 bg-sky-500 rounded py-1 px-2 hover:bg-sky-800" onClick={() => { handleToggleIsEditing(true) }}>修改</button>
          </>
        }
      </TableCell>
    </>
  )
}

export default Data;