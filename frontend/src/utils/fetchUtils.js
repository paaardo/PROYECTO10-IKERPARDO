export const hacerFetch = async (url, options) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  