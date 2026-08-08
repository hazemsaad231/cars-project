# 🚗 RentCars — Car Rental Platform

A single-page car rental app. Customers browse the fleet, pick pickup/return
dates and pay online; an admin manages the cars and every booking from a
dashboard.

> This app is **rental only** — there is no car-buying flow.

---

## Features

- **Fleet catalogue** with search (name, type, colour, model year), a max
  price-per-day filter, an "available only" toggle and pagination.
- **Car details** page with an image gallery and full specs.
- **Booking + payment** — pick pickup and return dates, see the day count and
  total calculated live, pay with Stripe.
- **No double booking** — availability is re-checked inside a Firestore
  transaction, so two people submitting at the same moment cannot both rent
  the same car.
- **My rentals** — customers see their bookings and can cancel one, which puts
  the car back on the market.
- **Admin dashboard** — fleet/revenue stats, every booking in one table, status
  changes and deletion.
- **Light and dark mode** — light is the default; the toggle lives in the navbar
  and the choice is remembered.
- English only.

---

## Tech stack

| Tool | Used for |
|------|----------|
| React 18 + Vite | UI and build tooling |
| React Router 6 | Routing |
| Firebase Auth | Sign in / sign up (email + Google) |
| Cloud Firestore | Cars, rentals and user profiles |
| Stripe | Card payments |
| Tailwind CSS | Styling and the design system |
| MUI Joy | Confirmation dialogs |
| React Hook Form | Forms and validation |
| AOS | Scroll animations |
| React Toastify | Notifications |

---

## Getting started

```bash
npm install
npm run dev
```

Other scripts: `npm run build`, `npm run preview`, `npm run lint`.

---

## Routes

| Path | Access | Page |
|------|--------|------|
| `/home` | public | Landing page |
| `/fleet` | public | Fleet catalogue |
| `/fleet/:id` | public | Car details + booking form |
| `/my-rentals` | signed in | The current user's bookings |
| `/complete` | signed in | Booking confirmation |
| `/admin` | admin | Rental dashboard |
| `/admin/cars/new` | admin | Add a car |
| `/admin/cars/:id` | admin | Edit a car |
| `/login`, `/login/register` | public | Sign in / sign up |

---

## Firestore data model

**`cars`** — one document per car in the fleet.

| Field | Notes |
|-------|-------|
| `car` | Display name |
| `img` | Array of image URLs; the first is the cover |
| `price` | **Rental rate per day** |
| `carType`, `car_color`, `car_model_year` | |
| `Transmission`, `Horsepower`, `mileage` | |
| `isBooked` | `true` while the car is out on rent |
| `evaluation`, `reviews` | Rating and review count |

**`rentals`** — one document per booking: `orderId`, `userId`, `carId`,
`customer{}`, `pickupDate`, `returnDate`, `days`, `pricePerDay`, `total`,
`car{}` (snapshot for display), `status` (`confirmed` / `active` /
`completed`), `createdAt`.

**`users`** — `firstName`, `lastName`, `email`, `role`, `createdAt`.

---

## ⚠️ Before going live

This is a portfolio/demo build. Do not put it in front of real customers as-is.

1. **Write Firestore security rules.** There are none in the repo. Right now
   admin access is decided by comparing the signed-in email against
   `ADMIN_EMAIL` in [`src/config.js`](src/config.js) — that is a UI convenience
   only and can be bypassed from the browser console. Enforce it server-side
   (a custom auth claim plus rules on `cars` and `rentals`).
2. **Payments are not real.** The app creates a Stripe *token* on the client but
   nothing ever charges it — there is no backend. Add a server endpoint that
   creates a PaymentIntent, and never trust a total calculated in the browser.
3. **Rotate the credentials in git history.** An admin email and password were
   previously committed to this README, and the Stripe test key and Firebase
   config are in the source. Firebase web config is safe to expose (rules are
   the real gate); the admin password is not — change it.
4. **Check the Firebase project.** [`.firebaserc`](.firebaserc) deploys to
   `cars44-16b67` while [`src/components/firebase/firebase.js`](src/components/firebase/firebase.js)
   connects to `cars-a98ed`. Confirm which one is correct.
