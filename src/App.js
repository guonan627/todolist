import React, { Component } from 'react';
// 等价于
// import React from 'react';
// const Component = React.Component;
class App extends Component {
  render() {
    // 下面是jsx语法， 要import react
    return (
      <div>
        hello Nan
      </div>
    );
  }
}

// import React from 'react';
// class App extends React.Component {
//   render() {
//     return (
//       <div>
//         hello world
//       </div>
//     );
//   }
// }

// function App() {
//   return (
//     <div>
//       hello world
//     </div>
//   );
// }

export default App;
