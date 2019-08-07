import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js], constructor');
  }


  state = {
    persons: [
      { id:'123', name: 'Spencer', age: 31 },
      { id: '456', name: 'Feekings', age: 28 },
      { id: '789', name: 'Carter', age: 4 }
    ],
    otherState: 'some other value',
    showPersons: false
  }

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  componentDidMount () {
    console.log('[App.js] componentDidMount');
  }

  deletePersonHandler = (personIndex) => {
      // const persons = this.state.persons.splice(); older version
      const persons = [...this.state.persons];
      persons.splice(personIndex, 1);
      this.setState({persons: persons});
  }


  // updates persons
  nameChangedHandler = ( event, id ) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    // const person = Object.assign({}, this.state.persons[personIndex];

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons})
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }


  /// This is where we render everything!!! wooooaaah! :D

  render() {

    console.log('[App.js] render')

    let persons = null;

    if ( this.state.showPersons ) {
      persons = <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler} />;
    }

    /// We ALWAYS want to keep this clean!

    return (
      <div className={classes.App}>
        <Cockpit
        title={this.props.appTitle}
        showPersons={this.state.showPersons}
        persons={this.state.persons}
        clicked={this.togglePersonsHandler} />
        {persons}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
