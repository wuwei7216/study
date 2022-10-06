/* */
// import myComponent from './myComponent'
// import './HelloWorld.css'

// 创建一个组件button
const ButtonCounter = {
  name: "button-counter",
  props: ["count"],
  methods: {
    onClick() {
      this.$emit("change", this.count + 1);
    }
  },
  render() {
    return (
      <button onClick={this.onClick}>数量 {this.count}+</button>
    );
  }
};
export default {
  name: 'HelloWorld',
  components: {
    // myComponent 
  },
  data () {
    return {
      text:'hello 纸没了飞机',
      inputText:'我吃了',
      count: 0
    }
  },
  props: {
    msg: String
  },
  watch: {},
  methods: {
    onChange(val) {
      this.count = val;
      alert(this.count)
    }
  },
  render() {
  // const {text,inputText,count} = this //通过解构，下方return片段中就不需要this
    return (
    <div>
     <h3>内容</h3>
     {/* 纯文本 */}
     <p>hello, I am Gopal</p>
     {/* 动态内容 */}
     <p>{ this.text }</p>
     <p>hello { this.msg }</p>
     {/* 输入框 */}
     <input/>
     {/* 自定义组件 */}
     {/* <myComponent/> */}
     <ButtonCounter
        style={{ marginTop: "10px" }}
        count={this.count}
        type="button"
        onChange={this.onChange}
      />
    </div>
    );
   }
}