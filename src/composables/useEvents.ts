import { computed, onMounted, onUnmounted } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { websiteEvents } from "~/src/data/events";
import type { WebsiteEvent } from "~/src/utils/events";

export function useEvents() {
  const prismic = usePrismic();
  const query = useQuery({
    queryKey: ["events"],
    queryFn: () => prismic.client.getSingle("events"),
  });
  const now = useState<number>("events-clock", () => Date.now());
  let interval: ReturnType<typeof setInterval> | undefined;
  onMounted(() => {
    now.value = Date.now();
    interval = setInterval(() => { now.value = Date.now(); }, 1000);
  });
  onUnmounted(() => clearInterval(interval));

  const events = computed<WebsiteEvent[]>(() => [
    ...websiteEvents,
    ...(query.data.value?.data.slices ?? []).filter((event: WebsiteEvent) =>
      !websiteEvents.some(local => local.primary.event_name === event.primary.event_name)),
  ]);
  return { events, now, pending: query.isLoading };
}
