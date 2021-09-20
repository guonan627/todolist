import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  //父组件TodoList的state更新时重新render时， 子组件TodoItem也会跟着重新render
  // 为了避免这种不必要的render操作 性能浪费 用shouldComponentUpdate来阻止  提升性能
  // shouldComponentUpdate(){
  //   return false;
  // }
  // 上面不是最优写法 逻辑不太清晰
  //接下来props里的content不等于当前props里的content(此组件接收的content改变时) 该组件要重新渲染
   shouldComponentUpdate(nextProps, nextState){
     if(nextProps.content !== this.props.content){ 
      return true;
     }else {
       return false;
     }
  }
 
  render (){
    console.log('child render');
    // return (
    //   <div onClick={this.handleClick}>
    //     {this.props.content}
    //   </div>
    // )
    // 用ES6语法改良如下
    const {content} = this.props;
    return (
      <div onClick={this.handleClick}>
        {content}
      </div>
    )
  }

  handleClick(){
    // this.props.deleteItem(this.props.index)
    //es6语法改良
    const { deleteItem, index } = this.props;
    deleteItem(index);
  }
}

//propTypes
TodoItem.propTypes = {
  content: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
  deleteItem: PropTypes.func,
  index: PropTypes.number
}

export default TodoItem;