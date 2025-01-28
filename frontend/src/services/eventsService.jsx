import axios from "axios";

export const API_URL = "http://localhost:5001/";

export const getEvents = async (token) => {
  const response = await axios.get(API_URL + "events", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("Response from backend:", response.data); 
  return response.data.events;
};

export const createEvent = async (event, token) => {
  const response = await axios.post(API_URL + "events", event, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateEvent = async (id, event, token) => {
  const response = await axios.put(`${API_URL}events/${id}`, event, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteEvent = async (id, token) => {
  const response = await axios.delete(`${API_URL}events/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const filterEvents = async (filters, token) => {
  const response = await axios.get(API_URL + "events/filter", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: filters,
  });

  console.log("Backend response for filterEvents:", response.data);
  
  return response.data.events;
};
