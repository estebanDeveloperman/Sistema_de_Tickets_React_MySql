import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "thekinghasarrived3430184M@",
  database: "db_sistema",
});

// middeware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("hello i am the backend");
});

app.get("/tickets", (req, res) => {
  const q = "SELECT * FROM ticket";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/ticket", (req, res) => {
  const q =
    "INSERT INTO ticket (`nombre`,`area`, `descripcion`,`fecha_registro`, `fecha_problema`, `fecha_atencion`, `estado`) VALUES (?)";

  const values = [
    req.body.nombre,
    req.body.area,
    req.body.descripcion,
    req.body.fecha_registro,
    req.body.fecha_problema,
    req.body.fecha_atencion,
    req.body.estado,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Ticket ha sido creado exitosamente");
  });
});

// app.delete("/usuarios/:id", (req, res) => {
//   const ticketId = req.params.id;
//   const q = "DELETE FROM ticket WHERE id = ?"

//   db.query(q, [ticketId], (err, data) => {
//     if (err) return res.json(err);
//     return res.json("Ticket ha sido eliminado exitosamente");
//   })
// })

app.put("/ticket/:id", (req, res) => {
  const ticketId = req.params.id;
  const q =
    "UPDATE ticket SET `nombre` = ?, `area` = ?, `descripcion` = ?, `fecha_registro` = ?, `fecha_problema` = ?, `fecha_atencion` = ?, `estado` = ? WHERE id = ?";

  const values = [
    req.body.nombre,
    req.body.area,
    req.body.descripcion,
    req.body.fecha_registro,
    req.body.fecha_problema,
    req.body.fecha_atencion,
    req.body.estado,
  ];

  const keys = ['nombre', 'area', 'descripcion', 'fecha_registro', 'fecha_problema', 'fecha_atencion', 'estado'];

  const obj = {};
  
  for (let i = 0; i < values.length; i++) {
    obj[keys[i]] = values[i];
  }
  console.log(values)
  db.query(q, [...values, ticketId], (err, data) => {
    if (err) return res.json(err);
    // console.log(res.body)
    // return console.log(res.json(data)['body']);
    return res.send(obj);
    // return console.log(res.json(data.body)) 
  });
});

app.listen(8800, () => {
  console.log("Connected to backend!");
});

// http://localhost:8080/ticket