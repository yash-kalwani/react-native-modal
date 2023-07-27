# react-native-modal

The aim of `react-native-modal` is to handle multiple modals opening one after the other and **independent** of each other.

##Description

If there are multiple modals in your application ( in different components or same ) that do not need to communicate with each other but could be in a state where one modal is already visible to the user and the second could open itself causing unwanted behaviour, in such a scenario the library will close the first modal ( that was already open ) and show the second modal. If a third modal opens while the second is visible to the user, it'll close the second modal and show the third.

## Setup

This library is available on npm, install it with: `npm i @kalwani/react-native-modal`

## Usage

`react-native-modal` is simply a powerful extension on top of react-native's modal component, hence it works in a similar fashion

1. Import react-native-modal:

```javascript
import Modal from "@kalwani/react-native-modal";
```

2. Simply show/hide the modal by changing the `isVisible` prop to true/false.
The `onModalHide` is the function which will execute when the modal closes *(either due to it's own state change or due to some other modal forcing it to close)*, **both these props are required:**

```javascript
state = { showModal: true }

render () {
  closeModal = () => {
    this.setState({ showModal: false })
  }
  
  return (
    <View>
      <Modal isVisible={showModal} onModalHide={this.closeModal} >
        <View style={{ flex: 1 }}>
          <Text>I am the modal content!</Text>
        </View>
      </Modal>
    </View>
  )
}
```

## A complete example

The following example consists of a component (`ModalTester`) which opens three modals one after the other at 2, 4 and 6 seconds and each of it is independent of the other.
The state of these modals are controlled by `modal1` `modal2` `modal3` values.

```javascript
import React, { Component } from "react";
import { View, Text } from "react-native";
import Modal from "@kalwani/react-native-modal";

export default class ModalTester extends Component {
  state = {
    modal1: false,
    modal2: false,
    modal3: false
  };

  style = {
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({ modal1: true });
    }, 2000);

    setTimeout(() => {
      this.setState({ modal2: true });
    }, 4000);

    setTimeout(() => {
      this.setState({ modal3: true });
    }, 6000);
  }

  closeModalOne = () => {
    this.setState({ modal1: false });
  };
  closeModalTwo = () => {
    this.setState({ modal2: false });
  };
  closeModalThree = () => {
    this.setState({ modal3: false });
  };

  render() {
    const { modal1, modal2, modal3 } = this.state;
    return (
      <View>
        <Modal
          isVisible={modal1}
          onModalHide={this.closeModalOne}
          style={{ backgroundColor: "red" }}
        >
          <View>
            <Text style={this.style}>
              This is modal 1
            </Text>
          </View>
        </Modal>

        <Modal
          isVisible={modal2}
          onModalHide={this.closeModalTwo}
          style={{ backgroundColor: "green" }}
        >
          <View>
            <Text style={this.style}>
              This is modal 2
            </Text>
          </View>
        </Modal>

        <Modal
          isVisible={modal3}
          onModalHide={this.closeModalThree}
          style={{ backgroundColor: "blue" }}
        >
          <View>
            <Text style={this.style}>
              This is modal 3
            </Text>
          </View>
        </Modal>
      </View>
    );
  }
}
```

## Available props

| Name                           | Type             | Default        | Description                                                                                  |
| ------------------------------ | ---------------- | -------------- | -------------------------------------------------------------------------------------------- |
| animationIn                    | string or object | 'slideInUp'    | Modal show animation                                                                         |
| animationInTiming              | number           | 300            | Timing for the modal show animation (in ms)                                                  |
| animationOut                   | string or object | 'slideOutDown' | Modal hide animation                                                                         |
| animationOutTiming             | number           | 300            | Timing for the modal hide animation (in ms)                                                  |
| avoidKeyboard                  | bool             | false          | Move the modal up if the keyboard is open                                                    |
| backdropColor                  | string           | 'black'        | The backdrop background color                                                                |
| backdropOpacity                | number           | 0.70           | The backdrop opacity when the modal is visible                                               |
| backdropTransitionInTiming     | number           | 300            | The backdrop show timing (in ms)                                                             |
| backdropTransitionOutTiming    | number           | 300            | The backdrop hide timing (in ms)                                                             |
| children                       | node             | **REQUIRED**   | The modal content                                                                            |
| isVisible                      | bool             | **REQUIRED**   | if true the modal is visible                                                                 |
| onBackButtonPress              | func             | () => null     | Called when the Android back button is pressed                                               |
| onBackdropPress                | func             | () => null     | Called when the backdrop is pressed                                                          |
| onModalHide                    | func             | **REQUIRED**   | Called when the modal is completely hidden                                                   |
| onModalShow                    | func             | () => null     | Called when the modal is completely visible                                                  |
| onSwipe                        | func             | null           | Called when the `swipeThreshold` has been reached                                            |
| scrollOffset                   | number           | 0              | When > 0, disables swipe-to-close, in order to implement scrollable content                  |
| scrollOffsetMax                | number           | 0              | Used to implement overscroll feel when content is scrollable.|
| scrollTo                       | func             | null           | Used to implement scrollable modal.                                                            |
| swipeThreshold                 | number           | 100            | Swiping threshold that when reached calls `onSwipe`                                          |
| swipeDirection                 | string           | null           | Defines the direction where the modal can be swiped (can be 'up', 'down', 'left, or 'right') |
| useNativeDriver                | bool             | false          | Defines if animations should use native driver                                               |
| hideModalContentWhileAnimating | bool             | false          | Enhances the performance by hiding the modal content until the animations complete           |
| style                          | any              | null           | Style applied to the modal                                                                   |
----
Pull requests, feedbacks and suggestions are welcome!