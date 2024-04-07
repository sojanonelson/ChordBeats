const Instrument = require('../../models/instrument');

const router = require('express').Router();

// router.get('/:instrumentName', (req, res) => {
//     const instrumentName = req.params.instrumentName;
//     res.send(`${instrumentName} sounds here`);
// })

router.get('/:instrumentName', async (req, res) => {
    const instrumentName = req.params.instrumentName;

    try {
        // Query the database for the instrument by name
        const instrument = await Instrument.findOne({ name: instrumentName });

        if (!instrument) {
            return res.status(404).json({ error: 'Instrument not found' });
        }

        
        const soundFiles = instrument.soundFiles;

        // Send the sound files as a response
        res.status(200).json({ soundFiles });
        console.log("The soundFiles: ",soundFiles);
    } catch (error) {
        console.error('Error fetching instrument:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router
