import React, { Component, Fragment } from 'react';
import TodoItem from './TodoItem';
import axios from 'axios';
import './style.css'

class TodoList extends Component {
  constructor(props) {
    super(props);
    // 当组件的state或者props发生改变时， 他的render函数就会重新执行
    this.state = {
      inputValue: '',
      list: []
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
  }

  render() {
    return (
      // return 里面的内容要用div包裹住， fragment是占位符
      <Fragment>  
        <div>
          <label htmlFor="insertArea">input area</label>
          <input 
            id="insertArea"
            className="input"
            value={this.state.inputValue}
            // onChange={this.handleInputChange.bind(this)} 最好把bind统一写在页面的顶部, 否则影响性能
            onChange={this.handleInputChange}
          />
          <button onClick={this.handleBtnClick}>
          {/* <button onClick={this.handleBtnClick.bind(this)}> 最好把bind统一写在页面的顶部, 否则影响性能 */}
            submit
          </button>
        </div>
        <ul>
        {
          // this.state.list.map((item, index) =>{
          //   return (
          //     <div>
          //       {/* <li 
          //         key={index} 
          //         onClick={this.handleItemDelete.bind(this,index)}
          //         // dangerouslySetInnerHTML={{__html:item}}
          //       >
          //         {item}
          //       </li> */}

          //       {/* 从父组件TodoList向子组件TodoItem传值和传方法 */}
          //       <TodoItem 
          //         content={item}
          //         index={index}
          //         // deleteItem={this.handleItemDelete.bind(this)} 最好把bind统一写在页面的顶部, 否则影响性能
          //         deleteItem={this.handleItemDelete}
          //       /> 
          //     </div>
          //   )
          // })

          // 把上面拆分为一个函数getTodoItem()
          this.getTodoItem()
        }
        </ul>
      </Fragment>
    )
  }

  componentDidMount(){
    axios.get('/api/todolist')
      .then((res)=>{
        console.log(res.data);
        // this.setState(()=> {
        //   return {
        //     list: res.data
        //   }
        // });
        this.setState(()=> ({
            list: [...res.data]
        }))
      })
      .catch(() =>{alert('error')})
  }

  getTodoItem() {
    return this.state.list.map((item, index) => {
      return (
        // <div key = {index}>  map里每一项item都要有个独有的key值， 用index做key的是很不好的， 这里仅为教学为例， 现实编程不提倡
        //   <TodoItem 
        //     content={item}
        //     index={index}
        //     deleteItem={this.handleItemDelete}
        //   /> 
        // </div>

        // 若把包裹的div删掉， 可以直接把key写在<TodoItem/>上
        <TodoItem 
          key = {item}
          content={item}
          index={index}
          deleteItem={this.handleItemDelete}
        /> 
      )
    })
  }
  
  handleInputChange(e){
    // this.setState({
    //   inputValue: e.target.value
    // })

    // 在es6里 setState可以接收函数了而不是一个对象了 可以改写成箭头函数
    // this.setState(() => {
    //   return {
    //     inputValue: e.target.value
    //   }
    // })

    //最终简写为 去掉return 
    // this.setState(() => ({
    //   inputValue: e.target.value 
    // }))
    // 此时是异步的setState 这里会报错 和virtual dom有关 
    // 把对象变成函数时 发现报错了 就把 target.value存在外侧
    const value = e.target.value;
    this.setState(() => ({
      inputValue: value 
    }))

    // 若在jsx里创建了ref = {(inputbox) => {this.input = inputbox }}之后， e.target可以替换成this.input
    // 不推荐经常使用ref 避免经常直接操作dom react还是数据驱动形式更好
    // const value =this.input.value;
    // this.setState(() => ({
    // inputValue: value 
    // }))
  }

  handleBtnClick(){
    // this.setState({
    //   list:[...this.state.list, this.state.inputValue],
    //   inputValue: ''
    // })

    // 用ES6改写成箭头函数
    // this.setState(() => ({
    //   list:[...this.state.list, this.state.inputValue],
    //   inputValue: ''
    // }))

    // setState可以接收 prevState的参数(修改数据之前的那一次数据)等价于this.state 
    // 这种写法更靠谱 可以避免改变state
    this.setState((prevState) => ({
      list:[...prevState.list, prevState.inputValue],
      inputValue: ''
    }));
  }

  handleItemDelete(index) {
    // const list = [...this.state.list]; //把this.state.list拷贝出来， 可以避免直接改变state状态
    // list.splice(index, 1);
    // this.setState({
    //   list: list
    // })

    // 用ES6改写成箭头函数
    this.setState((prevState) => {
      const list = [...prevState.list]; 
      list.splice(index, 1);
      return {list}
    });
  }
}

export default TodoList;