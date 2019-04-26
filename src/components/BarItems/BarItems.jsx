import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Delete } from "@material-ui/icons";
import PropTypes from 'prop-types';

import './BarItems.scss';


const BarItems = (props) => {
  const useMin = (name) => (
    name.slice(0, 7) + '...'
  )

  const rePlates = ({ source, destination }) => {
    if(!destination) return;
    const [plate] = props.list.splice(source.index, 1)
    props.list.splice(destination.index, 0, plate)
    props.reorderPlates(props.list)
  }

  return(
    <div className = "view-bar">
    <DragDropContext onDragEnd = {(result) => rePlates(result)} >
      <Droppable droppableId = "drop-main">
        {(provider) => (
           <div {...provider.droppableProps} ref = {provider.innerRef}>
               { props.list.map(({text, id}, index) => (
                  <Draggable key={id} index = {index} draggableId = {`plate-${id}`}>
                    {(provider) => (
                     <div 
                     className = 'elem-list' 
                     ref = {provider.innerRef}
                     {...provider.dragHandleProps} {...provider.draggableProps}>
                      { (text.length > 12) ? useMin(text) : text }
                      <span className="delete-icon" onClick = {(e) => {
                        props.removeElement(index)
                      }}>
                      <Delete/>
                      </span>
                     </div>
                   )}
                 </Draggable>
              ))}

            {provider.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
    </div>
  )
}

export default connect((state) => {
  return({
    list: state.listOfPoints
  })
}, (dispatch) => {
  return({
    reorderPlates: (e) => {
      return dispatch({
        type: "REPLACE_ALL",
        payload: e
      })
    },
    removeElement: (id) => {
      return dispatch({
        type: "DELETE_INDEX",
        payload: id
      })
    }
  })
})(BarItems);

// prop check:
BarItems.propTypes = {
  list: PropTypes.array.isRequired
}
