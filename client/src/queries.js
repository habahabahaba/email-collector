export async function getTotalCount() {
  try {
    const response = await fetch(import.meta.env.VITE_TOTAL_USERS_END_POINT);

    if (!response.ok)
      throw new Error('Failed to get total user count from API!');

    const data = await response.json();
    console.log('[getTotalCount] data: ', JSON.stringify(data, null, 2));

    return data;
  } catch (error) {
    console.error(error);
  }
}
