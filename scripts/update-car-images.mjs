/**
 * One-off maintenance script: replace the dead car image URLs in Firestore.
 *
 * The original images were hotlinked from platform.cstatic-images.com and now
 * return 404. These replacements are real photos of the same models, hosted on
 * Wikimedia Commons.
 *
 * Run from the project root:
 *
 *   ADMIN_EMAIL="you@example.com" ADMIN_PASSWORD="yourpassword" \
 *     node scripts/update-car-images.mjs
 *
 * PowerShell:
 *
 *   $env:ADMIN_EMAIL="you@example.com"; $env:ADMIN_PASSWORD="yourpassword"
 *   node scripts/update-car-images.mjs
 *
 * It verifies every URL, writes a backup to img-backup.json, then updates the
 * four affected documents.
 *
 *   --dry     verify the URLs only, write nothing
 *   --print   print comma-separated lists to paste into the admin form by hand
 */
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { writeFileSync } from "node:fs";

const DRY_RUN = process.argv.includes("--dry");
const UA = "RentCarsMaintenance/1.0";
const W = "https://upload.wikimedia.org/wikipedia/commons/thumb";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Firestore document id -> replacement image URLs (cover first). */
const NEW_IMAGES = {
  // Mercedes-Benz CLA 250 T — CLA (C118): front, side, rear
  du8fU4jyAsFdXhzGj4mI: [
    `${W}/7/7e/Mercedes-AMG_CLA_45_S_4MATIC%2B_Coup%C3%A9_%28C118%29.jpg/1920px-Mercedes-AMG_CLA_45_S_4MATIC%2B_Coup%C3%A9_%28C118%29.jpg`,
    `${W}/c/ce/Mercedes-Benz_CLA_200_Genf_2019_1Y7A5107.jpg/1920px-Mercedes-Benz_CLA_200_Genf_2019_1Y7A5107.jpg`,
    `${W}/a/aa/Mercedes-AMG_CLA_45_S_4MATIC%2B_Coup%C3%A9_%28C118%29_rear.jpg/1920px-Mercedes-AMG_CLA_45_S_4MATIC%2B_Coup%C3%A9_%28C118%29_rear.jpg`,
    `${W}/5/59/Mercedes-Benz_CLA_180d_Genf_2019_1Y7A5106.jpg/1920px-Mercedes-Benz_CLA_180d_Genf_2019_1Y7A5106.jpg`,
    `${W}/e/e4/Mercedes-AMG_CLA_45_S_4MATIC%2B_%28C118%29_at_IAA_2019_IMG_0519.jpg/1920px-Mercedes-AMG_CLA_45_S_4MATIC%2B_%28C118%29_at_IAA_2019_IMG_0519.jpg`,
  ],

  // MINI Coupe Cooper — MINI Cooper (R56)
  fhiZAZpX4uwSMDHKXFQ4: [
    `${W}/e/ee/Mini_Cooper_R56.jpg/1920px-Mini_Cooper_R56.jpg`,
    `${W}/1/19/MINI_COOPER_%28R56%2CR57%29_China.jpg/1920px-MINI_COOPER_%28R56%2CR57%29_China.jpg`,
    `${W}/9/91/MINI_COOPER_%28R56%29_China.jpg/1920px-MINI_COOPER_%28R56%29_China.jpg`,
    `${W}/6/69/MINI_COOPER_%28R56%2CR57%29_China_%282%29.jpg/1920px-MINI_COOPER_%28R56%2CR57%29_China_%282%29.jpg`,
    `${W}/4/4b/MINI_COOPER_%28R56%29_China_%282%29.jpg/1920px-MINI_COOPER_%28R56%29_China_%282%29.jpg`,
    `${W}/6/66/MINI_COOPER_%28R56%29_China_%283%29.jpg/1920px-MINI_COOPER_%28R56%29_China_%283%29.jpg`,
    `${W}/1/11/MINI_R56_Hatch_Cooper_S_Inspired_by_Goodwood_Diamond_Black_Metallic_%282%29.jpg/1920px-MINI_R56_Hatch_Cooper_S_Inspired_by_Goodwood_Diamond_Black_Metallic_%282%29.jpg`,
    `${W}/a/a8/Mini_Cooper_Hatch_JCW_%28R56%29_Washington_DC_Metro_Area%2C_USA.jpg/1920px-Mini_Cooper_Hatch_JCW_%28R56%29_Washington_DC_Metro_Area%2C_USA.jpg`,
    `${W}/6/69/MINI_R56_Hatch_Cooper_D_Reef_Blue_Metallic_%283%29.jpg/1920px-MINI_R56_Hatch_Cooper_D_Reef_Blue_Metallic_%283%29.jpg`,
  ],

  // Jeep — Grand Cherokee (WL), 2022: front + rear
  meRwTvYJXvdVDphJZs4u: [
    `${W}/6/6c/2022_Jeep_Grand_Cherokee_Summit_Reserve_4x4_in_Bright_White%2C_Front_Left%2C_01-16-2022.jpg/1920px-2022_Jeep_Grand_Cherokee_Summit_Reserve_4x4_in_Bright_White%2C_Front_Left%2C_01-16-2022.jpg`,
    `${W}/7/77/2022_Jeep_Grand_Cherokee_L_Limited_Canada.jpg/1920px-2022_Jeep_Grand_Cherokee_L_Limited_Canada.jpg`,
    `${W}/0/0c/2022_Jeep_Grand_Cherokee_Summit_Reserve_4x4_in_Bright_White%2C_Rear_Left%2C_01-16-2022.jpg/1920px-2022_Jeep_Grand_Cherokee_Summit_Reserve_4x4_in_Bright_White%2C_Rear_Left%2C_01-16-2022.jpg`,
    `${W}/e/ec/2022_Jeep_Grand_Cherokee_Limited%2C_rear_6.8.22.jpg/1920px-2022_Jeep_Grand_Cherokee_Limited%2C_rear_6.8.22.jpg`,
  ],

  // McLaren 570S Spider — 570S / 570S Spider
  u5Dq1Mwvp629pdslUwQM: [
    `${W}/f/fe/McLaren_570S_Spider%2C_IAA_2017%2C_Frankfurt_am_Main_%281Y7A2696%29.jpg/1920px-McLaren_570S_Spider%2C_IAA_2017%2C_Frankfurt_am_Main_%281Y7A2696%29.jpg`,
    `${W}/5/59/McLaren_570S_1.jpg/1920px-McLaren_570S_1.jpg`,
    `${W}/3/3d/McLaren_570S%2C_IAA_2017%2C_%281Y7A3404%29.jpg/1920px-McLaren_570S%2C_IAA_2017%2C_%281Y7A3404%29.jpg`,
    `${W}/2/2d/2016-03-01_Geneva_Motor_Show_0930.JPG/1920px-2016-03-01_Geneva_Motor_Show_0930.JPG`,
    `${W}/f/f8/2016-03-01_Geneva_Motor_Show_0949.JPG/1920px-2016-03-01_Geneva_Motor_Show_0949.JPG`,
    `${W}/c/ca/FoS20162016_0625_150351AA_%2827289956633%29.jpg/1920px-FoS20162016_0625_150351AA_%2827289956633%29.jpg`,
  ],
};

