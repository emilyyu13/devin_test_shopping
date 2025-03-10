export const useApi = () => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBaseUrl;

  const get = async (endpoint) => {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API GET error:', error);
      throw error;
    }
  };

  const post = async (endpoint, data) => {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API POST error:', error);
      throw error;
    }
  };

  const put = async (endpoint, data) => {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API PUT error:', error);
      throw error;
    }
  };

  const del = async (endpoint) => {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API DELETE error:', error);
      throw error;
    }
  };

  return {
    get,
    post,
    put,
    delete: del,
  };
};
