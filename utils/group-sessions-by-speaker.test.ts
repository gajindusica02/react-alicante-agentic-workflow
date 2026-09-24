import { describe, expect, it } from "vitest";

import type { Session } from "@/types/session";

import { groupSessionsBySpeaker } from "./group-sessions-by-speaker";

function session(overrides: Partial<Session> = {}): Session {
  return {
    id: "a-session",
    title: "A session",
    speaker: "A speaker",
    track: "React",
    room: "Main Hall",
    startTime: "09:00",
    durationMinutes: 45,
    description: "",
    ...overrides,
  };
}

describe("groupSessionsBySpeaker", () => {
  it("groups sessions under their speaker", () => {
    const sessions = [
      session({ id: "s1", title: "Session One", speaker: "Marta Fernandez" }),
      session({ id: "s2", title: "Session Two", speaker: "Marta Fernandez" }),
    ];

    expect(groupSessionsBySpeaker(sessions)).toEqual([
      {
        speaker: "Marta Fernandez",
        sessions: [
          { id: "s1", title: "Session One", startTime: "09:00" },
          { id: "s2", title: "Session Two", startTime: "09:00" },
        ],
      },
    ]);
  });

  it("sorts speakers alphabetically by name", () => {
    const sessions = [
      session({ id: "s1", speaker: "Pablo Iglesias" }),
      session({ id: "s2", speaker: "Diego Castellanos" }),
    ];

    expect(groupSessionsBySpeaker(sessions).map((g) => g.speaker)).toEqual([
      "Diego Castellanos",
      "Pablo Iglesias",
    ]);
  });

  it("sorts each speaker's own sessions by start time", () => {
    const sessions = [
      session({ id: "afternoon", speaker: "Iker Otxoa", startTime: "15:00" }),
      session({ id: "morning", speaker: "Iker Otxoa", startTime: "09:45" }),
    ];

    expect(
      groupSessionsBySpeaker(sessions)[0].sessions.map((s) => s.id),
    ).toEqual(["morning", "afternoon"]);
  });

  it("excludes the closing panel's non-speaker placeholder", () => {
    const sessions = [
      session({ id: "closing-panel", speaker: "Full speaker lineup" }),
      session({ id: "keynote", speaker: "Marta Fernandez" }),
    ];

    const speakers = groupSessionsBySpeaker(sessions).map((g) => g.speaker);

    expect(speakers).toEqual(["Marta Fernandez"]);
  });

  it("returns nothing for no sessions", () => {
    expect(groupSessionsBySpeaker([])).toEqual([]);
  });
});
