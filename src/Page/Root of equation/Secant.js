import { Layout, Breadcrumb, Input, Card, Row, Table, Button  } from 'antd';
import React, { Component } from 'react';
import { Form, Col } from 'react-bootstrap'
import { range, compile, evaluate, simplify, parse, abs } from 'mathjs'
import createPlotlyComponent from 'react-plotlyjs'
import Plotly from 'plotly.js/dist/plotly-cartesian'
const { Header, Content, Sider } = Layout;
const PlotlyComponent = createPlotlyComponent(Plotly)
var dataInTable = []
var data = []
var fxg = []

class BisectionMethod extends Component {
  componentDidMount() {
    fetch("/secant")
      .then(res => res.json())
      .then(json => {
        this.setState({ items: json });
      });
  }
  constructor() {
    super();
    this.state = { function: " ", X0: " ", X1: 0, showGrap: false, showTable: false ,items: []}
    this.onChangefunction = this.onChangefunction.bind(this)
    this.onChangeVariableX0 = this.onChangeVariableX0.bind(this)
    this.onChangeVariableX1 = this.onChangeVariableX1.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onExample = this.onExample.bind(this)
  }
  onChangefunction(func) {
    this.setState({ function: func.target.value })
    console.log(this.state.function);
  }
  onChangeVariableX0 = (event) => {
    this.setState({ X0: event.target.value })
  }
  onChangeVariableX1 = (event) => {
    this.setState({ X1: event.target.value })
  }
  onExample() {
    this.componentDidMount();
    this.setState({ function: this.state.items.Function,
      X0: this.state.items.X0,
      X1: this.state.items.X1 })
  }
  onSubmit() {
    if(this.state.function != " " && this.state.X0 != " " && this.state.X0 < this.state.X1){
      dataInTable=[]
      var sum = parseFloat(0.99999)
      var n = 1
      var Xold = this.state.X0 , Xnew = this.state.X1, Xnew2
      var inputy = []
      inputy['xout'] = []
      inputy['xold'] = []
      inputy['xnew'] = []
      inputy['xg'] = []
      inputy['error'] = []
      inputy['xold'][n] = Xold
      inputy['xnew'][n] = Xnew
      inputy['xg'][n-1] = Xold
      inputy['xg'][n] = Xnew
      var fxold = this.funcChange(Xold)
      var fxnew = this.funcChange(Xnew)
      fxg[n-1] = fxold
      fxg[n] = fxnew
      inputy['error'][n-1] = 1

      /* loop ทำ Iteration*/
      do
      {
        Xnew2 = Xnew - ((fxnew * (Xold - Xnew)) / (fxold - fxnew))
        inputy['xout'][n] = Xnew2
        inputy['xg'][n+1] = Xnew2
        fxg[n+1] = this.funcChange(Xnew2)
        Xold = Xnew
        Xnew = Xnew2
        fxold = this.funcChange(Xold)
        fxnew = this.funcChange(Xnew)
        inputy['xold'][n+1] = Xold
        inputy['xnew'][n+1] = Xnew
        sum = this.funcError(Xnew,Xold)
        inputy['error'][n] = sum
        n++;
      }while (sum > 0.000001)
      this.setState({ showGrap: true, showTable: true })
      this.Graph(inputy['xg'])
      this.createTable(inputy['xold'],inputy['xnew'],inputy['xout'], inputy['error']);
    }
      else{
        console.log("Please input function");
      }
  }
  funcChange = (X) => { let scope = { x: parseFloat(X) }; var expr = compile(this.state.function); return expr.evaluate(scope) }
  /* function หาค่า Error*/
  funcError = (Xnew, Xold) => { return abs((Xnew - Xold) / Xnew) }
  /* function เอาค่าที่หาได้ยัดลง Array dataIntable*/
  createTable(xold,xnew,xout ,error) {
    for (var i = 1; i < error.length; i++) {
      dataInTable.push({
        iteration: i,
        xold: xold[i],
        xnew: xnew[i],
        xout: xout[i],
        error: error[i],
      });
    }
  }
  Graph(xg) {
    data = [
      {
        type: 'scatter',
        x: xg,
        y: fxg,
        marker: {
          color: 'rgb(150, 32, 77)'
        },
        name: 'X'
      }];
  }

  render() {
    var fx = this.state.function
    let layout = {
      title: 'Secant',
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
          <Breadcrumb.Item>Secant</Breadcrumb.Item>
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
                <Form.Group as={Row} controlId="functionSecant">
                  <Form.Label column sm="2">
                    <h2 className="text-white">Fucntion</h2>
                  </Form.Label>
                  <Col sm="2">
                    < Form.Control type="text" placeholder={this.state.function} onChange={this.onChangefunction} />
                  </Col>
                </Form.Group>
                <br />
                <Form.Group as={Row} controlId="VariableX0">
                  <Form.Label column sm="2">
                    <h2 className="text-white">X0</h2>
                  </Form.Label>
                  <Col sm="2">
                    <Form.Control type="text" placeholder={this.state.X0} onChange={this.onChangeVariableX0} />
                  </Col>
                </Form.Group>
                <br />
                <Form.Group as={Row} controlId="VariableX1">
                  <Form.Label column sm="2">
                    <h2 className="text-white">X1</h2>
                  </Form.Label>
                  <Col sm="2">
                    <Form.Control type="text" placeholder={this.state.X0} onChange={this.onChangeVariableX1} />
                  </Col>
                </Form.Group>
                <br />
                <div>
                <Button  onClick={this.onSubmit}>
                    Submit 
                 </Button>
                <Button  href="/secant"> 
                 Reset 
                </Button>
                <Button  onClick={this.onExample}> 
                    Example 
                </Button>
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
      title: "Xi-1",
      dataIndex: "xold",
      key: "kx"
    },
    {
      title: "Xi",
      dataIndex: "xnew",
      key: "kx"
    },
    {
      title: "Xi+1",
      dataIndex: "xout",
      key: "kx"
    },
    {
      title: "Error",
      key: "kerror",
      dataIndex: "error"
    }
  ];