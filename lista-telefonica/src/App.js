import React from 'react';
import axios from 'axios';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function LinhaTabela(colab) {
  return (
    <tr align="center" key={colab.nome}>
      <td>{colab.nome}</td>
      <td>{colab.email}</td>
      <td>{colab.telefone}</td>
      <td>
        <Image
          height="50"
          width="50"
          src={colab.foto || 'https://png.pngtree.com/svg/20170420/b7c37c5a9e.png'}
          alt='erro'
          roundedCircle
          thumbnail>
        </Image>
      </td>
      <td><Button variant="outline-light">Editar</Button> <Button variant="danger">Excluir</Button></td>
    </tr>

  )
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pessoas: [],
      show: false,
      barraPesquisa: ''
    }
    this.getPessoas = this.getPessoas.bind(this);
    this.setPesquisa = this.setPesquisa.bind(this);

    this.handleShow = this.handleShow.bind(this); // modal
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.getPessoas();
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  getPessoas() {
    axios.get('http://localhost:3001/colaboradores/')
      .then((res) => {
        const pessoas = res.data;
        this.setState({ pessoas })
      }).catch(error => {
        console.error('erro na requisição: ', error)
      });
  }

  setPesquisa(event) {
    this.setState({ barraPesquisa: event });
  }

  getPesquisa() {
    if (this.state.barraPesquisa) {
      return this.state.pessoas.filter(pessoa => pessoa.nome.toLowerCase().includes(this.state.barraPesquisa)).map(colab => LinhaTabela(colab))
    } else {
      return this.state.pessoas.map(colab => LinhaTabela(colab))
    }
  }
  render() {
    return (
      <Container style={{ backgroundColor: 'lightgrey' }}>
        <Row className="justify-content-center" style={{ backgroundColor: 'black' }}>
          <Image src='https://softdesign.com.br/wp-content/uploads/softdesign-svg/logo-soft-branco.svg'></Image>
        </Row>
        <Form className="w-100 mt-3">
          <Col className="w-100">
            <Form.Control type="text" placeholder="Nome do Colaborador" name="barraPesquisa" value={this.state.barraPesquisa} onChange={(event) => {
              this.setPesquisa(event.target.value)
            }} />
          </Col>
        </Form>
        <Container fluid className='d-flex justify-content-end mt-2'>
          <Button variant="success" onClick={this.handleShow} className='ml-auto'>Adicionar</Button>
        </Container>
        <Table responsive striped bordered hover variant="dark" size="sm mt-2">
          <thead>
            <tr align="center">
              <th>Nome</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Foto</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {this.getPesquisa()}
          </tbody>
        </Table>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Adicionar novo colaborador</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <label>
              <input type="text" name="nome" placeholder="Nome" />
              </label>
              <br></br>
              <br></br>
              <label>
                <input type="text" name="email" placeholder="E-mail" />
              </label>
              <br></br>
              <br></br>
              <label>
                <input type="text" name="telefone" placeholder="Telefone" />
              </label>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
        </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Save Changes
        </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}
export default App;

