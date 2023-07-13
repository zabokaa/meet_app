import { Component } from 'react';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
    this.bgColor = null;
  }

  getStyle = () => {
    return {
      color: this.color,
      backgroundColor: this.bgColor,
      borderWidth: "2px",
      borderStyle: "dotted",
      fontWeight: "bolder",
      borderRadius: "7px",
      borderColor: this.color,
      textAlign: "left",
      fontSize: "12px",
      margin: "10px 0",
      padding: "10px"
    }
  };

  render() {
    return (
      <div className="Alert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
};

// subclass InfoAlert
class InfoAlert extends Alert {
    constructor(props) {
      super(props);
      this.color = 'rgb(0, 0, 255)'; // blue
      this.bgColor = 'rgb(220, 220, 255)'; // light blue
    }
};

// subclass ErrorAlert
class ErrorAlert extends Alert {
    constructor(props) {
      super(props);
      this.color = 'rgb(255, 0, 212';   //pink
      this.bgColor = 'rgb(255, 128, 234)'; 
    }
};

// warningAlert . exc. 4.9
class WarningAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'rgb(210,105,30)';   
    this.bgColor = 'rgb(231,146,86)'; 
  }
};

export {InfoAlert, ErrorAlert, WarningAlert}; 