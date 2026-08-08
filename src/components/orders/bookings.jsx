import { useCallback, useEffect, useMemo, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
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
import CarImage from "../common/CarImage";

const STATUSES = ["confirmed", "active", "completed"];

const statusClass = {
  confirmed: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
  active: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
  completed:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
};

const AdminDashboard = () => {
  const { cars, setCarAvailability } = useApp();
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingDelete, setPendingDelete] = useState(null);

  const fetchRentals = useCallback(async () => {
    try {
      const snapshot = await getDocs(
        query(collection(db, RENTALS_COLLECTION), orderBy("createdAt", "desc"))
      );
      setRentals(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (error) {
      console.error("Error fetching rentals:", error);
      toast.error("Could not load rentals.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRentals();
  }, [fetchRentals]);

  const stats = useMemo(
    () => [
      { label: "Cars in fleet", value: cars.length },
      { label: "Currently rented", value: cars.filter((c) => c.isBooked).length },
      { label: "Total bookings", value: rentals.length },
      {
        label: "Revenue",
        value: `$${rentals.reduce((sum, r) => sum + (Number(r.total) || 0), 0)}`,
      },
    ],
    [cars, rentals]
  );

  const handleStatusChange = async (rentalId, status) => {
    try {
      await updateDoc(doc(db, RENTALS_COLLECTION, rentalId), { status });
      setRentals((prev) =>
        prev.map((r) => (r.id === rentalId ? { ...r, status } : r))
      );

      // Finishing a rental puts the car back on the market.
      const rental = rentals.find((r) => r.id === rentalId);
      if (status === "completed" && rental?.carId) {
        await setCarAvailability(rental.carId, false);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Could not update the status.");
    }
  };

  const handleDelete = async () => {
    const rental = pendingDelete;
    try {
      await deleteDoc(doc(db, RENTALS_COLLECTION, rental.id));
      if (rental.carId) await setCarAvailability(rental.carId, false);
      setRentals((prev) => prev.filter((r) => r.id !== rental.id));
      setPendingDelete(null);
      toast.success("Booking deleted and the car is available again.");
    } catch (error) {
      console.error("Error deleting rental:", error);
      toast.error("Could not delete this booking.");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container-page section">
      <header>
        <h1 className="section-title">Rental dashboard</h1>
        <p className="section-subtitle">
          Every booking placed through the site.
        </p>
      </header>

      <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="panel p-5">
            <dt className="text-sm text-slate-500 dark:text-slate-400">
              {stat.label}
            </dt>
            <dd className="mt-2 text-3xl font-bold text-brand-700 dark:text-brand-400">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>

      {rentals.length === 0 ? (
        <p className="mt-16 text-center text-slate-500 dark:text-slate-400">
          No bookings yet.
        </p>
      ) : (
        <div className="mt-10 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
          <table className="w-full min-w-[64rem] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:bg-slate-900 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3 font-semibold">Ref</th>
                <th className="px-4 py-3 font-semibold">Car</th>
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="px-4 py-3 font-semibold">Pickup</th>
                <th className="px-4 py-3 font-semibold">Return</th>
                <th className="px-4 py-3 font-semibold">Days</th>
                <th className="px-4 py-3 font-semibold">Total</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {rentals.map((rental) => (
                <tr
                  key={rental.id}
                  className="bg-white transition hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800/60"
                >
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs">
                    {rental.orderId}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <CarImage
                        src={rental.car?.img}
                        alt={rental.car?.car}
                        iconClass="text-lg"
                        className="h-11 w-16 shrink-0 rounded object-cover"
                      />
                      <div>
                        <div className="font-semibold">{rental.car?.car}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {rental.car?.carType}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium">
                      {rental.customer?.fullName}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {rental.customer?.email}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {rental.customer?.city}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {rental.pickupDate}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {rental.returnDate}
                  </td>
                  <td className="px-4 py-3">{rental.days}</td>
                  <td className="whitespace-nowrap px-4 py-3 font-semibold">
                    ${rental.total}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={rental.status ?? "confirmed"}
                      onChange={(e) =>
                        handleStatusChange(rental.id, e.target.value)
                      }
                      aria-label={`Status for booking ${rental.orderId}`}
                      className={`rounded-full border-0 px-3 py-1.5 text-xs font-semibold capitalize outline-none ${
                        statusClass[rental.status] ?? statusClass.confirmed
                      }`}
                    >
                      {STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => setPendingDelete(rental)}
                      aria-label={`Delete booking ${rental.orderId}`}
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
                    >
                      <MdDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* One dialog for the table, not one per row. */}
      <Modal open={Boolean(pendingDelete)} onClose={() => setPendingDelete(null)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>Confirmation</DialogTitle>
          <Divider />
          <DialogContent>
            Delete booking {pendingDelete?.orderId}? The car will be marked
            available again.
          </DialogContent>
          <DialogActions>
            <Button variant="solid" color="danger" onClick={handleDelete}>
              Delete
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setPendingDelete(null)}
            >
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
