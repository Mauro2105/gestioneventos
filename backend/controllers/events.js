const Event = require('../models/Events');

const getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json({ message: 'Events retrieved successfully', events });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving events', error });
    }
};

const createEvent = async (req, res) => {
    try {
        const { name, date, time, location, description, createdBy } = req.body;

        const event = new Event({ 
            name,
            date,
            time,
            location,
            description,
            createdBy: req.user.id
        });
        await event.save();
        res.status(200).json({ message: "Event created successfully", event });
    } catch (error) {
        res.status(400).json({ message: "Error creating event", error });
    }
};

const updateEvent = async (req, res) => {
    try {
        const { id } = req.params
        const update = req.body;
        const event = await Event.findByIdAndUpdate(id, update, { new: true });

        if (!event) return res.status(404).json({ message: "Event not found" });

        res.status(200).json({ message: "Event updated successfully", event });
    } catch (error) {
        res.status(400).json({ message: "Error updating event", error });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params
        const event = await Event.findByIdAndDelete(id);

        if (!event) return res.status(404).json({ message: "Event not found" });
        
        res.status(200).json({ message: "Event deleted successfully", event });
    } catch (error) {
        res.status(400).json({ message: "Error deleting event", error });
    }
};

const filterEvents = async (req, res) => {
    try {
        const { date, location } = req.query;
        const filters = {};

        if (date) {
            const startOfDay = new Date(`${date}T00:00:00.000Z`);
            const endOfDay = new Date(`${date}T23:59:59.999Z`);


            filters.date = { $gte: startOfDay, $lte: endOfDay };

        }

        if (location) {
            filters.location = { $regex: location, $options: 'i' };
        }
        console.log('Filters:', filters)

        const events = await Event.find(filters);


        res.status(200).json({ message: "Events found", events });
    } catch (error) {
        
        res.status(400).json({ message: "Error filtering events", error });
    }
}

module.exports = { createEvent, updateEvent, deleteEvent, getEvents, filterEvents };