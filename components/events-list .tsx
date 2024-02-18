import { Category, LiveEvent } from "@prisma/client";

import { EventCard } from "@/components/events-card";

type EventsWithProgressWithCategory = LiveEvent & {
  category: Category | null;
};

interface EventsListProps {
  items: EventsWithProgressWithCategory[];
}

export const EventsList = ({
  items
}: EventsListProps) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <EventCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            category={item?.category?.name!}
            categoryColorCode={item?.category?.colorCode!}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No Events found
        </div>
      )}
    </div>
  )
}