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