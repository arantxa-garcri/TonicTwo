/* SPDX-License-Identifier: GPL-3.0-only */

/**
 * @file app.js
 * @project TonicTwo (Step Sequencer)
 * @description
 *   Minimal 7x8 step sequencer built with Tone.js (v15.x).
 *   Features:
 *     - Step playback (Tone.Transport + scheduleRepeat)
 *     - BPM control
 *     - Global transpose slider (semitones, -12..+12)
 *     - Recording indicator (REC pill toggles while recording)
 *     - Track naming (used for exported file name)
 *     - Recording/export of the master bus via Tone.Recorder
 *
 * @author
 *   Arantxa Garayzar Cristerna
 *
 * @created 2020 (original)
 * @updated 2026-02-20 (modernized as TonicTwo)
 *
 * @notes
 *   - Browsers require a user gesture to start audio; we call Tone.start() on button clicks.
 *   - Export format is browser-dependent (commonly OGG/Opus or WebM/Opus).
 *   - MP3 is intentionally not included to keep things simple (needs an MP3 encoder).
 */

/* ============================================================================
   1) DOM REFERENCES (UI ELEMENTS)
   ========================================================================== */
const audioEl = document.querySelector("audio");

const playBtn = document.getElementById("play");
const clearBtn = document.getElementById("clear");
const recordBtn = document.getElementById("record");
const stopBtn = document.getElementById("stoprecord");

const bpmInput = document.getElementById("bpm");
const transposeInput = document.getElementById("transpose");
const transposeValue = document.getElementById("transposeValue");
const recIndicator = document.getElementById("recIndicator");
const trackNameInput = document.getElementById("trackName");

/**
 * IMPORTANT:
 * Now that we have a sidebar with many <div>s, we must select ONLY board rows.
 * Layout: #board > div > div (7 note rows).
 */
const rows = document.querySelectorAll("#board > div > div");

/** Fixed mapping: one note per row (7 rows). */
const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];

/* ============================================================================
   2) AUDIO GRAPH (SYNTHS + MASTER BUS + RECORDER)
   ========================================================================== */
const recorder = new Tone.Recorder();

const bus = new Tone.Gain(1).toDestination();
bus.connect(recorder);

const synths = Array.from({ length: 7 }, () =>
  new Tone.Synth({ oscillator: { type: "triangle" } }).connect(bus)
);

/* ============================================================================
   3) GLOBAL STATE (TRANSPORT POSITION, TRANSPOSE, RECORDING)
   ========================================================================== */
let index = 0;
let isRecording = false;

let transposeSemitones = Number(transposeInput?.value || 0);
if (transposeValue) transposeValue.textContent = String(transposeSemitones);

/* ============================================================================
   4) SEQUENCER ENGINE (TRANSPORT + STEP ADVANCE)
   ========================================================================== */
Tone.Transport.scheduleRepeat((time) => {
  const step = index % 8;

  for (let i = 0; i < rows.length && i < synths.length; i++) {
    const inputs = rows[i].querySelectorAll('input[type="checkbox"]');
    const input = inputs[step];

    if (input && input.checked) {
      const transposedNote = Tone.Frequency(notes[i]).transpose(transposeSemitones).toNote();
      synths[i].triggerAttackRelease(transposedNote, "8n", time);
    }
  }

  index++;
}, "8n");

/* ============================================================================
   5) AUDIO UNLOCK (BROWSER AUTOPLAY POLICY)
   ========================================================================== */
async function unlockAudio() {
  await Tone.start();
}

/* ============================================================================
   6) UI ACTIONS (PLAY/PAUSE, CLEAR, BPM, TRANSPOSE)
   ========================================================================== */
function togglePlay() {
  if (Tone.Transport.state === "started") Tone.Transport.pause();
  else Tone.Transport.start();
}

function clearBoard() {
  document.querySelectorAll('#board input[type="checkbox"]').forEach((cb) => (cb.checked = false));
  Tone.Transport.stop();
  index = 0;
}

Tone.Transport.bpm.value = Number(bpmInput?.value || 120);
bpmInput?.addEventListener("input", () => {
  Tone.Transport.bpm.value = Number(bpmInput.value || 120);
});

transposeInput?.addEventListener("input", () => {
  transposeSemitones = Number(transposeInput.value || 0);
  if (transposeValue) transposeValue.textContent = String(transposeSemitones);
});

/* ============================================================================
   7) RECORDING INDICATOR (UI)
   ========================================================================== */
function setRecIndicator(on) {
  if (!recIndicator) return;
  recIndicator.classList.toggle("is-on", on);
}

/* ============================================================================
   8) FILE NAMING (TRACK TITLE -> SAFE FILENAME)
   ========================================================================== */
function getSafeFileBaseName() {
  const raw = (trackNameInput?.value || "").trim();
  const base = raw.length ? raw : "tonictwo";

  return (
    base
      .replace(/[^\p{L}\p{N}\s_-]+/gu, "")
      .replace(/\s+/g, "_")
      .slice(0, 60)
      .trim()
  ) || "tonictwo";
}

/* ============================================================================
   9) RECORDING + EXPORT (TONE.RECORDER)
   ========================================================================== */
async function startRecording() {
  await unlockAudio();
  isRecording = true;
  setRecIndicator(true);

  recorder.start();
  if (Tone.Transport.state !== "started") Tone.Transport.start();
}

async function stopRecording() {
  if (!isRecording) return;
  isRecording = false;
  setRecIndicator(false);

  const blob = await recorder.stop();
  const url = URL.createObjectURL(blob);

  if (audioEl) audioEl.src = url;

  const mime = blob.type || "";
  const ext = mime.includes("ogg") ? "ogg" : "webm";
  const fileBase = getSafeFileBaseName();

  const a = document.createElement("a");
  a.href = url;
  a.download = `${fileBase}.${ext}`;
  document.body.appendChild(a);
  a.click();
  a.remove();

  setTimeout(() => URL.revokeObjectURL(url), 30_000);
}

/* ============================================================================
   10) EVENT BINDINGS
   ========================================================================== */
playBtn?.addEventListener("click", async () => {
  await unlockAudio();
  togglePlay();
});

clearBtn?.addEventListener("click", clearBoard);
recordBtn?.addEventListener("click", startRecording);
stopBtn?.addEventListener("click", stopRecording);
