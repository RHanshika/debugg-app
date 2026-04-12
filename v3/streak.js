import { db } from './firebase-config.js';
import { doc, getDoc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

/**
 * Call this once per session after auth.
 * - If user visited today already → no change
 * - If user visited yesterday → streak++ 
 * - If user missed days → streak resets to 1
 * Returns the current streak number.
 */
export async function updateStreak(userId) {
  try {
    const ref = doc(db, 'users', userId);
    const snap = await getDoc(ref);
    if (!snap.exists()) return 0;
    const data = snap.data();

    const now = new Date();
    const todayStr = toDateStr(now);

    // Already visited today — no change
    if (data.lastVisit === todayStr) {
      return data.streak || 1;
    }

    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = toDateStr(yesterday);

    let newStreak;
    if (data.lastVisit === yesterdayStr) {
      // Consecutive day!
      newStreak = (data.streak || 0) + 1;
    } else {
      // Missed one or more days — reset
      newStreak = 1;
    }

    await updateDoc(ref, {
      streak: newStreak,
      lastVisit: todayStr,
      lastVisitTs: serverTimestamp()
    });

    return newStreak;
  } catch(e) {
    console.warn('Streak update failed:', e);
    return 0;
  }
}

function toDateStr(d) {
  // Returns "YYYY-MM-DD" in local timezone
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}