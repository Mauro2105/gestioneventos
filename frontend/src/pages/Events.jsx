import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  filterEvents,
} from "../services/eventsService";

const Events = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({ date: "", location: "" });
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
    description: "",
  });
  const [updateId, setUpdateId] = useState(null);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // 1. useEffect para cargar todos los eventos al inicio
  useEffect(() => {
    if (!token) {
      console.error("Invalid token");
      return;
    }
    const fetchEvents = async () => {
      try {
        const response = await getEvents(token);
        console.log("Fetched events (initial load):", response);
        setAllEvents(response || []);
        setEvents(response || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEvents();
  }, [token]);

  // 2. useEffect para LOG de cambios en `events`
  useEffect(() => {
    console.log("Events state changed:", events);
  }, [events]);

  const handleOpen = () => {
    setFormData({
      name: "",
      date: "",
      time: "",
      location: "",
      description: "",
    });
    setUpdateId(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError("");
  };

  // 3. Crear o actualizar evento
  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.date ||
      !formData.time ||
      !formData.location ||
      !formData.description
    ) {
      setError("All fields are required");
      return;
    }

    try {
      if (updateId) {
        await updateEvent(updateId, formData, token);
      } else {
        await createEvent(formData, token);
      }

      // Recarga los eventos
      const updatedEvents = await getEvents(token);
      setAllEvents(updatedEvents);
      setEvents(updatedEvents);

      handleClose();
    } catch (e) {
      setError(e.response?.data?.message || "An error occurred");
    }
  };

  // 4. Preparar edición de evento
  const handleUpdate = (event) => {
    setFormData(event);
    setUpdateId(event._id);
    setOpen(true);
  };

  // 5. Eliminar evento
  const handleDelete = async (id) => {
    try {
      await deleteEvent(id, token);
      const updatedEvents = await getEvents(token);
      setAllEvents(updatedEvents);
      setEvents(updatedEvents);
    } catch (e) {
      console.error(" Error deleting event: ", e);
    }
  };

  // 6. Filtrar eventos
  const handleFilter = async () => {
    try {
      const { date, location } = filters;

      if (!date && !location) {
        console.log("No filters applied, restoring allEvents");
        setEvents(allEvents);
        return;
      }

      console.log("Filters sent to backend:", { date, location });

      const response = await filterEvents({ date, location }, token);

      console.log("Filtered events from backend:", response);
      // Verifica que `response` sea un array de eventos o un objeto
      if (!response || !Array.isArray(response)) {
        console.warn("Backend did not return an array as expected.");
        setEvents([]);
      } else {
        setEvents(response);
      }

      // LOG para ver qué hay en `events` justo después de setEvents
      console.log("Updated events (after filter):", events);

    } catch (error) {
      console.error("Error filtering events: ", error);
    }
  };

  // 7. Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Events
      </Typography>
      <Button
        variant="contained"
        color="error"
        onClick={handleLogout}
        sx={{ mb: 2 }}
      >
        Logout
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{ mb: 2 }}
      >
        Add Event
      </Button>
      {/* FILTROS */}
      <TextField
        label="Filter by Date"
        type="date"
        value={filters.date}
        onChange={(e) => setFilters({ ...filters, date: e.target.value })}
        InputLabelProps={{ shrink: true }}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Filter by Location"
        value={filters.location}
        onChange={(e) => setFilters({ ...filters, location: e.target.value.trim() })}
        margin="normal"
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleFilter}
        sx={{ mt: 2 }}
      >
        Filter
      </Button>

      {/* TABLA DE EVENTOS */}
      <Table sx={{ mt: 3 }}>
        <TableHead>
          <TableRow>
            <TableCell>Event Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                No events found
              </TableCell>
            </TableRow>
          ) : (
            events.map((event) => {
              // LOG para ver si la iteración de eventos ocurre
              console.log("Rendering event in table:", event);
              return (
                <TableRow key={event._id}>
                  <TableCell>{event.name}</TableCell>
                  <TableCell>
                    {new Date(event.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{event.time}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>{event.description}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleUpdate(event)}
                      sx={{ mr: 1 }}
                    >
                      Update
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(event._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

      {/* DIALOGO CREAR/EDITAR EVENTO */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{updateId ? "Update Event" : "Add Event"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Event Name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <TextField
            label="Date"
            type="date"
            fullWidth
            margin="normal"
            value={formData.date}
            onChange={(e) =>
              setFormData({ ...formData, date: e.target.value })
            }
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <TextField
            label="Time"
            type="time"
            fullWidth
            margin="normal"
            value={formData.time}
            onChange={(e) =>
              setFormData({ ...formData, time: e.target.value })
            }
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <TextField
            label="Location"
            fullWidth
            margin="normal"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            required
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          {error && (
            <Typography variant="body2" color="error" sx={{ mr: 2 }}>
              {error}
            </Typography>
          )}
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit} color="primary">
            {updateId ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Events;
