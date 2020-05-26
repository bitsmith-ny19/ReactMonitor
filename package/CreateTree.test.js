import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
// import chronoscope from 'react-chronoscope';
import createTree from './CreateTree';

function Dialog({ children }) {
  return (
    <div>
      <p>Hello</p>
      {children}
    </div>
  );
}

function Button({ children }) {
  return <button>{children}</button>;
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Dialog>
          <Button>Click me</Button>
        </Dialog>
      </div>
    );
  }
}

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('test treeGraph', () => {
  act(() => {
    console.log('container -', container);
    ReactDOM.render(<App />, container);
  });

  const treeGraph = createTree(container);
  console.log('treeGraph -', JSON.stringify(treeGraph));

  expect(container.innerHTML).toBe(
    '<div><div><p>Hello</p><button>Click me</button></div></div>'
  );
});