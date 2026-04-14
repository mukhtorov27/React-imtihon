import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import {
  createBarber,
  deleteBarber,
  getBarbers,
  updateBarber,
} from "../api/barberApi";
import { createRecept } from "../api/receptApi";
import { AddStylistModal } from "../components/AddStylistModal";
import { StylistCard } from "../components/StylistCard";
import { AppointmentModal } from "../components/AppointmentModal";
import type { Barber, BarberFormValues, BookingFormValues, Id } from "../types";

export function DashboardPage() {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState("");
  const [noticeText, setNoticeText] = useState("");

  const [showBarberModal, setShowBarberModal] = useState(false);
  const [editingBarber, setEditingBarber] = useState<Barber | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);

  const fetchStylists = async () => {
    setLoading(true);
    setErrorText("");

    try {
      const data = await getBarbers();
      setBarbers(data);
    } catch {
      setErrorText("Barberlar ro'yxatini yuklab bo'lmadi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchStylists();
  }, []);

  useEffect(() => {
    if (!noticeText) {
      return;
    }

    const timeoutId = window.setTimeout(() => setNoticeText(""), 2500);
    return () => window.clearTimeout(timeoutId);
  }, [noticeText]);

  const sortedBarbers = [...barbers].sort((a, b) => b.rating - a.rating);

  const openAddStylistModal = () => {
    setEditingBarber(null);
    setShowBarberModal(true);
  };

  const openEditStylistModal = (barber: Barber) => {
    setEditingBarber(barber);
    setShowBarberModal(true);
  };

  const handleSaveStylist = async (payload: BarberFormValues, id?: Id) => {
    try {
      if (id !== undefined) {
        const updatedBarber = await updateBarber(id, payload);
        setBarbers((prev) =>
          prev.map((item) => (item.id === id ? updatedBarber : item)),
        );
        setNoticeText("Barber ma'lumotlari yangilandi.");
        return;
      }

      const newBarber = await createBarber(payload);
      setBarbers((prev) => [newBarber, ...prev]);
      setNoticeText("Yangi barber qo'shildi.");
    } catch {
      setErrorText("Barberni saqlashda xatolik yuz berdi.");
      throw new Error("Save barber failed");
    }
  };

  const handleDeleteStylist = async (barber: Barber) => {
    const isConfirmed = window.confirm(
      `${barber.name} ni o'chirishni xohlaysizmi?`,
    );
    if (!isConfirmed) {
      return;
    }

    try {
      await deleteBarber(barber.id);
      setBarbers((prev) => prev.filter((item) => item.id !== barber.id));
      setNoticeText("Barber o'chirildi.");
    } catch {
      setErrorText("Barberni o'chirishda xatolik yuz berdi.");
    }
  };

  const handleCreateAppointment = async (
    barber: Barber,
    payload: BookingFormValues,
  ) => {
    try {
      await createRecept(barber, payload);
      setNoticeText("Qabulga yozilish yuborildi.");
    } catch {
      setErrorText("Qabulga yozilishda xatolik yuz berdi.");
      throw new Error("Create recept failed");
    }
  };

  return (
    <>
      <section className="page-headline">
        <h1>All Stylists</h1>
        <button
          type="button"
          className="primary-btn with-icon"
          onClick={openAddStylistModal}
        >
          <FiPlus />
          Add Stylist
        </button>
      </section>

      {noticeText ? <div className="feedback success">{noticeText}</div> : null}
      {errorText ? <div className="feedback error">{errorText}</div> : null}

      {loading ? (
        <div className="feedback">Loading...</div>
      ) : (
        <section className="barber-grid">
          {sortedBarbers.map((barber) => (
            <StylistCard
              key={barber.id}
              barber={barber}
              onEdit={openEditStylistModal}
              onDelete={handleDeleteStylist}
              onBook={setSelectedBarber}
            />
          ))}
        </section>
      )}

      {!loading && !sortedBarbers.length ? (
        <p className="empty-state">No stylists yet.</p>
      ) : null}

      <AddStylistModal
        open={showBarberModal}
        initialBarber={editingBarber}
        onClose={() => setShowBarberModal(false)}
        onSave={handleSaveStylist}
      />
      <AppointmentModal
        open={Boolean(selectedBarber)}
        barber={selectedBarber}
        onClose={() => setSelectedBarber(null)}
        onSave={handleCreateAppointment}
      />
    </>
  );
}
