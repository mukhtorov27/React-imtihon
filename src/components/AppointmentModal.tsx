import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { FiClock, FiMapPin, FiPhone, FiUser } from "react-icons/fi";
import { ModalWrapper } from "./ModalWrapper";
import type { Barber, BookingFormValues } from "../types";

interface AppointmentModalProps {
  open: boolean;
  barber: Barber | null;
  onClose: () => void;
  onSave: (barber: Barber, payload: BookingFormValues) => Promise<void>;
}

const INITIAL_FORM: BookingFormValues = {
  customerName: "",
  phone: "",
  time: "",
};

function validateForm(form: BookingFormValues): string {
  if (!form.customerName.trim() || !form.phone.trim() || !form.time.trim()) {
    return "Barcha maydonlarni to'ldiring.";
  }

  return "";
}

export function AppointmentModal({
  open,
  barber,
  onClose,
  onSave,
}: AppointmentModalProps) {
  const [form, setForm] = useState<BookingFormValues>(INITIAL_FORM);
  const [saving, setSaving] = useState(false);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    if (!open) {
      return;
    }

    setForm(INITIAL_FORM);
    setErrorText("");
  }, [open]);

  const handleFieldChange =
    (field: keyof BookingFormValues) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorText("");

    if (!barber) {
      return;
    }

    const validationError = validateForm(form);
    if (validationError) {
      setErrorText(validationError);
      return;
    }

    setSaving(true);
    try {
      await onSave(barber, form);
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
      title={barber?.name ?? "Barber"}
      subtitle="Qabulga yozilish"
      onClose={onClose}
    >
      {barber ? (
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="location-badge muted">
            <FiMapPin />
            {barber.location}
          </div>

          <label className="input-label">
            <span>
              <FiUser />
              Ism
            </span>
            <input
              type="text"
              value={form.customerName}
              onChange={handleFieldChange("customerName")}
              placeholder="Ismingizni kiriting"
            />
          </label>

          <label className="input-label">
            <span>
              <FiPhone />
              Telefon raqam
            </span>
            <input
              type="tel"
              value={form.phone}
              onChange={handleFieldChange("phone")}
              placeholder="+998 90 123 45 67"
            />
          </label>

          <label className="input-label">
            <span>
              <FiClock />
              Vaqt
            </span>
            <input
              type="time"
              value={form.time}
              onChange={handleFieldChange("time")}
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
      ) : null}
    </ModalWrapper>
  );
}
