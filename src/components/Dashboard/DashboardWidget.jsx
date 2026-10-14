import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MaterialSymbol } from 'react-material-symbols';

export default function DashboardWidget({ id, title, children, dragHandleProps }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    position: 'relative',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="card group relative border border-brand-primary/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(6,64,43,0.1)]"
    >
      <div
        {...attributes}
        {...listeners}
        className="flex cursor-grab select-none items-center gap-3 border-b border-brand-primary/5 bg-gradient-to-r from-white to-surface-light/70 px-5 py-4 active:cursor-grabbing"
      >
        <div className="flex items-center gap-2 text-on-surface-subtle opacity-0 transition-opacity group-hover:opacity-100">
          <MaterialSymbol icon="drag_indicator" size={18} />
        </div>
        <h4 className="flex-1 text-base font-black tracking-tight text-brand-primary sm:text-lg">{title}</h4>
        {dragHandleProps}
      </div>
      <div className="p-5 sm:p-6">
        {children}
      </div>
    </div>
  );
}
