import React, { Component } from "react";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";
import Filter from "./components/Filter";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      filter: "",
    };
  }

  componentDidMount() {
    const storedContacts = localStorage.getItem("contacts");

    if (storedContacts) {
      const parsedContacts = JSON.parse(storedContacts);
      this.setState({ contacts: parsedContacts });
    } else {
      const initialContacts = [
        { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
        { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
        { id: "id-3", name: "Eden Clements", number: "645-17-79" },
        { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
      ];

      localStorage.setItem("contacts", JSON.stringify(initialContacts));

      this.setState({
        contacts: initialContacts,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  addContact = (newContact) => {
    this.setState((prevState) => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  deleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  handleFilterChange = (value) => {
    this.setState({
      filter: value,
    });
  };

  render() {
    const { contacts, filter } = this.state;

    return (
      <div>
        <h1>Książka Telefoniczna</h1>
        <ContactForm addContact={this.addContact} contacts={contacts} />
        <h2>Kontakty</h2>
        <Filter filter={filter} setFilter={this.handleFilterChange} />
        <ContactList
          contacts={contacts.filter((contact) =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
          )}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
