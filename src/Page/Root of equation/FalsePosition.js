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
var fxr = [], fxl = []

class BisectionMethod extends Component {
  componentDidMount() {
    fetch("/products")
      .then(res => res.json())
      .then(json => {
        this.setState({ items: json });
      });
  }
  constructor() {
    super();
    this.state = { function: " ", Xr: " ", Xl: " ", X: " ", showGrap: false, showTable: false ,items: []}
    this.onChangefunction = this.onChangefunction.bind(this)
    this.onChangeVariableXr = this.onChangeVariableXr.bind(this)
    this.onChangeVariableXl = this.onChangeVariableXl.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onExample = this.onExample.bind(this)
  }
  onChangefunction(func) {
    this.setState({ function: func.target.value })
    console.log(this.state.function);
  }
  onChangeVariableXr = (event) => {
    this.setState({ Xr: event.target.value })
  }
  onChangeVariableXl = (event) => {
    this.setState({ Xl: event.target.value })
  }
  onExample() {
    this.componentDidMount();
    this.setState({ function: this.state.items.Function,
      Xl: this.state.items.XL,
      Xr: this.state.items.XR })
  }
  onSubmit() {
    if(this.state.Xl < this.state.Xr && this.state.function != " " && this.state.Xl != " " && this.state.Xr != " ")
    {
        dataInTable=[]
        var sum = parseFloat(0.000005)
        var increaseFunction = false
        var n = -1
        var xm,xl = this.state.Xl , xr = this.state.Xr
        var inputy = []
        inputy['xl'] = []
        inputy['xm'] = []
        inputy['xr'] = []
        inputy['error'] = []
        
        inputy['error'][n+1] = 1

        /* loop ทำ Iteration*/
        do
        {
          inputy['xl'][n+1] = xl
          inputy['xr'][n+1] = xr
          
          fxr[n+1] = this.funcChange(inputy['xr'][n+1])
          fxl[n+1] = this.funcChange(inputy['xl'][n+1])
          xm = ((xl * fxr[n+1] ) - (xr * fxl[n+1])) / (fxr[n+1] - fxl[n+1] )
          increaseFunction=(((fxr[n+1]) * this.funcChange(xm)) > 0 ?  true : false)
          if(increaseFunction)
          {
            xr = xm
          }
          else
          {
            xl = xm
          }
          inputy['xm'][n+1] = xm
          if(n>=0){
            sum = this.funcError(xm,inputy['xm'][n])
            inputy['error'][n+1] = sum
          }
          n++;
        
        }while (sum > 0.000001)
      this.setState({ showGrap: true, showTable: true })
      this.Graph(inputy['xl'], inputy['xr'])
      this.createTable(inputy['xl'], inputy['xr'], inputy['xm'], inputy['error']);
    }
    else {
      console.log("Please Input Xl > Xr")
    }
  }

  /* function เช็คว่า fx * fxm < 0 หรือ ไม่*/
  funcChange = (X) => { let scope = { x: parseFloat(X) }; var expr = compile(this.state.function); return expr.evaluate(scope) }
  /* function หาค่า Error*/
  funcError = (Xnew, Xold) => { return abs((Xnew - Xold) / Xnew) }
  /* function เอาค่าที่หาได้ยัดลง Array dataIntable*/
  createTable(xl, xr, xm, error) {
    for (var i = 0; i < xl.length; i++) {
      dataInTable.push({
        iteration: i,
        xl: xl[i],
        xr: xr[i],
        xm: xm[i],
        error: error[i],
      });
    }
  }
  Graph(xl, xr) {
    data = [
      {
        type: 'scatter',
        x: xl,
        y: fxl,
        marker: {
          color: 'rgb(150, 32, 77)'
        },
        name: 'XL'
      },
      {
        type: 'scatter',
        x: xr,
        y: fxr,
        marker: {
          color: '#ffab00'
        },
        name: 'XR'
      }];

  }

  render() {
    var fx = this.state.function
    let layout = {
      title: 'FalsePosition',
      xaxis: {
        title: 'X'
      }
    };
    let config = {
      showLink: false,
      displayModeBar: true
    };
    return (
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>FalsePosition</Breadcrumb.Item>
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
                <Form.Group as={Row} controlId="functionFalsePosition">
                  <Form.Label column sm="2">
                    <h2 className="text-white">Fucntion</h2>
                  </Form.Label>
                  <Col sm="2">
                    < Form.Control type="text" placeholder={this.state.function} onChange={this.onChangefunction} />
                  </Col>
                </Form.Group>
                <br />
                <Form.Group as={Row}  controlId="VariableXrBisection">
                  <Form.Label column sm="2">
                    <h2 className="text-white">Xl</h2>
                  </Form.Label>
                  <Col sm="2">
                    <Form.Control type="text" placeholder={this.state.Xl} onChange={this.onChangeVariableXl} />
                  </Col>
                </Form.Group>
                <br />
                <Form.Group as={Row} controlId="VariableXlBisection">
                  <Form.Label column sm="2">
                    <h2 className="text-white">Xr</h2>
                  </Form.Label>
                  <Col sm="2">
                    <Form.Control type="text" placeholder={this.state.Xr} onChange={this.onChangeVariableXr} />
                  </Col>
                </Form.Group>
                <br />
                <div>
                  <Button  onClick={this.onSubmit}> Submit </Button>
                  
                  <Button  href="/FalsePosition"> Reset </Button>
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
      </Layout>);
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
    title: "XL",
    dataIndex: "xl",
    key: "kxl"
  },
  {
    title: "XR",
    dataIndex: "xr",
    key: "kxr"
  },
  {
    title: "Xm",
    dataIndex: "xm",
    key: "kxm"
  },
  {
    title: "Error",
    key: "kerror",
    dataIndex: "error"
  }
];