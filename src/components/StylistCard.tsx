import {
  FiBriefcase,
  FiEdit2,
  FiMapPin,
  FiStar,
  FiTrash2,
} from "react-icons/fi";
import type { Barber } from "../types";

interface StylistCardProps {
  barber: Barber;
  onEdit: (barber: Barber) => void;
  onDelete: (barber: Barber) => void;
  onBook: (barber: Barber) => void;
}

export function StylistCard({
  barber,
  onEdit,
  onDelete,
  onBook,
}: StylistCardProps) {
  return (
    <article className="barber-card">
      <div className="barber-image-wrap">
        <img src={barber.imageUrl} alt={barber.name} className="barber-image" />
        <div className="rating-chip">
          <FiStar />
          {barber.rating.toFixed(1)}
        </div>
      </div>

      <div className="barber-body">
        <div className="barber-top-row">
          <h3>{barber.name}</h3>
          <div className="action-buttons">
            <button
              type="button"
              className="icon-btn soft-blue"
              aria-label="Edit barber"
              onClick={() => onEdit(barber)}
            >
              <FiEdit2 />
            </button>
            <button
              type="button"
              className="icon-btn soft-red"
              aria-label="Delete barber"
              onClick={() => onDelete(barber)}
            >
              <FiTrash2 />
            </button>
          </div>
        </div>

        <div className="meta-row">
          <div className="meta-badge">
            <FiBriefcase />
            {barber.experience} yil tajriba
          </div>
        </div>
        <div className="meta-row">
          <div className="location-badge">
            <FiMapPin />
            {barber.location}
          </div>
        </div>

        <button
          type="button"
          className="book-btn"
          onClick={() => onBook(barber)}
        >
          Yozilish
        </button>
      </div>
    </article>
  );
}
