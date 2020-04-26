export const getLocation = () => {
  if (!navigator.geolocation) throw new Error('Geolocation not supported');
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      timeout: 5000,
    })
  );
};
