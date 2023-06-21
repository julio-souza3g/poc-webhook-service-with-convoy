import "dotenv/config";
import convoy from "./convoy";

type UserEvents = "user.created" | "user.deleted";

// Send the event to Convoy
export async function handleUserEvent(userData: any, type: UserEvents) {
  try {
    const eventData = {
      event_type: type,
      endpoint_id: process.env.WEBHOOK_ENDPOINT_ID as string,
      data: {
        event_type: type,
        user: userData,
      }
    };

    const response = await convoy.post(`${process.env.CONVOY_PROJECT_ID}/events`, eventData);
    // const response = await convoy.events.create(eventData);

    console.log('User created event sent to Convoy.', response);
  } catch (error) {
    console.error('Failed to send user created event to Convoy:', error);
  }
}