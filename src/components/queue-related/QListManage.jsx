import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useFirestore } from "../../hooks/useFirestore";

// styles
import "./QListManage.css";

// components
import QueueEditForm from "./QEditForm";
import CopyBtn from "./CopyBtn";

// icons
import DragIndicatorIcon from "../../icons/draggable-indicator.svg";
import EditIcon from "../../icons/edit-btn-icon.svg";

export default function QueueListManage({ queues, isPending }) {
  const [editingQueues, setEditingQueues] = useState([]);
  const [queueList, updateQueueList] = useState(queues);

  const { updateDocument, error } = useFirestore("queueList");

  const handleEditBtnClick = (queueId) => {
    setEditingQueues([...editingQueues, queueId]);
  };

  const handleFormClose = (queueId) => {
    setEditingQueues(editingQueues.filter((id) => id !== queueId));
  };

  useEffect(() => {
    queueList.forEach((queue) => {
      updateDocument(queue.id, { ...queue });
    });
  }, [queueList]);

  useEffect(() => {
    updateQueueList(queues);
  }, [queues]);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(queueList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update the onNumber values based on the new order
    const cooked = [];
    items.forEach((queue, i) => {
      const currentIndex = items.findIndex((item) => item.id === queue.id);
      cooked.push({
        ...queue,
        onNumber: currentIndex + 1,
      });
    });

    // Remove any duplicates from the new list
    const uniqueCooked = cooked.reduce((acc, curr) => {
      if (
        !acc.some((queue) => {
          return queue.id === curr.id;
        })
      ) {
        acc.push(curr);
      }
      return acc;
    }, []);

    // Update the state with the new list
    updateQueueList(uniqueCooked);
  };

  return (
    <>
      <CopyBtn queues={queues} />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="queues" direction="vertical">
          {(provided, snapshot) => (
            <ol
              className={`queue-list-in-both QueueListManage${
                snapshot.isDraggingOver ? " dragging" : ""
              }`}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {queues.map((queue, index) => (
                <Draggable
                  key={queue.id}
                  draggableId={queue.id}
                  index={index}
                  type="QUEUE_ITEM"
                >
                  {(provided) => (
                    <li
                      key={queue.id}
                      className={
                        editingQueues.includes(queue.id) ? "editing" : null
                      }
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      {editingQueues.includes(queue.id) ? null : (
                        <button className="drag-btn">
                          <img
                            className="drag-icon"
                            src={DragIndicatorIcon}
                            alt="drag icon / drag button / 6-dots button"
                          />
                        </button>
                      )}

                      <h2 {...provided.dragHandleProps}>{queue.onNumber}</h2>

                      {editingQueues.includes(queue.id) ? (
                        <QueueEditForm
                          queue={queue}
                          queues={queues}
                          onClose={() => handleFormClose(queue.id)}
                        />
                      ) : (
                        <>
                          <div className="flex-name-n-btn">
                            <p>{queue.name}</p>
                            <a href={queue.videoLink} target="_blank"></a>
                          </div>
                          <button className="edit-btn">
                            <img
                              className="edit-icon"
                              src={EditIcon}
                              alt="edit button / icon"
                              onClick={() => handleEditBtnClick(queue.id)}
                            />
                          </button>
                        </>
                      )}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ol>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}