const firebaseConfig = {
  apiKey: "AIzaSyD_mfSo-X5AucjU6LMw5OIlpCsbCZglYTw",
  authDomain: "cars-a98ed.firebaseapp.com",
  projectId: "cars-a98ed",
  storageBucket: "cars-a98ed.firebasestorage.app",
  messagingSenderId: "353676937071",
  appId: "1:353676937071:web:d47532dbd18bb1ff68ca9a",
};

/** Wikimedia rate-limits bursts, so check slowly and back off on 429. */
async function check(url, attempt = 1) {
  const res = await fetch(url, { headers: { "User-Agent": UA } }).catch(() => null);
  if (res?.status === 429 && attempt <= 4) {
    await sleep(6000 * attempt);
    return check(url, attempt + 1);
  }
  return (
    res?.status === 200 &&
    (res.headers.get("content-type") ?? "").startsWith("image/")
  );
}

/** Names shown by --print, so the output says which car each block is for. */
const CAR_NAMES = {
  du8fU4jyAsFdXhzGj4mI: "Mercedes-Benz CLA 250 T",
  fhiZAZpX4uwSMDHKXFQ4: "MINI Coupe Cooper",
  meRwTvYJXvdVDphJZs4u: "Jeep",
  u5Dq1Mwvp629pdslUwQM: "McLaren 570S Spider",
};

async function main() {
  // --print: dump comma-separated lists to paste into the admin "Image URLs"
  // field, for updating by hand instead of running the write below.
  if (process.argv.includes("--print")) {
    for (const [id, urls] of Object.entries(NEW_IMAGES)) {
      console.log(`===== ${CAR_NAMES[id] ?? id}  (${urls.length} images) =====`);
      console.log(urls.join(", "));
      console.log();
    }
    return;
  }

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!DRY_RUN && (!email || !password)) {
    console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD (or pass --dry).");
    process.exit(1);
  }

  console.log("Verifying image URLs (throttled)...");
  let allOk = true;
  for (const urls of Object.values(NEW_IMAGES)) {
    for (const url of urls) {
      if (!(await check(url))) {
        allOk = false;
        console.error("  FAIL", url);
      }
      await sleep(1200);
    }
  }
  if (!allOk) {
    console.error("\nSome URLs are unreachable — aborting without writing.");
    process.exit(1);
  }
  console.log("All URLs return 200 image/*\n");

  if (DRY_RUN) {
    console.log("--dry given, nothing written.");
    return;
  }

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  await signInWithEmailAndPassword(getAuth(app), email, password);
  console.log(`Signed in as ${email}\n`);

  // Back up the current image arrays so this is reversible.
  const snapshot = await getDocs(collection(db, "cars"));
  const backup = {};
  snapshot.forEach((d) => {
    backup[d.id] = { car: d.data().car, img: d.data().img };
  });
  writeFileSync("./img-backup.json", JSON.stringify(backup, null, 2));
  console.log("Backup written to img-backup.json\n");

  for (const [id, img] of Object.entries(NEW_IMAGES)) {
    await updateDoc(doc(db, "cars", id), { img });
    console.log(`Updated ${backup[id]?.car ?? id} — ${img.length} images`);
  }

  console.log("\nDone.");
}

main().then(
  () => process.exit(0),
  (error) => {
    console.error("\nFailed:", error.message);
    process.exit(1);
  }
);
