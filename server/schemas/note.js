const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdDate: { type: Date, required: true },
  updatedDate: { type: Date, required: true },
});

module.exports = mongoose.model("Note", noteSchema);
class Database {
  constructor() {
    this.Url = "mongodb://localhost:27017/notaty";
   
  }

  connect() {
    mongoose
      .connect(this.Url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      .then(() => {
        console.log("Connected to db");
      })
      .catch((err) => {
        console.log("Error received when adding note:", err);
      });
  }

  addNote(note) {
    return new Promise((resolve, reject) => {
      note["createdDate"] = new Date();
      note["updatedDate"] = new Date();
      let newNote = new Note(note);
      newNote
        .save()
        .then((doc) => {
          resolve(doc);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  updateNote(note) {
    return new Promise((resolve, reject) => {
      note["updatedDate"] = new Date();
      Note.findByIdAndUpdate(note["_id"], note)
        .then((data) => {
          resolve({ _id: data.id });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getNotes() {
    return new Promise((resolve, reject) => {
      Note.find({})
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getNoteById(noteId) {
    return new Promise((resolve, reject) => {
      Note.findById(noteId)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getNotesByTitle(noteTitle) {
    return new Promise((resolve, reject) => {
      
      const query = { title: { $regex: new RegExp(noteTitle, "i") } };
      Note.find(query)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  deleteNote(noteId) {
    return new Promise((resolve, reject) => {
      Note.findByIdAndDelete(noteId)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
exports.Database = Database;
