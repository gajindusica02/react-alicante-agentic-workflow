import { describe, expect, it } from "vitest";

import { render, screen } from "@/tests/utils/render";
import type { SpeakerGroup } from "@/utils/group-sessions-by-speaker";

import { SpeakerCard } from "./speaker-card";

const speaker: SpeakerGroup = {
  speaker: "Marta Fernandez",
  sessions: [
    {
      id: "opening-keynote",
      title: "Opening Keynote: The Shape of Frontend in 2026",
      startTime: "09:00",
    },
  ],
};

describe("SpeakerCard", () => {
  it("shows the speaker's name", () => {
    render(<SpeakerCard speaker={speaker} />);

    expect(screen.getByText("Marta Fernandez")).toBeInTheDocument();
  });

  it("shows each session's title and start time", () => {
    render(<SpeakerCard speaker={speaker} />);

    expect(
      screen.getByText("Opening Keynote: The Shape of Frontend in 2026"),
    ).toBeInTheDocument();
    expect(screen.getByText("09:00")).toBeInTheDocument();
  });

  it("links each session to its session page", () => {
    render(<SpeakerCard speaker={speaker} />);

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/en/sessions/opening-keynote",
    );
  });

  it("renders a link per session when a speaker has more than one", () => {
    const multiSessionSpeaker: SpeakerGroup = {
      speaker: "Iker Otxoa",
      sessions: [
        {
          id: "server-components",
          title: "Server Components",
          startTime: "10:15",
        },
        {
          id: "rsc-payload",
          title: "RSC Payload on a Diet",
          startTime: "13:00",
        },
      ],
    };

    render(<SpeakerCard speaker={multiSessionSpeaker} />);

    expect(screen.getAllByRole("link")).toHaveLength(2);
  });
});
