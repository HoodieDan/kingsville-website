import { computed, onMounted, onUnmounted, toValue  } from "vue";
import type {MaybeRefOrGetter} from "vue";
import { getEventTiming  } from "~/src/utils/events";
import type {WebsiteEvent} from "~/src/utils/events";

export function useEventCountdown(event: MaybeRefOrGetter<WebsiteEvent | null | undefined>) {
  const now = useState<number>("events-clock", () => Date.now());
  let interval: ReturnType<typeof setInterval> | undefined;
  onMounted(() => {
    now.value = Date.now();
    interval = setInterval(() => { now.value = Date.now(); }, 1000);
  });
  onUnmounted(() => clearInterval(interval));
  const timing = computed(() => {
    const current = toValue(event);
    return current ? getEventTiming(current, now.value) : { status: "ended" as const, label: "", remaining: 0 };
  });
  const countdown = computed(() => {
    const seconds = Math.floor(timing.value.remaining / 1000);
    return {
      days: Math.floor(seconds / 86400),
      hours: Math.floor((seconds % 86400) / 3600),
      minutes: Math.floor((seconds % 3600) / 60),
      seconds: seconds % 60,
    };
  });
  return { countdown, eventStatus: computed(() => timing.value.status), countdownLabel: computed(() => timing.value.label) };
}
