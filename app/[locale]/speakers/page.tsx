import { SpeakerCard } from "@/app/[locale]/speakers/_components/speaker-card";
import { PageHeading } from "@/components/atoms/page-heading";
import { fetchSessions } from "@/services/sessions";
import { groupSessionsBySpeaker } from "@/utils/group-sessions-by-speaker";
import { Flex, Grid, Heading } from "@chakra-ui/react";

export default async function SpeakersPage() {
  const sessions = await fetchSessions();
  const speakers = groupSessionsBySpeaker(sessions);

  return (
    <Flex direction="column" gap="8" flex="1" width="full">
      <PageHeading title="Speakers">
        Who is speaking at React Alicante, and when.
      </PageHeading>

      {/* Card titles render as h3 (Chakra's Card.Title); this keeps the
          heading outline unbroken between the page's h1 and those h3s. */}
      <Heading as="h2" srOnly>
        All speakers
      </Heading>

      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap="6"
      >
        {speakers.map((speaker) => (
          <SpeakerCard key={speaker.speaker} speaker={speaker} />
        ))}
      </Grid>
    </Flex>
  );
}
