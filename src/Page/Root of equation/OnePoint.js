import { Layout, Breadcrumb, Input, Card, Row, Table, Button  } from 'antd';
import React, { Component } from 'react';
import { Form,Col } from 'react-bootstrap'
import { range, compile, evaluate, simplify, parse, abs } from 'mathjs'
import createPlotlyComponent from 'react-plotlyjs'
import Plotly from 'plotly.js/dist/plotly-cartesian'
const { Header, Content, Sider } = Layout;
const PlotlyComponent = createPlotlyComponent(Plotly)
var dataInTable = []
var data = []
var fx = []

class BisectionMethod extends Component {
  componentDidMount() {
    fetch("/onepoint")
      .then(res => res.json())
      .then(json => {
        this.setState({ items: json });
      });
  }
  constructor() {
    super();
    this.state = { function: " ",X0: " ", X: 0, showGrap: false, showTable: false ,items: []}
    this.onChangefunction = this.onChangefunction.bind(this)
    this.onChangeVariableX = this.onChangeVariableX.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onExample = this.onExample.bind(this)
  }
  onChangefunction(func) {
    this.setState({ function: func.target.value })
    console.log(this.state.function);
  }
  onChangeVariableX = (event) => {
    this.setState({ x0: event.target.value })
  }
  onExample() {
    this.componentDidMount();
    this.setState({ function: this.state.items.Function,
      X0: this.state.items.X0})
  }
  onSubmit() {
    if(this.state.function != " " && this.state.X0 != " "){
      dataInTable=[]
      var sum = parseFloat(1.000)
      var n = 0
      var x = this.state.X0
      var inputy = []
      inputy['x'] = []
      inputy['x1'] = []
      inputy['error'] = []
      inputy['error'][n] = 1
      inputy['x'][n] = parseFloat(x) 
      fx[n] = this.funcChange(inputy['x'][n])
      inputy['x1'][n] = fx[n]
      n++;
      /* loop ทำ Iteration*/
      do
      {
        inputy['x'][n] = fx[n-1]
        fx[n] = this.funcChange(parseFloat(inputy['x'][n]))
        inputy['x1'][n] = fx[n]
        sum = this.funcError(fx[n],fx[n-1])
        inputy['error'][n] = sum    
        n++;
      }while (sum > 0.000001)
      this.setState({ showGrap: true, showTable: true })
      this.Graph(inputy['x'])
      this.createTable(inputy['x'],inputy['x1'], inputy['error']);
    }
    else{
      console.log("Please input function");
    }
  }

  funcChange = (X) => { let scope = { x: parseFloat(X) }; var expr = compile(this.state.function); return expr.evaluate(scope) }
  /* function หาค่า Error*/
  funcError = (Xnew, Xold) => { return abs((Xnew - Xold) / Xnew) }
  /* function เอาค่าที่หาได้ยัดลง Array dataIntable*/
  createTable(x,x1, error) {
    for (var i = 0; i < x.length; i++) {
      dataInTable.push({
        iteration: i,
        x: x[i],
        x1: x1[i],
        error: error[i],
      });
    }
  }
  Graph(x) {
    data = [
      {
        type: 'scatter',
        x: x,
        y: fx,
        marker: {
          color: 'rgb(150, 32, 77)'
        },
        name: 'X'
      }];
  }

  render() {
    var fx = this.state.function
    let layout = {
      title: 'OnePoint',
      xaxis: {
        title: 'X'
      }
    };
    let config = {
      showLink: false,
      displayModeBar: true
    };
    return (      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>One-Point Iteration</Breadcrumb.Item>
        </Breadcrumb>
        <Content
        
          style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <React.Fragment>
            <div width={10000}>
              <Form>
                <Form.Group as={Row} controlId="functionOnePoint">
                  <Form.Label column sm="2">
                    <h2 className="text-white">Fucntion</h2>
                  </Form.Label>
                  <Col sm="2">
                    < Form.Control type="text" placeholder={this.state.function} onChange={this.onChangefunction} />
                  </Col>
                </Form.Group>
                <br />
                <Form.Group as={Row} controlId="VariableX">
                  <Form.Label column sm="2">
                    <h2 className="text-white">X0</h2>
                  </Form.Label>
                  <Col sm="2">
                    <Form.Control type="text" placeholder={this.state.X0} onChange={this.onChangeVariableX} />
                  </Col>
                </Form.Group>
                <br />
                <div>
                <Button  onClick={ this.onSubmit }> Submit </Button>
                <Button  href="/onepoint"> Reset </Button>
                <Button  onClick={this.onExample}> Example </Button>
                </div>

              </Form>

              {/* แสดง ตารางค่าที่หามาได้*/}
              {this.state.showTable === true ? <Card
                title={"Output"}
                bordered={true}
                style={tablestyle}
                id="outputCard"
              >
                <Table columns={columns} dataSource={dataInTable} bodyStyle={body}
                ></Table>
              </Card>
                : ''}

              {/* Plot Graph*/}
              {this.state.showGrap === true ?
                <PlotlyComponent data={data} Layout={layout} config={config} /> : ''
              }
            </div>
          </React.Fragment>
        </Content>
      </Layout>
      );
  }
}
export default BisectionMethod;
var Textstyle = {
  textAlign: 'center',
  textDecorationLine: 'underline'
}
var tablestyle =
{
  width: "100%", background: "#FFFFFF", color: "#2196f3", float: "inline-start", marginBlockStart: "2%"
}
var body = {
  fontWeight: "bold", fontSize: "18px", color: "#000000"
}
const columns = [
  {
    title: "Iteration",
    dataIndex: "iteration",
    key: "kiteration"
  },
  {
    title: "Xi",
    dataIndex: "x",
    key: "kx"
  },
  {
    title: "Xi+1",
    dataIndex: "x1",
    key: "kx1"
  },
  {
    title: "Error",
    key: "kerror",
    dataIndex: "error"
  }
];