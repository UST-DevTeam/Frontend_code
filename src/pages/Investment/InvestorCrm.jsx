import React, { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import Container from "../../components/DragComponents/container";
import { Item } from "../../components/DragComponents/sortable_item";

const wrapperStyle = {
  "overflow-x": "auto",
  flexDirection: "row",
  width:"83vw",
  display:"flex",


};

const defaultAnnouncements = {
  onDragStart(id) {
    console.log(`Picked up draggable item ${id}.`);
  },
  onDragOver(id, overId) {
    if (overId) {
      console.log(
        `Draggable item ${id} was moved over droppable area ${overId}.`
      );
      return;
    }

    console.log(`Draggable item ${id} is no longer over a droppable area.`);
  },
  onDragEnd(id, overId) {
    if (overId) {
      console.log(
        `Draggable item ${id} was dropped over droppable area ${overId}`
      );
      return;
    }

    console.log(`Draggable item ${id} was dropped.`);
  },
  onDragCancel(id) {
    console.log(`Dragging was cancelled. Draggable item ${id} was dropped.`);
  }
};

export let investor = [
  {
    id: 1,
    img: "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg?w=740",
    name: "Corn",
    Date: "Aug 9, 2017 AT 12:00 AM",
    Text: "Conference call TO discuss synergies",

  },
  {
    id: 2,
    img: "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg?w=740",
    name: "Steve Smith",
    Date: "Aug 9, 2017 AT 12:00 AM",
    Text: "Conference call TO discuss synergies",

  },
  {
    id: 3,
    img: "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg?w=740",
    name: "Mark Boucher",
    Date: "Aug 9, 2017 AT 12:00 AM",
    Text: "Conference call TO discuss synergies",

  },
  {
    id: 4,
    img: "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg?w=740",
    name: "Harry cook",
    Date: "Aug 9, 2017 AT 12:00 AM",
    Text: "Conference call TO discuss syneraragongies",

  }
];

function Carts() {

  const [items, setItems] = useState({
    "A": ["Wavemaker Partnerst", "Spa P", "GameDay Catering",],
    "B": ["Exploration Kids", "Yoga Professor", "Darwin Travel"],
    "C": ["Party Plex", "Pizza Factor", "Acorn Crafts"],
    "D": ["Skin care", "Tattoo", "Perfume"],
    "E": ["13", "14", "15","31","32"],
   
});
  const [activeId, setActiveId] = useState();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );


  function findContainer(id) {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) => items[key].includes(id));
  }

  function handleDragStart(event) {
    const { active } = event;
    const { id } = active;

    setActiveId(id);
  }

  function handleDragOver(event) {
    const { active, over, draggingRect } = event;
    const { id } = active;
    const { id: overId } = over;

    // Find the containers
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setItems((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.indexOf(id);
      const overIndex = overItems.indexOf(overId);

      let newIndex;
      if (overId in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overItems.length - 1 &&
          draggingRect?.offsetTop > over.rect.offsetTop + over.rect.height;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item !== active.id)
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length)
        ]
      };
    });
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = items[activeContainer].indexOf(active.id);
    const overIndex = items[overContainer].indexOf(overId);

    console.log(arrayMove(items[overContainer], activeIndex, overIndex),activeIndex, overIndex,"activeContainer,overContainer")

    // if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex)
      }));
    // }

    setActiveId(null);
  }

  console.log(activeId,items,"itemssss");
  return (
    <>
      <div style={wrapperStyle}>
      <DndContext
        announcements={defaultAnnouncements}
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      > 
        {
          Object.entries(items).map((itm,index)=>{
            console.log(itm,"asdfghjkl")

            return <>   <Container id={itm[0]} items={itm[1]} /></>
          })
        }
        <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
      </DndContext>
    </div>
    </>
  )
}

export default Carts

