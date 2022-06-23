import React,{useState,useEffect} from 'react';
import Sidebar from './Sidebar'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import '../Stylesheets/build/Sidebar.css'
import '../Stylesheets/build/TimeLine.css'
import ContainerMui from '@mui/material/Container';
import { Container, Row, Col, Breadcrumb, Table } from 'react-bootstrap'

const getData = (jsonFile) => {
    fetch(jsonFile
        , {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    )
        .then(function (response) {
            console.log(response)
            return response.json();
        })
}
const ShedulingTable = (props) => {
    return <ContainerMui maxWidth='lg' >
        <Box>
            <h1 className='tableTitle'>{props.Title}</h1>
            <Paper
                elevation={6}
                className='my-4 Paper'
            >
                <Container>
                    <Row>
                        <Col>
                            <Table hover className='Tab-Skills'>
                                <thead>
                                    <tr>
                                        <td></td>
                                        <th>1h00min</th>
                                        <th>1h30min</th>
                                        <th>2h00min</th>
                                        <th>2h30min</th>
                                    </tr>
                                </thead>
                                {props.children}
                                <tfoot>
                                    <tr>
                                        <th className='active'>Today</th>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </Paper>
        </Box>
    </ContainerMui>
}
const Main = () => {
    useEffect(() => {
        getData('../data/ProgramingSkills.json')
    }, [])
    return (
        <Container fluid >
            <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Timeline</Breadcrumb.Item>
            </Breadcrumb>
            <ShedulingTable Title='Programing Skills'>
                {/* <tbody>
                    <tr>
                        <th>Saturday</th>
                        <td></td>
                        <td>Book(react)</td>
                        <td>TimeShPrj</td>
                        <td>Python(Cisco)</td>
                    </tr>
                    <tr>
                        <th>Sunday</th>
                        <td>Book(react)</td>
                        <td colSpan='2' >TimeShPrj</td>
                        <td>KaliTools</td>
                    </tr>
                    <tr>
                        <th className='active'>Monday</th>
                        <td colSpan='2'>MemoPrj</td>
                        <td>Git</td>
                        <td>TimeShPrj</td>
                    </tr>
                    <tr>
                        <th>Tuesday</th>
                        <td>Books</td>
                        <td></td>
                        <td>Python(cisco)</td>
                        <td>Git</td>
                    </tr>
                    <tr>
                        <th>Wendesday</th>
                        <td colSpan='2'>TimeShPrj</td>
                        <td>MemoPrj</td>
                        <td>KaliTools</td>
                    </tr>
                    <tr>
                        <th>Thursday</th>
                        <td>Git</td>
                        <td>Books</td>
                        <td>Python(cisco)</td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Friday</th>
                        <td></td>
                        <td>Git</td>
                        <td>KaliTools</td>
                        <td></td>
                    </tr>
                </tbody> */}
            </ShedulingTable>
            <ShedulingTable Title='University' >
                <tbody>
                    <tr>
                        <th>Saturday</th>
                        <td>NLP</td>
                        <td></td>
                        <td>Bdd</td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Sunday</th>
                        <td colSpan='2'>AlgoritmiqueAvancé</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Monday</th>
                        <td></td>
                        <td>Dss</td>
                        <td>NLP</td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Tuesday</th>
                        <td></td>
                        <td>Bdd</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Wednesday</th>
                        <td></td>
                        <td></td>
                        <td>AlgoritmiqueAvancé</td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>thursday</th>
                    </tr>
                    <tr>
                        <th>Friday</th>
                        <td colSpan='2'>AlgoritmiqueAvancé</td>
                        <td></td>
                        <td>Dss</td>
                    </tr>
                </tbody>
            </ShedulingTable>
        </Container>
    )
}
export default function TimeLine() {
    return <>
        <Sidebar />
        <div className="main_container bg-light">
            <Main />
        </div>
    </>
} 