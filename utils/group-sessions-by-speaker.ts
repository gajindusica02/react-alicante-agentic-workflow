import type { Session } from "@/types/session";

export interface SpeakerSession {
  id: string;
  title: string;
  startTime: string;
}

export interface SpeakerGroup {
  speaker: string;
  sessions: SpeakerSession[];
}

/**
 * The closing panel's `speaker` field names the whole day's lineup rather
 * than one person (see the `closing-panel` seed row) — it isn't a speaker
 * and must not get its own card.
 */
const NON_SPEAKER_PLACEHOLDERS = new Set(["Full speaker lineup"]);

/**
 * Groups sessions by speaker, sorted alphabetically by speaker name, with
 * each speaker's own sessions sorted by start time. Sessions attributed to
 * a non-speaker placeholder (e.g. a closing panel's full lineup) are
 * excluded.
 */
export function groupSessionsBySpeaker(sessions: Session[]): SpeakerGroup[] {
  const groups = new Map<string, SpeakerSession[]>();

  for (const session of sessions) {
    if (NON_SPEAKER_PLACEHOLDERS.has(session.speaker)) {
      continue;
    }

    const speakerSessions = groups.get(session.speaker) ?? [];
    speakerSessions.push({
      id: session.id,
      title: session.title,
      startTime: session.startTime,
    });
    groups.set(session.speaker, speakerSessions);
  }

  return Array.from(groups, ([speaker, speakerSessions]) => ({
    speaker,
    sessions: [...speakerSessions].sort((a, b) =>
      a.startTime.localeCompare(b.startTime),
    ),
  })).sort((a, b) => a.speaker.localeCompare(b.speaker));
}
