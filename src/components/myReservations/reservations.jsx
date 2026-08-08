import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";

import { db } from "../firebase/firebase";
import { RENTALS_COLLECTION } from "../../config";
import useApp from "../context/useApp";
import Loader from "../load/Load";

const statusClass = {
  confirmed: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
  active: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
  completed:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
};

const MyRentals = () => {
  const { user, setCarAvailability } = useApp();
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingCancel, setPendingCancel] = useState(null);

  const fetchRentals = useCallback(async () => {
    if (!user) return;
    try {
      const snapshot = await getDocs(
        query(
          collection(db, RENTALS_COLLECTION),
          where("userId", "==", user.uid)
        )
      );
      const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      // Sorted client-side so no composite Firestore index is needed.
      list.sort((a, b) => (b.pickupDate ?? "").localeCompare(a.pickupDate ?? ""));
      setRentals(list);
    } catch (error) {
      console.error("Error fetching rentals:", error);
      toast.error("Could not load your rentals.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchRentals();
  }, [fetchRentals]);

  const handleCancel = async () => {
    const rental = pendingCancel;
    try {
      await deleteDoc(doc(db, RENTALS_COLLECTION, rental.id));
      if (rental.carId) await setCarAvailability(rental.carId, false);
      setRentals((prev) => prev.filter((r) => r.id !== rental.id));
      setPendingCancel(null);
      toast.success("Booking cancelled.");
    } catch (error) {
      console.error("Error cancelling rental:", error);
      toast.error("Could not cancel this booking.");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container-page section">
      <header>
        <h1 className="section-title">My rentals</h1>
        <p className="section-subtitle">
          Your bookings, past and upcoming.
        </p>
      </header>

      {rentals.length === 0 ? (
        <div className="panel mt-10 text-center">
          <p className="text-slate-500 dark:text-slate-400">
            You have not booked a car yet.
          </p>
          <Link to="/fleet" className="btn-primary mt-6">
            Browse the fleet
          </Link>
        </div>
      ) : (
        <ul className="mt-10 space-y-5">
          {rentals.map((rental) => (
            <li key={rental.id} className="panel p-0">
              <div className="flex flex-col gap-5 p-5 sm:flex-row">
                {rental.car?.img && (
                  <img
                    src={rental.car.img}
                    alt={rental.car?.car ?? "Car"}
                    loading="lazy"
                    className="h-40 w-full shrink-0 rounded-xl object-cover sm:h-28 sm:w-44"
                  />
                )}

                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-bold">{rental.car?.car}</h2>
                      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                        Ref{" "}
                        <span className="font-mono">{rental.orderId}</span>
                        {rental.car?.car_model_year &&
                          ` · ${rental.car.car_model_year}`}
                      </p>
                    </div>
                    <span
                      className={`badge capitalize ${
                        statusClass[rental.status] ?? statusClass.confirmed
                      }`}
                    >
                      {rental.status ?? "confirmed"}
                    </span>
                  </div>

                  <dl className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                    <div>
                      <dt className="text-xs text-slate-500 dark:text-slate-400">
                        Pickup
                      </dt>
                      <dd className="font-medium">{rental.pickupDate}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-slate-500 dark:text-slate-400">
                        Return
                      </dt>
                      <dd className="font-medium">{rental.returnDate}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-slate-500 dark:text-slate-400">
                        Days
                      </dt>
                      <dd className="font-medium">{rental.days}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-slate-500 dark:text-slate-400">
                        Total
                      </dt>
                      <dd className="font-bold text-brand-700 dark:text-brand-400">
                        ${rental.total}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="flex shrink-0 items-start">
                  <button
                    type="button"
                    onClick={() => setPendingCancel(rental)}
                    disabled={rental.status === "completed"}
                    className="btn-outline border-red-500 px-4 py-2 text-xs text-red-600 hover:bg-red-600 hover:text-white dark:border-red-500 dark:text-red-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Modal open={Boolean(pendingCancel)} onClose={() => setPendingCancel(null)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>Confirmation</DialogTitle>
          <Divider />
          <DialogContent>
            Cancel your booking for {pendingCancel?.car?.car}? This cannot be
            undone.
          </DialogContent>
          <DialogActions>
            <Button variant="solid" color="danger" onClick={handleCancel}>
              Cancel booking
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setPendingCancel(null)}
            >
              Keep it
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </div>
  );
};

export default MyRentals;
