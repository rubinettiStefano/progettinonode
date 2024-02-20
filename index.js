const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = 5000;

// Middleware per il parsing del body delle richieste in formato JSON
app.use(express.json());

// Connessione al database MySQL

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'jaita', // Inserire il nome utente del database
    password: 'jaita107', // Inserire la password del database
    database: 'mockexpress' // Inserire il nome del database
  });
  
  
connection.connect(err => {
  if (err) {
    console.error('Errore nella connessione al database:', err);
    throw err;
  }
  console.log('Connessione al database MySQL avvenuta con successo');
});

// Middleware per gestire gli errori di connessione
const handleConnectionError = (req, res, next) => {
  if (!connection) {
    res.status(500).json({ error: 'Errore nella connessione al database' });
  } else {
    next();
  }
};

app.get('/api/person/:id', handleConnectionError, (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM person WHERE id = ?', [id], (error, results) => {
      if (error) {
        console.error('Errore durante il recupero dei dati:', error);
        res.status(500).json({ error: 'Errore durante il recupero dei dati' });
        return;
      }
  
      if (results.length === 0) {
        res.status(404).json({ error: `Persona con id ${id} non trovata` });
        return;
      }
  
      res.json(results[0]);
    });
  });

// Metodo GET per ottenere tutti gli elementi

//@GetMapping("/api/person")
app.get('/api/person', handleConnectionError, (req, res) => {
  connection.query('SELECT * FROM person', (error, results) => {
    if (error) {
      console.error('Errore durante il recupero dei dati:', error);
      res.status(500).json({ error: 'Errore durante il recupero dei dati' });
      return;
    }
    res.json(results);
  });
});

// Metodo POST per creare un nuovo elemento
app.post('/api/person', handleConnectionError, (req, res) => {
  const { name, surname, dob } = req.body;
  connection.query('INSERT INTO person (name, surname, dob) VALUES (?, ?, ?)', [name, surname, dob], (error, results) => {
    if (error) {
      console.error('Errore durante l\'inserimento dei dati:', error);
      res.status(500).json({ error: 'Errore durante l\'inserimento dei dati' });
      return;
    }
    res.redirect("/api/person/"+results.insertId)    
});
});

// Metodo PUT per aggiornare un elemento
app.put('/api/person/:id', handleConnectionError, (req, res) => {
  const { id } = req.params;
  const { name, surname, dob } = req.body;
  connection.query('UPDATE person SET name=?, surname=?, dob=? WHERE id=?', [name, surname, dob, id], (error, results) => {
    if (error) {
      console.error('Errore durante l\'aggiornamento dei dati:', error);
      res.status(500).json({ error: 'Errore durante l\'aggiornamento dei dati' });
      return;
    }
    res.send(`Utente con id ${id} aggiornato con successo`);
  });
});

// Metodo DELETE per eliminare un elemento
app.delete('/api/person/:id', handleConnectionError, (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM person WHERE id=?', [id], (error, results) => {
    if (error) {
      console.error('Errore durante l\'eliminazione dei dati:', error);
      res.status(500).json({ error: 'Errore durante l\'eliminazione dei dati' });
      return;
    }
    res.send(`Utente con id ${id} eliminato con successo`);
  });
});

// Avvio del server Express
app.listen(PORT, () => {
  console.log(`Server Express in esecuzione sulla porta ${PORT}`);
});
