import React from "react";

/**
 * DataCard Component
 * Displays individual note details with edit and delete actions.
 *
 * @param {Object} props
 * @param {Object} props.notes - Note object containing _id, title, subject, createdAt, etc.
 * @param {Function} props.deleteData - Handler to delete note by _id
 * @param {Function} props.updateData - Handler to populate form for editing
 */
const DataCard = ({ notes, deleteData, updateData }) => {
  // Destructure with default fallbacks to prevent runtime crashes
  const { _id, title = "Untitled", subject = "" } = notes || {};

  return (
    <article className="bg-gray-100 hover:bg-gray-200/80 transition-colors border border-gray-200 rounded-3xl p-5 flex flex-col justify-between h-52 shadow-xs group">
      {/* Content Section */}
      <div className="flex flex-col gap-2 overflow-hidden">
        <h3
          title={title}
          className="font-bold text-gray-900 text-lg leading-snug line-clamp-1 wrap-break-word"
        >
          {title}
        </h3>
        <p
          title={subject}
          className="text-gray-600 text-sm leading-relaxed line-clamp-3 wrap-break-word whitespace-pre-wrap"
        >
          {subject}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-200/60 mt-auto">
        <button
          type="button"
          onClick={() => updateData?.(notes)}
          className="bg-white hover:bg-gray-50 active:scale-95 text-gray-800 text-sm font-medium h-9 px-4 rounded-xl border border-gray-300 transition-all cursor-pointer shadow-xs"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => deleteData?.(_id)}
          className="bg-black hover:bg-red-600 active:scale-95 text-white text-sm font-medium h-9 px-4 rounded-xl transition-all cursor-pointer shadow-xs"
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default React.memo(DataCard);
