import { Layout, Breadcrumb, Input, Card, Row, Table, Button, Col } from 'antd';
import React, { Component } from 'react';
import { Form } from 'react-bootstrap'
import { range, compile, evaluate, simplify, parse, abs } from 'mathjs'
import createPlotlyComponent from 'react-plotlyjs'
import Plotly from 'plotly.js/dist/plotly-cartesian'
const { Header, Content, Sider } = Layout;
const PlotlyComponent = createPlotlyComponent(Plotly)
var dataInTable = []
var data = []
var x = [], fx = [], L = []

class BisectionMethod extends Component {

  constructor() {
    super();
    this.state = { Size: parseInt(0), Xi: 0, showMatrix: false, showAnswer: false, items: [], ans: 0 }
    this.onChangeVariablesize = this.onChangeVariablesize.bind(this)
    this.onChangeVariableXi = this.onChangeVariableXi.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this)
  }
  onChangeVariablesize = (event) => {
    this.setState({ Size: event.target.value })
  }
  onChangeVariableXi = (event) => {
    this.setState({ Xi: event.target.value })
  }
  onSubmit() {

    function myFunction(i,n,xi) {
      var sum1 = 1, sum2 = 1;
      var j = 0;
      for (j = 0; j < n; j++) {
        if (j != i) {
          sum1 = sum1 * (x[j] - xi);
          sum2 = sum2 * (x[j] - x[i]);
        }
      }
      return parseFloat(sum1/sum2);
    }

    var i = 0;
    var ans1 = 0;
    for (i = 0; i < this.state.Size; i++) {
       this.state.ans += (myFunction(i,this.state.Size,this.state.Xi) * parseFloat(fx[i]) );
    }
    console.log(ans1)
    this.setState({
      showAnswer: true
    });
  }
  createMatrix(Size) {
    for (var i = 1; i <= Size; i++) {
      x.push(< Form.Control type="text"
        id={"x" + i} key={"x" + i} placeholder={"x" + i} />)
    }
    for (var i = 1; i <= Size; i++) {
      fx.push(< Form.Control type="text"
        id={"fx" + i} key={"fx" + i} placeholder={"fx" + i} />)
    }
    this.setState({
      showMatrix: true
    })
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }


  render() {
    let layout = {
      title: 'Lagrange',
      xaxis: {
        title: 'X'
      }
    };
    let config = {
      showLink: false,
      displayModeBar: true
    };
    return (<Layout style={{ padding: '0 24px 24px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Lagrange</Breadcrumb.Item>
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
              <Form.Group as={Row} controlId="functionBisection">
                <Form.Label column sm="2">
                  <h2 className="text-white">Size</h2>
                </Form.Label>
                <Col sm="2">
                  < Form.Control type="text" placeholder={this.state.Size} onChange={this.onChangeVariablesize} />
                </Col>
              </Form.Group>
              <br />
              <Button type="primary" onClick={() => this.createMatrix(this.state.Size)} style={{ margin: '10px 0px' }} >
                Submit
                </Button>
              <Button href="/La"> Reset </Button>
            </Form>
            <br />
            <Col span={14} style={{ minWidth: 160 }}>
              {this.state.showMatrix && <div onChange={this.handleChange}>
                <h2 className="text-white">X</h2><br />
                {x}
                <br /><h2 className="text-white">FX</h2><br />
                {fx}
                <Form.Group as={Row} controlId="functionBisection">
                  <Form.Label column sm="2">
                    <h2 className="text-white">Xi</h2>
                  </Form.Label>
                  <Col sm="2">
                    < Form.Control type="text" placeholder={this.state.Xi} onChange={this.onChangeVariableXi} />
                  </Col>
                </Form.Group>
                <br />
                <Button onClick={this.onSubmit}> Submit </Button>
                <Button href="/La"> Reset </Button>
              </div>}
            </Col>


          </div>
          <div align="middle">
            {this.state.showAnswer && <div>{parseFloat(this.state.ans)}</div>}
          </div>
        </React.Fragment>
      </Content>
    </Layout >
    );
  }
}
export default BisectionMethod;
