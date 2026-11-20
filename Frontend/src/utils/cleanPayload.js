export const cleanPayload = (data) =>
  Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, value === '' ? null : value]),
  )