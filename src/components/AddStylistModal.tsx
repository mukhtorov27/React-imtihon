import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { FiBriefcase, FiImage, FiMapPin, FiStar, FiUser } from "react-icons/fi";
import { ModalWrapper } from "./ModalWrapper";
import type { Barber, BarberFormValues, Id } from "../types";

interface AddStylistModalProps {
  open: boolean;
  initialBarber: Barber | null;
  onClose: () => void;
  onSave: (payload: BarberFormValues, id?: Id) => Promise<void>;
}

const INITIAL_FORM: BarberFormValues = {
  name: "",
  imageUrl: "",
  experience: 1,
  rating: 4,
  location: "",
};

function getFormValues(barber: Barber | null): BarberFormValues {
  if (!barber) {
    return INITIAL_FORM;
  }

  return {
    name: barber.name,
    imageUrl: barber.imageUrl,
    experience: barber.experience,
    rating: barber.rating,
    location: barber.location,
  };
}

function validateForm(form: BarberFormValues): string {
  if (!form.name.trim() || !form.location.trim() || !form.imageUrl.trim()) {
    return "Barcha maydonlar to'ldirilishi shart.";
  }

  if (form.rating < 1 || form.rating > 5) {
    return "Rating 1 dan 5 gacha bo'lishi kerak.";
  }

  return "";
}

export function AddStylistModal({
  open,
  initialBarber,
  onClose,
  onSave,
}: AddStylistModalProps) {
  const [form, setForm] = useState<BarberFormValues>(INITIAL_FORM);
  const [saving, setSaving] = useState(false);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    if (!open) {
      return;
    }

    setErrorText("");
    setForm(getFormValues(initialBarber));
  }, [open, initialBarber]);

  const handleTextChange =
    (field: "name" | "imageUrl" | "location") =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
    };

  const handleNumberChange =
    (field: "experience" | "rating") =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      setForm((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorText("");

    const validationError = validateForm(form);
    if (validationError) {
      setErrorText(validationError);
      return;
    }

    setSaving(true);
    try {
      await onSave(form, initialBarber?.id);
      onClose();
    } catch {
      setErrorText("Xatolik yuz berdi.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <ModalWrapper
      open={open}
      title={initialBarber ? "Barberni tahrirlash" : "Yangi barber qo'shish"}
      subtitle={
        initialBarber
          ? "Mavjud barber ma'lumotlarini yangilang"
          : "Yangi barber ma'lumotlarini kiriting"
      }
      onClose={onClose}
    >
      <form className="modal-form" onSubmit={handleSubmit}>
        <label className="input-label">
          <span>
            <FiUser />
            Ism
          </span>
          <input
            type="text"
            value={form.name}
            onChange={handleTextChange("name")}
            placeholder="Barber ismi"
          />
        </label>

        <label className="input-label">
          <span>
            <FiImage />
            Rasm URL
          </span>
          <input
            type="url"
            value={form.imageUrl}
            onChange={handleTextChange("imageUrl")}
            placeholder="https://images.unsplash.com/..."
          />
        </label>

        <div className="grid-two">
          <label className="input-label">
            <span>
              <FiBriefcase />
              Tajriba
            </span>
            <input
              type="number"
              min={1}
              value={form.experience}
              onChange={handleNumberChange("experience")}
            />
          </label>

          <label className="input-label">
            <span>
              <FiStar />
              Rating
            </span>
            <input
              type="number"
              step={0.1}
              min={1}
              max={5}
              value={form.rating}
              onChange={handleNumberChange("rating")}
            />
          </label>
        </div>

        <label className="input-label">
          <span>
            <FiMapPin />
            Manzil
          </span>
          <input
            type="text"
            value={form.location}
            onChange={handleTextChange("location")}
            placeholder="Toshkent, Uzbekistan"
          />
        </label>

        {errorText ? <p className="form-error">{errorText}</p> : null}

        <div className="modal-actions">
          <button type="button" className="secondary-btn" onClick={onClose}>
            Bekor qilish
          </button>
          <button type="submit" className="primary-btn" disabled={saving}>
            {saving ? "Saqlanmoqda..." : "Saqlash"}
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
}
