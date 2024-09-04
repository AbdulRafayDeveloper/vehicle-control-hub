import notyf from '../../views/components/NotificationMessage/notyfInstance';
export const fetchAppVersion = async () => {
  try {
    const response = await fetch('/version.json'); // Assuming version.json is in public folder
    const data = await response.json();
    console.log('App version:', data.version);
    return data.version;
  } catch (error) {
    console.log('Failed to fetch version:');
    return '1.0.0';
  }
};
export function handleErrors(errorData) {
  if (errorData) {
    if (typeof errorData !== 'object' && !Array.isArray(errorData)) {
      // toastr.error(errorData);
    } else {
      const errorMessages = Object.values(errorData).flatMap(errors => errors);
      errorMessages.forEach(errorMessage => {
        notyf.error(errorMessage);
      });
    }
  }
}
// Function to get the current date in YYYY-MM-DD format
export function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}