import { ApiRoutes } from 'src/constants/apiRoutes';
import type { IEvent } from 'src/model/eventDTO';
import { request } from 'src/services/request';

export const getEvent = async (
  accessToken: string,
  event: string,
): Promise<IEvent> => {
  const { data } = await request.get<IEvent>(`${ApiRoutes.event}/${event}`, {
    accessToken,
  });

  return data;
};

export const getEventsHome = async (accessToken: string): Promise<IEvent[]> => {
  const { data } = await request.get<IEvent[]>(ApiRoutes.events_home, {
    accessToken,
  });

  const newData = await Promise.all(
    data.map(async event => {
      const response = await getEvent(accessToken, event.id);

      return {
        ...event,
        ...response,
      };
    }),
  );

  return newData;
};
