import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Link } from "@/i18n/navigation";
import type { SpeakerGroup } from "@/utils/group-sessions-by-speaker";
import { Flex, Text } from "@chakra-ui/react";

interface SpeakerCardProps {
  speaker: SpeakerGroup;
}

export function SpeakerCard({ speaker }: SpeakerCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle fontSize="md">{speaker.speaker}</CardTitle>
      </CardHeader>
      <CardContent>
        <Flex direction="column" gap="3">
          {speaker.sessions.map((session) => (
            <Link key={session.id} href={`/sessions/${session.id}`}>
              <Flex
                direction="column"
                color="var(--text-primary)"
                _hover={{ color: "var(--accent-hex)" }}
              >
                <Text fontSize="sm" color="var(--text-muted)">
                  {session.startTime}
                </Text>
                <Text fontWeight="medium">{session.title}</Text>
              </Flex>
            </Link>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
