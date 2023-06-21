import "dotenv/config";
import convoy from "./convoy";

// Send the event to Convoy
export async function handleUserCreatedEvent(userData: any) {
  try {
    const eventData = {
      event_type: "user.created",
      endpoint_id: process.env.WEBHOOK_ENDPOINT_ID as string,
      data: {
        event_type: "user.created",
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