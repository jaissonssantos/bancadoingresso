import { ApiRoutes } from 'src/constants/apiRoutes';
import type { IEvent } from 'src/model/eventDTO';
import type { IGroup } from 'src/model/groupDTO';
import type { IProduct } from 'src/model/productDTO';
import { request } from 'src/services/request';

export const getProduct = async (
  accessToken: string,
  event: string,
  subGroup: string,
): Promise<IProduct[]> => {
  const { data } = await request.get<IProduct[]>(
    `${ApiRoutes.event}/${event}/group/sub-group/${subGroup}/product`,
    {
      accessToken,
    },
  );

  return data;
};

export const getGroup = async (
  accessToken: string,
  event: string,
): Promise<IGroup[]> => {
  const { data } = await request.get<IGroup[]>(
    `${ApiRoutes.event}/${event}/group`,
    {
      accessToken,
    },
  );

  return data;
};

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
      const eventData = await getEvent(accessToken, event.id);

      try {
        const groupData = await getGroup(accessToken, event.id);

        const newEventData = eventData.sections.map(section => ({
          ...section,
          group: groupData,
        }));

        return {
          ...event,
          sections: newEventData,
        };
      } catch (error) {
        return {
          ...event,
          ...eventData,
        };
      }
    }),
  );

  return newData;
};
