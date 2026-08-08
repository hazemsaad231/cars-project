import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { FiSearch } from "react-icons/fi";
import { MdAdd } from "react-icons/md";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";

import { db } from "../firebase/firebase";
import { CARS_COLLECTION } from "../../config";
import useApp from "../context/useApp";
import Loader from "../load/Load";
import CarCard from "./CarCard";

const SEARCH_FIELDS = [
  { value: "car", label: "Car name" },
  { value: "carType", label: "Type" },
  { value: "car_color", label: "Colour" },
  { value: "car_model_year", label: "Model year" },
];

const ITEMS_PER_PAGE = 9;

const Fleet = () => {
  const { cars, carsLoading, refreshCars, isAdmin } = useApp();

  const [term, setTerm] = useState("");
  const [field, setField] = useState("car");
  const [maxPrice, setMaxPrice] = useState("");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [page, setPage] = useState(1);
  const [pendingDelete, setPendingDelete] = useState(null);

  const filtered = useMemo(() => {
    const needle = term.trim().toUpperCase();
    const cap = parseFloat(maxPrice);

    return cars.filter((car) => {
      if (availableOnly && car.isBooked === true) return false;
      if (!Number.isNaN(cap) && parseFloat(car.price) > cap) return false;
      if (!needle) return true;
      return String(car[field] ?? "")
        .toUpperCase()
        .includes(needle);
    });
  }, [cars, term, field, maxPrice, availableOnly]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const visible = filtered.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  // Any filter change should send the user back to page one.
  const resetPage = (setter) => (value) => {
    setter(value);
    setPage(1);
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, CARS_COLLECTION, pendingDelete));
      setPendingDelete(null);
      await refreshCars();
      toast.success("Car deleted successfully.");
    } catch (error) {
      console.error("Error deleting car:", error);
      toast.error("Could not delete the car.");
    }
  };

  if (carsLoading) return <Loader />;

  return (
    <div className="container-page section">
      <header className="text-center">
        <h1 className="section-title">Our rental fleet</h1>
        <p className="section-subtitle mx-auto text-center">
          {filtered.length} {filtered.length === 1 ? "car" : "cars"} available to
          rent. Pick your dates at checkout.
        </p>
      </header>

      {/* Filters */}
      <div className="panel mt-10">
        <div className="grid gap-4 md:grid-cols-[1fr_auto_auto]">
          <div className="flex overflow-hidden rounded-lg border border-slate-300 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/30 dark:border-slate-700">
            <span className="flex items-center pl-3 text-slate-400">
              <FiSearch />
            </span>
            <input
              type="search"
              value={term}
              onChange={(e) => resetPage(setTerm)(e.target.value)}
              placeholder={`Search by ${SEARCH_FIELDS.find((f) => f.value === field).label.toLowerCase()}`}
              aria-label="Search the fleet"
              className="w-full bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-slate-400"
            />
            <select
              value={field}
              onChange={(e) => resetPage(setField)(e.target.value)}
              aria-label="Search field"
              className="shrink-0 border-l border-slate-300 bg-slate-50 px-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
            >
              {SEARCH_FIELDS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <input
            type="number"
            min="0"
            value={maxPrice}
            onChange={(e) => resetPage(setMaxPrice)(e.target.value)}
            placeholder="Max $/day"
            aria-label="Maximum price per day"
            className="field-input md:w-40"
          />

          <label className="flex cursor-pointer items-center gap-2 text-sm font-medium md:px-2">
            <input
              type="checkbox"
              checked={availableOnly}
              onChange={(e) => resetPage(setAvailableOnly)(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            />
            Available only
          </label>
        </div>
      </div>

      {isAdmin && (
        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {cars.length} cars in the fleet
          </p>
          <Link to="/admin/cars/new" className="btn-primary">
            <MdAdd size={18} />
            Add a car
          </Link>
        </div>
      )}

      {/* Grid */}
      {visible.length === 0 ? (
        <p className="mt-16 text-center text-slate-500 dark:text-slate-400">
          No cars match your filters.
        </p>
      ) : (
        <div
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          data-aos="fade-up"
        >
          {visible.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              actions={
                isAdmin ? (
                  <div className="grid grid-cols-3 gap-2">
                    <Link
                      to={`/admin/cars/${car.id}`}
                      className="btn-outline px-2 text-xs"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="btn-danger px-2 text-xs"
                      onClick={() => setPendingDelete(car.id)}
                    >
                      Delete
                    </button>
                    <Link
                      to={`/fleet/${car.id}`}
                      className="btn-primary px-2 text-xs"
                    >
                      View
                    </Link>
                  </div>
                ) : undefined
              }
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          className="mt-12 flex flex-wrap items-center justify-center gap-2"
          aria-label="Pagination"
        >
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            className="btn-outline px-3 py-2 text-xs"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage(i + 1)}
              aria-current={safePage === i + 1 ? "page" : undefined}
              className={`h-9 w-9 rounded-lg text-sm font-semibold transition ${
                safePage === i + 1
                  ? "bg-brand-700 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            className="btn-outline px-3 py-2 text-xs"
          >
            Next
          </button>
        </nav>
      )}

      {/* Delete confirmation — one dialog for the whole grid, not one per card. */}
      <Modal open={Boolean(pendingDelete)} onClose={() => setPendingDelete(null)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>Confirmation</DialogTitle>
          <Divider />
          <DialogContent>
            Are you sure you want to delete this car? This cannot be undone.
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

export default Fleet;
